const mongoose = require("mongoose");

const woodTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pricePerCubicMeter: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WoodType", woodTypeSchema);
