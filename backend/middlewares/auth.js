const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config");
const { isAdminUser } = require("../utils/admin");

const authenticateRequest = async (req) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    const error = new Error("Authentication required");
    error.status = 401;
    throw error;
  }

  const decoded = jwt.verify(token, config.jwtSecret);
  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    const error = new Error("Invalid token user");
    error.status = 401;
    throw error;
  }

  return user;
};

const requireAuth = async (req, res, next) => {
  try {
    const user = await authenticateRequest(req);
    req.user = user;
    next();
  } catch (err) {
    const status = err.status || 401;
    const errorMessage =
      status === 401 && err.message !== "Authentication required"
        ? "Invalid or expired token"
        : err.message;
    return res.status(status).json({ error: errorMessage });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    const user = await authenticateRequest(req);
    req.user = user;
    if (!isAdminUser(req.user)) {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user.isAdmin = true;
    next();
  } catch (err) {
    const status = err.status || 401;
    const errorMessage =
      status === 401 && err.message !== "Authentication required"
        ? "Invalid or expired token"
        : err.message;
    return res.status(status).json({ error: errorMessage });
  }
};

module.exports = {
  requireAuth,
  requireAdmin,
};
