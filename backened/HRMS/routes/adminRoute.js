const express=require("express")
const router=express.Router();
const adminModel=require("../models/adminModel");
const upload = require("../config/multer-configration");



if(process.env.NODE_ENV==="development"){
    router.post("/create",async(req,res)=>{
        try{
            let {fullname,email,password,address,phone}=req.body;
        let admin=await adminModel.findOne({
            role:"admin",
        });
        if(admin){
            return res.status(500).send("you are not allowed to create admin");
        }
        let createAdmin=await adminModel.create({
           
            fullname,
            email,
            password,
            address,
            phone,
        })
        res.send(createAdmin)
        }
        catch(err){
            console.log(err.message)
        }
    
    })
}
router.get("/",(req,res)=>{
    res.send("hey its admin")
})

module.exports=router;