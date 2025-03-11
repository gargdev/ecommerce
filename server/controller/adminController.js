const Product = require("../models/Product");
const WoodType = require("../models/WoodType");
const Order = require("../models/Order");

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, price, size, stock } = req.body;

    const product = new Product({
      name,
      price,
      size,
      stock,
    });

    await product.save();
    res.status(201).json({ success: true, message: "Product added", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { name, price, size, stock } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price, size, stock }, { new: true });

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

// Export all functions properly
module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  addWoodType,
  updateWoodPrice,
  getAllOrders,
  updateOrderStatus,
};
