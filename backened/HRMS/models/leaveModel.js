const mongoose =require("mongoose")

const leaveSchema=({
    leaveType:{
        type:String,
        enum:["casual","sick","annual"],
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
        validate:{
            validator:function(value){
                return value>=this.startDate
            },
            message:"end date cannot be before start date",
        }
    },
    reason:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending",
    }
    
},{timestamps:true})
module.exports=mongoose.model("leave",leaveSchema)