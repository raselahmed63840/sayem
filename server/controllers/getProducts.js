const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      isFeatured: true,
    })
      .populate("category", "name slug")
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
