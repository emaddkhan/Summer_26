const express=require("express");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const router=express.Router();

router.get("/",(req,res)=>{
    res.render("index")
})
router.get("/shop",isLoggedIn,(req,res)=>{
  res.render("shop")
})
module.exports=router