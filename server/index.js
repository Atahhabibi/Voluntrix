const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./monogdb/connect");
const cors = require("cors");
const User = require("./monogdb/modals/userSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("./util/createJsonWebToken");
const authMiddleware = require("./middleware/authMiddleware");
const Task = require("./monogdb/modals/TaskSchema");
const validateEvent = require("./middleware/validateEvent");
const Event = require("./monogdb/modals/EventSchema");

require("dotenv").config(); // Load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000; // Get PORT from .env or default to 5000

connectDB();

app.post("/api/v1/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // If no existing user, create a new one
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

app.post("/api/v1/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a user with the same email already exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.username);

    res.status(200).json({
      message: "Login successfully",
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

app.get("/api/v1/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/v1/tasks", async (req, res) => {
  try {
    const { name, date, time, volunteers, points } = req.body;

    if (!name || !date || !time || !volunteers || !points) {
      return res.status(400).json({
        error:
          "All fields are required. Please provide title, date, time, volunteerNeeded, and points."
      });
    }

    const task = new Task({
      name,
      date,
      time,
      volunteers: Number(volunteers),
      points: Number(points)
    });

    const savedTask = await task.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: savedTask
    });
  } catch (error) {
    console.error("Error creating task", error);

    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/v1/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res
      .status(200)
      .json({ success: true, message: "Tasks fetched succesfully", tasks });
  } catch (error) {
    console.log("Error in fetching tasks");
    res.status(500).json({
      success: false,
      error: "Internal server error. Unable to fetch tasks."
    });
  }
});

app.post("/api/v1/events", validateEvent, async (req, res) => {
  try {
    const { name, type, location, time, date, description } = req.body;

    const event = new Event({
      name,
      type,
      location,
      time,
      description,
      date
    });

    const savedEvent = event.save();
    res.status(200).json({ success: true, event: savedEvent });
  } catch (error) {
    res.status(200).json({ success: false });
  }
});

app.get("/api/v1/events", async (req, res) => {
  const events = await Event.find();

  res.status(200).json({ success: true, events });
});

app.get("/api/v1/events/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });

    if (!event) {
      res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, event });
  } catch (error) {
    // Handle potential errors (e.g., invalid ID format)
    console.error("Error fetching event:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/api/v1/events/:id", async (req, res) => {
  try {
    const event = await Event.deleteOne({ _id: req.params.id });

    if (event.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.put("/api/v1/events/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // The updated event data

  try {
    // Find the event by ID and update it with the provided data
    const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true // Ensure validation rules are applied
    });

    // If no event is found with the given ID, return a 404
    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});


app.get("/", (req, res) => {
  res.status(200).send("<h1>HOME PAGE</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
