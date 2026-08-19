const express=require("express");
const path=require("path")
const cookieParser=require("cookie-parser")
const userModel=require("./models/userModel")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken");
const postModel = require("./models/postModel");
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
app.get("/profile",isLoggedIn,async(req,res)=>{
  let user =await userModel.findOne({email:req.user.email}).populate("posts")
  res.render("profile",{user})
})
app.get("/like/:postid",isLoggedIn,async(req,res)=>{
  let post =await postModel.findOne({_id:req.params.postid}).populate("user")
  if(post.likes.indexOf(req.user.userId)===-1){
  post.likes.push(req.user.userId);
  }
  else{
    post.likes.splice(post.likes.indexOf(post.likes.userId),1)
  }
  await post.save();
  res.redirect("/profile")
})
app.get("/edit/:id",async(req,res)=>{
  let post =await postModel.findOne({_id:req.params.id}).populate("user")
  res.render("edit",{post})
})
app.post("/update/:id",async(req,res)=>{
  let post =await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
  res.redirect("/profile")
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
        res.redirect("/profile")
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
        res.status(200).redirect("/profile")
        
      }else res.redirect("/login")
    })
})
app.listen(port)

app.post("/post",isLoggedIn,async(req,res)=>{
  let user =await userModel.findOne({email:req.user.email});
  let {content}=req.body;
  let post=await postModel.create({
    user:user._id,
   content,
  })
  user.posts.push(post._id)
  await user.save()
  res.redirect("/profile")

})
function isLoggedIn(req,res,next){
     if(req.cookies.token===""){
       res.redirect("/login")
     }else{
      let data=jwt.verify(req.cookies.token,"secretKey")
      req.user=data
     next();

     }
}