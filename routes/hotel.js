const express = require("express");
const router = express.Router();
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn,isAdmin,validateHotel} = require("../middleware.js");
const ExpressError= require("../utils/ExpressError.js");
const hotelController = require("../controller/hotel.js")




router.get("/" ,wrapAsync(hotelController.showAllHotel));


router.get("/new" ,isLoggedIn,isAdmin, hotelController.renderNewform);

router.post("/",isLoggedIn,isAdmin,upload.single('hotel[logo]'),wrapAsync(hotelController.saveNewHotel));


module.exports= router