const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const passport = require("passport");
const wrapAsync= require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require ("../controllers/users.js");
const user = require("../models/user");


router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

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

module.exports = router;

