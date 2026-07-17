const express = require("express");
const { 
  submitApplication, 
  getApplications, 
  updateApplicationStatus,
  submitPayment,
  getVerifications,
  updateVerificationStatus
} = require("../controllers/partnerController");
const { requireAuth, requireAdmin } = require("../middlewares/auth");

const router = express.Router();

// Public route to submit an application
router.post("/apply", submitApplication);

// Admin route to view applications
router.get("/applications", requireAuth, requireAdmin, getApplications);

// Admin route to update application status
router.patch("/:id/status", requireAuth, requireAdmin, updateApplicationStatus);

// Partner route to submit payment reference
router.post("/submit-payment", requireAuth, submitPayment);

// Admin route to view partner verifications
router.get("/verifications", requireAuth, requireAdmin, getVerifications);

// Admin route to update partner verification status
router.patch("/verifications/:id/status", requireAuth, requireAdmin, updateVerificationStatus);

module.exports = router;
