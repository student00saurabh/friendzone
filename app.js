if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);

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
const sitemapRoutes = require("./routes/sitemap");

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
app.use(express.json()); // Add this for JSON parsing
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
  if (req.user) {
    const receivedMessages = await Message.find({ receiver: req.user });
    const unSeen = receivedMessages.filter((msg) => !msg.isSeen);
    res.locals.isSeen = unSeen.length;
  } else {
    res.locals.isSeen = 0;
  }
  next();
});

app.get("/", (req, res) => {
  if (!res.locals.currUser) {
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
app.use("/", sitemapRoutes);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  
  // User joins a room (conversation)
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
    
    // Broadcast online status
    socket.broadcast.emit("user-online", socket.userId);
  });
  
  // Handle sending messages
  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", {
      msg: data.message.msg,
      sender: data.message.sender,
      receiver: data.message.receiver,
      createdAt: data.message.createdAt
    });
  });
  
  // Handle typing indicator (optional)
  socket.on("typing", (data) => {
    socket.to(data.roomId).emit("user-typing", {
      userId: data.userId,
      isTyping: data.isTyping
    });
  });
  
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    socket.broadcast.emit("user-offline", socket.userId);
  });
});

// Make io accessible to routes (optional)
app.set("io", io);

//error checker
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.render("error.ejs", { message });
});

// Change from app.listen to server.listen
server.listen(8080, () => {
  console.log(`Friend Zone is working on port 8080`);
});