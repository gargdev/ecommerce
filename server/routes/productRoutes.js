const express = require("express");
const { addProduct, getProducts, updateProduct, deleteProduct } = require("../controller/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", protect, upload.single("image"), addProduct); // Admin only
router.get("/", getProducts);
router.put("/:id", protect, upload.single("image"), updateProduct); // Admin only
router.delete("/:id", protect, deleteProduct); // Admin only

module.exports = router;
