const express=require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router=express.Router();


router.get("/",isLoggedIn,(req,res)=>{
    res.render("hrDashboard")
})


module.exports=router;