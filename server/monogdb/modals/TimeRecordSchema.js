const mongoose = require("mongoose");

const TimeRecordSchema = new mongoose.Schema(
  {
    type: { type: "string", required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: { type: String, required: true },
    clockIn: { type: Date, required: true },
    clockOut: { type: Date, required: true },
    timeSpent: { type: Number, required: true }, // Time spent in seconds
    pointsEarned: { type: Number, required: true } // Points earned
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TimeRecord", TimeRecordSchema);
