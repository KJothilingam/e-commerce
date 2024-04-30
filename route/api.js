const express=require("express");

const auth=require("../middleware/auth")
const home=require("./home");
const user=require("./user");



const router=express.Router();


router.use("/",home);
router.use("/user",auth,user);



module.exports=router