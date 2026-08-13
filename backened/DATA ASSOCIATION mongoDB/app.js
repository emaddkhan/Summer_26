const express = require("express")
const path=require("path")
const userModel=require("./models/userModel")
const postModel=require("./models/postModel")

const app=express();
const port=3000;

app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.send("hlooo")
})
app.get("/create",async(req,res)=>{
    let createdUser=await userModel.create({
        username:"emad123",
        email:"e@gmail.com",
        age:19,
    })
    res.send(createdUser)
})
app.get("/post/create",async(req,res)=>{
    let createdPost=await postModel.create({
        postData:"hlooo everyone",
        user:"6a7db57625b737a509841dcc",
        age:19,
    })
    let user =await userModel.findOne({_id:"6a7db57625b737a509841dcc"})
    user.posts.push(createdPost._id)
    await user.save()
    res.send({createdPost,user})
})






app.listen(3000)
