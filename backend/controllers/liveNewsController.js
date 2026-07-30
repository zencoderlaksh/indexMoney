const LiveNews = require("../models/liveNewsModel");

// Get active live news for the frontend modal
const getActiveLiveNews = async (req, res, next) => {
  try {
    const news = await LiveNews.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ data: news });
  } catch (err) {
    next(err);
  }
};

// Admin: Get all live news (both active and inactive)
const getAllLiveNewsAdmin = async (req, res, next) => {
  try {
    const news = await LiveNews.find().sort({ createdAt: -1 });
    res.json({ data: news });
  } catch (err) {
    next(err);
  }
};

// Admin: Create new live news
const createLiveNews = async (req, res, next) => {
  try {
    const { title, content, referenceUrl, isActive } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    const news = await LiveNews.create({
      title,
      content,
      referenceUrl,
      isActive: isActive !== undefined ? isActive : true,
    });
    res.status(201).json({ data: news });
  } catch (err) {
    next(err);
  }
};

// Admin: Update existing live news
const updateLiveNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, referenceUrl, isActive } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    const news = await LiveNews.findByIdAndUpdate(
      id,
      { title, content, referenceUrl, isActive },
      { new: true, runValidators: true }
    );

    if (!news) {
      return res.status(404).json({ error: "News not found." });
    }

    res.json({ data: news });
  } catch (err) {
    next(err);
  }
};

// Admin: Delete live news
const deleteLiveNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await LiveNews.findByIdAndDelete(id);

    if (!news) {
      return res.status(404).json({ error: "News not found." });
    }

    res.json({ message: "Live news deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getActiveLiveNews,
  getAllLiveNewsAdmin,
  createLiveNews,
  updateLiveNews,
  deleteLiveNews,
};
