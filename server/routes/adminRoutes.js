const express = require("express");
const {
  addProduct,
  getProductById,
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
// router.post("/product",
//   (req, res, next) => {
//     console.log("Uploaded file:", req.file);
//     next();
//   },
//   protect, isAdmin, upload.single("image"), addProduct);

router.post(
  '/product',
  (req, res, next) => {
    console.log("Uploaded files:", req.files);
    next();
  },
  protect,
  isAdmin,
  upload.array('images', 10), // Allow uploading up to 10 images per product
  addProduct
);
router.get("/product/:id", protect, isAdmin, getProductById);
router.put("/product/:id", protect, isAdmin, updateProduct);
router.delete("/product/:id", protect, isAdmin, deleteProduct);

// Wood Type Routes
router.post("/wood-type", protect, isAdmin, addWoodType);
router.put("/wood-type/:id", protect, isAdmin, updateWoodPrice);

// Order Routes
router.get("/orders", protect, isAdmin, getAllOrders);
router.put("/order/:id", protect, isAdmin, updateOrderStatus);

module.exports = router;
