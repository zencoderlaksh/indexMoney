const express = require("express");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/users", userRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
