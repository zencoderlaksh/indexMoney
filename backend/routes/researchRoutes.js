const express = require("express");
const {
  createResearch,
  deleteResearch,
  getAdminResearch,
  getPublishedResearchBySlug,
  getPublishedResearch,
  updateResearch,
} = require("../controllers/researchController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getPublishedResearch);
router.get("/admin", requireAdmin, getAdminResearch);
router.post("/admin", requireAdmin, createResearch);
router.put("/admin/:id", requireAdmin, updateResearch);
router.delete("/admin/:id", requireAdmin, deleteResearch);
router.get("/:slug", getPublishedResearchBySlug);

module.exports = router;
