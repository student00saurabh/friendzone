const Post = require("./models/posts");
const ExpressError = require("./utils/ExpressError.js");
const { postSchema, commentSchema, likeSchema } = require("./schema.js");
const Comment = require("./models/comments.js");
const Like = require("./models/likes.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to use friendzone!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let post = await Post.findById(id);
  if (!post.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this post!");
    return res.redirect(`/posts/${id}`);
  }
  next();
};

module.exports.validatePost = (req, res, next) => {
  let { error } = postSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateComment = (req, res, next) => {
  let { error } = commentSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isCommentAuthor = async (req, res, next) => {
  let { id, commentId } = req.params;
  let comment = await Comment.findById(commentId);
  if (!comment.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this Comment!");
    return res.redirect(`/posts/${id}`);
  }
  next();
};

//validation for like
module.exports.validateLike = (req, res, next) => {
  let { error } = likeSchema.validate();
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isLikeCliker = async (req, res, next) => {
  let { id, likeId } = req.params;
  let like = await Like.findById(likeId);
  if (like.cliker != res.locals.currUser._id) {
    req.flash("error", "You are not the author of this Like!");
    return res.redirect(`/posts/${id}`);
  }
  next();
};
