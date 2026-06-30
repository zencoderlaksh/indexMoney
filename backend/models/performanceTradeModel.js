const mongoose = require("mongoose");

const performanceTradeSchema = new mongoose.Schema(
  {
    tradeId: { type: String, required: true, unique: true, trim: true },
    date: { type: String, required: true, trim: true },
    index: { type: String, required: true, trim: true },
    callType: { type: String, required: true, trim: true },
    entry: { type: Number, required: true },
    sl: { type: Number, required: true },
    target: { type: Number, required: true },
    result: { type: String, required: true, trim: true },
    points: { type: String, required: true, trim: true },
    chartUrl: { type: String, default: "", trim: true },
    chartTitle: { type: String, default: "", trim: true },
    chartNotes: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PerformanceTrade", performanceTradeSchema);
