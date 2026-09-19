const express =require("express")
const {connectToMongoDB}=require("./connect")
const app=express();
const urlRoute=require("./routes/url")
const port=3000

connectToMongoDB("mongodb://localhost:127.0.0.1:27017/short-URL").then(()=>console.log("connected"));

app.use("/url",urlRoute)

app.listen(port)