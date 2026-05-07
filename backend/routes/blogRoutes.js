const express = require("express");
const {
  createBlog,
  deleteBlog,
  getAdminBlogs,
  getPublishedBlogBySlug,
  getPublishedBlogs,
  updateBlog,
} = require("../controllers/blogController");
const { requireAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getPublishedBlogs);
router.get("/admin", requireAdmin, getAdminBlogs);
router.post("/admin", requireAdmin, createBlog);
router.put("/admin/:id", requireAdmin, updateBlog);
router.delete("/admin/:id", requireAdmin, deleteBlog);
router.get("/:slug", getPublishedBlogBySlug);

module.exports = router;
