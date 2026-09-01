const express=require("express");
const userModel = require("../models/userModel");
const { registerUser, loginUser } = require("../controllers/authController");
const router=express.Router();


router.post("/login",loginUser)
router.post("/register",registerUser)

router.get("/",(req,res)=>{
    res.render("index")
})

module.exports=router;