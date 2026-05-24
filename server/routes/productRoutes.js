const express = require("express");
const multer = require("multer");

const {
  getProducts,
  getFeaturedProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getProduct);

router.post("/", upload.array("images", 10), createProduct);
router.put("/:id", upload.array("images", 10), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
