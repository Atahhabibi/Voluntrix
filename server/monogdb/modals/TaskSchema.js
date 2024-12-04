const mongoose = require("mongoose");

// Define a sub-schema for volunteersAssigned
const volunteerSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["not_sign_up", "signedUp", "completed"], // Removed typo in "signedUp."
    default: "not_sign_up"
  }
});

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    totalCompleted: {
      type: Number,
      required: true,
      default: 0
    },
    totalSignedUp: {
      type: Number,
      required: true,
      default: 0
    },
    volunteersNeeded: {
      type: Number,
      required: true,
      default: 1
    },
    volunteersAssigned: [volunteerSchema] // Use the sub-schema here
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
