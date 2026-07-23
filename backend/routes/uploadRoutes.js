const express = require("express");
const { upload } = require("../config/cloudinary");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

// POST /api/upload
// Note: We use requireAdmin middleware to ensure only admin users can upload
router.post("/", requireAdmin, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
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
