const express = require("express");
const router = express.Router();
const adminModel = require("../models/adminModel");
const upload = require("../config/multer-configration");
const isLoggedIn = require("../middleware/isLoggedIn");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      let { fullname, email, password, address, phone } = req.body;
      let admin = await adminModel.findOne({
        role: "admin",
      });
      if (admin) {
        return res.status(500).send("you are not allowed to create admin");
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
router.get("/", isLoggedIn, async(req, res) => {
  let users=await userModel.find();
  let userLength=users.length;
  let employees=await userModel.find({role:"employee"});
  let admins=await adminModel.find({role:"admin"});
  let hrManagers=await userModel.find({role:"hr"});
  let employeeLength=employees.length;
  let adminLength=admins.length;
  let hrLength=hrManagers.length;
  // console.log(users[0])
  res.render("adminDashboard",{users,userLength, employeeLength, adminLength, hrLength});
});
router.get("/leaves", isLoggedIn, async(req, res) => {
  res.render("adminLeaves");
})
router.get("/user/:id", isLoggedIn, async(req, res) => {
  let user=await userModel.findById(req.params.id);
  res.render("adminUserDetails", { user });
})
module.exports = router;
