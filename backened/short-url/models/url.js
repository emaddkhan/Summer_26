const mongoose=require("mongoose")

const urlSchema= mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:[{timeStamp:{type:Number}}]
},{timeStamps:true})

module.exports=mongoose.model("url",urlSchema)