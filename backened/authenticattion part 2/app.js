const cookieParser=require("cookie-parser")
const express =require('express')
const path =require("path")
const userModel=require("./models/user")

const app = express();

const port =3000;

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(port)