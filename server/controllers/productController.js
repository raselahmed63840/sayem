const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");
const Category = require("../models/Category");

const makeSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const makeImageObject = (file) => ({
  url: file ? `/uploads/${file.filename}` : "",
  public_id: file ? file.filename : "",
});

const deleteLocalImage = (publicId) => {
  if (!publicId) return;

  const imagePath = path.join(__dirname, "../uploads", publicId);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

// ================== GET ALL PRODUCTS ==================

const getProducts = async (req, res) => {
  try {
    const { status, category, featured, limit = 1000 } = req.query;

    let filter = {};

    if (!status) {
      filter.status = "active";
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort({
        order: 1,
        createdAt: -1,
      })
      .limit(Number(limit));

    res.json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== GET PRODUCT BY SLUG ==================

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      status: "active",
    }).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== CREATE PRODUCT ==================

const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      productType,
      shortDescription,
      description,
      material,
      scientificName,
      origin,
      color,
      size,
      moq,
      capacity,
      leadTime,
      priceType,
      usage,
      buyerRequirement,
      isFeatured,
      status,
      order,
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and Category required",
      });
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    const finalSlug = slug ? makeSlug(slug) : makeSlug(title);

    const uploadedImages = req.files?.length
      ? req.files.map((file) => makeImageObject(file))
      : [];

    const product = await Product.create({
      title,
      slug: finalSlug,
      category,
      productType,
      shortDescription,
      description,
      material,
      scientificName,
      origin,
      color,
      size,
      moq,
      capacity,
      leadTime,
      priceType,
      usage,
      buyerRequirement,
      images: uploadedImages,
      thumbnail: uploadedImages[0] || {},
      isFeatured: isFeatured === "true",
      status: status || "active",
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Product created",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== UPDATE ==================

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    Object.assign(product, req.body);

    if (req.files?.length) {
      product.images.forEach((img) => {
        deleteLocalImage(img.public_id);
      });

      const uploadedImages = req.files.map((file) => makeImageObject(file));

      product.images = uploadedImages;

      product.thumbnail = uploadedImages[0];
    }

    await product.save();

    res.json({
      success: true,
      message: "Updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== DELETE ==================

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    product.images.forEach((img) => {
      deleteLocalImage(img.public_id);
    });

    await product.deleteOne();

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
