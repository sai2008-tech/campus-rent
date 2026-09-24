const Equipment = require("../models/Equipment");

const createEquipment = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      quantity,
      availableQuantity,
      status,
      location,
      condition
    } = req.body;

    const equipment = new Equipment({
      name,
      category,
      description,
      quantity,
      availableQuantity: availableQuantity ?? quantity,
      status,
      location,
      condition
    });

    const savedEquipment = await equipment.save();

    res.status(201).json({
      message: "Equipment added successfully",
      equipment: savedEquipment
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add equipment",
      error: error.message
    });
  }
};

const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();

    res.status(200).json({
      message: "Equipment fetched successfully",
      equipment
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch equipment",
      error: error.message
    });
  }
};

const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.status(200).json({
      message: "Equipment fetched successfully",
      equipment
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch equipment",
      error: error.message
    });
  }
};

const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.status(200).json({
      message: "Equipment updated successfully",
      equipment
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update equipment",
      error: error.message
    });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.status(200).json({
      message: "Equipment deleted successfully",
      equipment
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete equipment",
      error: error.message
    });
  }
};

const checkAvailability = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    const isAvailable =
      equipment.availableQuantity > 0 &&
      equipment.status === "Available";

    res.status(200).json({
      equipmentId: equipment._id,
      name: equipment.name,
      availableQuantity: equipment.availableQuantity,
      status: equipment.status,
      isAvailable
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to check equipment availability",
      error: error.message
    });
  }
};

module.exports = {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  checkAvailability
};
