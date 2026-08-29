const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const {registerUser,loginUser, logoutUser}=require("../controllers/authController");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

router.get("/", (req, res) => {
  res.send("heyyy");
});

router.post("/register", registerUser );
router.post("/login", loginUser );
router.get("/logout", logoutUser );




module.exports = router;
