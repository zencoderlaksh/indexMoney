import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  SearchX,
  UserRound,
} from "lucide-react";
import { sanitizeBlogHtml } from "../../lib/blogContent";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const readTime = (content = "") => {
  const words = String(content).trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
};

const setMetaTag = (name, content, attr = "name") => {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setCanonical = (href) => {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

const BlogContent = ({ content }) => {
  const cleaned = React.useMemo(() => sanitizeBlogHtml(content), [content]);

  if (
    cleaned &&
    /<(h[1-6]|p|ul|ol|li|table|tr|td|th|blockquote|br|div)\b/i.test(cleaned)
  ) {
    return (
      <div
        className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8 prose-a:text-[#105F68]"
        dangerouslySetInnerHTML={{ __html: cleaned }}
      />
    );
  }

  const renderTextValue = (value) => {
    const lines = String(value || "")
      .split(/\r?\n/)
      .map((line) => line.trimEnd());

    const paragraphs = [];
    let currentParagraph = [];

    const flushParagraph = () => {
      if (currentParagraph.length) {
        paragraphs.push(currentParagraph.join(" "));
        currentParagraph = [];
      }
    };

    lines.forEach((line) => {
      if (!line) {
        flushParagraph();
        return;
      }

      const listItem = line.match(/^(?:[-*•]|\d+[.)])\s+(.*)$/);
      if (listItem) {
        flushParagraph();
      }

      currentParagraph.push(line);
    });

    flushParagraph();

    return paragraphs.map((paragraph, index) => (
      <p
        key={index}
        className="mt-5 text-base leading-8 text-slate-700 whitespace-pre-wrap"
      >
        {paragraph}
      </p>
    ));
  };

  const blocks = String(content || "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8 prose-a:text-[#105F68]">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="mt-8 text-2xl font-bold text-slate-900">
              {block.replace(/^### /, "")}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="mt-10 text-3xl font-bold text-slate-900">
              {block.replace(/^## /, "")}
            </h2>
          );
        }
        if (block.startsWith("- ")) {
          return (
            <ul key={index} className="my-6 space-y-3 pl-5 text-slate-700">
              {block.split("\n").map((item) => (
                <li key={item} className="list-disc leading-7">
                  {item.replace(/^- /, "")}
                </li>
              ))}
            </ul>
          );
        }
        return renderTextValue(block);
      })}
    </div>
  );
};

const BlogCard = ({ blog }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="overflow-hidden rounded-[28px] border border-[#D7ECE7] bg-white shadow-[0_14px_36px_rgba(16,95,104,0.08)]"
  >
    {blog.coverImageUrl ?
      <img
        src={blog.coverImageUrl}
        alt={blog.title}
        className="h-56 w-full object-cover"
      />
    : <div className="flex h-56 items-center justify-center bg-gradient-to-br from-[#E7F7F5] to-[#C8E6E2] px-6 text-center">
        <span className="text-lg font-bold text-[#105F68]">{blog.title}</span>
      </div>
    }
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(blog.publishedAt || blog.createdAt)}
        </span>
        <span>{readTime(blog.excerpt)}</span>
      </div>
      <h2 className="text-2xl font-bold leading-tight text-slate-900">
        {blog.title}
      </h2>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
        {blog.excerpt}
      </p>
      <Link
        to={`/blogs/${blog.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#105F68]"
      >
        Read Blog <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </motion.article>
);

const BlogsPage = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = React.useState([]);
  const [activeBlog, setActiveBlog] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const controller = new AbortController();

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const endpoint =
          slug ? `${API_BASE}/blogs/${slug}` : `${API_BASE}/blogs`;
        const res = await fetch(endpoint, { signal: controller.signal });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.error || "Unable to load blogs");
        if (slug) {
          setActiveBlog(json?.data || null);
          setBlogs([]);
        } else {
          setBlogs(Array.isArray(json?.data) ? json.data : []);
          setActiveBlog(null);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load blogs");
          setBlogs([]);
          setActiveBlog(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
    return () => controller.abort();
  }, [slug]);

  React.useEffect(() => {
    const siteUrl = window.location.origin;
    const pageTitle =
      activeBlog?.metaTitle || activeBlog?.title || "Blogs | Index Money";
    const description =
      activeBlog?.metaDescription ||
      activeBlog?.excerpt ||
      "Read Index Money insights on stock market learning, unlisted shares, investing, trading, and wealth-building decisions.";

    document.title =
      pageTitle.includes("Index Money") ? pageTitle : (
        `${pageTitle} | Index Money`
      );
    setMetaTag("description", description);
    setMetaTag("og:title", document.title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", activeBlog ? "article" : "website", "property");
    if (activeBlog?.coverImageUrl)
      setMetaTag("og:image", activeBlog.coverImageUrl, "property");
    setCanonical(
      activeBlog ? `${siteUrl}/blogs/${activeBlog.slug}` : `${siteUrl}/blogs`,
    );

    const existingScript = document.getElementById("blog-json-ld");
    if (existingScript) existingScript.remove();

    if (activeBlog) {
      const script = document.createElement("script");
      script.id = "blog-json-ld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: activeBlog.title,
        description,
        image: activeBlog.coverImageUrl || undefined,
        author: {
          "@type": "Organization",
          name: activeBlog.authorName || "Index Money",
        },
        publisher: { "@type": "Organization", name: "Index Money" },
        datePublished: activeBlog.publishedAt,
        dateModified: activeBlog.updatedAt,
        mainEntityOfPage: `${siteUrl}/blogs/${activeBlog.slug}`,
      });
      document.head.appendChild(script);
    }
  }, [activeBlog]);

  if (slug) {
    return (
      <main className="bg-[#F7FBFA] px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/blogs"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#105F68]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>

          {loading ?
            <div className="rounded-[28px] border border-[#D7ECE7] bg-white p-10 text-center text-slate-500">
              Loading blog...
            </div>
          : error || !activeBlog ?
            <div className="rounded-[28px] border border-amber-200 bg-white p-10 text-center text-amber-700">
              {error || "Blog not found."}
            </div>
          : <article>
              <header className="mb-8">
                <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#3A9295]">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(activeBlog.publishedAt || activeBlog.createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <UserRound className="h-3.5 w-3.5" />
                    {activeBlog.authorName || "Index Money"}
                  </span>
                  <span>{readTime(activeBlog.content)}</span>
                </div>
                <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
                  {activeBlog.title}
                </h1>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {activeBlog.excerpt}
                </p>
              </header>

              {activeBlog.coverImageUrl ?
                <img
                  src={activeBlog.coverImageUrl}
                  alt={activeBlog.title}
                  className="mb-8 max-h-[460px] w-full rounded-[30px] object-cover shadow-xl shadow-slate-200/50"
                />
              : null}

              <section className="rounded-[30px] border border-[#D7ECE7] bg-white p-6 shadow-[0_14px_36px_rgba(16,95,104,0.08)] md:p-9">
                <BlogContent content={activeBlog.content} />
              </section>
            </article>
          }
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F7FBFA] px-5 py-12 md:px-8 md:py-16">
      <section className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#3A9295]">
          Index Money Blogs
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900 md:text-6xl">
          Market insights, investing guides, and practical finance education
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600">
          Read published articles from Index Money on market awareness, trading
          discipline, unlisted shares, and long-term investing decisions.
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        {loading ?
          <div className="rounded-[28px] border border-[#D7ECE7] bg-white p-10 text-center text-slate-500">
            Loading blogs...
          </div>
        : error ?
          <div className="rounded-[28px] border border-amber-200 bg-white p-10 text-center text-amber-700">
            {error}
          </div>
        : blogs.length ?
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id || blog.slug} blog={blog} />
            ))}
          </div>
        : <div className="rounded-[28px] border border-[#D7ECE7] bg-white p-10 text-center">
            <SearchX className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 text-xl font-bold text-slate-800">
              No blogs published yet
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Published blogs from the admin dashboard will appear here.
            </p>
          </div>
        }
      </section>
    </main>
  );
};

export default BlogsPage;
