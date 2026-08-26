const express=require("express")
const router=express.Router();
const ownerModel=require("../models/ownersModel")


if(process.env.NODE_ENV==="development"){
    router.post("/create",async(req,res)=>{
      let owner =await ownerModel.find();
      if(owner.length>0) {
          return res
         .status(500)
         .send("you are not allowed to create an owner")
       }
       let {fullname,email,password}=req.body;
       let createdOwner=await ownerModel.create({
        fullname,
        email,
        password
       })
       res.status(201 ).send(createdOwner)
    })
}
router.get("/",(req,res)=>{
    res.send("heyyy")
})


module.exports=router;