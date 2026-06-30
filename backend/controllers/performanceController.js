const crypto = require("crypto");
const PerformanceTrade = require("../models/performanceTradeModel");

const getLatestPerformance = async (req, res, next) => {
  try {
    const trades = await PerformanceTrade.find().sort({ date: -1 });
    res.json({
      data: {
        title: "Latest Performance",
        trades,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getPerformanceTrade = async (req, res, next) => {
  try {
    const trade = await PerformanceTrade.findOne({ tradeId: req.params.tradeId });
    if (!trade) {
      return res.status(404).json({ error: "Trade not found" });
    }
    res.json({
      data: {
        title: "Latest Performance",
        trade,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createPerformanceTrade = async (req, res, next) => {
  try {
    const { date, index, callType, entry, sl, target, result, points } = req.body;
    if (!date || !index || !callType || entry === undefined || sl === undefined || target === undefined || !result || !points) {
      return res.status(400).json({ error: "Missing required fields: date, index, callType, entry, sl, target, result, points" });
    }

    const body = { ...req.body };
    if (!body.tradeId) {
      body.tradeId = crypto.randomBytes(6).toString("hex");
    }

    const trade = await PerformanceTrade.create(body);
    res.status(201).json({ data: trade });
  } catch (err) {
    next(err);
  }
};

const updatePerformanceTrade = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, index, callType, entry, sl, target, result, points } = req.body;
    if (!date || !index || !callType || entry === undefined || sl === undefined || target === undefined || !result || !points) {
      return res.status(400).json({ error: "Missing required fields: date, index, callType, entry, sl, target, result, points" });
    }

    const body = { ...req.body };

    const trade = await PerformanceTrade.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!trade) {
      return res.status(404).json({ error: "Trade not found" });
    }

    res.json({ data: trade });
  } catch (err) {
    next(err);
  }
};

const deletePerformanceTrade = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trade = await PerformanceTrade.findByIdAndDelete(id);

    if (!trade) {
      return res.status(404).json({ error: "Trade not found" });
    }

    res.json({ message: "Performance trade deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getLatestPerformance,
  getPerformanceTrade,
  createPerformanceTrade,
  updatePerformanceTrade,
  deletePerformanceTrade,
};
