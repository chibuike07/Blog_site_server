const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const {
  CLOUDINARY_CLOUD_HOST,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_HOST,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "netapps_technology",
    format: async () => "png",
    public_id: (req, file) => file.filename,
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

try {
  const userProfileImage = multer({ storage: storage });
  module.exports = { userProfileImage };
} catch (error) {
  console.log("object", error);
  throw error;
}
