const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const rows = [
  {
    company: "ABC Ltd",
    sector: "Fintech",
    price: "Rs850",
    minimumInvestment: "100 Shares",
    status: "Available",
  },
  {
    company: "XYZ Pvt Ltd",
    sector: "Technology",
    price: "Rs1200",
    minimumInvestment: "50 Shares",
    status: "Limited",
  },
  {
    company: "Prime Infra Tech",
    sector: "Infrastructure",
    price: "Rs640",
    minimumInvestment: "150 Shares",
    status: "Available",
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
