const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const messageController = require("../controllers/messages.js");

router
  .route("/")
  .get(isLoggedIn, wrapAsync(messageController.index));

router
  .route("/:id")
  .get(isLoggedIn, wrapAsync(messageController.inbox))
  .post(isLoggedIn, wrapAsync(messageController.sendMessage));

// New API route for real-time messaging
router.post(
  "/:id/send",
  isLoggedIn,
  wrapAsync(messageController.sendMessageAPI)
);

module.exports = router;