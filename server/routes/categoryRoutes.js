// const express = require("express");

// const {
//   getCategories,
//   getAdminCategories,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// } = require("../controllers/categoryController");

// const upload = require("../middleware/uploadMiddleware");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.get("/", getCategories);
// router.get("/admin/all", protect, getAdminCategories);

// router.post("/", protect, upload.single("image"), createCategory);
// router.put("/:id", protect, upload.single("image"), updateCategory);
// router.delete("/:id", protect, deleteCategory);

// module.exports = router;

import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().select("title slug");
  res.json(categories);
});

router.get("/:slug", async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
});

export default router;
