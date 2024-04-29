const jwt=require("jsonwebtoken");

const auth=async (req,res,next)=>{
    try{
        if(!req.cookie.sessionId){
            res.status(403);
            res.json({message:"no sessionId",success:false})
        }
        let data=jwt.verify(req.cookie.sessionId,process.env.SECRET_KEY)
        req["email"]=data.email;
        req["user"]=data.user;
        next();
    }
    catch(err){
        res.status(401);
        res.json({message:"Invalid sessionId",success:false})
    }
}

module.exports=auth