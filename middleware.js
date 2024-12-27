
const hotelSchema = require("./Schema.js");
const guestSchema = require("./Schema.js");
const ExpressError= require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
   
    if (!req.isAuthenticated()){
    
        req.flash("error","you must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports.isGuestAdmin = (req, res,next) => {
    if(req.user.username != "guestAdmin"){
        req.flash("error","you do not have permission to access");
        return res.redirect("/hotels");
    }
    next();
}

module.exports.isAdmin = (req, res, next) => {
    if(req.user.username != "Admin") {
        req.flash("error","you are not the Admin");
        return res.redirect("/hotels");
    } 
    next();
}


module.exports.validateGuest = (req, res, next) => {
    let {error} = guestSchema.validate(req.body);
      console.log("in validate Guest");
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
          throw new ExpressError(400,errMsg);
    } else {
        next();
    }
  }
  

  module.exports.validateHotel = (req, res, next) => {
    let {error} = hotelSchema.validate(req.body);
    console.log("in validate hotel");
      
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else {
        next();
    }
  }
