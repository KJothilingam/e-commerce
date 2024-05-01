const mongoose= require("mongoose");
const { MongoServerError }=require("mongodb");
const cartModel=require("../database/model/cart");
const productModel=require("../database/model/product");
const paymentModel=require("../database/model/payment");


const addToCart=async(req,res)=>{
    try{
        let product=await productModel.findOne({_id:req.body.id});
        if(!product){
            res.status(400);
            res.json({message:"Invalid prodectID",success:false});
            return;
        }
        let data=await cartModel.findOne({user:req.user,product:req.body.id,checkout:false});
        if(data){
            if(data.qty<=-req.body.qty){
                await cartModel.deleteOne({_id:data._id});
            }
            else{
                await cartModel.updateOne({_id:data._id},{$inc:{qty:req.body.qty}});
            }
        }
        else{
            let cart=new cartModel({
                user:req.user,
                product:req.body.id,
                qty:req.body.qty
            });
            await cart.save();
        }
        res.status(200);
        res.json({message:"added to cart",success:true})
    }
    catch(err){
        if(err instanceof mongoose.Error.CastError){
            res.status(400);
            res.json({message:"Invalid prodectID",success:false});
            return;
        }
        if(err instanceof mongoose.Error.ValidationError || err instanceof MongoServerError){
            res.status(400);
            res.json({message:err.message,success:false});
            return;
        }
        res.status(500);
        res.json({message:"server error",success:false});
    }
}

const getCart=async(req,res)=>{
    try{
        let data=await cartModel.find({user:req.user,checkout:false},{__v:false,_id:false,user:false,checkout:false}).populate([
            {path:"product",select:["-_id","-__v"]}
        ])
        res.status(200);
        res.json({message:"list of products in your cart",data,success:true});
    }
    catch(err){
        res.status(500);
        res.json({message:"server error",success:false});
    }
}

const checkOut=async(req,res)=>{
    try{
        let bill={total:0};
        let data=await cartModel.find({user:req.user,checkout:false},{__v:false,user:false}).populate([
            {path:"product",select:["-__v"]}
        ]);
        bill["products"]=data.map((ele)=>{
            bill.total+=ele.product.price*ele.qty;
            return {productName:ele.product.name,quantity:ele.qty}
        })
        let stock=[];
        cartIds=data.map((ele)=>{
            if(ele.qty > ele.product.stock){
                stock.push({name:ele.product.name,qty:ele.qty,stock:ele.product.stock});
            }
            return ele._id
        })
        if(stock.length!=0){
            res.status(200);
            res.json({message:"product is out of stock",data:stock,success:false});
            return;
        }
        data.forEach(async(ele) => {
            await productModel.updateOne({_id:ele.product._id},{$inc:{stock:-ele.qty}})
        });
        await cartModel.updateMany({_id:{$in:cartIds}},{$set:{checkout:true}});
        let payment=new paymentModel({
            user:req.user,
            cart:cartIds
        })
        await payment.save();
        res.status(200);
        res.json({message:"checkout done",data:bill,success:true});
    }
    catch(err){
        res.status(500);
        res.json({message:"server error",success:false});
    }
}


module.exports={addToCart,getCart,checkOut};