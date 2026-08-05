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
app.get("/files/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        res.render("details",{title:req.params.filename,filedata:data});
    })
});
app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,(err)=>{
        res.redirect('/');
    })
})
app.post("/edit",(req,res)=>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new.split(" ").join("")}.txt`,(err)=>{
        res.redirect('/');
    }  ) 
})
app.get("/edit/:filename",(req,res)=>{
    res.render("edit",{previousName:req.params.filename});
})

app.listen(port);