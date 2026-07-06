const express = require("express");
const {
  createVideo,
  deleteVideo,
  getAdminVideos,
  getPublishedVideoBySlug,
  getPublishedVideos,
  updateVideo,
} = require("../controllers/videoController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getPublishedVideos);
router.get("/admin", requireAdmin, getAdminVideos);
router.post("/admin", requireAdmin, createVideo);
router.put("/admin/:id", requireAdmin, updateVideo);
router.delete("/admin/:id", requireAdmin, deleteVideo);
router.get("/:slug", getPublishedVideoBySlug);

module.exports = router;
