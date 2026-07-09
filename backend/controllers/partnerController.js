const PartnerApplication = require("../models/partnerModel");

// POST /api/partners/apply
exports.submitApplication = async (req, res) => {
  try {
    const { fullName, email, phone, subject, source, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "Full name, email, and message are required." });
    }

    const application = await PartnerApplication.create({
      fullName,
      email,
      phone,
      subject,
      source,
      message,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error submitting partner application:", error);
    res.status(500).json({ error: "Server error. Could not submit application." });
  }
};

// GET /api/partners/applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await PartnerApplication.find().sort({ createdAt: -1 });
    res.json({ data: applications });
  } catch (error) {
    console.error("Error fetching partner applications:", error);
    res.status(500).json({ error: "Server error. Could not fetch applications." });
  }
};
