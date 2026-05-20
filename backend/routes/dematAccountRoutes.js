const express = require("express");
const {
  createDematAccountRequest,
  listDematAccountRequests,
} = require("../controllers/dematAccountController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", createDematAccountRequest);
router.get("/", requireAdmin, listDematAccountRequests);

module.exports = router;
