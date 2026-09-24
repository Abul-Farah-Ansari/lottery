const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      trim: true,
    },

    // Whether the ticket number should display X
    hasX: {
      type: Boolean,
      default: false,
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
resultSchema.index({ visibleAt: -1 });
module.exports = mongoose.model("Result", resultSchema);