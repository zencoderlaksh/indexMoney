const express = require("express");
const userRoutes = require("./userRoutes");
const enquiryRoutes = require("./enquiryRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/enquiries", enquiryRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
