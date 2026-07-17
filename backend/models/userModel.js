/**
 * Mongoose user model.
 *
 * Used for authentication (signup/login) and for any user-related data.
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobileNumber: { type: String, trim: true },
    city: { type: String, trim: true },
    isAdmin: { type: Boolean, default: false },
    isPartner: { type: Boolean, default: false },
    partnerStatus: {
      type: String,
      enum: ["none", "pending", "verified", "rejected"],
      default: "none",
    },
    partnerPaymentRef: { type: String, trim: true },
    otp: { type: String },
    otpExpiresAt: { type: Date },
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
