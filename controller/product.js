const productModel=require("../database/model/product");
const categoryModel=require("../database/model/category");
const mongoose = require("mongoose");
const { MongoServerError } = require('mongodb');

const getCategory=async(req,res)=>{
    try{
        let categorys=await categoryModel.find({},{_id:false,__v:false});
        let data=categorys.map((ele)=>{
            return ele.category;
        })
        res.status(200);
        res.json({message:"list of category",data,success:true})
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.json({message:"server error",success:false})
    }
}

const addCategory=async(req,res)=>{
    try{
        category=new categoryModel({
            category:req.body.category
        })
        await category.save();
        res.status(200);
        res.json({message:"category added",success:true});
    }
    catch(err){
        if(err instanceof mongoose.Error.ValidationError || err instanceof MongoServerError){
            res.status(400);
            res.json({message:err.message,success:false})
        }
        else{
            res.status(500);
            res.json({message:"server error",success:false});
        }
    }
}

const addProduct=async(req,res)=>{
    try{
        
    }
    catch(err){
        if(err instanceof mongoose.Error.ValidationError || err instanceof MongoServerError){
            res.status(400);
            res.json({message:err.message,success:false})
        }
        else{
            res.status(500);
            res.json({message:"server error",success:false});
        }
    }
}

const getProduct=async(req,res)=>{

}


module.exports={getCategory,addCategory,getProduct,addProduct}