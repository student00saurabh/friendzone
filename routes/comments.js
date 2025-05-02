const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Comment = require("../models/comments.js");
const Post = require("../models/posts.js");
const {
  validateComment,
  isLoggedIn,
  isCommentAuthor,
} = require("../middleware.js");

const commentController = require("../controllers/comments.js");

//Comments
//Post comment route
router.post(
  "/",
  isLoggedIn,
  validateComment,
  wrapAsync(commentController.comment)
);

//Delet comment route
router.delete(
  "/:commentId",
  isLoggedIn,
  isCommentAuthor,
  wrapAsync(commentController.destroyComment)
);

module.exports = router;
