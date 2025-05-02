const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  saveRedirectUrl,
  isLoggedIn,
  isOwner,
  validatePost,
} = require("../middleware.js");
const messageController = require("../controllers/messages.js");

router
  .route("/", isLoggedIn)
  .get(isLoggedIn, wrapAsync(messageController.index));

router
  .route("/:id", isLoggedIn)
  .get(isLoggedIn, wrapAsync(messageController.inbox))
  .post(isLoggedIn, wrapAsync(messageController.msg));
module.exports = router;
