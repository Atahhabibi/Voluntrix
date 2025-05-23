const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    //username=unique identifier for the user
    username: {
      type: String,
      required: true,
      unique: true, // ensures not two users can have the same username
      trim: true // removes any leading/trailing spaces,
    },

    hoursWorked: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Hours worked cannot be negative"]
    },

    //Email for authentication (e.g login)
    email: {
      type: String,
      required: true,
      unique: true, // ensures not two users can have the same username
      lowercase: true, // Ensures no two users can have the same email
      trim: true
    },

    //password=encrypted for security
    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "volunteer"], // Can only be one of these roles
      default: "volunteer" // Default is "volunteer" if not specified
    },

    // Tasks - a list of tasks assigned to the user (you can extend this to relate tasks)
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task" // Reference to Task model (if you have a Task collection)
      }
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
      }
    ],

    // Profile Image - stores the URL/path to the profile picture
    profileImage: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Default image URL (set the correct path)
    },

    totalPoints: {
      type: Number,
      default: 0,
      min: [0, " total points can not be negative"]
    },

    timeRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeRecord"
      }
    ],

  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
