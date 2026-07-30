const express = require("express");
const {
  getActiveLiveNews,
  getAllLiveNewsAdmin,
  createLiveNews,
  updateLiveNews,
  deleteLiveNews,
} = require("../controllers/liveNewsController");
const auth = require("../middlewares/auth");

const router = express.Router();

// Public route: Get active live news
router.get("/", getActiveLiveNews);

// Admin routes
router.get("/admin", auth, getAllLiveNewsAdmin);
router.post("/admin", auth, createLiveNews);
router.put("/admin/:id", auth, updateLiveNews);
router.delete("/admin/:id", auth, deleteLiveNews);

module.exports = router;
