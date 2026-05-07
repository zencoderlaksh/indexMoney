/**
 * Authentication controller.
 *
 * Handles signup + login using MongoDB and JWT tokens.
 */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config");
const { attachAdminFlag, isAdminUser } = require("../utils/admin");

const sanitizeUser = (user) => {
  const { password, __v, ...rest } = attachAdminFlag(user);
  return rest;
};

const fs = require("fs");

const signup = async (req, res, next) => {
  try {
    fs.appendFileSync(
      "./signup.log",
      `\n[${new Date().toISOString()}] signup request: ${JSON.stringify(req.body)}\n`,
    );
  } catch {}

  try {
    const { fullName, email, password, mobileNumber, city } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!fullName || !normalizedEmail || !password || !mobileNumber || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName,
      email: normalizedEmail,
      password: hashed,
      mobileNumber,
      city,
      isAdmin: Boolean(config.adminEmail && normalizedEmail === config.adminEmail),
    });

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    res.status(201).json({ data: sanitizeUser(user), token });
  } catch (err) {
    try {
      fs.appendFileSync(
        "./signup.log",
        `[${new Date().toISOString()}] signup error: ${err?.message || err}\n${err?.stack || ""}\n`,
      );
    } catch {}

    console.error("[authController] signup error:", err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    if (!user.isAdmin && isAdminUser(user)) {
      user.isAdmin = true;
      await user.save();
    }

    res.json({ data: sanitizeUser(user), token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login,
};
