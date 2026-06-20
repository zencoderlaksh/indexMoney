const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const rows = [
  {
    company: "ABC Ltd",
    code: "ABC",
    slug: "abc-ltd",
    logoUrl: "",
    sector: "Fintech",
    price: "Rs850",
    minimumInvestment: "100 Shares",
    status: "Available",
    badge: "Available",
    description: "Sample private market opportunity for upload testing.",
    marketCap: "Rs1,250 Cr",
    isin: "INE000A01000",
    faceValue: "Rs10",
    eps: "Rs4.20",
    pbRatio: "2.5",
    bookValue: "Rs340",
    debtEquityRatio: "0.2",
    settlementPeriod: "T+2 working days",
    minUnits: "100",
    aboutCompany: "Add a short company overview here.",
    strengths: "Growing addressable market | Asset-light model",
    weaknesses: "Lower liquidity | Price discovery risk",
  },
  {
    company: "XYZ Pvt Ltd",
    code: "XYZ",
    slug: "xyz-pvt-ltd",
    logoUrl: "",
    sector: "Technology",
    price: "Rs1200",
    minimumInvestment: "50 Shares",
    status: "Limited",
    badge: "Limited",
    description: "Sample technology company opportunity.",
    marketCap: "Rs2,800 Cr",
    isin: "INE000B01000",
    faceValue: "Rs10",
    eps: "Rs8.10",
    pbRatio: "4.1",
    bookValue: "Rs292",
    debtEquityRatio: "0.1",
    settlementPeriod: "T+3 working days",
    minUnits: "50",
    aboutCompany: "Add a short company overview here.",
    strengths: "Recurring revenue | Strong product adoption",
    weaknesses: "Valuation risk | Private market liquidity risk",
  },
  {
    company: "Prime Infra Tech",
    code: "PIT",
    slug: "prime-infra-tech",
    logoUrl: "",
    sector: "Infrastructure",
    price: "Rs640",
    minimumInvestment: "150 Shares",
    status: "Available",
    badge: "Available",
    description: "Sample infrastructure opportunity.",
    marketCap: "Rs940 Cr",
    isin: "INE000C01000",
    faceValue: "Rs10",
    eps: "Rs3.60",
    pbRatio: "1.9",
    bookValue: "Rs337",
    debtEquityRatio: "0.6",
    settlementPeriod: "T+2 working days",
    minUnits: "150",
    aboutCompany: "Add a short company overview here.",
    strengths: "Sector tailwinds | Contracted order book",
    weaknesses: "Execution risk | Interest-rate sensitivity",
  },
];

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(rows);
XLSX.utils.book_append_sheet(workbook, worksheet, "UnlistedOpportunities");

const outputDir = path.join(__dirname, "..", "sample-data");
const outputPath = path.join(outputDir, "unlisted-opportunities-sample.xlsx");

fs.mkdirSync(outputDir, { recursive: true });
XLSX.writeFile(workbook, outputPath);

console.log(`Sample Excel created at ${outputPath}`);
