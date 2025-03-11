const Product = require("../models/Product");
const WoodType = require("../models/WoodType");

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, customizable, length, breadth, height, woodType } = req.body;


    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image = req.file.filename; // Store filename


    let finalPrice = price;
    if (customizable && woodType) {
      const wood = await WoodType.findById(woodType);
      if (!wood) return res.status(404).json({ message: "Wood type not found" });

      if (!length || !breadth || !height) {
        return res.status(400).json({ message: "Dimensions are required for customizable products" });
      }

      const volume = length * breadth * height; // Calculate volume
      finalPrice = volume * wood.pricePerCubicMeter; // Calculate price based on volume and wood type
    }

    const product = new Product({
      name,
      description,
      price: finalPrice,
      category,
      customizable,
      image,
      dimensions: customizable ? { length, breadth, height } : undefined,
      woodType: customizable ? woodType : undefined,
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("woodType");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, customizable, length, breadth, height, woodType } = req.body;
    const image = req.file ? req.file.filename : undefined;
    let finalPrice = price;

    if (customizable && woodType) {
      const wood = await WoodType.findById(woodType);
      if (!wood) return res.status(404).json({ message: "Wood type not found" });

      const volume = length * breadth * height;
      finalPrice = volume * wood.pricePerCubicMeter;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price: finalPrice, category, customizable, image },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
