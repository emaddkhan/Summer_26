const express=require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router=express.Router();
const userModel=require("../models/userModel");
const leaveModel = require("../models/leaveModel");
const adminModel = require("../models/adminModel");

router.get("/",isLoggedIn,async(req,res)=>{
    let users = req.user;
    let employee=await userModel.findById(users.id).populate("leaves.totalLeaves").populate("leaves.approvedLeaves").populate("leaves.rejectedLeaves").populate("leaves.pendingLeaves");
    res.render("empDashboard", { user:employee, leaves:employee.leaves.totalLeaves, approvedLeaves:employee.leaves.approvedLeaves, rejectedLeaves:employee.leaves.rejectedLeaves, pendingLeaves:employee.leaves.pendingLeaves });
});
router.post("/leave/create",isLoggedIn,async(req,res)=>{
    let admin=await adminModel.findOne({role:"admin"});
    let users = req.user;
    let employee=await userModel.findById(users.id);
    let leave=await leaveModel.create({
        leaveType:req.body.leaveType,
        startDate:new Date(req.body.startDate),
        endDate:new Date(req.body.endDate),
        reason:req.body.reason,
        user:employee.id,
    })
    employee.leaves.totalLeaves.push(leave._id);
    employee.leaves.pendingLeaves.push(leave._id);
    admin.leaves.push(leave._id);
    await employee.save();
    await admin.save();
    res.redirect("/employee");
});

module.exports=router;