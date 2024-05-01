const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"user"
    },
    product:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"product"
    },
    qty:{
        type:Number,
        default:1,
        required:true,
        min:1
    },
    checkout:{
        type:Boolean,
        required:true,
        default:false
    }
})

const cartModel=mongoose.model("cart",cartSchema,"cart");

module.exports=cartModel;