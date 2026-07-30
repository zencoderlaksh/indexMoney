const express = require("express");
const {
  getActiveLiveNews,
  getAllLiveNewsAdmin,
  createLiveNews,
  updateLiveNews,
  deleteLiveNews,
} = require("../controllers/liveNewsController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

// Public route: Get active live news
router.get("/", getActiveLiveNews);

// Admin routes
router.get("/admin", requireAdmin, getAllLiveNewsAdmin);
router.post("/admin", requireAdmin, createLiveNews);
router.put("/admin/:id", requireAdmin, updateLiveNews);
router.delete("/admin/:id", requireAdmin, deleteLiveNews);

module.exports = router;
