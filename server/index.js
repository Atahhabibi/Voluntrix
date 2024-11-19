const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./monogdb/connect");
const cors = require("cors");
const User = require("./monogdb/modals/userSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("./util/createJsonWebToken");
const authMiddleware = require("./middleware/authMiddleware");
const Task = require("./monogdb/modals/TaskSchema");

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
      volunteers:Number(volunteers),
      points:Number(points)
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
    const tasks=await Task.find(); 
    res.status(200).json({success:true,message:"Tasks fetched succesfully",tasks})

    
  } catch (error) {

    console.log("Error in fetching tasks");
    res
      .status(500)
      .json({
        success: false,
        error: "Internal server error. Unable to fetch tasks."
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
