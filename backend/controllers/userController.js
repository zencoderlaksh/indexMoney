const getProfile = (req, res) => {
  res.json({
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
  });
};

module.exports = {
  getProfile,
};
