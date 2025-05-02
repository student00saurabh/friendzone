const Comment = require("../models/comments.js");
const Post = require("../models/posts.js");

module.exports.comment = async (req, res) => {
  let post = await Post.findById(req.params.id);
  let newCommentData = req.body.comment;
  let newComment = new Comment(newCommentData);
  newComment.author = req.user._id;
  post.comments.push(newComment);
  await newComment.save();
  await post.save();
  req.flash("success", "New Comment added successfully!");
  res.redirect(`/posts/${post._id}`);
};

module.exports.destroyComment = async (req, res) => {
  let { id, commentId } = req.params;
  await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });

  await Comment.findByIdAndDelete(commentId);
  req.flash("success", "Comment Deleted!");
  res.redirect(`/posts/${id}`);
};
