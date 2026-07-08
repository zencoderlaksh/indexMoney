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
const nodemailer = require("nodemailer");

const sanitizeUser = (user) => {
  const { otp, otpExpiresAt, __v, ...rest } = attachAdminFlag(user);
  return rest;
};

const sendOtp = async (req, res, next) => {
  try {
    const { email, firstName, lastName } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    let user = await User.findOne({ email: normalizedEmail });

    // If user doesn't exist and this is a login attempt (no firstName provided),
    // we should return a 404 so the frontend knows to redirect to Signup details.
    if (!user && (!firstName || !lastName)) {
      return res.status(404).json({ error: "User not found, please sign up." });
    }

    // If user doesn't exist but we have firstName and lastName, create them (Signup)
    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email: normalizedEmail,
        isAdmin: Boolean(config.adminEmail && normalizedEmail === config.adminEmail),
      });
    }

    // Generate a 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    user.otp = generatedOtp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    // Send the OTP using Nodemailer if configured
    if (config.smtpHost && config.smtpUser) {
      const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: config.smtpPort == 465, 
        auth: {
          user: config.smtpUser,
          pass: config.smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Index Money" <${config.smtpFrom}>`,
        to: normalizedEmail,
        subject: "Your Login OTP - Index Money",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #0353a4;">Welcome to Index Money</h2>
            <p>Your One-Time Password (OTP) for login/signup is:</p>
            <h1 style="color: #023e7d; font-size: 36px; letter-spacing: 4px;">${generatedOtp}</h1>
            <p style="color: #666; font-size: 14px;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
          </div>
        `,
      });
      console.log(`✉️ Email OTP sent to ${normalizedEmail}`);
    } else {
      // Log the OTP (Simulating SMS/Email sending if no SMTP configured)
      console.log(`\n======================================`);
      console.log(`🔑 [No SMTP Configured] OTP for ${normalizedEmail}: ${generatedOtp}`);
      console.log(`======================================\n`);
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("[authController] sendOtp error:", err);
    next(err);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    let user = await User.findOne({ email: normalizedEmail });

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
