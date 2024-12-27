const mongoose = require("mongoose");
const initData= require("./data.js");
const Hotel = require("../models/hotel.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/GuestManagement');
}
main().then(() => { 
  console.log("connected to mongo DB")
      })
      .catch(err => console.log(err));



const initDB = async() => {
    await Hotel.deleteMany({});
    await Hotel.insertMany(initData.data);
    console.log("Data was initialised");
}

initDB();
