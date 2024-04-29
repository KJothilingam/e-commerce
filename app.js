require("dotenv").config()
const express=require("express")


//! connecting to database
require("./database/connect")


const port=process.env.PORT || 8080;
const app=express();
const api=require("./route/api");


app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/api",api);


//! for health check
app.get("/health_check",(req,res)=>{
    res.json({message:"woking fine",success:true});
})


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})