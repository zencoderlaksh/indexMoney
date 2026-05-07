const User = require("../models/userModel");
const { attachAdminFlag } = require("../utils/admin");

const sanitizeListedUser = (user) => {
  const safeUser = attachAdminFlag(user);
  delete safeUser.password;
  delete safeUser.__v;
  return safeUser;
};

const getProfile = (req, res) => {
  res.json({ data: sanitizeListedUser(req.user) });
};

const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");
    const sanitizedUsers = users.map(sanitizeListedUser);
    res.json({
      data: sanitizedUsers,
      meta: {
        total: sanitizedUsers.length,
        admins: sanitizedUsers.filter((user) => Boolean(user.isAdmin)).length,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  listUsers,
};
