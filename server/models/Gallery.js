const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
