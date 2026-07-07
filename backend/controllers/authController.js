/**
 * Authentication controller.
 *
 * Handles OTP-based signup + login using MongoDB and JWT tokens.
 */
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config");
const { attachAdminFlag, isAdminUser } = require("../utils/admin");
const fs = require("fs");

const sanitizeUser = (user) => {
  const { otp, otpExpiresAt, __v, ...rest } = attachAdminFlag(user);
  return rest;
};

const sendOtp = async (req, res, next) => {
  try {
    const { email, mobileNumber, firstName, lastName } = req.body;
    
    // We can accept email or mobile. Let's assume email is the primary identifier for now,
    // but the design says "Enter your email or mobile". We'll handle email as the primary key if provided.
    // If mobile is provided without email, we'll use mobile.
    if (!email && !mobileNumber) {
      return res.status(400).json({ error: "Email or mobile number is required" });
    }

    const normalizedEmail = email ? String(email).trim().toLowerCase() : undefined;
    const normalizedMobile = mobileNumber ? String(mobileNumber).trim() : undefined;

    let user;
    if (normalizedEmail) {
      user = await User.findOne({ email: normalizedEmail });
    } else if (normalizedMobile) {
      user = await User.findOne({ mobileNumber: normalizedMobile });
    }

    // If user doesn't exist and this is a login attempt (no firstName provided),
    // we should return a 404 so the frontend knows to redirect to Signup details.
    if (!user && (!firstName || !lastName)) {
      return res.status(404).json({ error: "User not found, please sign up." });
    }

    // If user doesn't exist but we have firstName and lastName, create them (Signup)
    if (!user) {
      if (!normalizedEmail) {
         return res.status(400).json({ error: "Email is required for signup" });
      }
      user = await User.create({
        firstName,
        lastName,
        email: normalizedEmail,
        mobileNumber: normalizedMobile,
        isAdmin: Boolean(config.adminEmail && normalizedEmail === config.adminEmail),
      });
    }

    // Generate a 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    user.otp = generatedOtp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    // Log the OTP (Simulating SMS/Email sending)
    console.log(`\n======================================`);
    console.log(`🔑 OTP for ${user.email || user.mobileNumber}: ${generatedOtp}`);
    console.log(`======================================\n`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("[authController] sendOtp error:", err);
    next(err);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, mobileNumber, otp } = req.body;
    
    if ((!email && !mobileNumber) || !otp) {
      return res.status(400).json({ error: "Email/Mobile and OTP are required" });
    }

    const normalizedEmail = email ? String(email).trim().toLowerCase() : undefined;
    const normalizedMobile = mobileNumber ? String(mobileNumber).trim() : undefined;

    let user;
    if (normalizedEmail) {
      user = await User.findOne({ email: normalizedEmail });
    } else if (normalizedMobile) {
      user = await User.findOne({ mobileNumber: normalizedMobile });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.otp || user.otp !== String(otp)) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    if (user.otpExpiresAt && new Date() > user.otpExpiresAt) {
      return res.status(401).json({ error: "OTP has expired" });
    }

    // Clear the OTP
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    
    // Check admin flag
    if (!user.isAdmin && isAdminUser(user)) {
      user.isAdmin = true;
    }
    
    await user.save();

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    res.json({ data: sanitizeUser(user), token });
  } catch (err) {
    console.error("[authController] verifyOtp error:", err);
    next(err);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};
