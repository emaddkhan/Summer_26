const express = require("express");
const router = express.Router();
const adminModel = require("../models/adminModel");
const upload = require("../config/multer-configration");
const isLoggedIn = require("../middleware/isLoggedIn");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const leaveModel = require("../models/leaveModel");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      let { fullname, email, password, address, phone } = req.body;
      let admin = await adminModel.findOne({
        role: "admin",
      });
      if (admin) {
        return (
          req.flash("error", "Admin already exists"),
          res.redirect("/admin")
        );
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          let createAdmin = await adminModel.create({
            fullname,
            email,
            password: hash,
            address,
            phone,
          });
          res.redirect("admin");
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  });
}
router.get("/", isLoggedIn, async (req, res) => {
  let users = await userModel.find();
  let userLength = users.length;
  let employees = await userModel.find({ role: "employee" });
  let admins = await adminModel.find({ role: "admin" });
  let hrManagers = await userModel.find({ role: "hr" });
  let employeeLength = employees.length;
  let adminLength = admins.length;
  let hrLength = hrManagers.length;
  let successMessage = req.flash("success");
  let errorMessage = req.flash("error");
  // console.log(users[0])
  res.render("adminDashboard", {
    users,
    userLength,
    employeeLength,
    adminLength,
    hrLength,
    successMessage,
    errorMessage,
  });
});
router.get("/leaves", isLoggedIn, async (req, res) => {
  let successMessage = req.flash("success");
  let errorMessage = req.flash("error");
  let admin = await adminModel
    .findOne({ role: "admin" })
    .populate({
      path: "leaves.totalLeaves",
      populate: { path: "user", model: "user" },
    })
    .populate({
      path: "leaves.approvedLeaves",
      populate: { path: "user", model: "user" },
    })
    .populate({
      path: "leaves.rejectedLeaves",
      populate: { path: "user", model: "user" },
    })
    .populate({
      path: "leaves.pendingLeaves",
      populate: { path: "user", model: "user" },
    });
  let leaves = admin.leaves.totalLeaves;
  let approvedLeaves = admin.leaves.approvedLeaves;
  // console.log(approvedLeaves);
  let rejectedLeaves = admin.leaves.rejectedLeaves;
  let pendingLeaves = admin.leaves.pendingLeaves;
  res.render("adminLeaves", {
    leaves,
    approvedLeaves,
    rejectedLeaves,
    pendingLeaves,
    successMessage,
    errorMessage,
  });
});
router.get("/user/:id", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findById(req.params.id)
    .populate("leaves.totalLeaves")
    .populate("leaves.approvedLeaves")
    .populate("leaves.rejectedLeaves")
    .populate("leaves.pendingLeaves");
  if (!user) {
    return (req.flash("error", "User not found"), res.redirect("/admin"));
  }
  // console.log(user.leaves.totalLeaves);
  const totalLeaves = user.leaves.totalLeaves;
  const approvedLeaves = user.leaves.approvedLeaves;
  const rejectedLeaves = user.leaves.rejectedLeaves;
  const pendingLeaves = user.leaves.pendingLeaves;

  let errorMessage = req.flash("error");
  let successMessage = req.flash("success");
  // let userLeaves = await leaveModel.find({ user: user._id });
  res.render("adminUserDetails", {
    errorMessage,
    user,
    totalLeaves,
    approvedLeaves,
    rejectedLeaves,
    pendingLeaves,
    successMessage
  });
});

//deletion emp
router.get("/users/delete/:id", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/admin");
    }
    await userModel.findByIdAndDelete(req.params.id);
    req.flash("success", `User ${user.fullname || ''} deleted successfully`);
    res.redirect("/admin");
  } catch (err) {
    console.log(err.message);
    req.flash("error", "Error deleting user");
    res.redirect("/admin");
  }
});

//approving leave

router.get("/leave/approve/:id", isLoggedIn, async (req, res) => {
  let leave = await leaveModel.findById(req.params.id).populate("user");
  let admin = await adminModel.findOne({ role: "admin" });
  let user = await userModel.findById(leave.user._id);
  if (!leave) {
    return (
      req.flash("error", "Leave request not found"),
      res.redirect("/admin/leaves")
    );
  }
  if (leave.status === "approved") {
    return (
      req.flash("error", "Leave request already approved"),
      res.redirect("/admin/leaves")
    );
  }
  if (leave.status === "rejected") {
    return (
      req.flash("error", "Leave request already rejected"),
      res.redirect("/admin/leaves")
    );
  }

  leave.status = "approved";
  leave.user.leaves.approvedLeaves.push(leave._id);
  leave.user.leaves.pendingLeaves.pull(leave._id);
  user.leaves.approvedLeaves.push(leave._id);
  user.leaves.pendingLeaves.pull(leave._id);
  admin.leaves.approvedLeaves.push(leave._id);
  admin.leaves.pendingLeaves.pull(leave._id);
  await admin.save();
  await leave.user.save();
  await leave.save();
  req.flash("success", "Leave request approved successfully");
  res.redirect("/admin/leaves");
});
router.get("/leave/reject/:id", isLoggedIn, async (req, res) => {
  let leave = await leaveModel.findById(req.params.id).populate("user");
  let admin = await adminModel.findOne({ role: "admin" });
  let user = await userModel.findById(leave.user._id);
  if (!leave) {
    return (
      req.flash("error", "Leave request not found"),
      res.redirect("/admin/leaves")
    );
  }
  if (leave.status === "approved") {
    return (
      req.flash("error", "Leave request already approved"),
      res.redirect("/admin/leaves")
    );
  }
  if (leave.status === "rejected") {
    return (
      req.flash("error", "Leave request already rejected"),
      res.redirect("/admin/leaves")
    );
  }
  leave.status = "rejected";
  leave.user.leaves.rejectedLeaves.push(leave._id);
  leave.user.leaves.pendingLeaves.pull(leave._id);
  user.leaves.rejectedLeaves.push(leave._id);
  user.leaves.pendingLeaves.pull(leave._id);
  admin.leaves.rejectedLeaves.push(leave._id);
  admin.leaves.pendingLeaves.pull(leave._id);
  await admin.save();
  await leave.user.save();
  await leave.save();
  req.flash("success", "Leave request rejected successfully");
  res.redirect("/admin/leaves");
});

router.post("/changeRole/:id", async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/admin");
    }
    let { userRole } = req.body;
    if (user.role === userRole) {
      req.flash("error", `User is already assigned the role of ${userRole}`);
      return res.redirect(`/admin/user/${user._id}`);
    }
    user.role = userRole;
    await user.save();
    req.flash("success", `User role updated to ${userRole} successfully`);
    res.redirect(`/admin/user/${user._id}`);
  } catch (err) {
    console.log(err.message);
    req.flash("error", "Error changing user role");
    res.redirect(`/admin/user/${req.params.id}`);
  }
});

module.exports = router;
