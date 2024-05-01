const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const { isEmail } = require("validator");

const loginSchema=mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim:true,
        unique: true,
        validate:[isEmail,"Invalid Email"]      
    },
    password:{
        type:String,
        required:true,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"user"
    },
    admin:{
        type:Boolean,
        required: true,
        default: false
    }
})

loginSchema.pre("save",async function(next){
    try{
        this.password=await bcrypt.hash(this.password,10);
        next();
    }
    catch(err){
        throw new mongoose.Error("password hashing error");
    }
})

const login=mongoose.model("login",loginSchema,"login");

module.exports=login;