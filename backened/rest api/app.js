const express=require("express");
const users=require("./MOCK_DATA.json")
const fs=require("fs")
const app= express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// for html data
// app.get("/users",(req,res)=>{
//     const html=`
//     <ul>
//     ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
//     </ul>
//     `
//     res.send(html);
// })
//for json data
app.get("/api/users",(req,res)=>{
    res.setHeader("X-MyName","emad")//custom headers
    //allways add X to your custom headers
    console.log(req.headers)
    res.json(users);
})
app.post("/api/users",(req,res)=>{
    const body=req.body
    users.push({...body,id:users.length+1})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"pending"});
    })
})


app.listen(3000)