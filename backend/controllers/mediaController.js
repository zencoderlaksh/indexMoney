const Media = require("../models/mediaModel");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildMediaPayload = (body = {}, existingMedia = null) => {
  const title = String(body.title || "").trim();
  const excerpt = String(body.excerpt || "").trim();
  const sourceName = String(body.sourceName || "").trim();
  const sourceUrl = String(body.sourceUrl || "").trim();
  const status = body.status === "published" ? "published" : "draft";
  const requestedSlug = slugify(body.slug || title);

  if (!title) {
    const error = new Error("Media title is required");
    error.status = 400;
    throw error;
  }

  if (!sourceName) {
    const error = new Error("Source name is required");
    error.status = 400;
    throw error;
  }

  if (!sourceUrl) {
    const error = new Error("Source URL is required");
    error.status = 400;
    throw error;
  }

  const wasPublished = existingMedia?.status === "published";

  return {
    title,
    slug: requestedSlug,
    excerpt,
    sourceName,
    sourceUrl,
    coverImageUrl: String(body.coverImageUrl || "").trim(),
    status,
    publishedAt:
      status === "published"
        ? existingMedia?.publishedAt || new Date()
        : wasPublished
          ? existingMedia.publishedAt
          : null,
  };
};

const getPublishedMedia = async (req, res, next) => {
  try {
    const media = await Media.find({ status: "published" }).sort({
      publishedAt: -1,
      createdAt: -1,
    });
    res.json({ data: media });
  } catch (err) {
    next(err);
  }
};

const getAdminMedia = async (req, res, next) => {
  try {
    const mediaList = await Media.find().sort({ updatedAt: -1 });
    const [publishedCount, draftCount] = await Promise.all([
      Media.countDocuments({ status: "published" }),
      Media.countDocuments({ status: "draft" }),
    ]);
    res.json({
      data: mediaList,
      stats: {
        total: mediaList.length,
        published: publishedCount,
        drafts: draftCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createMedia = async (req, res, next) => {
  try {
    const payload = buildMediaPayload(req.body);
    const media = await Media.create(payload);
    res.status(201).json({ data: media, message: "Media saved successfully." });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = "A media entry with this slug already exists";
    }
    next(err);
  }
};

const updateMedia = async (req, res, next) => {
  try {
    const existingMedia = await Media.findById(req.params.id);
    if (!existingMedia) {
      return res.status(404).json({ error: "Media not found" });
    }
    const payload = buildMediaPayload(req.body, existingMedia);
    Object.assign(existingMedia, payload);
    await existingMedia.save();
    res.json({ data: existingMedia, message: "Media updated successfully." });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = "A media entry with this slug already exists";
    }
    next(err);
  }
};

const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    res.json({ message: "Media deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMedia,
  deleteMedia,
  getAdminMedia,
  getPublishedMedia,
  updateMedia,
};
