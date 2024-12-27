
const Guest = require("../models/guest.js");
const Hotel = require("../models/hotel.js");
const ExpressError= require("../utils/ExpressError.js");

module.exports.renderNewGuestForm = async (req, res) => {
    const {hotelId} = req.params;
     let hotel = await Hotel.findById(hotelId).populate("guestList");
     if(!hotel) {
      throw new ExpressError("502","hotel data not found in database")
     }
     let allBookedDates = [];

     // Iterate through each guest and collect their booked dates
     hotel.guestList.forEach(guest => {
      allBookedDates.push(...guest.dates);
     });
    console.log(allBookedDates);
     res.render("guest/form.ejs",{hotel,allBookedDates});
  }

  module.exports.renderAllGuest=async (req, res) => {
    let hotels = await Hotel.find({}).populate("guestList");
    res.render("guest/show.ejs",{hotels});
  }

  module.exports.saveNewGuest =async(req, res) => {
    let {hotelId} = req.params;
    let guests = req.body.guest;
    let newGuest =  new Guest(guests);
    

    const guestDatesArray = guests.dates.split(',').map(date => date.trim());
    newGuest.dates = guestDatesArray;
    let guestDetail = await newGuest.save();
    
    const hotel = await Hotel.findById(hotelId);
    hotel.guestList.push(guestDetail._id);
    await hotel.save();
    req.flash("success","New Guest added successfully");
    res.redirect("/guest/thankyou");
  }

  module.exports.updateGuest = async (req, res) => {
    let {id} =req.params;
    let editedGuest = req.body.guest;
   
    let updatedGuest = await Guest.findByIdAndUpdate(id,editedGuest,{new:true});
    console.log(updatedGuest);
    req.flash("success","Guest updated successfully ");
    res.redirect("/guest/update"); 
  }

  module.exports.renderThankyouPage = (req, res) => {
    res.render("guest/thankyou.ejs");
  }

  module.exports.renderGuestUpdatePage = async(req, res) => {
    let hotels = await Hotel.find({}).populate("guestList");
    if(!hotels) {
      throw new ExpressError("502","hotel data not found in database")
     }
     res.render("guest/updateForm.ejs" ,{hotels});

  }

  module.exports.renderGuestUpdateForm = async (req, res) => {
    let {id} = req.params;
    let guest = await Guest.findById(id);
    if(!guest) {
      req.flash("error","Guest does not exists");
      res.redirect("/guest/update");
    }
    
    res.render("guest/edit.ejs",{guest});
  }