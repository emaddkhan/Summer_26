const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();
const userModal = require("../models/userModel");
const leaveModal = require("../models/leaveModel");
const bcrypt=require("bcrypt");
const upload = require("../config/multer-configration");

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
  let successMessage = req.flash("success");
  let errorMessage = req.flash("error");
  console.log(profile)
    res.render("hrProfile",{profile,successMessage,errorMessage})
})
router.post("/profile/change-password",isLoggedIn,async(req,res)=>{
  try {
      let { currentPassword, newPassword, confirmPassword } = req.body;
      let user = await userModal.findById(req.user.id);
      if (!user) {
        req.flash("error", "user not found");
        return res.redirect("/hr/profile");
      }
      if (newPassword !== confirmPassword) {
        // console.log("erron in password");
        req.flash("passords doenst matched");
        return res.redirect("/hr/profile");
      }
      bcrypt.compare(currentPassword, user.password, async (err, result) => {
        if (err) {
          req.flash("error", "internal server error");
          return res.redirect("/hr/profile");
        }
        if (result) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              req.flash("error", "internal server error");
              return res.redirect("/hr/profile");
            }
            bcrypt.hash(newPassword, salt, async (err, hash) => {
              if (err) {
                // console.log(err.message);
                return res.redirect("/hr/profile");
              }
              user.password = hash;
              await user.save();
              req.flash("success", "password is changed successfully");
              res.redirect("/hr/profile");
            });
          });
        }
        if (!result) {
          req.flash("error", "please enter corresct pasword");
          return res.redirect("/hr/profile");
        }
      });
    } catch (err) {
      req.flash("error", `${err.message}`);
      return res.redirect("/hr/profile");
    }
})
router.post(
  "/profile/edit",
  upload.single("profileImage"),
  isLoggedIn,
  async (req, res) => {
    try {
      let { fullname, phone, address } = req.body;
      // let {profileImage}=req.file;
      let user = await userModal.findById(req.user.id);
      if (!user) {
        req.flash("error", "user not found");
        return res.redirect("/hr/profile")
      }
      user.fullname = fullname;
      user.phone = phone;
      user.address = address;
      if (req.file) {
        user.profilePic = req.file.buffer;
        user.picType = req.file.mimetype;
      }
      await user.save();
      req.flash("success", "profile updated successfully");
      res.redirect("/hr/profile");
    } catch (err) {
      req.flash("error", `${err.message}`)
      return res.redirect("/hr/profile");
    }
  },
);

module.exports = router;
