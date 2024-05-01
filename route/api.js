const express=require("express");

const auth=require("../middleware/auth")
const home=require("./home");
const user=require("./user");
const product=require("./product");
const cart=require("./cart");



const router=express.Router();


router.use("/",home);
router.use("/user",auth,user);
router.use("/product",auth,product);
router.use("/cart",auth,cart);



module.exports=router