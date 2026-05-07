const express = require("express");
const {
  getHomepageContent,
  renderHomepageManager,
  updateHomepageContent,
} = require("../controllers/homepageController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getHomepageContent);
router.post("/", requireAdmin, updateHomepageContent);
router.get("/manage", requireAdmin, renderHomepageManager);

module.exports = router;
