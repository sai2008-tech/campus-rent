const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    quantity: {
      type: Number,
      required: true,
      min: 0
    },

    availableQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["Available", "Unavailable", "Maintenance"],
      default: "Available"
    },

    location: {
      type: String,
      default: ""
    },

    condition: {
      type: String,
      default: "Good"
    }
  },
  {
    timestamps: true
  }
);

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;