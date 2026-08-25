const express=require("express")
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("heyyy")
})

module.exports=router;