const mongoose=require("mongoose");
const { isNumeric } = require("validator");


const userSchema=mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        min:10,
        max:100
    },
    location:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    pincode:{
        type:String,
        trim:true,
        required:true,
        validator:[isNumeric,"pincode shoud contain only numbers"],
        minlength: 6,
        maxlength: 6
    }
})

const userModel=mongoose.model("user",userSchema,"user");

module.exports=userModel;
