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

// PATCH /api/partners/:id/status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !["pending", "reviewed", "contacted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const application = await PartnerApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // If marked as reviewed (or contacted), automatically approve the user account if it exists
    if (status === "reviewed" || status === "contacted") {
      const User = require("../models/userModel");
      await User.findOneAndUpdate(
        { email: { $regex: new RegExp(`^${application.email}$`, "i") } },
        { isPartner: true, partnerStatus: "verified" }
      );
    }

    res.json({
      message: "Status updated successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Server error. Could not update status." });
  }
};

const User = require("../models/userModel");

// POST /api/partners/submit-payment
exports.submitPayment = async (req, res) => {
  try {
    const { paymentRef } = req.body;
    
    if (!paymentRef) {
      return res.status(400).json({ error: "Payment reference is required." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.partnerStatus === "verified" || user.isPartner) {
      return res.status(400).json({ error: "You are already a verified partner." });
    }

    user.partnerPaymentRef = paymentRef;
    user.partnerStatus = "pending";
    await user.save();

    res.json({ message: "Payment submitted successfully. Awaiting admin verification." });
  } catch (error) {
    console.error("Error submitting partner payment:", error);
    res.status(500).json({ error: "Server error. Could not submit payment." });
  }
};

// GET /api/partners/verifications
exports.getVerifications = async (req, res) => {
  try {
    const partners = await User.find({ partnerStatus: { $in: ["pending", "verified", "rejected"] } })
      .sort({ createdAt: -1 })
      .select("-otp -otpExpiresAt -password");
    res.json({ data: partners });
  } catch (error) {
    console.error("Error fetching partner verifications:", error);
    res.status(500).json({ error: "Server error. Could not fetch verifications." });
  }
};

// PATCH /api/partners/verifications/:id/status
exports.updateVerificationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !["none", "pending", "verified", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const isPartner = status === "verified";

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { partnerStatus: status, isPartner },
      { new: true }
    ).select("-otp -otpExpiresAt -password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Verification status updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating verification status:", error);
    res.status(500).json({ error: "Server error. Could not update status." });
  }
};
