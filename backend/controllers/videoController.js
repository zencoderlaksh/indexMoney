const Video = require("../models/videoModel");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = String(url || "").match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const buildVideoPayload = (body = {}, existingVideo = null) => {
  const title = String(body.title || "").trim();
  const youtubeUrl = String(body.youtubeUrl || "").trim();
  const description = String(body.description || "").trim();
  const status = body.status === "published" ? "published" : "draft";
  const requestedSlug = slugify(body.slug || title);

  if (!title) {
    const error = new Error("Video title is required");
    error.status = 400;
    throw error;
  }

  if (!youtubeUrl) {
    const error = new Error("YouTube URL is required");
    error.status = 400;
    throw error;
  }

  const youtubeId = getYoutubeId(youtubeUrl);
  if (!youtubeId) {
    const error = new Error("Invalid YouTube URL");
    error.status = 400;
    throw error;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
  const wasPublished = existingVideo?.status === "published";

  return {
    title,
    slug: requestedSlug,
    youtubeUrl,
    youtubeId,
    description,
    thumbnailUrl,
    status,
    publishedAt:
      status === "published"
        ? existingVideo?.publishedAt || new Date()
        : wasPublished
          ? existingVideo.publishedAt
          : null,
  };
};

const getPublishedVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ status: "published" }).sort({
      publishedAt: -1,
      createdAt: -1,
    });
    res.json({ data: videos });
  } catch (err) {
    next(err);
  }
};

const getPublishedVideoBySlug = async (req, res, next) => {
  try {
    const video = await Video.findOne({
      slug: req.params.slug,
      status: "published",
    });
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json({ data: video });
  } catch (err) {
    next(err);
  }
};

const getAdminVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ updatedAt: -1 });
    const [publishedCount, draftCount] = await Promise.all([
      Video.countDocuments({ status: "published" }),
      Video.countDocuments({ status: "draft" }),
    ]);
    res.json({
      data: videos,
      stats: {
        total: videos.length,
        published: publishedCount,
        drafts: draftCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createVideo = async (req, res, next) => {
  try {
    const payload = buildVideoPayload(req.body);
    const video = await Video.create(payload);
    res.status(201).json({ data: video, message: "Video saved successfully." });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = "A video with this slug already exists";
    }
    next(err);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const existingVideo = await Video.findById(req.params.id);
    if (!existingVideo) {
      return res.status(404).json({ error: "Video not found" });
    }
    const payload = buildVideoPayload(req.body, existingVideo);
    Object.assign(existingVideo, payload);
    await existingVideo.save();
    res.json({ data: existingVideo, message: "Video updated successfully." });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = "A video with this slug already exists";
    }
    next(err);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json({ message: "Video deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createVideo,
  deleteVideo,
  getAdminVideos,
  getPublishedVideoBySlug,
  getPublishedVideos,
  updateVideo,
};
