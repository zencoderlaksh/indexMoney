const Research = require("../models/researchModel");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildResearchPayload = (body = {}, existingResearch = null) => {
  const title = String(body.title || "").trim();
  const excerpt = String(body.excerpt || "").trim();
  const content = String(body.content || "").trim();
  const status = body.status === "published" ? "published" : "draft";
  const requestedSlug = slugify(body.slug || title);

  if (!title) {
    const error = new Error("Research title is required");
    error.status = 400;
    throw error;
  }

  if (!excerpt) {
    const error = new Error("Research excerpt is required");
    error.status = 400;
    throw error;
  }

  if (!content) {
    const error = new Error("Research content is required");
    error.status = 400;
    throw error;
  }

  const wasPublished = existingResearch?.status === "published";

  return {
    title,
    slug: requestedSlug,
    excerpt,
    content,
    pdfUrl: String(body.pdfUrl || "").trim(),
    coverImageUrl: String(body.coverImageUrl || "").trim(),
    status,
    publishedAt:
      status === "published"
        ? existingResearch?.publishedAt || new Date()
        : wasPublished
          ? existingResearch.publishedAt
          : null,
  };
};

const getPublishedResearch = async (req, res, next) => {
  try {
    const research = await Research.find({ status: "published" }).sort({
      publishedAt: -1,
      createdAt: -1,
    });
    res.json({ data: research });
  } catch (err) {
    next(err);
  }
};

const getPublishedResearchBySlug = async (req, res, next) => {
  try {
    const research = await Research.findOne({
      slug: req.params.slug,
      status: "published",
    });
    if (!research) {
      return res.status(404).json({ error: "Research article not found" });
    }
    res.json({ data: research });
  } catch (err) {
    next(err);
  }
};

const getAdminResearch = async (req, res, next) => {
  try {
    const research = await Research.find().sort({ updatedAt: -1 });
    const [publishedCount, draftCount] = await Promise.all([
      Research.countDocuments({ status: "published" }),
      Research.countDocuments({ status: "draft" }),
    ]);
    res.json({
      data: research,
      stats: {
        total: research.length,
        published: publishedCount,
        drafts: draftCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createResearch = async (req, res, next) => {
  try {
    const payload = buildResearchPayload(req.body);
    const research = await Research.create(payload);
    res.status(201).json({ data: research, message: "Research saved successfully." });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = "A research article with this slug already exists";
    }
    next(err);
  }
};

const updateResearch = async (req, res, next) => {
  try {
    const existingResearch = await Research.findById(req.params.id);
    if (!existingResearch) {
      return res.status(404).json({ error: "Research not found" });
    }
    const payload = buildResearchPayload(req.body, existingResearch);
    Object.assign(existingResearch, payload);
    await existingResearch.save();
    res.json({ data: existingResearch, message: "Research updated successfully." });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = "A research article with this slug already exists";
    }
    next(err);
  }
};

const deleteResearch = async (req, res, next) => {
  try {
    const research = await Research.findByIdAndDelete(req.params.id);
    if (!research) {
      return res.status(404).json({ error: "Research not found" });
    }
    res.json({ message: "Research deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createResearch,
  deleteResearch,
  getAdminResearch,
  getPublishedResearchBySlug,
  getPublishedResearch,
  updateResearch,
};
