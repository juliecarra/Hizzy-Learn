//cloudinary set up
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "profile-pictures",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(undefined, "profilePhoto");
  }
});

const upload = multer({ storage });

module.exports = upload;
