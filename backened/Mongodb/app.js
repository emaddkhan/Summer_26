const express = require("express");
const app = express();
const path = require("path");
const { userModel } = require("./usermodel.js");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

//creating
app.get("/create", async(req, res) => {
  const createdUser =await userModel.create({
    name: "emad khan",
    email: "e@gmail.com",
    username: "emad123",
  });
  res.send(createdUser);
});

//updating

app.get("/update",async (req,res)=>{
    const updatedUser = await userModel.findOneAndUpdate({username:"emad123"},{name:"emad updated"},{new:true});
    res.send(updatedUser);
})

//reading
app.get("/read",async(req,res)=>{
    // const readUser =await userModel.findOne({username:"emad123"});
    const readUser =await userModel.find();
    res.send(readUser);
})

//deleting

app.get("/delete",async(req,res)=>{
    const deletedUser =await userModel.findOneAndDelete({username:"emad123"});
    res.send(deletedUser);
})

app.listen(port);
