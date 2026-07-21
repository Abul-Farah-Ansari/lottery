const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    winnerName: {
      type: String,
      required: true,
      trim: true,
    },

    ticketNumber: {
      type: String,
      required: true,
      trim: true,
    },

    drawDate: {
      type: String,
      required: true,
    },

    drawTime: {
      type: String,
      required: true,
    },

    visibleAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", resultSchema);