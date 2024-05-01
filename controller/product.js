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
        let category=await categoryModel.findOne({category:req.body.category});
        if(!category){
            res.status(400);
            res.json({message:"invalid category ( add new category )",success:false});
            return;
        }
        let product=new productModel({
            name:req.body.name,
            discription:req.body.discription,
            stock:req.body.stock,
            price:req.body.price,
            category:category._id
        })
        await product.save();
        res.status(200);
        res.json({message:"product added",success:true})
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
    try{
        let filter={};
        if(req.query.category){
            let category=await categoryModel.findOne({category:req.query.category});
            if(!category){
                res.status(400);
                res.Json({message:"invalid category",success:false});
                return;
            }
            filter["category"]=category._id;
        }
        let price={};
        let flag=false;
        if(req.query.minPrice){
            price["$gte"]=req.query.minPrice;
            flag=true;
        }
        if(req.query.maxPrice){
            price["$lte"]=req.query.maxPrice;
            flag=true;
        }
        if(flag){
            filter["price"]={...price}
        }
        let data=await productModel.find(filter,{__v:false}).populate([
            {path:"category",select:["-__v"]}
        ]);
        res.status(200);
        res.send({message:"list of product details",data,success:true});
    }
    catch(err){
        res.status(500);
        res.json({message:"server error",success:false})
    }
}

const addStock=async(req,res)=>{
    try{
        let update=await productModel.updateOne({_id:req.body.id},{$inc:{stock:req.body.qty}});
        if(update.matchedCount==0){
            res.status(400);
            res.json({message:"invalid product Id",success:false});
            return;
        }
        res.status(200);
        res.json({message:"incremented the stock count",success:true});
    }
    catch(err){
        if(err instanceof mongoose.Error.CastError){
            res.status(400);
            res.json({message:"invalid product Id",success:false});
            return;
        }
        res.status(500);
        res.json({message:"server error",success:false});
    }
}


module.exports={getCategory,addCategory,getProduct,addProduct,addStock}