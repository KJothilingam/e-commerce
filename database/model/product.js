const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    discription:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    stock:{
        type:Number,
        default:0,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"category"
    }
})

const productModel=mongoose.model("product",productSchema,"product");

module.exports=productModel;