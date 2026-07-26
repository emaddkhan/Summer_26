// // var d=require('./script2.js');

// // var a=2;
// // var b=6;
// // var c=8;

// var a=2;
// var b=6;
// // console.log(a+b);

// module.exports={first:a,second:b};

//express

const express=require('express');
const app=express();

app.use((req,res,next)=>{
    console.log("this is middleware");
    next();
})
app.get("/",(req,res)=>{
    res.send("this is home page");
})
app.get("/profile",(req,res)=>{
    res.send("this is profile page");
})
app.listen(3000);