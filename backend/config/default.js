module.exports = {
  port: process.env.PORT || 3000,
  appName: "indexMoney API",
  // Default to the provided Atlas connection string (override with MONGO_URI in env for security)
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://infoindexmoney_db_user:RovHVV2ZXPPaVLTY@cluster0.chy5dck.mongodb.net/indexmoney?retryWrites=true&w=majority",
  // JWT secrets + expiry
  jwtSecret: process.env.JWT_SECRET || "indexmoney-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
