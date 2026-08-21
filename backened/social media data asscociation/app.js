const express = require("express");
const path =require("path")
const cookieParser=require("cookie-parser")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userModel =require("./models/userModel")
const postModel=require("./models/postModel");

const app=express();
const port=3000;

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

//login route
app.get("/",(req,res)=>{
    res.render("index")
})
//register route
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/logout",(req,res)=>{
    res.cookie("token","")
    res.redirect("/")
})
app.get("/profile",isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate("posts")
    res.render("profile",{user})
})

//post like
app.get("/like/:id",isLoggedIn,async(req,res)=>{
    let post =await postModel.findById(req.params.id).populate("user")
    if(post.likes.indexOf(req.user.userId)===-1){
        post.likes.push(req.user.userId )
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userId),1)
    }
    await post.save();
    res.redirect("/profile")
})

app.get("/feed/like/:id",isLoggedIn,async(req,res)=>{
    let post =await postModel.findById(req.params.id).populate("user")
    if(post.likes.indexOf(req.user.userId)===-1){
        post.likes.push(req.user.userId )
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userId),1)
    }
    await post.save();
    res.redirect("/feed")
})

// post editing
app.get("/edit/:id",isLoggedIn,async(req,res)=>{
    let post=await postModel.findById(req.params.id);
    res.render("edit",{post})
})

app.post("/post/:id",isLoggedIn,async(req,res)=>{
    let post =await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    res.redirect("/profile")
})


//feed
app.get("/feed", isLoggedIn, async (req, res) => {
    const posts = await postModel
        .find()
        .populate("user");

    const user = await userModel.findById(req.user.userId);
    

    res.render("feed", { posts, user });
});

//feed other user profile visiting
app.get("/profile/:id",isLoggedIn,async(req,res)=>{
    let user = await userModel.findById(req.params.id).populate("posts")
    let currentUser=await userModel.findById(req.user.userId)
    console.log(user)
    res.render("postProfile",{user,currentUser})
})

//following profile

app.get("/follow/:id",isLoggedIn,async(req,res)=>{
    let user=await userModel.findById(req.params.id)
    let currentUser=await userModel.findById(req.user.userId)
    console.log(currentUser)
    if(user.followers.indexOf(req.user.userId)){
        user.followers.push(req.user.userId)
        currentUser.following.push(user._id)
    }else{
        user.followers.splice(user.followers.indexOf(req.user.userId),1)
        currentUser.following.splice(currentUser.following.indexOf(user._id),1)
    }
    await user.save();
    await currentUser.save()
    res.redirect(req.get("Referer") || "/feed");
})


//registring user
app.post("/register",async(req,res)=>{
    let {username,name,age,email,password}=req.body;
    console.log(req.body)
    const user=await userModel.findOne({email});
    if(user) return res.status(500).send("user is already registered");
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            let userCreated=await userModel.create({
                username,
                name,
                age,
                email,
                password:hash,
            })
            let token=jwt.sign({email:userCreated.email,userId:userCreated._id},"secretKey");
            res.cookie("token",token)
            res.redirect("/")

        })
    })
})

// signing user
app.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(!user) return res.status(404).send("something went wrong");
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email:user.email,userId:user._id},"secretKey");
            res.cookie("token",token)
            res.redirect("/profile")
        }else{
            res.redirect("/login")
        }
    })
})

//creating post

app.post("/post",isLoggedIn,async(req,res)=>{
    
    let post=await postModel.create({
        user:req.user.userId,
        content:req.body.content,
    })
    let user =await userModel.findById(req.user.userId);
    user.posts.push(post._id)
    await user.save();
    res.redirect("/profile")
   
})


//middleware
function isLoggedIn(req,res,next){
    if(!req.cookies.token){
       return res.redirect("/");
    }else{
        let data=jwt.verify(req.cookies.token,"secretKey")
        req.user=data;
        next();
    }

}



app.listen(port);