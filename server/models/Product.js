const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Fixed price for non-customizable products
    image: { type: String, required: true }, // Image URL
    category: { type: String, required: true },
    customizable: { type: Boolean, default: false }, // Whether the product supports customization
    dimensions: {
      length: { type: Number }, // Optional, only required for customizable products
      breadth: { type: Number },
      height: { type: Number },
    },
    woodType: { type: mongoose.Schema.Types.ObjectId, ref: "WoodType" }, // Reference to wood type
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
