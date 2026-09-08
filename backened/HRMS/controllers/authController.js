const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const genreteToken = require("../utils/genrateToken");
const adminModel = require("../models/adminModel");
const flash=require("connect-flash");

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password,confirmPassword, address, phone } = req.body;
    if(password!==confirmPassword){
        return res.status(400).json({ message: "Password and confirm password do not match" });
    }
    req.flash("error","Password and confirm password do not match")
    let user = await userModel.findOne({ email: email });
    if (user) {
      return req.flash("error","User already exists with this email"),res.redirect("/register");
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
        req.flash("success","User registered successfully")
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

    const admin = await adminModel.findOne({ email });
    
    if (admin) {

      const isMatch = await bcrypt.compare(password, admin.password);


      if (!isMatch) {
        return req.flash("error","Invalid password"),res.redirect("/");
      }

      const token = genreteToken(admin);

      res.cookie("token", token);
      req.flash("success","Admin logged in successfully");
      return res.redirect("/admin");
    }


    const user = await userModel.findOne({ email });

    if (!user) {
      return req.flash("error","User not found"),res.redirect("/");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return req.flash("error","Invalid password"),res.redirect("/");
    }

    const token = genreteToken(user);

    res.cookie("token", token);
    req.flash("success","User logged in successfully");

    if (user.role === "hr") {
      req.flash("success","HR logged in successfully");
      return res.redirect("/hr");
    }

    if (user.role === "employee") {
      req.flash("success","Employee logged in successfully");
      return res.redirect("/employee");
    }

    return req.flash("error","User role not recognized"),res.redirect("/");

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return req.flash("error","An error occurred during login"),res.redirect("/");
  }
};
module.exports = { registerUser, loginUser };
