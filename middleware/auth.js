const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    try{
        if(!req.cookies.sessionId){
            res.status(403);
            res.json({message:"no sessionId",success:false})
            return;
        }
        let data=jwt.verify(req.cookies.sessionId,process.env.SECRET_KEY)
        req["email"]=data.email;
        req["user"]=data.userId;
        next();
    }
    catch(err){
        res.status(401);
        res.json({message:"Invalid sessionId",success:false})
    }
}

module.exports=auth