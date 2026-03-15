/**
 * Enquiry Mongoose model.
 *
 * Stores visitor / lead submissions from the homepage enquiry form.
 */
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    planType: { type: String, required: true, trim: true },
    agreePolicy: { type: Boolean, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Enquiry", enquirySchema);
