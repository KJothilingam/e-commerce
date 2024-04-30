const express=require("express");

const auth=require("../middleware/auth")
const home=require("./home");
const user=require("./user");
const product=require("./product");



const router=express.Router();


router.use("/",home);
router.use("/user",auth,user);
router.use("/product",auth,product);



module.exports=router