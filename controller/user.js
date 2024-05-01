const userModel=require("../database/model/user")
const paymentModel=require("../database/model/payment");
const { populate } = require("dotenv");


const getUser=async(req,res)=>{
    try{
        let data=await userModel.findOne({_id:req.user},{_id:false,__v:false});
        data._doc["email"]=req.email
        res.status(200);
        res.json({message:"data from db",data,success:true})
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.json({message:"server erroe",success:false})
    }
}

const paymentHistory=async(req,res)=>{
    try{
        let data=await paymentModel.find({user:req.user},{_id:false,__v:false,user:false}).populate([
            {path:"cart",select:["-_id","-__v","-user"],populate:[
                {path:"product",select:["-_id","-__v","-user","-category"]}
            ]}
        ])
        res.status(200);
        res.json({message:"payment history",data,success:true});
    }
    catch(err){
        res.status(500);
        res.json({message:"server error",success:false});
    }
}

module.exports={getUser,paymentHistory}