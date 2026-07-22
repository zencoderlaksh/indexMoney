const config = require("../config");

const isAdminUser = (user) => {
  if (!user) {
    return false;
  }

  const email = String(user.email || "").trim().toLowerCase();
  const hardcodedAdmins = ["infoindexmoney@gmail.com"];
  return Boolean(user.isAdmin) || Boolean(config.adminEmail && email === config.adminEmail) || hardcodedAdmins.includes(email);
};

const attachAdminFlag = (user) => {
  if (!user) {
    return user;
  }

  const plainUser = user.toObject ? user.toObject() : { ...user };
  plainUser.isAdmin = isAdminUser(plainUser);
  return plainUser;
};

module.exports = {
  isAdminUser,
  attachAdminFlag,
};
