const express = require("express");
const router = express.Router();
const adminModel = require("../models/adminModel");
const upload = require("../config/multer-configration");
const isLoggedIn = require("../middleware/isLoggedIn");
const bcrypt = require("bcrypt");

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
router.get("/", isLoggedIn, (req, res) => {
  res.render("adminDashboard");
});

module.exports = router;
