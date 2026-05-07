require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const config = require("../config");
const UnlistedOpportunityUpload = require("../models/unlistedOpportunityUploadModel");

const samplePath = path.join(
  __dirname,
  "..",
  "sample-data",
  "unlisted-opportunities-sample.xlsx",
);

const parseRows = () => {
  const workbook = XLSX.readFile(samplePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" }).map((row) => ({
    company: String(row.company).trim(),
    sector: String(row.sector).trim(),
    price: String(row.price).trim(),
    minimumInvestment: String(row.minimumInvestment).trim(),
    status: String(row.status).trim(),
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

  const opportunities = parseRows();

  const upload = await UnlistedOpportunityUpload.create({
    title: "Dummy Unlisted Opportunities - April 2026",
    sourceFileName: path.basename(samplePath),
    opportunities,
  });

  console.log(
    `Seeded unlisted opportunities upload ${upload._id} with ${opportunities.length} rows.`,
  );

  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
