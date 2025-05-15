// routes/sitemap.js (or inside index.js)
const express = require("express");
const router = express.Router();
const sitemapController = require("../controllers/sitemap");

router.get("/sitemap.xml", sitemapController);

module.exports = router;
