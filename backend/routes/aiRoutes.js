const express = require("express");
const { getShareInsights } = require("../controllers/aiController");

const router = express.Router();

router.post("/insights", getShareInsights);

module.exports = router;
