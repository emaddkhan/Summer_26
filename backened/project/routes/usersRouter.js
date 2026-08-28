const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const {registerUser,loginUser}=require("../controllers/authController");
const { isLoggedIn } = require("../middleware/isLoggedIn");

router.get("/", (req, res) => {
  res.send("heyyy");
});

router.post("/register", registerUser );
router.post("/login", loginUser );



module.exports = router;
