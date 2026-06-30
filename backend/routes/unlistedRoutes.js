const express = require("express");
const {
  createUnlistedInquiry,
  getLatestUnlistedOpportunities,
  listUnlistedInquiries,
  createUnlistedOpportunity,
  updateUnlistedOpportunity,
  deleteUnlistedOpportunity,
} = require("../controllers/unlistedController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/opportunities", getLatestUnlistedOpportunities);
router.post("/opportunities", requireAdmin, createUnlistedOpportunity);
router.put("/opportunities/:id", requireAdmin, updateUnlistedOpportunity);
router.delete("/opportunities/:id", requireAdmin, deleteUnlistedOpportunity);

router.post("/inquiries", createUnlistedInquiry);
router.get("/inquiries", requireAdmin, listUnlistedInquiries);

module.exports = router;
