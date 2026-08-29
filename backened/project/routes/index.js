const express=require("express");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const productModel = require("../models/productModel");
const router=express.Router();

router.get("/",(req,res)=>{
  let error=req.flash("error")
  let success=req.flash("success")
    res.render("index",{error,success})
})
router.get("/shop",isLoggedIn,async(req,res)=>{
  let products=await productModel.find();
  let success=req.flash("success")
  res.render("shop",{success,products})
})
module.exports=router