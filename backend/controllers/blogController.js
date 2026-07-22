const Blog = require("../models/blogModel");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeKeywords = (keywords) => {
  if (Array.isArray(keywords)) {
    return keywords.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(keywords || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const buildBlogPayload = (body = {}, existingBlog = null) => {
  const title = String(body.title || "").trim();
  const excerpt = String(body.excerpt || "").trim();
  const content = String(body.content || "").trim();
  const status = body.status === "published" ? "published" : "draft";
  const requestedSlug = slugify(body.slug || title);

  if (!title) {
    const error = new Error("Blog title is required");
    error.status = 400;
    throw error;
  }

  if (!requestedSlug) {
    const error = new Error("Blog slug is required");
    error.status = 400;
    throw error;
  }

  if (!excerpt) {
    const error = new Error("Blog excerpt is required");
    error.status = 400;
    throw error;
  }

  if (!content) {
    const error = new Error("Blog content is required");
    error.status = 400;
    throw error;
  }

  const wasPublished = existingBlog?.status === "published";

  return {
    title,
    slug: requestedSlug,
    excerpt,
    content,
    coverImageUrl: String(body.coverImageUrl || "").trim(),
    authorName: String(body.authorName || "Index Money").trim() || "Index Money",
    metaTitle: String(body.metaTitle || title).trim().slice(0, 70),
    metaDescription: String(body.metaDescription || excerpt).trim().slice(0, 170),
    keywords: normalizeKeywords(body.keywords),
    faqs: Array.isArray(body.faqs) ? body.faqs.map(f => ({ question: String(f.question || "").trim(), answer: String(f.answer || "").trim() })) : [],
    status,
    publishedAt:
      status === "published"
        ? existingBlog?.publishedAt || new Date()
        : wasPublished
          ? existingBlog.publishedAt
          : null,
  };
};

const getPublishedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ status: "published" })
      .sort({ publishedAt: -1, createdAt: -1 })
      .select("-content");

    res.json({ data: blogs });
  } catch (err) {
    next(err);
  }
};

const getPublishedBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ data: blog });
  } catch (err) {
    next(err);
  }
};

const getAdminBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    const [publishedCount, draftCount] = await Promise.all([
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
    ]);

    res.json({
      data: blogs,
      stats: {
        total: blogs.length,
        published: publishedCount,
        drafts: draftCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const payload = buildBlogPayload(req.body);
    const blog = await Blog.create(payload);
    res.status(201).json({ data: blog, message: "Blog saved successfully." });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = "A blog with this slug already exists";
    }
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const existingBlog = await Blog.findById(req.params.id);

    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const payload = buildBlogPayload(req.body, existingBlog);
    Object.assign(existingBlog, payload);
    await existingBlog.save();

    res.json({ data: existingBlog, message: "Blog updated successfully." });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = "A blog with this slug already exists";
    }
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBlog,
  deleteBlog,
  getAdminBlogs,
  getPublishedBlogBySlug,
  getPublishedBlogs,
  updateBlog,
};
