const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const multer = require("multer");

const userController = require("../controllers/users.js");

const { cloudinary, storage } = require("../cloudConfig.js");
const upload = multer({ storage });
// signup GET
//Signup POST
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(upload.single("image"), wrapAsync(userController.signup));

//Login GET
//Login POST
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

router.get("/profile/:id", isLoggedIn, userController.profile);

module.exports = router;
