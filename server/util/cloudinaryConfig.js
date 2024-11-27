const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_images", // Folder name in Cloudinary
    allowedFormats: ["jpeg", "png", "jpg"] // Allowed file types
  }
});

module.exports = { cloudinary, storage };
