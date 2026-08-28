const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateTokens");
const userModel = require("../models/userModel");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, fullname, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/");
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let createdUser = await userModel.create({
            email,
            fullname,
            password: hash,
          });
          let token = generateToken(createdUser);
          res.cookie("token", token);
          req.flash("success","account created successfully")
          res.redirect("/shop");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Please register first");
      return res.redirect("/");
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        req.flash("error", "Something went wrong");
        return res.redirect("/");
      }

      if (result) {
        let token = generateToken(user);

        res.cookie("token", token);
        req.flash("success","logged in successfully")
        return res.redirect("/shop");
      }
      req.flash("error", "Incorrect email or password");
      return res.redirect("/");
    });
  } catch (err) {
    res.send(err.message);
  }
};
module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "");
  req.flash("success","you are logout")
  res.redirect("/");
};
