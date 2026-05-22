const express = require("express");
const {
  getGallery,
  getAdminGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

const upload = require("../middleware/uploadMiddleware"); // multer
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getGallery);
router.get("/admin/all", protect, getAdminGallery);

router.post("/", protect, upload.single("image"), createGallery);
router.put("/:id", protect, upload.single("image"), updateGallery);
router.delete("/:id", protect, deleteGallery);

module.exports = router;
