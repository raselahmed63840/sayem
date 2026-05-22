// server/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // mongoose model

// Get product by slug
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug }); // ensure slug matches DB
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
