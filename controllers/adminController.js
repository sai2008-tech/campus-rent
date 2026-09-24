const Rental = require("../models/Rental");

// Get all rental requests
const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate("user")
      .populate("equipment");

    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch rental requests",
      error: error.message
    });
  }
};

// Approve a rental request
const approveRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found"
      });
    }

    res.status(200).json({
      message: "Rental approved successfully",
      rental
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve rental",
      error: error.message
    });
  }
};

// Reject a rental request
const rejectRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found"
      });
    }

    res.status(200).json({
      message: "Rental rejected successfully",
      rental
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject rental",
      error: error.message
    });
  }
};

module.exports = {
  getAllRentals,
  approveRental,
  rejectRental
};