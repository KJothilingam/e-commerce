const mongoose=require("mongoose");

const categorySchema=mongoose.Schema({
    category:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    }
})

const categoryModel=mongoose.model("category",categorySchema,"category");

module.exports=categoryModel;