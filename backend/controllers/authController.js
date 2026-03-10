/**
 * Authentication controller.
 *
 * Handles signup + login using MongoDB and JWT tokens.
 */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config");

const sanitizeUser = (user) => {
  const { password, __v, ...rest } = user.toObject ? user.toObject() : user;
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

    if (!fullName || !email || !password || !mobileNumber || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName,
      email,
      password: hashed,
      mobileNumber,
      city,
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

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
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

    res.json({ data: sanitizeUser(user), token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login,
};
