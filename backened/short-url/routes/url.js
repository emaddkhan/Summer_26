const express=require("express");
const router=express.Router();
 const {handleGenrateShortUrl}=require("../controllers/url")

 router.post("/",handleGenrateShortUrl)
 module.exports=router