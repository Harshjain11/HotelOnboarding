
const Hotel = require("../models/hotel.js");
const ExpressError= require("../utils/ExpressError.js");
const QRCode = require("qrcode");



module.exports.showAllHotel = async(req, res) => {
    const hotels = await Hotel.find({});
    if(!hotels) {
      throw new ExpressError("501", "hotels data not found")
    }
    const hotelWithUrl = hotels.map((hotel) => {
      return {...hotel,url:`/guest/${hotel._id}/newForm`}
    });

    const hotelWithQrCodeUrl = await Promise.all(hotelWithUrl.map(async (hotel) => {
      let qrCodeUrl = await QRCode.toDataURL(hotel.url);
      return {...hotel,qrCodeUrl}
    }));
    // console.log(hotelWithUrl);
    // console.log(hotelWithQrCodeUrl[1].qrCodeUrl);
    res.render("hotels/index.ejs" ,{hotels,hotelWithQrCodeUrl});
  }

  module.exports.renderNewform = (req, res) => {
    res.render("hotels/new.ejs");
  }

  module.exports.saveNewHotel =async (req, res) => {
    let {hotel} = req.body;
    console.log(hotel);
    let newHotel =  new Hotel(hotel);
    newHotel.logo = req.file.path;
  
    await newHotel.save();
    req.flash("success","New Hotel added successfully");
    res.redirect("/hotels");
  }