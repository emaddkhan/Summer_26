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
app.get("/login",(req,res)=>{
  res.render("login")
})
app.get("/profile",isLoggedIn,(req,res)=>{
  console.log(req.user)
  res.render("login")
})
app.get("/logout",(req,res)=>{
  res.cookie("token","");
  res.redirect("/login");
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
        let token=jwt.sign({email:email,userId:createUser._id},"secretKey");
        res.cookie("token",token)
        res.send("registered")
      })
    })
})

app.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    let user =await userModel.findOne({email})
    if(!user) return res.status(500).send("Something went wrong")   
    bcrypt.compare(password,user.password,(err,result)=>{
       if(result){
        let token=jwt.sign({email:email,userId:user._id},"secretKey");
        res.cookie("token",token)
        res.status(200).send("you can login")
        
      }else res.redirect("/login")
    })
})
app.listen(port)


function isLoggedIn(req,res,next){
     if(req.cookies.token===""){
       res.send("you must be looged in")
     }else{
      let data=jwt.verify(req.cookies.token,"secretKey")
      req.user=data
     next();

     }
}