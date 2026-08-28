const express = require("express");
const upload = require("../config/multer-config");
const { createProduct } = require("../controllers/createProductController");
const router = express.Router();

router.post("/create", upload.single("image"),createProduct);

module.exports = router;
