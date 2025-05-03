if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const Message = require("./models/messages.js");

const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");
const userRouter = require("./routes/users.js");
const othersRouter = require("./routes/others.js");
const likesRouter = require("./routes/likes.js");
const messageRouter = require("./routes/messages.js");

const dbUrl = process.env.ATLUSDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("error in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use(async (req, res, next) => {
  const receivedMessages = await Message.find({ receiver: req.user });
  const unSeen = receivedMessages.filter((msg) => !msg.isSeen);
  res.locals.isSeen = unSeen.length;
  next();
});

app.get("/", (req, res) => {
  if (!currUser) {
    res.render("others/home.ejs");
  } else {
    res.redirect("/posts");
  }
});

app.use("/posts", postsRouter);
app.use("/posts/:id/comments", commentsRouter);
app.use("/posts/:id/likes", likesRouter);
app.use("/", userRouter);
app.use("/", othersRouter);
app.use("/inbox", messageRouter);

//error checker
// app.use((req, res, next) => {
//   console.log("Incoming request:", req.method, req.path);
//   next();
// });

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log(`friend Zone is working at ${8080}`);
});
