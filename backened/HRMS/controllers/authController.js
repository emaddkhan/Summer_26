const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const genreteToken = require("../utils/genrateToken");

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password, address, phone } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createUser = await userModel.create({
          fullname,
          email,
          password: hash,
          address,
          phone,
        });
        const token = genreteToken(createUser);
        res.cookie("token", token);
        res.send(createUser);
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = genreteToken(user);
      res.cookie("token", token);
      res.send(user);
    });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = { registerUser, loginUser };
