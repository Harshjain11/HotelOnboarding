const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const guestSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
         required:true,
         enum:["Business","Personal","Tourist"]
    },
    dates:{
        type:[String],
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    idProof:{
        type:String,
        required:true,
        enum:["Aadhar Card","Pan Card","Passport"]
    }
});

const Guest = mongoose.model("Guest",guestSchema) ;
module.exports= Guest