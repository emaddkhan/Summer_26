const express=require("express");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const productModel = require("../models/productModel");
const router=express.Router();

router.get("/",(req,res)=>{
  let error=req.flash("error")
  let success=req.flash("success")
    res.render("index",{error,success,loggedin:false})
})
router.get("/shop",isLoggedIn,async(req,res)=>{
  let products=await productModel.find();
  let success=req.flash("success")
  res.render("shop",{success,products})
})
router.get("/cart/:id",isLoggedIn,async(req,res)=>{
  const product=await productModel.findById(req.params.id)
  const user=await userModel.findOne({email:req.user.email})
  user.cart.push(product._id)
  await user.save();
  console.log(user)
})


module.exports=router