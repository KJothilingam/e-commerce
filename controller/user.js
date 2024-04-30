const userModel=require("../database/model/user")


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


module.exports={getUser}