const express = require("express");
const upload = require("../config/multer-config");
const productModel = require("../models/productModel");
const router = express.Router();

router.post("/create", upload.single("image"), async (req, res) => {
  try{
    let { name, price, discount, bgColor, panelColor, textColor } = req.body;
  let product = await productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgColor,
    panelColor,
    textColor,
  });
  req.flash("success","product created")
  res.redirect("/owners/admin")
  }catch(err){
    res.send(err.message)
  }
});

module.exports = router;
