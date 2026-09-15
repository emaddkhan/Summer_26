const express=require("express");
const users=require("./MOCK_DATA.json")
const app= express();

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
    res.json(users);
})


app.listen(3000)