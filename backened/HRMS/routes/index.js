const express=require("express");
const userModel = require("../models/userModel");
const { registerUser, loginUser } = require("../controllers/authController");
const upload = require("../config/multer-configration");
const router=express.Router();

router.post("/login",loginUser)
router.post("/register",upload.single("profileImage"),registerUser)
router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    req.flash("success","User logged out successfully");
    res.redirect("/")
})

router.get("/",(req,res)=>{
    let successMessage=req.flash("success")
    let errorMessage=req.flash("error")
    res.render("index",{successMessage,errorMessage})
})

router.get("/register",(req,res)=>{
    let successMessage=req.flash("success")
    let errorMessage=req.flash("error")
    res.render("register",{successMessage,errorMessage})
})


module.exports=router;