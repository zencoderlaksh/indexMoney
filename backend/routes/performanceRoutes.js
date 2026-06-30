const express = require("express");
const {
  getLatestPerformance,
  getPerformanceTrade,
  createPerformanceTrade,
  updatePerformanceTrade,
  deletePerformanceTrade,
} = require("../controllers/performanceController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getLatestPerformance);
router.get("/trades/:tradeId", getPerformanceTrade);

router.post("/trades", requireAdmin, createPerformanceTrade);
router.put("/trades/:id", requireAdmin, updatePerformanceTrade);
router.delete("/trades/:id", requireAdmin, deletePerformanceTrade);

module.exports = router;
