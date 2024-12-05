const mongoose = require("mongoose");

const TimeRecordSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["task", "event"], // Adjust the values as needed
      message: "Type must be either 'task' or 'event'"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: { type: String, required: true },
    clockIn: { type: Date, required: true },
    clockOut: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > this.clockIn;
        },
        message: "Clock-out time must be after clock-in time"
      }
    },
    timeSpent: {
      type: Number,
      required: true,
      min: [0, "Time spent cannot be negative"]
    },

    pointsEarned: {
      type: Number,
      required: true,
      min: [0, "Points earned cannot be negative"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TimeRecord", TimeRecordSchema);
