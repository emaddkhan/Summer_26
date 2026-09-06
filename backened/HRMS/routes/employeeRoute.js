const express=require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router=express.Router();
const userModel=require("../models/userModel");


router.get("/",isLoggedIn,async(req,res)=>{
    let users = req.user;
    let employee=await userModel.findById(users.id);
    res.render("empDashboard", { user:employee });
});
router.post("/leave/create",isLoggedIn,async(req,res)=>{
    let users = req.user;
    console.log(req.body);
    let employee=await userModel.findById(users.id);
    res.render("createLeave", { user:employee });
});

module.exports=router;