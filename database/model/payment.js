const mongoose=require("mongoose");

const paymentSchema=mongoose.Schema({
    date:{
        type:Date,
        default:new Date(),
        required:true
    },
    cart:[
        {type:mongoose.Schema.ObjectId,required:true}
    ]
})

const paymentModel=mongoose.model("payment",paymentSchema,"payment");

module.exports=paymentModel;