const Product = require("../models/Product");
const Category = require("../models/Category");

const createSlug = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const normalizeBoolean = (value) => {
  return value === true || value === "true" || value === "on" || value === "1";
};

const buildImageData = (files = []) => {
  return files.map((file) => ({
    url: `/uploads/${file.filename}`,
    public_id: file.filename,
  }));
};

const prepareProductData = (body, files = []) => {
  const data = { ...body };

  data.title = data.title || data.name;
  data.name = data.name || data.title;
  data.slug = data.slug || createSlug(data.title);
  data.category = data.category || data.categoryId;

  data.isFeatured = normalizeBoolean(data.isFeatured);
  data.order = Number(data.order || 0);

  if (!data.status) {
    data.status = "active";
  }

  const uploadedImages = buildImageData(files);

  if (uploadedImages.length > 0) {
    data.images = uploadedImages;
    data.thumbnail = uploadedImages[0];
  }

  return data;
};

const getProducts = async (req, res) => {
  try {
    const { category, search, featured, status, limit = 100 } = req.query;

    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    } else if (!status) {
      filter.status = "active";
    }

    if (category) {
      const categoryQuery = [{ slug: category }];

      if (/^[0-9a-fA-F]{24}$/.test(category)) {
        categoryQuery.push({ _id: category });
      }

      const categoryDoc = await Category.findOne({ $or: categoryQuery });

      filter.category = categoryDoc ? categoryDoc._id : null;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { productType: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter)
      .populate("category", "name slug description image")
      .sort({ order: 1, createdAt: -1 })
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

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      isFeatured: true,
    })
      .populate("category", "name slug description image")
      .sort({ order: 1, createdAt: -1 })
      .limit(12);

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name slug description image",
    );

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

const createProduct = async (req, res) => {
  try {
    const productData = prepareProductData(req.body, req.files);

    if (!productData.title) {
      return res.status(400).json({
        success: false,
        message: "Product title is required.",
      });
    }

    if (!productData.slug) {
      return res.status(400).json({
        success: false,
        message: "Product slug is required.",
      });
    }

    if (!productData.category) {
      return res.status(400).json({
        success: false,
        message: "Please select product category.",
      });
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productData = prepareProductData(req.body, req.files);

    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!req.files || req.files.length === 0) {
      delete productData.images;
      delete productData.thumbnail;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      {
        new: true,
        runValidators: true,
      },
    );

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
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
  getFeaturedProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
