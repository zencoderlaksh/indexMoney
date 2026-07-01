const UnlistedOpportunity = require("../models/unlistedOpportunityModel");
const UnlistedInquiry = require("../models/unlistedInquiryModel");

const createSlug = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getLatestUnlistedOpportunities = async (req, res, next) => {
  try {
    const opportunities = await UnlistedOpportunity.find().sort({ company: 1 });
    res.json({
      data: {
        title: "Latest Unlisted Opportunities",
        opportunities,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createUnlistedOpportunity = async (req, res, next) => {
  try {
    const { company, sector, price, minimumInvestment, status } = req.body;
    if (!company || !sector || !price || !minimumInvestment || !status) {
      return res.status(400).json({ error: "Missing required fields: company, sector, price, minimumInvestment, status" });
    }

    const body = { ...req.body };
    if (!body.id) delete body.id;
    if (!body._id) delete body._id;

    if (!body.slug) {
      body.slug = createSlug(company);
    }
    if (!body.code) {
      body.code = company.split(/\s+/).map(w => w[0]).join("").toUpperCase();
    }

    const opportunity = await UnlistedOpportunity.create(body);
    res.status(201).json({ data: opportunity });
  } catch (err) {
    next(err);
  }
};

const updateUnlistedOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company, sector, price, minimumInvestment, status } = req.body;
    if (!company || !sector || !price || !minimumInvestment || !status) {
      return res.status(400).json({ error: "Missing required fields: company, sector, price, minimumInvestment, status" });
    }

    const body = { ...req.body };
    if (!body.slug) {
      body.slug = createSlug(company);
    }
    if (!body.code) {
      body.code = company.split(/\s+/).map(w => w[0]).join("").toUpperCase();
    }

    const opportunity = await UnlistedOpportunity.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!opportunity) {
      return res.status(404).json({ error: "Opportunity not found" });
    }

    res.json({ data: opportunity });
  } catch (err) {
    next(err);
  }
};

const deleteUnlistedOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opportunity = await UnlistedOpportunity.findByIdAndDelete(id);

    if (!opportunity) {
      return res.status(404).json({ error: "Opportunity not found" });
    }

    res.json({ message: "Unlisted opportunity deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const createUnlistedInquiry = async (req, res, next) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      interestedCompany,
      investmentAmount,
      message,
    } = req.body;

    if (!fullName || !mobileNumber || !email) {
      return res.status(400).json({
        error: "Full name, mobile number, and email are required",
      });
    }

    const inquiry = await UnlistedInquiry.create({
      fullName,
      mobileNumber,
      email,
      interestedCompany,
      investmentAmount,
      message,
    });

    res.status(201).json({
      data: inquiry,
      message: "Unlisted shares inquiry submitted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

const listUnlistedInquiries = async (req, res, next) => {
  try {
    const inquiries = await UnlistedInquiry.find().sort({ createdAt: -1 });
    res.json({ data: inquiries });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUnlistedInquiry,
  getLatestUnlistedOpportunities,
  listUnlistedInquiries,
  createUnlistedOpportunity,
  updateUnlistedOpportunity,
  deleteUnlistedOpportunity,
};
