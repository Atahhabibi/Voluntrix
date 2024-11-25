const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    volunteers: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["not_signed_up", "pending", "completed"], 
      default: "not_signed_up"
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
