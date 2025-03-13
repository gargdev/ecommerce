// controllers/woodTypeController.js
const WoodType = require("../models/WoodType");

// Add Wood Type
const addWoodType = async (req, res) => {
  try {
    const { name, pricePerCubicMeter } = req.body;
    const woodType = new WoodType({ name, pricePerCubicMeter });
    await woodType.save();
    res.status(201).json(woodType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Wood Types
const getWoodTypes = async (req, res) => {
  try {
    const woodTypes = await WoodType.find();
    res.json(woodTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Wood Type
const updateWoodType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pricePerCubicMeter } = req.body;
    const woodType = await WoodType.findByIdAndUpdate(
      id,
      { name, pricePerCubicMeter },
      { new: true }
    );
    if (!woodType) {
      return res.status(404).json({ message: "Wood type not found" });
    }
    res.json(woodType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Wood Type
const deleteWoodType = async (req, res) => {
  try {
    const { id } = req.params;
    const woodType = await WoodType.findByIdAndDelete(id);
    if (!woodType) {
      return res.status(404).json({ message: "Wood type not found" });
    }
    res.json({ message: "Wood type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addWoodType, getWoodTypes, updateWoodType, deleteWoodType };
