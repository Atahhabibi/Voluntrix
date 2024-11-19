const mongoose = require("mongoose"); // Use require instead of import

// Define the schema
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  date: {
    type: String,
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
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
