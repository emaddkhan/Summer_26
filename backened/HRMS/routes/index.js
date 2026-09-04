const express=require("express");
const userModel = require("../models/userModel");
const { registerUser, loginUser } = require("../controllers/authController");
const upload = require("../config/multer-configration");
const router=express.Router();


router.post("/login",loginUser)
router.post("/register",upload.single("profileImage"),registerUser)
router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/")
})

router.get("/",(req,res)=>{
    res.render("index")
})
router.get("/register",(req,res)=>{
    res.render("register")
})

module.exports=router;