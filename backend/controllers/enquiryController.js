/**
 * Enquiry controller.
 *
 * Provides endpoints to create/list enquiries submitted from the frontend.
 */
const Enquiry = require("../models/enquiryModel");

const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, planType, agreePolicy } = req.body;

    // Basic server-side validation (frontend also validates via Zod)
    if (!name || !email || !phone || !planType || agreePolicy !== true) {
      return res.status(400).json({ error: "Invalid enquiry payload" });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      planType,
      agreePolicy,
    });
    res.status(201).json({ data: enquiry });
  } catch (err) {
    next(err);
  }
};

const listEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ data: enquiries });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEnquiry,
  listEnquiries,
};
