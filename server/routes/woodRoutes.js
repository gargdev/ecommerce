const express = require("express");
const { addWoodType, getWoodTypes } = require("../controller/woodController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addWoodType); // Admin only
router.get("/", getWoodTypes);

module.exports = router;
