const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();
const userModal = require("../models/userModel");
const leaveModal = require("../models/leaveModel");

router.get("/", isLoggedIn, async (req, res) => {
  let users = await userModal.find({ role: { $in: ["employee", "hr"] } });
  let leaves = await leaveModal.find().populate("user");

  res.render("hrDashboard", { users, leaves });
});

router.get("/employees", async (req, res) => {
  let allStaff = await userModal.find({ role: { $in: ["employee", "hr"] } });
  let allEmp = await userModal.find({ role: "employee" });
  let allHr = await userModal.find({ role: "hr" });
  res.render("hrEmployees", { allStaff, allEmp, allHr });
});
router.get("/leaves", async (req, res) => {
  let leaves = await leaveModal.find().populate("user");
  let successMessage = req.flash("success");
  let errorMessage = req.flash("error");
  res.render("hrLeaves", { leaves, successMessage,errorMessage });
});
router.get("/user/:id", async (req, res) => {
  let user = await userModal
    .findById(req.params.id)
    .populate("leaves.pendingLeaves")
    .populate("leaves.approvedLeaves")
    .populate("leaves.rejectedLeaves")
    .populate("leaves.totalLeaves");
  res.render("hrUserDetails", { user });
});
router.get("/leave/approve/:id", async (req, res) => {
  try {
    let leave = await leaveModal.findById(req.params.id);
    console.log(leave);
    if(!leave){
        req.flash("error","leave not found")
        return res.redirect("/hr/leaves")
    }
    if (leave.status === "approved") {
      req.flash("success", "leaves is already approved");
      return res.redirect("/hr/leaves");
    }if (leave.status === "rejected") {
      req.flash("error", "leaves is already proccessed");
      return res.redirect("/hr/leaves");
    }
    leave.status = "approved";
    await leave.save();
    res.redirect("/hr/leaves");
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/leave/reject/:id", async (req, res) => {
  try {
    let leave = await leaveModal.findById(req.params.id);
    console.log(leave);
    if(!leave){
        req.flash("error","leave not found")
        return res.redirect("/hr/leaves")
    }
    if (leave.status === "rejected") {
      req.flash("success", "leaves is already rejected");
      return res.redirect("/hr/leaves");
    }
    if (leave.status === "approved") {
      req.flash("error", "leaves is already proccessed");
      return res.redirect("/hr/leaves");
    }
    leave.status = "rejected";
    await leave.save();
    res.redirect("/hr/leaves");
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/profile",isLoggedIn,async(req,res)=>{
  let profile=await userModal.findById(req.user.id)
  console.log(profile)
    res.render("hrProfile",{profile})
})

module.exports = router;
