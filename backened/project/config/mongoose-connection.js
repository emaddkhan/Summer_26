const { default: mongoose } = require("mongoose");
const config=require("config")
const dbgr=require("debug")("development:mongoose")
// mongodb://127.0.0.1:27017/ecommerce-project
mongoose
.connect(`${config.get("MONGODB_URI")}/ecommerce-project`)
.then(()=>{
    dbgr("connected")
})
.catch((err)=>{
    dbgr(err)
})

module.exports=mongoose.connection