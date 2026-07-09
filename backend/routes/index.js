const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const homepageRoutes = require("./homepageRoutes");
const performanceRoutes = require("./performanceRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");
const unlistedRoutes = require("./unlistedRoutes");
const blogRoutes = require("./blogRoutes");
const dematAccountRoutes = require("./dematAccountRoutes");
const videoRoutes = require("./videoRoutes");
const researchRoutes = require("./researchRoutes");
const mediaRoutes = require("./mediaRoutes");
const partnerRoutes = require("./partnerRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/homepage", homepageRoutes);
router.use("/performance", performanceRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/unlisted", unlistedRoutes);
router.use("/blogs", blogRoutes);
router.use("/demat-accounts", dematAccountRoutes);
router.use("/videos", videoRoutes);
router.use("/research", researchRoutes);
router.use("/media", mediaRoutes);
router.use("/partners", partnerRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
