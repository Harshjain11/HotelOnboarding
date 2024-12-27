const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");
const ejsMate = require("ejs-mate");
const port = 8080;
const hotelRoutes = require("./routes/hotel.js");
const guestRoutes = require("./routes/guest.js");
const userRouter = require("./routes/user.js");
const methodOverride = require("method-override");
const ExpressError= require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js")
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(cookieParser("somestringtosignthecookie"));



const dbUrl = process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(dbUrl);
}

main().then(() => { 
  console.log("connected to mongo DB")
      })
      .catch(err => console.log(err));
    
const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*60*60,
});

store.on("error",() => {
  console.log("erroro in mongo session store",err);
});

const sessionOptions = {
  store,
  secret:process.env.SECRET,  // to sign our session id cookie we need some  random string
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() +1000*60*60*24*3,
    maxAge:1000*60*60*24*3,
    httpOnly:true
  },
}


app.use(session(sessionOptions));
app.use(flash());  // you require session to implement flash therefore write after sessions
app.use(passport.initialize()); // you require sessions to implement passport  therefore write after sessions
    
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})
app.get("/", (req, res) => {
res.send("welcome to home page");
});

app.use("/hotels",hotelRoutes);
app.use("/guest",guestRoutes);
app.use("/",userRouter);


app.all("*",(req, res, next) => {
  next(new ExpressError(404,"page not found"));
});

app.use((err, req, res, next) => {

  const {status = 500 , message="something went wrong"} = err;
  res.status(status).render("error.ejs",{message});
});

app.listen(port,(req,res) => {
    console.log(`listening on port ${port}`);
});