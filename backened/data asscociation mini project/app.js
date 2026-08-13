const express=require("express");
const path=require("path")
const cookieParser=require("cookie-parser")
const userModel=require("./models/userModel")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
const app=express();

const port=3000;

app.use(cookieParser())
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index");
})
app.post("/register",async(req,res)=>{
    let {username,name,age,email,password}=req.body;
    let user =await userModel.findOne({email})
    if(user) return res.status(500).send("user already existed")   
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(password,salt,async(err,hash)=>{
        let createUser=await userModel.create({
            username,
            name,
            age,
            email,
            password:hash,
        })
        res.send(createUser)
      })
    })
})
app.listen(port)