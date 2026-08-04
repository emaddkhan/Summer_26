const express=require('express');
const app=express();
const port=3000; 
const path=require('path');
const fs=require('fs');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
    res.render('index',{files:files});
    });
});
app.post("/create",(req,res)=>{
    console.log(req.body);
})

app.listen(port);