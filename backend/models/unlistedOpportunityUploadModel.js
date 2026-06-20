const mongoose = require("mongoose");

const unlistedOpportunitySchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    sector: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    minimumInvestment: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    slug: { type: String, trim: true },
    logoUrl: { type: String, trim: true },
    badge: { type: String, trim: true },
    description: { type: String, trim: true },
    marketCap: { type: String, trim: true },
    isin: { type: String, trim: true },
    faceValue: { type: String, trim: true },
    eps: { type: String, trim: true },
    pbRatio: { type: String, trim: true },
    bookValue: { type: String, trim: true },
    debtEquityRatio: { type: String, trim: true },
    settlementPeriod: { type: String, trim: true },
    minUnits: { type: String, trim: true },
    aboutCompany: { type: String, trim: true },
    strengths: { type: String, trim: true },
    weaknesses: { type: String, trim: true },
  },
  { _id: false },
);

const unlistedOpportunityUploadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Latest Unlisted Opportunities",
      trim: true,
    },
    sourceFileName: { type: String, required: true, trim: true },
    opportunities: {
      type: [unlistedOpportunitySchema],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one unlisted opportunity row is required",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "UnlistedOpportunityUpload",
  unlistedOpportunityUploadSchema,
);
