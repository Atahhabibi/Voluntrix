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
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      required: true,
      min: [0, "Points must be a positive number"]
    },
    totalCompleted: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Total completed cannot be negative"]
    },
    totalSignedUp: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Total signed up cannot be negative"]
    },
    volunteersNeeded: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Volunteers cannot be negative"]
    },
    volunteersAssigned: {
      type: [volunteerSchema],
      validate: [
        {
          validator: function (v) {
            return v.length <= this.volunteersNeeded;
          },
          message: "Volunteers assigned cannot exceed volunteers needed"
        },
        {
          validator: function (v) {
            const uniqueVolunteers = new Set(
              v.map((vol) => vol.volunteerId.toString())
            );
            return uniqueVolunteers.size === v.length;
          },
          message: "Duplicate volunteers are not allowed"
        }
      ]
    }
  },

  { timestamps: true }
);

taskSchema.pre("save", function (next) {
  if (this.volunteersNeeded < 0) {
    this.volunteersNeeded = 0;
  }

  if (this.totalSignedUp < 0) {
    this.totalSignedUp = 0;
  }

  if (this.totalSignUp > this.volunteersNeeded) {
    this.totalSignUp = this.volunteersNeeded;
  }

  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
