const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    basePrice: { type: Number, required: true },
    isCustomizable: { type: Boolean, default: false },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    variants: [
      {
        type: { type: String, required: true }, // e.g., "Size", "Weight"
        dataType: { type: String, enum: ['string', 'number'], required: true }, // Type of options
        options: [
          {
            name: { type: String, required: true }, // e.g., "Small", "10"
            priceAdjustment: { type: Number, required: true }, // Price adjustment for this option
          },
        ],
      },
    ],
    woodTypes: [
      {
        woodType: { type: mongoose.Schema.Types.ObjectId, ref: 'WoodType', required: true },
        price: { type: Number, required: true },
      },
    ],
    image: { type: String, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);