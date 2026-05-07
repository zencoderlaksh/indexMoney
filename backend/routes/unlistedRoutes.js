const express = require("express");
const multer = require("multer");
const {
  createUnlistedInquiry,
  getLatestUnlistedOpportunities,
  listUnlistedInquiries,
  uploadUnlistedSheet,
} = require("../controllers/unlistedController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isExcelFile = /\.(xlsx|xls)$/i.test(file.originalname);
    cb(
      isExcelFile ? null : new Error("Only .xlsx or .xls files are allowed"),
      isExcelFile,
    );
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/opportunities", getLatestUnlistedOpportunities);
router.post("/upload", requireAdmin, upload.single("file"), uploadUnlistedSheet);
router.post("/inquiries", createUnlistedInquiry);
router.get("/inquiries", requireAdmin, listUnlistedInquiries);

module.exports = router;
