const express = require("express");
const router = express.Router();

 const wrapAsync = require("../utils/wrapAsync.js")
// const methodOverride = require("method-override");
const guestController = require("../controller/guest.js"); 

const {isGuestAdmin, isLoggedIn ,validateGuest} = require("../middleware.js");


router.get("/:hotelId/newForm", wrapAsync(guestController.renderNewGuestForm));

router.get("/",isLoggedIn,isGuestAdmin,wrapAsync(guestController.renderAllGuest));

  router.post("/:hotelId", validateGuest,wrapAsync(guestController.saveNewGuest));

  router.patch("/:id",isLoggedIn,isGuestAdmin,validateGuest,wrapAsync( guestController.updateGuest));
  
  router.get("/thankyou", guestController.renderThankyouPage);

  router.get("/update",isLoggedIn,isGuestAdmin,wrapAsync(guestController.renderGuestUpdatePage));

  router.get("/update/:id",isLoggedIn,isGuestAdmin, wrapAsync(guestController.renderGuestUpdateForm));

  

  module.exports= router