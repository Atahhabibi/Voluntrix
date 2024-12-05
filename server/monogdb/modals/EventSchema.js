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

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      required: true,
      min: [0, "Points must be a positive number"]
    },
    totalAttended: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Total attended cannot be negative"]
    },
    totalSignUp: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Total sign-ups cannot be negative"]
    },
    volunteersNeeded: {
      type: Number,
      required: true,
      default: 1,
      min: [0, "Volunteers needed must be at least 1"]
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

eventSchema.pre("save", function (next) {
  // Ensure `volunteersNeeded` is non-negative
  if (this.volunteersNeeded < 0) {
    this.volunteersNeeded = 0;
  }

  // Ensure `totalSignUp` is non-negative
  if (this.totalSignUp < 0) {
    this.totalSignUp = 0;
  }

  // Ensure `totalSignUp` does not exceed `volunteersNeeded`
  if (this.totalSignUp > this.volunteersNeeded) {
    this.totalSignUp = this.volunteersNeeded;
  }

  next();
});


// // Add instance method to add a volunteer
// eventSchema.methods.addVolunteer = function (volunteer) {
//   if (this.volunteersAssigned.length < this.volunteersNeeded) {
//     this.volunteersAssigned.push(volunteer);
//     this.totalSignUp += 1;
//     return this.save();
//   }
//   throw new Error("Volunteers needed limit reached");
// };

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
