const mongoose=require("mongoose")

const url=process.env.MONGO_URL || "mongodb://localhost:27017";

mongoose.connect(url)
.then(()=>{
    console.log("conneced to db");
})
.catch((err)=>{
    console.log(`db connection error: ${err}`);
})