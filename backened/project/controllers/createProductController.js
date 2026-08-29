const productModel = require("../models/productModel");

module.exports.createProduct=async(req, res) => {
  try{
    let { name, price, discount, bgColor, panelColor, textColor } = req.body;
  let product = await productModel.create({
    image: req.file.buffer,
    imageType:req.file.mimeType,
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
}