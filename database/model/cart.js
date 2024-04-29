const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    product:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    qty:{
        type:Number,
        default:1,
        required:true
    }
})

const cartModel=mongoose.model("cart",cartSchema,"cart");

module.exports=cartModel;