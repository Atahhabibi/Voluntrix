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
const multer = require("multer");
const { storage } = require("./util/cloudinaryConfig");
const Admin = require("./monogdb/modals/AdminSchema");
const jwt = require("jsonwebtoken");

const upload = multer({ storage });

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

    const token = generateToken(user._id, user.username, user.role);

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
      volunteersNeeded: Number(volunteers),
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
    const {
      name,
      type,
      location,
      time,
      date,
      description,
      points,
      volunteersNeeded
    } = req.body;

    const event = new Event({
      name,
      type,
      location,
      time,
      description,
      date,
      points,
      volunteersNeeded
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
    // Update task status
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: "pending" },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if task is already assigned
    if (user.tasks && user.tasks.includes(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Already signed up for this task"
      });
    }

    // Add the task ID to the user's tasks
    user.tasks = user.tasks || []; // Initialize tasks if undefined
    user.tasks.push(taskId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Task assigned successfully"
    });
  } catch (error) {
    console.error("Error in /api/v1/tasks/:id/signup:", error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

app.post("/api/v1/events/:id/signup", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const eventId = req.params.id;

  try {
    // Find the event and user
    const event = await Event.findByIdAndUpdate(
      eventId,
      { status: "pending" },
      { new: true }
    );

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
    const { name, clockIn, clockOut, timeSpent, pointsEarned, id, itemType } =
      req.body;

    if (
      !name ||
      !clockIn ||
      !clockOut ||
      !timeSpent ||
      !pointsEarned ||
      !id ||
      !itemType
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request data" });
    }

    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create and save the new time record
    const timeRecord = new TimeRecord({
      userId: req.userId,
      type: itemType,
      name,
      clockIn,
      clockOut,
      timeSpent: Number(timeSpent),
      pointsEarned: Number(pointsEarned)
    });

    if (itemType === "task") {
      const task = await Task.findByIdAndUpdate(
        id,
        { status: "completed" },
        { new: true }
      );
      if (!task) {
        return res
          .status(404)
          .json({ success: false, message: "Task not found" });
      }
    }

    if (itemType === "event") {
      const event = await Event.findByIdAndUpdate(
        id,
        { status: "completed" },
        { new: true }
      );
      if (!event) {
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      }
    }

    await timeRecord.save();

    // Increment user's total points and hoursWorked
    await User.findByIdAndUpdate(
      req.userId,
      {
        $inc: {
          totalPoints: Number(pointsEarned),
          hoursWorked: Number(timeSpent)
        },
        $push: { timeRecords: timeRecord._id }
      },
      { new: true }
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
        .json({ success: true, message: "No records found", data: [] });
    }

    res.status(200).json({ success: true, data: timeRecords });
  } catch (error) {
    console.error("Error fetching time records:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post(
  "/api/v1/upload",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    try {
      // Cloudinary automatically stores the file and returns the URL
      const fileUrl = req.file.path; // This is the URL of the uploaded image

      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { profileImage: req.file.path },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({ success: false, message: "Upload failed" });
    }
  }
);

app.put("/api/v1/user", authMiddleware, async (req, res) => {
  const { email, password, profileImage, username } = req.body;

  try {
    const updateFields = {};
    if (email) updateFields.email = email;
    if (username) updateFields.username = username;
    if (profileImage) updateFields.profileImage = profileImage;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.userId, updateFields, {
      new: true
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const { password: _, ...responseUser } = user._doc;

    res.status(200).json({ success: true, data: responseUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update user. Please try again."
    });
  }
});

app.get("/api/v1/tasks-events", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have a middleware to set req.userId

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Fetch the user
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const taskIds = user.tasks || [];
    const eventIds = user.events || [];

    // Fetch tasks and events based on IDs
    const tasks = await Task.find({ _id: { $in: taskIds } });
    const events = await Event.find({ _id: { $in: eventIds } });

    res.status(200).json({ success: true, tasks, events });
  } catch (error) {
    console.error("Error fetching tasks and events:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

app.delete("/api/v1/deleteVolunteer/:id", async (req, res) => {
  try {
    const volunteer = await User.findOneAndDelete({ _id: req.params.id });

    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, message: "Volunteer not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/v1/admin-volunteers", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/v1/admin-tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/v1/admin-events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/v1/admin-time-records", async (req, res) => {
  try {
    const timeRecords = await TimeRecord.find();
    res.status(200).json({ success: true, data: timeRecords });
  } catch (error) {
    console.error("Error fetching time records:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/v1/volunteer/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Volunteer ID is required" });
    }

    // Fetch volunteer data excluding password
    const volunteer = await User.findById(id).select("-password");
    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, message: "Volunteer not found" });
    }

    // Fetch tasks, events, and time records if referenced in the schema
    const tasks =
      volunteer.tasks && Array.isArray(volunteer.tasks)
        ? await Task.find({ _id: { $in: volunteer.tasks } })
        : [];
    const events =
      volunteer.events && Array.isArray(volunteer.events)
        ? await Event.find({ _id: { $in: volunteer.events } })
        : [];
    const timeRecords = await TimeRecord.findOne({ userId: volunteer._id });

    res.status(200).json({
      success: true,
      data: {
        volunteer,
        tasks,
        events,
        timeRecords
      }
    });
  } catch (error) {
    console.error("Error fetching volunteer data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// Promote to Admin
app.post("/promote", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: `${email} promoted to admin` });
  } catch (err) {
    res.status(500).json({ message: "Error promoting user", error: err });
  }
});

app.post("/api/v1/adminLogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role,username:admin.username},
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login error",
      error: error.message
    });
  }
});

app.get("/api/v1/admin", authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById({ _id: req.userId }).select("-password");

    res.status(200).json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>HOME PAGE</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
