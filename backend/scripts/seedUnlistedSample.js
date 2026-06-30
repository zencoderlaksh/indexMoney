require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const config = require("../config");
const UnlistedOpportunity = require("../models/unlistedOpportunityModel");

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
    code: String(row.code || "").trim(),
    slug: String(row.slug || "").trim(),
    logoUrl: String(row.logoUrl || "").trim(),
    sector: String(row.sector).trim(),
    price: String(row.price).trim(),
    minimumInvestment: String(row.minimumInvestment).trim(),
    status: String(row.status).trim(),
    badge: String(row.badge || "").trim(),
    description: String(row.description || "").trim(),
    marketCap: String(row.marketCap || "").trim(),
    isin: String(row.isin || "").trim(),
    faceValue: String(row.faceValue || "").trim(),
    eps: String(row.eps || "").trim(),
    pbRatio: String(row.pbRatio || "").trim(),
    bookValue: String(row.bookValue || "").trim(),
    debtEquityRatio: String(row.debtEquityRatio || "").trim(),
    settlementPeriod: String(row.settlementPeriod || "").trim(),
    minUnits: String(row.minUnits || "").trim(),
    aboutCompany: String(row.aboutCompany || "").trim(),
    strengths: String(row.strengths || "").trim(),
    weaknesses: String(row.weaknesses || "").trim(),
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

  // Clear existing standalone opportunities
  await UnlistedOpportunity.deleteMany({});

  const seeded = await UnlistedOpportunity.create(opportunities);

  console.log(
    `Seeded ${seeded.length} standalone unlisted opportunities.`,
  );

  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
