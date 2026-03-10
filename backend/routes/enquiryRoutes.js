const express = require("express");
const {
  createEnquiry,
  listEnquiries,
} = require("../controllers/enquiryController");

const router = express.Router();

// Create a new enquiry (public)
router.post("/", createEnquiry);

// List all enquiries (admin / internal use)
router.get("/", listEnquiries);

module.exports = router;
