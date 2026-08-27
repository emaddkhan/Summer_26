const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const {generateToken}=require("../utils/generateTokens")
const userModel = require("../models/userModel");

module.exports.registerUser=async (req, res) => {
  try {
    let { email, fullname, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(401).send("something went wrong");
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password,salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let createdUser = await userModel.create({
            email,
            fullname,
            password: hash,
          });
          let token= generateToken(createdUser)
          res.cookie("tokne", token);
          res.send(createdUser);

        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports.loginUser=async(req,res)=>{
    try{
        let{email,password}=req.body;
    let user = await userModel.findOne({email})
    if(!user) return ses.status(401).send("pls register first")
    bcrypt.compare(password,user.password,(err,result)=>{
       if(result){
        let token=generateToken(user)
       res.cookie("token",token)
       res.send("loggedin succesfully")
       }else{
        res.status(401).send("incorrect email or password")
       }
    })    

    }
    catch(err){
        res.send(err.message)
    }
}

