const express=require("express");
const { getUser, paymentHistory } = require("../controller/user");


const router=express.Router();


router.get("/",getUser);
router.get("/history",paymentHistory)


module.exports=router