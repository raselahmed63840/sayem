const express = require("express");
const {
  getCategories,
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCategories);
router.get("/admin/all", protect, getAdminCategories);

router.post("/", protect, upload.single("image"), createCategory);
router.put("/:id", protect, upload.single("image"), updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
