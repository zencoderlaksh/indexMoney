const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configuration will be automatically loaded from CLOUDINARY_URL environment variable

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "indexmoney_blogs",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
  },
});

const upload = multer({ storage: storage });

module.exports = {
  cloudinary,
  upload,
};
