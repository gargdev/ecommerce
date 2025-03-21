const Product = require("../models/Product");
const WoodType = require("../models/WoodType");
const Order = require("../models/Order");

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      basePrice,
      isCustomizable,
      length,
      width,
      height,
      variants,
      woodTypes,
    } = req.body;

    // Get image URLs from req.files (Cloudinary returns the URL in file.path)
    const images =
      req.files && req.files.length > 0
        ? req.files.map((file) => file.path)
        : [];

    if (!name || !description || !category || !basePrice || images.length === 0) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    let dimensions;
    if (isCustomizable === 'true' || isCustomizable === true) {
      if (!length || !width || !height) {
        return res.status(400).json({ message: 'Dimensions are required for customizable products' });
      }
      dimensions = {
        length: parseFloat(length),
        width: parseFloat(width),
        height: parseFloat(height),
      };
    }

    let parsedVariants = [];
    if (variants) {
      try {
        parsedVariants = JSON.parse(variants);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid variants format' });
      }
    }

    let selectedWoodTypeIds = [];
    if (woodTypes) {
      try {
        selectedWoodTypeIds = JSON.parse(woodTypes);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid woodTypes format' });
      }
    }

    // Fetch wood types and their prices
    const woodTypeDocs = await WoodType.find({ _id: { $in: selectedWoodTypeIds } });
    const woodTypesWithPrices = woodTypeDocs.map((wood) => ({
      woodType: wood._id,
      price: wood.pricePerCubicMeter,
    }));

    const product = new Product({
      name,
      description,
      category,
      basePrice: parseFloat(basePrice),
      isCustomizable: isCustomizable === 'true' || isCustomizable === true,
      dimensions,
      variants: parsedVariants,
      woodTypes: woodTypesWithPrices,
      images, // store the array of image URLs
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      basePrice,
      isCustomizable,
      length,
      width,
      height,
      variants,
      woodTypes,
    } = req.body;

    // Validate basePrice value
    // const parsedBasePrice = parseFloat(basePrice);
    // if (isNaN(parsedBasePrice)) {
    //   return res.status(400).json({ message: "Invalid basePrice value" });
    // }

    // If new images are uploaded, get their URLs from req.files.
    // Otherwise, preserve the existing images.
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    } else {
      const existingProduct = await Product.findById(req.params.id);
      images = existingProduct.images;
    }

    let dimensions;
    if (isCustomizable === "true" || isCustomizable === true) {
      if (!length || !width || !height) {
        return res
          .status(400)
          .json({ message: "Dimensions are required for customizable products" });
      }
      dimensions = {
        length: parseFloat(length),
        width: parseFloat(width),
        height: parseFloat(height),
      };
    }

    let parsedVariants = [];
    if (variants) {
      try {
        parsedVariants = JSON.parse(variants);
      } catch (err) {
        return res.status(400).json({ message: "Invalid variants format" });
      }
    }

    let selectedWoodTypeIds = [];
    if (woodTypes) {
      try {
        selectedWoodTypeIds = JSON.parse(woodTypes);
      } catch (err) {
        return res.status(400).json({ message: "Invalid woodTypes format" });
      }
    }

    // Fetch wood types and their prices
    const woodTypeDocs = await WoodType.find({ _id: { $in: selectedWoodTypeIds } });
    const woodTypesWithPrices = woodTypeDocs.map((wood) => ({
      woodType: wood._id,
      price: wood.pricePerCubicMeter,
    }));

    const updatedData = {
      name,
      description,
      category,
      basePrice: basePrice,
      isCustomizable: isCustomizable === "true" || isCustomizable === true,
      dimensions,
      variants: parsedVariants,
      woodTypes: woodTypesWithPrices,
      images, // new or preserved images array
    };

    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ success: true, message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Wood Type
const addWoodType = async (req, res) => {
  try {
    const { type, pricePerCubicMeter } = req.body;

    const woodType = new WoodType({ type, pricePerCubicMeter });
    await woodType.save();

    res.status(201).json({ success: true, message: "Wood type added", woodType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Wood Price
const updateWoodPrice = async (req, res) => {
  try {
    const { pricePerCubicMeter } = req.body;
    const woodType = await WoodType.findByIdAndUpdate(req.params.id, { pricePerCubicMeter }, { new: true });

    if (!woodType) return res.status(404).json({ message: "Wood type not found" });

    res.json({ success: true, message: "Wood price updated", woodType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product", "name");
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "woodTypes.woodType",
      select: "name pricePerCubicMeter",
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all functions properly
module.exports = {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  addWoodType,
  updateWoodPrice,
  getAllOrders,
  updateOrderStatus,
};
