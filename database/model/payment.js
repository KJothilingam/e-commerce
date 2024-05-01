const mongoose=require("mongoose");

const paymentSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"user"
    },
    date:{
        type:Date,
        default:new Date(),
        required:true
    },
    cart:[
        {type:mongoose.Schema.ObjectId,required:true,ref:"cart"}
    ]
})

const paymentModel=mongoose.model("payment",paymentSchema,"payment");

module.exports=paymentModel;