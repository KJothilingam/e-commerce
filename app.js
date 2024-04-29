require("dotenv").config()
const express=require("express")


//! connecting to database
require("./database/connect")


const port=process.env.PORT || 8080;
const app=express();

app.use(express.urlencoded({extended:true}))



//! for health check
app.get("/health_check",(req,res)=>{
    res.json({message:"woking fine",success:true});
})


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})