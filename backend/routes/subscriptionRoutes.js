const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { createSubscriptionRequest } = require("../controllers/subscriptionController");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads", "subscriptions");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = ext || ".png";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const isImage = /^image\//i.test(file.mimetype || "");
    cb(isImage ? null : new Error("Only image files are allowed"), isImage);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/", upload.single("screenshot"), createSubscriptionRequest);

module.exports = router;
