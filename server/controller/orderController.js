const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { sendEmail } = require("../services/emailService");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = new Order({ user: req.user.id, items: cart.items, totalAmount });

    await order.save();
    await Cart.findOneAndDelete({ user: req.user.id }); // Clear cart



     // Send Order Confirmation Email
     const userEmail = req.user.email; // Get user's email
     const orderDetails = cart.items
       .map((item) => `${item.product.name} - ${item.quantity} x ₹${item.price}`)
       .join("\n");
 
     const subject = "Order Confirmation - Thank You for Your Purchase!";
     const text = `Hello,\n\nThank you for your order! Here are your order details:\n\n${orderDetails}\n\nTotal Amount: ₹${totalAmount}\n\nYour order is being processed.\n\nBest regards,\nYour Store`;
 
     const html = `
       <h2>Order Confirmation</h2>
       <p>Thank you for your order! Here are your order details:</p>
       <ul>
         ${cart.items
           .map((item) => `<li>${item.product.name} - ${item.quantity} x ₹${item.price}</li>`)
           .join("")}
       </ul>
       <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
       <p>Your order is being processed.</p>
       <p>Best regards,<br>Your Store</p>
     `;
          
     console.log(`Sending order confirmation email to ${userEmail}...`);

     await sendEmail(userEmail, subject, text, html);


    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, getUserOrders, updateOrderStatus };
