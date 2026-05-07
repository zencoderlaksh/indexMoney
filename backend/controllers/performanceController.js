const crypto = require("crypto");
const XLSX = require("xlsx");
const PerformanceUpload = require("../models/performanceUploadModel");

const HEADER_ALIASES = {
  tradeId: ["tradeid", "trade id", "id"],
  date: ["date", "trade date"],
  index: ["index", "symbol", "instrument"],
  callType: ["calltype", "call type", "type"],
  entry: ["entry", "entry price"],
  sl: ["sl", "stop loss", "stoploss"],
  target: ["target", "target price"],
  result: ["result", "status"],
  points: ["points", "pnl", "profit/loss"],
  chartUrl: [
    "charturl",
    "chart url",
    "chart image",
    "chart image url",
    "chart link",
    "image url",
  ],
  chartTitle: ["charttitle", "chart title"],
  chartNotes: ["chartnotes", "chart notes", "notes"],
};

const normalizeHeader = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

const findValue = (row, aliases) => {
  for (const [key, value] of Object.entries(row)) {
    if (aliases.includes(normalizeHeader(key))) {
      return value;
    }
  }

  return "";
};

const parseNumber = (value) => {
  if (typeof value === "number") {
    return value;
  }

  const parsed = Number(String(value || "").replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : NaN;
};

const normalizeResult = (value) => {
  const raw = String(value || "").trim().toLowerCase();
  if (raw.includes("target")) return "Target Hit";
  if (raw.includes("sl")) return "SL Hit";
  return String(value || "").trim() || "Target Hit";
};

const buildTradeId = (row, index) => {
  const suppliedId = String(findValue(row, HEADER_ALIASES.tradeId)).trim();
  if (suppliedId) {
    return suppliedId;
  }

  const seed = `${findValue(row, HEADER_ALIASES.date)}-${findValue(
    row,
    HEADER_ALIASES.index,
  )}-${findValue(row, HEADER_ALIASES.callType)}-${index}-${Date.now()}`;

  return crypto.createHash("md5").update(seed).digest("hex").slice(0, 12);
};

const serializeUpload = (upload) => {
  if (!upload) {
    return null;
  }

  const plain = typeof upload.toObject === "function" ? upload.toObject() : upload;

  return {
    ...plain,
    trades: (plain.trades || []).map((trade, index) => ({
      ...trade,
      tradeId: trade.tradeId || `${plain._id || "trade"}-${index}`,
      chartUrl: trade.chartUrl || "",
      chartTitle: trade.chartTitle || "",
      chartNotes: trade.chartNotes || "",
    })),
  };
};

const parseSheetRows = (buffer) => {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("The uploaded Excel file does not contain any worksheet");
  }

  const worksheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  if (!rows.length) {
    throw new Error("The uploaded Excel file is empty");
  }

  return rows.map((row, index) => {
    const trade = {
      tradeId: buildTradeId(row, index),
      date: String(findValue(row, HEADER_ALIASES.date)).trim(),
      index: String(findValue(row, HEADER_ALIASES.index)).trim(),
      callType: String(findValue(row, HEADER_ALIASES.callType)).trim(),
      entry: parseNumber(findValue(row, HEADER_ALIASES.entry)),
      sl: parseNumber(findValue(row, HEADER_ALIASES.sl)),
      target: parseNumber(findValue(row, HEADER_ALIASES.target)),
      result: normalizeResult(findValue(row, HEADER_ALIASES.result)),
      points: String(findValue(row, HEADER_ALIASES.points)).trim(),
      chartUrl: String(findValue(row, HEADER_ALIASES.chartUrl)).trim(),
      chartTitle: String(findValue(row, HEADER_ALIASES.chartTitle)).trim(),
      chartNotes: String(findValue(row, HEADER_ALIASES.chartNotes)).trim(),
    };

    if (
      !trade.date ||
      !trade.index ||
      !trade.callType ||
      Number.isNaN(trade.entry) ||
      Number.isNaN(trade.sl) ||
      Number.isNaN(trade.target) ||
      !trade.points
    ) {
      throw new Error(
        `Row ${index + 2} is invalid. Required columns: date, index, callType, entry, sl, target, result, points`,
      );
    }

    return trade;
  });
};

const getLatestPerformance = async (req, res, next) => {
  try {
    const latestUpload = await PerformanceUpload.findOne().sort({
      createdAt: -1,
    });

    if (!latestUpload) {
      return res.json({ data: null });
    }

    res.json({ data: serializeUpload(latestUpload) });
  } catch (err) {
    next(err);
  }
};

const getPerformanceTrade = async (req, res, next) => {
  try {
    const latestUpload = await PerformanceUpload.findOne().sort({
      createdAt: -1,
    });

    if (!latestUpload) {
      return res.status(404).json({ error: "No performance upload found" });
    }

    const serialized = serializeUpload(latestUpload);
    const trade = serialized.trades.find(
      (item) => item.tradeId === req.params.tradeId,
    );

    if (!trade) {
      return res.status(404).json({ error: "Trade chart not found" });
    }

    res.json({
      data: {
        title: serialized.title,
        sourceFileName: serialized.sourceFileName,
        trade,
      },
    });
  } catch (err) {
    next(err);
  }
};

const uploadPerformanceSheet = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an Excel file" });
    }

    const trades = parseSheetRows(req.file.buffer);
    const title =
      String(req.body?.title || "").trim() || "Latest Uploaded Performance";

    const upload = await PerformanceUpload.create({
      title,
      sourceFileName: req.file.originalname,
      trades,
    });

    res.status(201).json({
      data: upload,
      message: `Imported ${trades.length} trade rows successfully.`,
    });
  } catch (err) {
    next(err);
  }
};

const renderUploadForm = (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>IndexMoney Performance Upload</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f3f7f7; color: #12343b; margin: 0; padding: 32px; }
      .card { max-width: 720px; margin: 0 auto; background: white; border-radius: 16px; padding: 28px; box-shadow: 0 18px 48px rgba(16, 95, 104, 0.08); }
      h1 { margin-top: 0; }
      p, li, label { line-height: 1.6; }
      input, button { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #c7dfe0; margin-top: 8px; box-sizing: border-box; }
      button { background: linear-gradient(135deg, #3a9295, #105f68); color: white; border: 0; font-weight: 700; cursor: pointer; margin-top: 18px; }
      code { background: #eef7f7; padding: 2px 6px; border-radius: 6px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Upload Performance Excel</h1>
      <p>Use this backend form to upload the latest trade sheet. The homepage will show entry, stop loss and target, and the full chart page will use the optional chart fields.</p>
      <p>Expected columns: <code>date</code>, <code>index</code>, <code>callType</code>, <code>entry</code>, <code>sl</code>, <code>target</code>, <code>result</code>, <code>points</code>.</p>
      <p>Optional columns for the chart detail page: <code>chartUrl</code>, <code>chartTitle</code>, <code>chartNotes</code>.</p>
      <form action="/api/performance/upload" method="post" enctype="multipart/form-data">
        <label>
          Upload title
          <input type="text" name="title" placeholder="April 2026 Performance" />
        </label>
        <label>
          Excel file (.xlsx or .xls)
          <input type="file" name="file" accept=".xlsx,.xls" required />
        </label>
        <button type="submit">Upload Sheet</button>
      </form>
    </div>
  </body>
</html>`);
};

module.exports = {
  getLatestPerformance,
  getPerformanceTrade,
  renderUploadForm,
  uploadPerformanceSheet,
};
