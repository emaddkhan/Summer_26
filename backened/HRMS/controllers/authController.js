const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const genreteToken = require("../utils/genrateToken");
const adminModel = require("../models/adminModel");

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password,confirmPassword, address, phone } = req.body;
    if(password!==confirmPassword){
        return res.status(400).json({ message: "Password and confirm password do not match" });
    }
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
          profileImage: req.file.buffer,
          imageType: req.file.mimetype  
        });
        const token = genreteToken(createUser);
        res.cookie("token", token);
        res.redirect("/employee");
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
// const loginUser = async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     let admin = await adminModel.findOne({ email });
//     let user = await userModel.findOne({ email });
//     if (admin) {
//   console.log("ADMIN FOUND");
//   console.log("EMAIL:", admin.email);
//   console.log("PASSWORD FROM DB:", admin.password);

//   bcrypt.compare(password, admin.password, (err, isMatch) => {

//     console.log("BCRYPT ERROR:", err);
//     console.log("PASSWORD MATCH:", isMatch);

//     if (err) {
//       return res.status(500).json({
//         message: "Internal server error"
//       });
//     }

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid password"
//       });
//     }

//     const token = genreteToken(admin);

//     res.cookie("token", token);

//     return res.redirect("/admin");
//   });
// }
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         return res.status(500).json({ message: "Internal server error" });
//       }
//       if (!isMatch) {
//         return res.status(400).json({ message: "Invalid password" });
//       }
//       const token = genreteToken(user);
//       res.cookie("token", token);
//       console.log(user);
//       if(user.role==="admin"){
//         return res.redirect("/admin");
//       }else if(user.role==="hr"){
//         return res.redirect("/hr");
//       }else if(user.role==="employee"){
//         return res.redirect("/employee");
//       }
      
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // =========================
    // CHECK ADMIN
    // =========================

    const admin = await adminModel.findOne({ email });

    if (admin) {
      console.log("ADMIN FOUND");
      console.log("EMAIL:", admin.email);
      console.log("PASSWORD FROM DB:", admin.password);

      const isMatch = await bcrypt.compare(password, admin.password);

      console.log("PASSWORD MATCH:", isMatch);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid password"
        });
      }

      const token = genreteToken(admin);

      res.cookie("token", token);

      return res.redirect("/admin");
    }

    // =========================
    // CHECK USER
    // =========================

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = genreteToken(user);

    res.cookie("token", token);

    // =========================
    // ROLE
    // =========================

    if (user.role === "hr") {
      return res.redirect("/hr");
    }

    if (user.role === "employee") {
      return res.redirect("/employee");
    }

    return res.status(400).json({
      message: "Invalid role"
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
module.exports = { registerUser, loginUser };
