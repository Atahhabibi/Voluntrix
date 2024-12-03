const mongoose = require("mongoose"); // Use require instead of import

// Define the schema
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type:String,
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
      default:1,
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

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
