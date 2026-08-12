const cookieParser=require("cookie-parser")
const express =require('express')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const path =require("path")
const userModel=require("./models/user")

const app = express();

const port =3000;

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/create",(req,res)=>{
    let {username,email,password,age}=req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let createdUser =await userModel.create({
                username,
                email,
                password:hash,
                age
            })
            let token=jwt.sign({email},"kdnsjdaw");
            res.cookie("token",token);

            res.send(createdUser)
        })
    })
    
})

app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/login",async(req,res)=>{
    let user=await userModel.findOne({email:req.body.email})
    if(!user)return res.send("something went wrong")
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
       if(result) return res.send("you are loggged in"); 
       else return res.send("you cant logged in")
    })
})
app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/")
})

app.listen(port)