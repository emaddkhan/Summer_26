require("dotenv").config();
const express =require("express")
const db=require("./config/mongoose-connection")
const cookieParser=require("cookie-parser")
const path=require("path")
const employeeRoute=require("./routes/employeeRoute")
const hrRoute=require("./routes/hrRoute")
const adminRoute=require("./routes/adminRoute")
const index=require("./routes/index")
const flash=require("connect-flash");
const expressSession=require("express-session")
const app=express();
const port=3000

app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());


app.use("/",index)
app.use("/employee",employeeRoute)
app.use("/hr",hrRoute)
app.use("/admin",adminRoute)

app.listen(port)