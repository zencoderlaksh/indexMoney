const mongoose = require("mongoose");

const unlistedInquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    interestedCompany: { type: String, default: "", trim: true },
    investmentAmount: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("UnlistedInquiry", unlistedInquirySchema);
