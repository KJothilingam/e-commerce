const express=require("express");
const { getUser } = require("../controller/user");


const router=express.Router();

router.get("/",getUser);


module.exports=router