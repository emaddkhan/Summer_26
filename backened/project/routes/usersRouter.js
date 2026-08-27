const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("heyyy");
});

router.post("/register", async (req, res) => {
  try {
    let { email, fullname, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("something went wrong");
    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, async (err, hash) => {
        let createdUser = await userModel.create({
          email,
          fullname,
          password: hash,
        });
        res.send(createdUser);
      });
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
