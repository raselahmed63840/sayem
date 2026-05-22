const express = require("express");

const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ================= PUBLIC ROUTES =================

// all products
router.get("/", getProducts);

// product by slug
router.get("/slug/:slug", getProductBySlug);

// ================= ADMIN ROUTES =================

// create product
router.post("/", protect, upload.array("images", 10), createProduct);

// update product
router.put("/:id", protect, upload.array("images", 10), updateProduct);

// delete product
router.delete("/:id", protect, deleteProduct);

module.exports = router;
