const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    profileImage: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Default image URL (set the correct path)
    },

    role: {
      type: String,

      enum: ["super-admin", "admin"],
      default: "admin"
    }
  },
  {
    timestamps: true
  }
);


const Admin=mongoose.model('Admin',adminSchema); 

module.exports=Admin; 