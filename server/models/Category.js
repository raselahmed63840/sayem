import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    bannerImage: String,
    rawImage: String,
    description: String,
    productDetails: {
      material: String,
      care: String,
      origin: String,
      color: String,
      size: String,
      moq: String,
      capacity: String,
      leadTime: String,
      price: String,
    },
    galleryImages: [String],
  },
  { timestamps: true },
);

export default mongoose.model("Category", categorySchema);
