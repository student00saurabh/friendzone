const express = require("express");
const router = express.Router();
const postController = require("../controllers/others.js");

// terms
router.get("/terms", postController.renderTerms);

// privacy
router.get("/privacy", postController.renderPrivacy);

module.exports = router;
