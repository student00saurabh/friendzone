const User = require("../models/users.js");
const Post = require("../models/posts.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;
    let { username, email, gender, age, about, password } = req.body;
    const newUser = new User({ email, username, gender, age, about });
    newUser.image = { url, filename };
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Friend-Zone!");
      res.redirect("/posts");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Friend-Zone!");
  let redirectUrl = res.locals.redirectUrl || "/posts";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/posts");
  });
};

module.exports.profile = async (req, res, next) => {
  let currUser = req.params.id;
  const profile = await User.findById(currUser);
  const posts = await Post.find({ owner: profile })
    .populate("likes")
    .populate("owner");
  res.render("./users/profile.ejs", { profile, posts });
};
