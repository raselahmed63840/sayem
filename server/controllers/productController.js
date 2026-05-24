const Product = require("../models/Product");
const Category = require("../models/Category");

const getProducts = async (req, res) => {
  try {
    const { category, search, featured, status, limit = 100 } = req.query;

    const filter = {};

    filter.status = status || "active";

    if (category) {
      const categoryDoc = await Category.findOne({
        $or: [
          { slug: category },
          /^[0-9a-fA-F]{24}$/.test(category) ? { _id: category } : null,
        ].filter(Boolean),
      });

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

const createSlug = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };

    if (!productData.title && productData.name) {
      productData.title = productData.name;
    }

    if (!productData.name && productData.title) {
      productData.name = productData.title;
    }

    if (!productData.slug && productData.title) {
      productData.slug = createSlug(productData.title);
    }

    if (!productData.category && productData.categoryId) {
      productData.category = productData.categoryId;
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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
