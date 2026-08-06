const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/EmadData")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const userSchema =mongoose.Schema({
    name:String,
    username:String,
    email:String,
})
module.exports=mongoose.model("User",userSchema);