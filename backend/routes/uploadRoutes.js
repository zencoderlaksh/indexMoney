const express = require("express");
const { upload } = require("../config/cloudinary");
const auth = require("../middlewares/auth");

const router = express.Router();

// POST /api/upload
// Note: We use auth middleware to ensure only logged in users can upload
router.post("/", auth, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    
    // Check if the user is an admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied, admin only." });
    }

    res.json({
      message: "Image uploaded successfully",
      url: req.file.path,
    });
  } catch (error) {
    console.error("[uploadRoutes] Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
