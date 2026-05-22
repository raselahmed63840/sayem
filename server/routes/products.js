// server/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get products by category slug
router.get("/category/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const products = await Product.find({ categorySlug: slug });
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in this category.",
      });
    }
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
