const express = require("express");
const { addWoodType, getWoodTypes, updateWoodType, deleteWoodType } = require("../controller/woodController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addWoodType); // Admin only
router.get("/", getWoodTypes);
router.put("/:id", protect, updateWoodType); // Admin only
router.delete("/:id", protect, deleteWoodType); // Admin only

module.exports = router;
