const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Item to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, length, breadth, height, woodType } = req.body;
    const product = await Product.findById(productId).populate("woodType");
    if (!product) return res.status(404).json({ message: "Product not found" });

    let price = product.price;
    if (product.customizable) {
      if (!length || !breadth || !height || !woodType)
        return res.status(400).json({ message: "Missing dimensions or wood type" });

      const volume = length * breadth * height;
      price = volume * product.woodType.pricePerCubicMeter;
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = price;
    } else {
      cart.items.push({ product: productId, quantity, price });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.id);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
