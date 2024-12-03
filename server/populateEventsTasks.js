const connectDB = require("./monogdb/connect");
const sampleEvents = require("./util/sampleEvents");
const sampleTasks = require("./util/sampleTasks");
const mongoose = require("mongoose");
const Task = require("./monogdb/modals/TaskSchema");
const Event = require("./monogdb/modals/EventSchema");
const sampleUsers = require("./util/sampleUsers");
const User = require("./monogdb/modals/userSchema");

// Function to Seed Tasks and Events
const populateTasksAndEvents = async () => {
  try {
     await mongoose.connect("mongodb+srv://atahjan:Vz1XD8YFPhUsQ0WI@cluster0.6xqy6.mongodb.net/My_MOSQUE");
    console.log(`MongoDB Connected successfully`);
    await Event.deleteMany();
    console.log("Existing events cleared");
    await Task.deleteMany();
    console.log("Existing tasks cleared");
    await User.deleteMany();
    console.log("Existing tasks cleared");

    // Insert sample data
    await Event.insertMany(sampleEvents);
    console.log("Sample events added successfully");
    await Task.insertMany(sampleTasks);
    console.log("Sample tasks added successfully");
    await User.insertMany(sampleUsers);
    console.log("Sample tasks added successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating tasks and events:", error);
    mongoose.connection.close();
  }
};

// Run the function
populateTasksAndEvents();
