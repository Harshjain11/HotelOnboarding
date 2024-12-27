const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const userController= require("../controller/user.js");


router.get("/signup",userController.renderSignUpPage);

router.post("/signup" , wrapAsync(userController.signUpUser));


router.get("/login" , userController.renderLoginPage);

router.post("/login", passport.authenticate("local",{failureRedirect:'/login',failureFlash : true}),wrapAsync(userController.loginUser));

router.get("/logout",userController.logoutUser)
module.exports = router;
