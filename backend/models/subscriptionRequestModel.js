const mongoose = require("mongoose");

const subscriptionRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    planName: { type: String, required: true, trim: true },
    txnId: { type: String, required: true, trim: true },
    screenshotOriginalName: { type: String, required: true, trim: true },
    screenshotStoredName: { type: String, required: true, trim: true },
    screenshotPath: { type: String, required: true, trim: true },
    status: {
      type: String,
      default: "Pending Verification",
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "SubscriptionRequest",
  subscriptionRequestSchema,
);
