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
    points: {
      type: Number,
      required: true
    },

    totalAttended: {
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
      default: 0
    },
    volunteersAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        status: {
          type: String,
          enum: ["not_sign_up", "signedUp.", "completed"],
          default: "not_sign_up"
        },
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
