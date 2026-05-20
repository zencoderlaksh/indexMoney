const mongoose = require("mongoose");

const dematAccountSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("DematAccount", dematAccountSchema);
