const express = require("express");
const {
  createMedia,
  deleteMedia,
  getAdminMedia,
  getPublishedMedia,
  updateMedia,
} = require("../controllers/mediaController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getPublishedMedia);
router.get("/admin", requireAdmin, getAdminMedia);
router.post("/admin", requireAdmin, createMedia);
router.put("/admin/:id", requireAdmin, updateMedia);
router.delete("/admin/:id", requireAdmin, deleteMedia);

module.exports = router;
