const Like = require("../models/likes.js");
const Post = require("../models/posts.js");

module.exports.like = async (req, res) => {
  let post = await Post.findById(req.params.id);
  let newLike = new Like();
  newLike.cliker = req.user._id;
  post.likes.push(newLike);
  await newLike.save();
  await post.save();
  req.flash("success", "New Like added successfully!");
  let redirectUrl = req.headers.referer || "/posts";
  res.redirect(redirectUrl);
};
