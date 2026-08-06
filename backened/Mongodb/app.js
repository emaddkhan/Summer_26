const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./usermodel");
const port =3000;


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.get("/create",async(req,res)=>{
    let createdUser= await userModel.create({
        name:"Emad",
        username:"Emad1564223",
        email:"emad@example.com"
    });
    res.send(createdUser);
    
});
app.get("/update", async (req,res)=>{
    // userModel.findOneAndUpdate(findone,update,{new:true})   way of updating
    let updatedUser = await userModel.findOneAndUpdate({username:"Emad123"},{name:"Emad khan"},{new:true});
    res.send(updatedUser);
});

app.get("/read",async (req,res)=>{
    let users=await userModel.find();///for all users
    //   let users=await userModel.find({username:"Emad123"});///for specific user
    res.send(users);
});
app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ username: "Emad123" }); ///to delete a user we use findOneAndDelete method and pass the username of the user we want to delete
  res.send(deletedUser);
});

app.listen(port);