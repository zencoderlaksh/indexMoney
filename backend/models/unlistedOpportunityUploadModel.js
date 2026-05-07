const mongoose = require("mongoose");

const unlistedOpportunitySchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    sector: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    minimumInvestment: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
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
