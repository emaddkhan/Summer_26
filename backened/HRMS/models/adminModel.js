const mongoose=require("mongoose")

const adminSchema=mongoose.Schema({
    profilePic:{
            type:Buffer,
            require:true,
            default:"default.jpg",
        },
        picType:{
            type:String,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        phone:{
            type:Number,
            required:true,
        },
        role:{
            type:String,
            default:"admin"
        },
        leaves:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Leave"
        }]
},{timestamps:true} )
module.exports=mongoose.model("admin",adminSchema)