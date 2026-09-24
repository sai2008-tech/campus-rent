const Rental = require("../models/Rental");

// Create a new rental
const createRental = async (req, res) => {
  try {
    const { user, equipment, startDate, endDate } = req.body;

    const rental = await Rental.create({
      user,
      equipment,
      startDate,
      endDate
    });

    res.status(201).json({
      message: "Rental request created successfully",
      rental
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create rental",
      error: error.message
    });
  }
};

// Get all rentals
const getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate("user")
      .populate("equipment");

    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch rentals",
      error: error.message
    });
  }
};

// Get one rental
const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate("user")
      .populate("equipment");

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found"
      });
    }

    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch rental",
      error: error.message
    });
  }
};

// Return equipment
const returnRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      { status: "returned" },
      { new: true }
    );

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found"
      });
    }

    res.status(200).json({
      message: "Equipment returned successfully",
      rental
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to return equipment",
      error: error.message
    });
  }
};

module.exports = {
  createRental,
  getRentals,
  getRentalById,
  returnRental
};