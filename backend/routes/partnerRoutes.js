const express = require("express");
const { submitApplication, getApplications } = require("../controllers/partnerController");
const { requireAuth, requireAdmin } = require("../middlewares/auth");

const router = express.Router();

// Public route to submit an application
router.post("/apply", submitApplication);

// Admin route to view applications
router.get("/applications", requireAuth, requireAdmin, getApplications);

module.exports = router;
