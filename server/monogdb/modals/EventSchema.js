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
      required: true
    },
    date: {
      type: Date,
      required: true
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
      required: true
    },
    totalAttended: {
      type: Number,
      required: true,
      default: 0
    },
    totalSignUp: {
      type: Number,
      required: true,
      default: 0
    },
    volunteersNeeded: {
      type: Number,
      required: true,
      default: 1
    },
    volunteersAssigned: [volunteerSchema]
     
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
