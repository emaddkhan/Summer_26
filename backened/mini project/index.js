// const express =require('express');
// const app = express();
// const path = require("path");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname,'public')));
// app.set("view engine","ejs");
// app.get("/",(req,res)=>{
//     res.render("index");
// })
// app.listen(3000);

const express = require('express');
const app = express();
const path=require("path"); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
});

//dyanmic route
app.get("/profile/:name",(req,res)=>{
    res.send(`Hello, ${req.params.name}!`);
});
app.get("/profile/:name/:age",(req,res)=>{
    res.send(`Hello, ${req.params.name}! You are ${req.params.age} years old.`);
});
app.listen(3000);