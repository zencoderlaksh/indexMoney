require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const config = require("../config");
const PerformanceTrade = require("../models/performanceTradeModel");

const samplePath = path.join(__dirname, "..", "sample-data", "performance-sample.xlsx");

const parseRows = () => {
  const workbook = XLSX.readFile(samplePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" }).map((row) => ({
    tradeId: String(row.tradeId).trim(),
    date: String(row.date).trim(),
    index: String(row.index).trim(),
    callType: String(row.callType).trim(),
    entry: Number(row.entry),
    sl: Number(row.sl),
    target: Number(row.target),
    result: String(row.result).trim(),
    points: String(row.points).trim(),
    chartUrl: String(row.chartUrl || "").trim(),
    chartTitle: String(row.chartTitle || "").trim(),
    chartNotes: String(row.chartNotes || "").trim(),
  }));
};

const seed = async () => {
  if (!fs.existsSync(samplePath)) {
    throw new Error(`Sample file not found at ${samplePath}`);
  }

  await mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const trades = parseRows();

  // Clear existing standalone trades
  await PerformanceTrade.deleteMany({});

  const seeded = await PerformanceTrade.create(trades);

  console.log(`Seeded ${seeded.length} standalone performance trades.`);
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
