const express=require("express");
const { getCategory, addCategory, getProduct, addProduct } = require("../controller/product");

const router=express.Router();


router.get("/",getProduct);
router.post("/",addProduct);
router.get("/category",getCategory);
router.post("/category",addCategory);


module.exports=router