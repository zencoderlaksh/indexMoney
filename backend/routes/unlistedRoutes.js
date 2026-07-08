const express = require("express");
const {
  getLatestUnlistedOpportunities,
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

module.exports = router;
