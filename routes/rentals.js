const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const {
  createRental,
  getRentals,
  getRentalById,
  returnRental
} = require("../controllers/rentalController");

// Create a rental request
router.post("/", createRental);

// Get all rentals
router.get("/", authMiddleware, getRentals);

// Get one rental
router.get("/:id", getRentalById);

// Return equipment
router.put("/:id/return", returnRental);

module.exports = router;