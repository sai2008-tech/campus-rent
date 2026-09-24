const express = require("express");
const router = express.Router();

const admin = require("../middleware/admin");

const {
  getAllRentals,
  approveRental,
  rejectRental
} = require("../controllers/adminController");

// Get all rental requests
router.get("/rentals", admin, getAllRentals);

// Approve a rental
router.put("/rentals/:id/approve", admin, approveRental);

// Reject a rental
router.put("/rentals/:id/reject", admin, rejectRental);

module.exports = router;