const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  addWoodType,
  updateWoodPrice,
  getAllOrders,
  updateOrderStatus,
} = require("../controller/adminController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware"); // Ensure this is imported

const router = express.Router();

// Product Routes
router.post("/product",
  (req, res, next) => {
    console.log("Uploaded file:", req.file); // This will confirm if multer handled the upload correctly
    next(); // Continue to the addProduct controller
  },
  
  protect, isAdmin,  upload.single("image"), addProduct);
router.put("/product/:id", protect, isAdmin, updateProduct);
router.delete("/product/:id", protect, isAdmin, deleteProduct);

// Wood Type Routes
router.post("/wood-type", protect, isAdmin, addWoodType);
router.put("/wood-type/:id", protect, isAdmin, updateWoodPrice);

// Order Routes
router.get("/orders", protect, isAdmin, getAllOrders);
router.put("/order/:id", protect, isAdmin, updateOrderStatus);

module.exports = router;
