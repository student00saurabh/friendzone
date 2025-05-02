const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Like = require("../models/likes.js");
const Post = require("../models/posts.js");
const { validateLike, isLoggedIn, isLikeCliker } = require("../middleware.js");

const likeController = require("../controllers/likes.js");

//Likes
//Post like route
router.post("/", isLoggedIn, validateLike, wrapAsync(likeController.like));

//Delet like route
router.delete(
  "/:likeId",
  isLoggedIn,
  isLikeCliker,
  wrapAsync(likeController.unLike)
);

module.exports = router;
