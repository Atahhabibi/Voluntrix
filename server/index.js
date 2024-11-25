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
const TimeRecord = require("./monogdb/modals/TimeRecordSchema");

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

app.delete("/api/v1/tasks/:id", async (req, res) => {
  try {
    // Attempt to delete the task
    const result = await Task.deleteOne({ _id: req.params.id });

    // Check if the task was found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No task found to delete"
      });
    }

    // Task deleted successfully
    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error deleting task:", error);

    // Send a 500 Internal Server Error response
    res.status(500).json({
      success: false,
      message: "Error in deleting task"
    });
  }
});

app.put("/api/v1/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and update the task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id }, // Find the task by ID
      req.body, // Update fields from the request body
      { new: true, runValidators: true } // Options to return updated document and validate inputs
    );

    // If the task does not exist
    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/v1/users", async (req, res) => {
  try {
    // Fetch all users except those with the role of "admin"
    const users = await User.find({ role: { $ne: "admin" } });

    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No volunteers available to show.",
        volunteers: []
      });
    }

    res.status(200).json({
      success: true,
      volunteers: users
    });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching volunteers."
    });
  }
});

app.get("/api/v1/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the user by ID
    const volunteer = await User.findOne({ _id: id });

    // Check if user exists
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found"
      });
    }

    // Return success response with the user
    res.status(200).json({
      success: true,
      volunteer
    });
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching volunteer"
    });
  }
});

app.get("/api/v1/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    res
      .status(200)
      .json({ success: true, message: "Fetched succesfullly", task });
  } catch (error) {
    res.status(500).json({ success: false, message: "error" });
  }
});

app.post("/api/v1/tasks/:id/signup", authMiddleware, async (req, res) => {
  const userId = req.userId; // Extracted from the decoded token
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.tasks.includes(taskId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already signed up" });
    }

    user.tasks.push(taskId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Task assigned successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/v1/events/:id/signup", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const eventId = req.params.id;

  try {
    // Find the event and user
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the user is already signed up
    if (user.events.includes(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already signed up" });
    }

    // Add the event to the user's list and save
    user.events.push(eventId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Event assigned successfully" });
  } catch (error) {
    console.error("Error assigning event:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/v1/tasks/IdList", async (req, res) => {
  const { taskids, eventIds } = req.body;

  try {
    const tasks = await Task.find({ _id: { $in: taskids } });
    const events = await Event.find({ _id: { $in: eventIds } });

    res.status(200).json({ success: true, data: { tasks, events } });
  } catch (error) {
    // Handle errors
    console.error("Error fetching tasks or events:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks or events",
      error: error.message
    });
  }
});

app.post("/api/v1/time-records", authMiddleware, async (req, res) => {
  try {
    const { taskName, clockIn, clockOut, timeSpent, pointsEarned } = req.body;

    // Find the user (optional if you just need to increment total points)
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create a new time record
    const timeRecord = new TimeRecord({
      userId: req.userId,
      taskName,
      clockIn,
      clockOut,
      timeSpent,
      pointsEarned
    });

    await timeRecord.save();

    // Increment the user's total points
    await User.findByIdAndUpdate(
      req.userId,
      { $inc: { totalPoints: pointsEarned } }, // Increment totalPoints by pointsEarned
      { new: true } // Return the updated document
    );

    res.status(201).json({
      success: true,
      message: "Time record saved and points updated!",
      data: timeRecord
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }

});


app.get("/api/v1/time-records", authMiddleware, async (req, res) => {
  try {
    const timeRecords = await TimeRecord.find({ userId: req.userId });

    if (!timeRecords || timeRecords.length === 0) {
      return res
        .status(200)
        .json({ success:true, message: "No records found",data:[]});
    }

    res.status(200).json({ success: true, data: timeRecords  });
  } catch (error) {
    console.error("Error fetching time records:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




app.get("/", (req, res) => {
  res.status(200).send("<h1>HOME PAGE</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
