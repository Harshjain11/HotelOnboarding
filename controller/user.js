
const User = require("../models/user.js");
const ExpressError= require("../utils/ExpressError.js");


module.exports.renderSignUpPage = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signUpUser = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email,username});
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err) => {
            if(err) {
                return next(err);
            }
            req.flash("success","Welcome , sign up successful");
            res.redirect("/hotels");
    
        });
    } catch(err) { 
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderLoginPage =(req, res) => {
    res.render("users/login.ejs");
}

module.exports.loginUser = async(req, res) => {
    req.flash("success","welcome back !!");
   
    res.redirect("/hotels");
   }

module.exports.logoutUser =(req,res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success","logged you Out");
        res.redirect("/hotels");
     
    }); 
}