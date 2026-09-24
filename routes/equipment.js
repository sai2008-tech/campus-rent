const express = require("express");

const {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  checkAvailability
} = require("../controllers/equipmentController");

const router = express.Router();

router.post("/", createEquipment);
router.get("/", getAllEquipment);

// Keep availability route BEFORE /:id
router.get("/:id/availability", checkAvailability);

router.get("/:id", getEquipmentById);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);

module.exports = router;