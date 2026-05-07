const express = require("express");
const {
  createEnquiry,
  listEnquiries,
} = require("../controllers/enquiryController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

// Create a new enquiry (public)
router.post("/", createEnquiry);

// List all enquiries (admin / internal use)
router.get("/", requireAdmin, listEnquiries);

module.exports = router;
