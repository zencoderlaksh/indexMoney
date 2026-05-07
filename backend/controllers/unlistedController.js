const XLSX = require("xlsx");
const UnlistedOpportunityUpload = require("../models/unlistedOpportunityUploadModel");
const UnlistedInquiry = require("../models/unlistedInquiryModel");

const HEADER_ALIASES = {
  company: ["company", "company name", "name"],
  sector: ["sector", "industry"],
  price: ["price", "indicative price", "rate"],
  minimumInvestment: ["minimuminvestment", "minimum investment", "minimum shares"],
  status: ["status", "availability"],
};

const normalizeHeader = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

const findValue = (row, aliases) => {
  for (const [key, value] of Object.entries(row)) {
    if (aliases.includes(normalizeHeader(key))) {
      return value;
    }
  }

  return "";
};

const parseRows = (buffer) => {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("The uploaded Excel file does not contain any worksheet");
  }

  const worksheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  if (!rows.length) {
    throw new Error("The uploaded Excel file is empty");
  }

  return rows.map((row, index) => {
    const opportunity = {
      company: String(findValue(row, HEADER_ALIASES.company)).trim(),
      sector: String(findValue(row, HEADER_ALIASES.sector)).trim(),
      price: String(findValue(row, HEADER_ALIASES.price)).trim(),
      minimumInvestment: String(
        findValue(row, HEADER_ALIASES.minimumInvestment),
      ).trim(),
      status: String(findValue(row, HEADER_ALIASES.status)).trim(),
    };

    if (
      !opportunity.company ||
      !opportunity.sector ||
      !opportunity.price ||
      !opportunity.minimumInvestment ||
      !opportunity.status
    ) {
      throw new Error(
        `Row ${index + 2} is invalid. Required columns: company, sector, price, minimumInvestment, status`,
      );
    }

    return opportunity;
  });
};

const getLatestUnlistedOpportunities = async (req, res, next) => {
  try {
    const latestUpload = await UnlistedOpportunityUpload.findOne().sort({
      createdAt: -1,
    });

    res.json({ data: latestUpload || null });
  } catch (err) {
    next(err);
  }
};

const uploadUnlistedSheet = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an Excel file" });
    }

    const opportunities = parseRows(req.file.buffer);
    const title =
      String(req.body?.title || "").trim() || "Latest Unlisted Opportunities";

    const upload = await UnlistedOpportunityUpload.create({
      title,
      sourceFileName: req.file.originalname,
      opportunities,
    });

    res.status(201).json({
      data: upload,
      message: `Imported ${opportunities.length} unlisted opportunity rows successfully.`,
    });
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
  uploadUnlistedSheet,
};
