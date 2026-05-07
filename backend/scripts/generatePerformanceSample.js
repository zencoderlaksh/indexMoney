const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const rows = [
  {
    tradeId: "nifty-ce-01",
    date: "01 Apr 2026",
    index: "Nifty",
    callType: "CE",
    entry: 218,
    sl: 198,
    target: 255,
    result: "Target Hit",
    points: "+37",
    chartUrl:
      "https://dummyimage.com/1200x700/e6f7f5/105f68&text=Nifty+CE+Trade+Chart",
    chartTitle: "Nifty CE breakout chart",
    chartNotes: "Morning range breakout with confirmation candle near entry.",
  },
  {
    tradeId: "banknifty-pe-02",
    date: "01 Apr 2026",
    index: "Bank Nifty",
    callType: "PE",
    entry: 412,
    sl: 438,
    target: 360,
    result: "Target Hit",
    points: "+52",
    chartUrl:
      "https://dummyimage.com/1200x700/eafbf1/105f68&text=Bank+Nifty+PE+Trade+Chart",
    chartTitle: "Bank Nifty PE continuation chart",
    chartNotes: "Breakdown from support with strong downside continuation.",
  },
  {
    tradeId: "sensex-ce-03",
    date: "02 Apr 2026",
    index: "Sensex",
    callType: "CE",
    entry: 166,
    sl: 150,
    target: 190,
    result: "SL Hit",
    points: "-16",
    chartUrl:
      "https://dummyimage.com/1200x700/f0fdfa/105f68&text=Sensex+CE+Trade+Chart",
    chartTitle: "Sensex CE failed reversal",
    chartNotes: "Attempted reversal failed after price lost intraday support.",
  },
  {
    tradeId: "nifty-fut-04",
    date: "03 Apr 2026",
    index: "Nifty",
    callType: "Futures",
    entry: 22640,
    sl: 22480,
    target: 22960,
    result: "Target Hit",
    points: "+320",
    chartUrl:
      "https://dummyimage.com/1200x700/e6f7f5/105f68&text=Nifty+Futures+Trade+Chart",
    chartTitle: "Nifty futures trend continuation",
    chartNotes: "Trend continuation after successful retest of breakout zone.",
  },
  {
    tradeId: "banknifty-ce-05",
    date: "04 Apr 2026",
    index: "Bank Nifty",
    callType: "CE",
    entry: 305,
    sl: 280,
    target: 352,
    result: "Target Hit",
    points: "+47",
    chartUrl:
      "https://dummyimage.com/1200x700/eafbf1/105f68&text=Bank+Nifty+CE+Trade+Chart",
    chartTitle: "Bank Nifty CE reclaim chart",
    chartNotes: "Fast reclaim above support with momentum expansion.",
  },
  {
    tradeId: "sensex-pe-06",
    date: "05 Apr 2026",
    index: "Sensex",
    callType: "PE",
    entry: 520,
    sl: 542,
    target: 472,
    result: "SL Hit",
    points: "-22",
    chartUrl:
      "https://dummyimage.com/1200x700/f0fdfa/105f68&text=Sensex+PE+Trade+Chart",
    chartTitle: "Sensex PE pullback setup",
    chartNotes: "Pullback setup failed and protected risk at stop loss.",
  },
];

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(rows);
XLSX.utils.book_append_sheet(workbook, worksheet, "Performance");

const outputDir = path.join(__dirname, "..", "sample-data");
const outputPath = path.join(outputDir, "performance-sample.xlsx");

fs.mkdirSync(outputDir, { recursive: true });
XLSX.writeFile(workbook, outputPath);

console.log(`Sample Excel created at ${outputPath}`);
