const express = require("express");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

const router = express.Router();


// HOME
router.get("/", (req, res) => {

    let error = req.flash("error");
    let success = req.flash("success");

    res.render("index", {
        error,
        success,
        loggedin: false
    });

});


// SHOP
router.get("/shop", isLoggedIn, async (req, res) => {

    let products = await productModel.find();

    let success = req.flash("success");

    res.render("shop", {
        success,
        products
    });

});


// ADD TO CART
router.get("/cart/:id", isLoggedIn, async (req, res) => {

    const product = await productModel.findById(req.params.id);

    const user = await userModel.findOne({
        email: req.user.email
    });

    if (!product) {
        req.flash("error", "Product not found");
        return res.redirect("/shop");
    }

    if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/");
    }


    // Check if product already exists
    const existingProduct = user.cart.find(
        item =>
            item.product &&
            item.product.toString() === product._id.toString()
    );


    if (existingProduct) {

        // Product already exists
        existingProduct.quantity += 1;

    } else {

        // New product
        user.cart.push({
            product: product._id,
            quantity: 1
        });

    }


    // Save in BOTH cases
    await user.save();

    req.flash("success", "Added to cart");

    res.redirect("/shop");

});


// CART PAGE
router.get("/cart", isLoggedIn, async (req, res) => {

    const user = await userModel
        .findOne({
            email: req.user.email
        })
        .populate("cart.product");


    if (!user) {
        return res.redirect("/");
    }



    res.render("cart", {
        cart:user.cart
    });

});


module.exports = router;