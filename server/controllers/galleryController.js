const Gallery = require("../models/Gallery"); // Your MongoDB model
const asyncHandler = require("express-async-handler");

// Get all gallery images (public)
const getGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.find({ isActive: true });
  res.json({ success: true, gallery });
});

// Get all gallery images (admin)
const getAdminGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.find({});
  res.json({ success: true, gallery });
});

// Create new gallery image
const createGallery = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Image is required");
  }

  const newGallery = new Gallery({
    image: { url: `/uploads/${req.file.filename}` },
    isActive: true,
  });

  const saved = await newGallery.save();
  res.status(201).json({ success: true, gallery: saved });
});

// Update gallery image
const updateGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);
  if (!gallery) {
    res.status(404);
    throw new Error("Gallery image not found");
  }

  if (req.file) {
    gallery.image.url = `/uploads/${req.file.filename}`;
  }

  const updated = await gallery.save();
  res.json({ success: true, gallery: updated });
});

// Delete gallery image
const deleteGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);
  if (!gallery) {
    res.status(404);
    throw new Error("Gallery image not found");
  }

  await gallery.remove();
  res.json({ success: true, message: "Gallery deleted" });
});

module.exports = {
  getGallery,
  getAdminGallery,
  createGallery,
  updateGallery,
  deleteGallery,
};
