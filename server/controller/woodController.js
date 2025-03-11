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

module.exports = { addWoodType, getWoodTypes };
