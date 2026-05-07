const express = require("express");
const { getProfile, listUsers } = require("../controllers/userController");
const { requireAuth, requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", requireAuth, getProfile);
router.get("/", requireAdmin, listUsers);

module.exports = router;
