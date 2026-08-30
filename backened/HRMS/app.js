const express =require("express")
const db=require("./config/mongoose-connection")
const cookieParser=require("cookie-parser")
const path=require("path")
const employeeRoute=require("./routes/employeeRoute")
const hrRoute=require("./routes/hrRoute")
const adminRoute=require("./routes/adminRoute")
const index=require("./routes/index")

const app=express();
const port=3000

app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.use("/",index)
app.use("/employee",employeeRoute)
app.use("/hr",hrRoute)
app.use("/admin",adminRoute)

app.listen(port)