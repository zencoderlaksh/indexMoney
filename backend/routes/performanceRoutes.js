const express = require("express");
const multer = require("multer");
const {
  getLatestPerformance,
  getPerformanceTrade,
  renderUploadForm,
  uploadPerformanceSheet,
} = require("../controllers/performanceController");
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

router.get("/", getLatestPerformance);
router.get("/trades/:tradeId", getPerformanceTrade);
router.get("/upload-form", requireAdmin, renderUploadForm);
router.post("/upload", requireAdmin, upload.single("file"), uploadPerformanceSheet);

module.exports = router;
