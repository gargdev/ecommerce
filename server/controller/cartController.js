const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, length, breadth, height, woodType, selectedVariants, price } = req.body;
    // Populate nested woodType field
    const product = await Product.findById(productId).populate("woodTypes.woodType");
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Compute a unique key for this cart item based on its configuration
    let itemKey = productId;
    if (selectedVariants) {
      // For variant selections, include the configuration in the key
      itemKey += `-variant-${JSON.stringify(selectedVariants)}`;
    } else if (product.isCustomizable && length && breadth && height && woodType) {
      // For customization, include the dimensions and wood type
      itemKey += `-custom-${length}-${breadth}-${height}-${woodType}`;
    }

    // Use the provided price if available; otherwise, calculate based on product type
    let finalPrice = price;
    if (product.isCustomizable && !price) {
      if (!length || !breadth || !height || !woodType)
        return res.status(400).json({ message: "Missing dimensions or wood type" });

      const selectedWoodType = product.woodTypes.find(
        (wt) => wt.woodType._id.toString() === woodType
      );
      if (!selectedWoodType) {
        return res.status(400).json({ message: "Invalid wood type" });
      }
      const volume = length * breadth * height;
      finalPrice = volume * selectedWoodType.woodType.pricePerCubicMeter;
    }
    if (!product.isCustomizable && !price) {
      finalPrice = product.basePrice;
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Find if an item with the same configuration (unique key) exists
    const itemIndex = cart.items.findIndex((item) => item.itemKey === itemKey);
    if (itemIndex > -1) {
      // If the item already exists with the same configuration, update its quantity
      cart.items[itemIndex].quantity += quantity;
      // Optionally, update the price if it might have changed
      cart.items[itemIndex].price = finalPrice;
    } else {
      // Otherwise, push a new item with its unique configuration details and the computed key
      cart.items.push({
        product: productId,
        quantity,
        price: finalPrice,
        itemKey,
        // Save extra configuration details if needed for display or future recalculation:
        selectedVariants,
        length,
        breadth,
        height,
        woodType,
      });
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
// const removeFromCart = async (req, res) => {
//   try {
//     let cart = await Cart.findOne({ user: req.user.id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter((item) => item.product.toString() !== req.params.id);
//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove only the specific cart item by matching its _id
    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.id);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addToCart, getCart, removeFromCart };
