const express=require("express");
const { addToCart, getCart, checkOut } = require("../controller/cart");

const router=express();


router.get("/",getCart);
router.post("/add",addToCart);
router.post("/checkout",checkOut)

module.exports=router;