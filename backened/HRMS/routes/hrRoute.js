const express=require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router=express.Router();
const userModal=require("../models/userModel")
const leaveModal=require("../models/leaveModel")


router.get("/",isLoggedIn,async(req,res)=>{
    let users=await userModal.find({role:{$in:["employee","hr"]}});
    console.log(users)
    let leaves=await leaveModal.find().populate("user");

    res.render("hrDashboard",{users,leaves})
})


module.exports=router;