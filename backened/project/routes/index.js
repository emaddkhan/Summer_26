const express=require("express");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const router=express.Router();

router.get("/",(req,res)=>{
  let error=req.flash("error")
  let success=req.flash("success")
    res.render("index",{error,success})
})
router.get("/shop",isLoggedIn,(req,res)=>{
  let success=req.flash("success")
  res.render("shop",{success})
})
module.exports=router