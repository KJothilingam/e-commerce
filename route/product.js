const express=require("express");
const { getCategory, addCategory, getProduct, addProduct, addStock } = require("../controller/product");

const router=express.Router();


router.get("/",getProduct);
router.post("/",addProduct);
router.get("/category",getCategory);
router.post("/category",addCategory);
router.put("/stock",addStock);


module.exports=router