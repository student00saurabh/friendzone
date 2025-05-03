const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Post = require("../models/posts.js");
const {
  saveRedirectUrl,
  isLoggedIn,
  isOwner,
  validatePost,
} = require("../middleware.js");
const postController = require("../controllers/posts.js");
const multer = require("multer");

const { cloudinary, storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route
//Show Route
router
  .route("/")
  .get(saveRedirectUrl, isLoggedIn, wrapAsync(postController.index))
  .post(
    isLoggedIn,
    upload.single("post[image]"),
    validatePost,
    wrapAsync(postController.createPost)
  );

//New Route
router.get("/new", isLoggedIn, postController.renderNewForm);

//Create Listing Route
//Upadate Route
//Delete Route
router
  .route("/:id")
  .get(wrapAsync(postController.showPost))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("post[image]"),
    validatePost,
    wrapAsync(postController.updatePost)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(postController.destroyPost));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(postController.renderEditForm)
);

module.exports = router;
