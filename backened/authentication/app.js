//cookie kese use krte hain or read krte hain

// const cookieParser =require('cookie-parser')
// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(cookieParser())
// app.get("/",(req,res)=>{
//     res.cookie("name","emad");
//     res.send("hlooo")
// })
// app.get("/read",(req,res)=>{
//     res.send("biiiiioo")
// })


// app.listen(port);


//bcrypt kese use krte hain
const express = require('express');
const app = express();
const bcrypt =require('bcrypt')
const port = 3000;

app.get("/",(req,res)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash("passsword",salt,(err,hash)=>{
            console.log(hash);
        })
    })
    bcrypt.compare("passsword","$2b$10$28dzfCvMwuOmmGiLoo4Vpu/Q3eJ8rl/KawlWPwYr16LjlExvj6TOK",(err,result)=>{
        console.log(result)
    })
    res.send("ndsvjjjsjjjjjj")
})



app.listen(port);