import React from "react";
import {
  LogOut,
  User,
  Mail,
  MapPin,
  BarChart2,
  ShieldCheck,
  ArrowUpRight,
  Upload,
  Save,
  FileSpreadsheet,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Database,
  Download,
  Users,
  ClipboardList,
  BookOpen,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { IMAGES } from "../../constants/images";
import { looksLikeHtmlContent } from "../../lib/blogContent";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const defaultTodaysResults = [
  { label: "NIFTY", points: "+45 pts", note: "+45 pts up" },
  { label: "BANKNIFTY", points: "+80 pts", note: "+80 pts up" },
  { label: "SENSEX", points: "+120 pts", note: "+120 pts up" },
];
const emptyForm = { title: "", file: null };
const emptyBlogForm = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  authorName: "Index Money",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  status: "draft",
};

const fmt = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : (
      date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    );
};

const csvCell = (value) => {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const downloadCsv = (filename, headers, rows) => {
  const csv = [
    headers.map(csvCell).join(","),
    ...rows.map((row) => row.map(csvCell).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const StatCard = ({ icon: Icon, label, value, sub, color = "#105F68" }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-3">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
        {sub ?
          <p className="text-xs text-slate-400">{sub}</p>
        : null}
      </div>
    </div>
  </div>
);

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 border-b border-slate-50 py-3 last:border-0">
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8E6E2]/40">
      <Icon className="h-4 w-4 text-[#3A9295]" />
    </span>
    <div>
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-700">{value || "-"}</p>
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, eyebrow, title, description, action }) => (
  <div className="mb-5 flex items-start justify-between gap-4">
    <div className="flex items-start gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E7F7F5] text-[#105F68]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
    {action}
  </div>
);

const StatusBanner = ({ kind, text }) => {
  if (!text) return null;
  const ok = kind === "success";
  const Icon = ok ? CheckCircle2 : AlertCircle;
  return (
    <div
      className={`mb-4 flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm ${
        ok ?
          "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-amber-200 bg-amber-50 text-amber-700"
      }`}
    >
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
};

const BlogRichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || "")) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const notifyChange = () => {
    if (!editorRef.current) return;
    onChange({
      target: { name: "content", value: editorRef.current.innerHTML },
    });
  };

  const createHtmlFromPlainText = (text) => {
    const lines = String(text || "")
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((line) => line.trimEnd());

    const blocks = [];
    let currentList = null;
    let currentParagraph = [];

    const pushParagraph = () => {
      if (!currentParagraph.length) return;
      blocks.push(`<p>${currentParagraph.join(" ")}</p>`);
      currentParagraph = [];
    };

    const pushList = () => {
      if (!currentList) return;
      const items = currentList.map((item) => `<li>${item}</li>`).join("");
      blocks.push(`<ul>${items}</ul>`);
      currentList = null;
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        pushParagraph();
        pushList();
        continue;
      }

      const listMatch = trimmed.match(/^(?:[-•*]|\d+[.)])\s+(.*)$/);
      const headingMatch = trimmed.match(/^(#{2,3})\s+(.*)$/);

      if (listMatch) {
        pushParagraph();
        const item = listMatch[1];
        if (!currentList) currentList = [];
        currentList.push(item);
        continue;
      }

      if (headingMatch) {
        pushParagraph();
        pushList();
        const tag = headingMatch[1] === "###" ? "h3" : "h2";
        blocks.push(`<${tag}>${headingMatch[2]}</${tag}>`);
        continue;
      }

      if (/^\s*Table:\s*/i.test(trimmed)) {
        pushParagraph();
        pushList();
        blocks.push(`<p>${trimmed}</p>`);
        continue;
      }

      currentParagraph.push(trimmed);
    }

    pushParagraph();
    pushList();

    return blocks.join("");
  };

  const applyFormat = (tag) => {
    document.execCommand("formatBlock", false, tag);
    notifyChange();
  };

  const handlePaste = (event) => {
    const html = event.clipboardData?.getData("text/html");
    const text = event.clipboardData?.getData("text/plain");

    if (html) {
      event.preventDefault();
      document.execCommand("insertHTML", false, html);
      notifyChange();
      return;
    }

    if (text) {
      event.preventDefault();
      const formatted = createHtmlFromPlainText(text);
      document.execCommand("insertHTML", false, formatted);
      notifyChange();
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-700">Blog content</p>
        <span className="rounded-full bg-[#E7F7F5] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#105F68]">
          Rich text friendly
        </span>
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => applyFormat("p")}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          Paragraph
        </button>
        <button
          type="button"
          onClick={() => applyFormat("h2")}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => applyFormat("h3")}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => {
            document.execCommand("insertUnorderedList");
            notifyChange();
          }}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          Bullet list
        </button>
        <button
          type="button"
          onClick={() => {
            document.execCommand("insertOrderedList");
            notifyChange();
          }}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          Numbered list
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={notifyChange}
        onPaste={handlePaste}
        className="min-h-[260px] max-h-[420px] overflow-y-auto rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
        data-placeholder={placeholder}
      />

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Paste from Google Docs or raw HTML here. Headings, lists, and paragraphs
        will be preserved on the public blog page.
      </p>
    </div>
  );
};

const QuickViewLinks = ({ links }) => (
  <div className="mt-4 flex flex-wrap gap-3">
    {links.map((link) => (
      <button
        key={link.label}
        type="button"
        onClick={link.onClick}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        {link.label}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    ))}
  </div>
);

const TableCard = ({
  title,
  count,
  description,
  rows,
  columns,
  onExport,
  loading,
}) => (
  <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
    <SectionHeader
      icon={title.includes("User") ? Users : ClipboardList}
      eyebrow="Admin Data"
      title={`${title} (${count})`}
      description={description}
      action={
        <button
          type="button"
          onClick={onExport}
          disabled={!count}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      }
    />
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.length ?
            rows.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td
                    key={`${row.id}-${col.key}`}
                    className="px-4 py-3 text-sm text-slate-700"
                  >
                    {col.render ? col.render(row) : row[col.key] || "-"}
                  </td>
                ))}
              </tr>
            ))
          : <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-slate-400"
              >
                {loading ? "Loading..." : "No records found."}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </section>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const authHeaders = React.useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token],
  );

  const [todaysResults, setTodaysResults] =
    React.useState(defaultTodaysResults);
  const [homepageLoading, setHomepageLoading] = React.useState(true);
  const [homepageSaving, setHomepageSaving] = React.useState(false);
  const [homepageStatus, setHomepageStatus] = React.useState({
    kind: "",
    text: "",
  });

  const [performanceMeta, setPerformanceMeta] = React.useState({
    title: "",
    sourceFileName: "",
    totalTrades: 0,
  });
  const [performanceForm, setPerformanceForm] = React.useState(emptyForm);
  const [performanceLoading, setPerformanceLoading] = React.useState(true);
  const [performanceUploading, setPerformanceUploading] = React.useState(false);
  const [performanceStatus, setPerformanceStatus] = React.useState({
    kind: "",
    text: "",
  });

  const [unlistedMeta, setUnlistedMeta] = React.useState({
    title: "",
    sourceFileName: "",
    totalRows: 0,
  });
  const [unlistedForm, setUnlistedForm] = React.useState(emptyForm);
  const [unlistedLoading, setUnlistedLoading] = React.useState(true);
  const [unlistedUploading, setUnlistedUploading] = React.useState(false);
  const [unlistedStatus, setUnlistedStatus] = React.useState({
    kind: "",
    text: "",
  });

  const [usersData, setUsersData] = React.useState([]);
  const [enquiryData, setEnquiryData] = React.useState([]);
  const [dematAccountData, setDematAccountData] = React.useState([]);
  const [adminDataLoading, setAdminDataLoading] = React.useState(true);
  const [adminDataStatus, setAdminDataStatus] = React.useState({
    kind: "",
    text: "",
  });

  const [blogs, setBlogs] = React.useState([]);
  const [blogStats, setBlogStats] = React.useState({
    total: 0,
    published: 0,
    drafts: 0,
  });
  const [blogForm, setBlogForm] = React.useState(emptyBlogForm);
  const [blogsLoading, setBlogsLoading] = React.useState(true);
  const [blogSaving, setBlogSaving] = React.useState(false);
  const [blogStatus, setBlogStatus] = React.useState({ kind: "", text: "" });

  React.useEffect(() => {
    if (!user || !token) {
      logout();
      navigate("/login", { replace: true });
      return;
    }
    if (!user.isAdmin) {
      navigate("/", { replace: true });
    }
  }, [user, token, logout, navigate]);

  const loadHomepage = React.useCallback(async () => {
    try {
      setHomepageLoading(true);
      const res = await fetch(`${API_BASE}/homepage`);
      const json = await res.json().catch(() => ({}));
      const rows = json?.data?.todaysResults;
      setTodaysResults(
        Array.isArray(rows) && rows.length ? rows : defaultTodaysResults,
      );
    } catch {
      setTodaysResults(defaultTodaysResults);
    } finally {
      setHomepageLoading(false);
    }
  }, []);

  const loadPerformance = React.useCallback(async () => {
    try {
      setPerformanceLoading(true);
      const res = await fetch(`${API_BASE}/performance`);
      const json = await res.json().catch(() => ({}));
      const data = json?.data;
      setPerformanceMeta({
        title: data?.title || "",
        sourceFileName: data?.sourceFileName || "",
        totalTrades: data?.trades?.length || 0,
      });
    } catch {
      setPerformanceMeta({ title: "", sourceFileName: "", totalTrades: 0 });
    } finally {
      setPerformanceLoading(false);
    }
  }, []);

  const loadUnlisted = React.useCallback(async () => {
    try {
      setUnlistedLoading(true);
      const res = await fetch(`${API_BASE}/unlisted/opportunities`);
      const json = await res.json().catch(() => ({}));
      const data = json?.data;
      setUnlistedMeta({
        title: data?.title || "",
        sourceFileName: data?.sourceFileName || "",
        totalRows: data?.opportunities?.length || 0,
      });
    } catch {
      setUnlistedMeta({ title: "", sourceFileName: "", totalRows: 0 });
    } finally {
      setUnlistedLoading(false);
    }
  }, []);

  const loadAdminData = React.useCallback(async () => {
    if (!token) return;
    try {
      setAdminDataLoading(true);
      setAdminDataStatus({ kind: "", text: "" });
      const [usersRes, enquiriesRes, dematAccountsRes] = await Promise.all([
        fetch(`${API_BASE}/users`, { headers: authHeaders }),
        fetch(`${API_BASE}/enquiries`, { headers: authHeaders }),
        fetch(`${API_BASE}/demat-accounts`, { headers: authHeaders }),
      ]);
      const [usersJson, enquiriesJson, dematAccountsJson] = await Promise.all([
        usersRes.json().catch(() => ({})),
        enquiriesRes.json().catch(() => ({})),
        dematAccountsRes.json().catch(() => ({})),
      ]);
      if (!usersRes.ok || !enquiriesRes.ok || !dematAccountsRes.ok) {
        throw new Error(
          usersJson?.error ||
            enquiriesJson?.error ||
            dematAccountsJson?.error ||
            "Unable to load admin data",
        );
      }
      setUsersData(Array.isArray(usersJson?.data) ? usersJson.data : []);
      setEnquiryData(
        Array.isArray(enquiriesJson?.data) ? enquiriesJson.data : [],
      );
      setDematAccountData(
        Array.isArray(dematAccountsJson?.data) ? dematAccountsJson.data : [],
      );
    } catch (error) {
      setUsersData([]);
      setEnquiryData([]);
      setDematAccountData([]);
      setAdminDataStatus({
        kind: "error",
        text: error.message || "Unable to load admin data",
      });
    } finally {
      setAdminDataLoading(false);
    }
  }, [authHeaders, token]);

  const loadBlogs = React.useCallback(async () => {
    if (!token) return;
    try {
      setBlogsLoading(true);
      setBlogStatus({ kind: "", text: "" });
      const res = await fetch(`${API_BASE}/blogs/admin`, {
        headers: authHeaders,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Unable to load blogs");
      setBlogs(Array.isArray(json?.data) ? json.data : []);
      setBlogStats(json?.stats || { total: 0, published: 0, drafts: 0 });
    } catch (error) {
      setBlogs([]);
      setBlogStats({ total: 0, published: 0, drafts: 0 });
      setBlogStatus({
        kind: "error",
        text: error.message || "Unable to load blogs",
      });
    } finally {
      setBlogsLoading(false);
    }
  }, [authHeaders, token]);

  React.useEffect(() => {
    if (!user?.isAdmin || !token) return;
    loadHomepage();
    loadPerformance();
    loadUnlisted();
    loadAdminData();
    loadBlogs();
  }, [
    user,
    token,
    loadHomepage,
    loadPerformance,
    loadUnlisted,
    loadAdminData,
    loadBlogs,
  ]);

  if (!user || !token || !user.isAdmin) return null;

  const saveHomepageResults = async () => {
    setHomepageStatus({ kind: "", text: "" });
    const cleanedRows = todaysResults
      .map((row) => ({
        label: row.label.trim(),
        points: row.points.trim(),
        note: row.note.trim(),
      }))
      .filter((row) => row.label || row.points || row.note);
    if (!cleanedRows.length) {
      setHomepageStatus({
        kind: "error",
        text: "Add at least one row before saving.",
      });
      return;
    }
    if (cleanedRows.some((row) => !row.label || !row.points || !row.note)) {
      setHomepageStatus({
        kind: "error",
        text: "Each row needs label, points, and note.",
      });
      return;
    }
    try {
      setHomepageSaving(true);
      const res = await fetch(`${API_BASE}/homepage`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ todaysResults: cleanedRows }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(json?.error || "Unable to save Today's Results");
      setTodaysResults(json?.data?.todaysResults || cleanedRows);
      setHomepageStatus({
        kind: "success",
        text: "Today's Results saved successfully.",
      });
    } catch (error) {
      setHomepageStatus({
        kind: "error",
        text: error.message || "Unable to save Today's Results",
      });
    } finally {
      setHomepageSaving(false);
    }
  };

  const uploadSheet = async (kind) => {
    const isPerformance = kind === "performance";
    const form = isPerformance ? performanceForm : unlistedForm;
    const setStatus = isPerformance ? setPerformanceStatus : setUnlistedStatus;
    const setUploading =
      isPerformance ? setPerformanceUploading : setUnlistedUploading;
    const url =
      isPerformance ?
        `${API_BASE}/performance/upload`
      : `${API_BASE}/unlisted/upload`;
    if (!form.file) {
      setStatus({
        kind: "error",
        text: "Choose an Excel file before uploading.",
      });
      return;
    }
    try {
      setUploading(true);
      setStatus({ kind: "", text: "" });
      const data = new FormData();
      data.append("title", form.title);
      data.append("file", form.file);
      const res = await fetch(url, {
        method: "POST",
        headers: authHeaders,
        body: data,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      if (isPerformance) {
        setPerformanceForm(emptyForm);
        setPerformanceMeta({
          title: json?.data?.title || form.title,
          sourceFileName: json?.data?.sourceFileName || "",
          totalTrades: json?.data?.trades?.length || 0,
        });
      } else {
        setUnlistedForm(emptyForm);
        setUnlistedMeta({
          title: json?.data?.title || form.title,
          sourceFileName: json?.data?.sourceFileName || "",
          totalRows: json?.data?.opportunities?.length || 0,
        });
      }
      setStatus({
        kind: "success",
        text: json?.message || "Sheet uploaded successfully.",
      });
    } catch (error) {
      setStatus({ kind: "error", text: error.message || "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setBlogForm((current) => ({ ...current, [name]: value }));
  };

  const editBlog = (blog) => {
    setBlogForm({
      id: blog.id || blog._id || "",
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      coverImageUrl: blog.coverImageUrl || "",
      authorName: blog.authorName || "Index Money",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      keywords: Array.isArray(blog.keywords) ? blog.keywords.join(", ") : "",
      status: blog.status || "draft",
    });
    setBlogStatus({ kind: "", text: "" });
  };

  const resetBlogForm = () => {
    setBlogForm(emptyBlogForm);
    setBlogStatus({ kind: "", text: "" });
  };

  const saveBlog = async (statusOverride) => {
    const nextStatus = statusOverride || blogForm.status;
    setBlogStatus({ kind: "", text: "" });

    if (
      !blogForm.title.trim() ||
      !blogForm.excerpt.trim() ||
      !blogForm.content.trim()
    ) {
      setBlogStatus({
        kind: "error",
        text: "Title, excerpt, and content are required.",
      });
      return;
    }

    try {
      setBlogSaving(true);
      const payload = { ...blogForm, status: nextStatus };
      const isEditing = Boolean(blogForm.id);
      const res = await fetch(
        isEditing ?
          `${API_BASE}/blogs/admin/${blogForm.id}`
        : `${API_BASE}/blogs/admin`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json", ...authHeaders },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Unable to save blog");
      setBlogForm(emptyBlogForm);
      setBlogStatus({
        kind: "success",
        text:
          nextStatus === "published" ?
            "Blog published successfully."
          : "Blog saved as draft.",
      });
      await loadBlogs();
    } catch (error) {
      setBlogStatus({
        kind: "error",
        text: error.message || "Unable to save blog",
      });
    } finally {
      setBlogSaving(false);
    }
  };

  const deleteBlog = async (blog) => {
    const blogId = blog.id || blog._id;
    if (!blogId) return;
    const confirmed = window.confirm(
      `Delete "${blog.title}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      setBlogStatus({ kind: "", text: "" });
      const res = await fetch(`${API_BASE}/blogs/admin/${blogId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Unable to delete blog");
      if (blogForm.id === blogId) setBlogForm(emptyBlogForm);
      setBlogStatus({ kind: "success", text: "Blog deleted successfully." });
      await loadBlogs();
    } catch (error) {
      setBlogStatus({
        kind: "error",
        text: error.message || "Unable to delete blog",
      });
    }
  };

  const userRows = usersData.map((entry) => ({
    ...entry,
    id: entry.id || entry._id || entry.email,
  }));
  const enquiryRows = enquiryData.map((entry) => ({
    ...entry,
    id: entry._id || `${entry.email}-${entry.createdAt}`,
  }));
  const dematAccountRows = dematAccountData.map((entry) => ({
    ...entry,
    id: entry._id || `${entry.email}-${entry.createdAt}`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8E6E2]/20 via-white to-[#9ED5D1]/15">
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <img
              src={IMAGES.logo}
              alt="Index Money"
              className="h-11 w-32 object-contain object-left"
            />
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 sm:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-[#63C1BB]" />
              Logged in as{" "}
              <strong className="text-slate-700">
                {user.fullName || user.email}
              </strong>
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
              className="flex items-center gap-1.5 rounded-xl bg-[#3A9295] px-4 py-2 text-xs font-semibold text-white shadow-sm"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#105F68] to-[#3A9295] px-8 py-7 text-white shadow-lg shadow-[#105F68]/20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                Admin Dashboard
              </p>
              <h1 className="text-2xl font-bold md:text-3xl">
                Admin-only content and lead management
              </h1>
              <p className="mt-1.5 text-sm text-white/70">
                Review registered users and enquiries, export them, and manage
                public website data.
              </p>
            </div>
            <button
              onClick={() => navigate("/past-performance")}
              className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/15 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/25"
            >
              Open Public View <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[repeat(7,minmax(0,1fr))]">
          <StatCard
            icon={Users}
            label="Registered Users"
            value={adminDataLoading ? "..." : usersData.length}
            sub="Accounts in the system"
          />
          <StatCard
            icon={ClipboardList}
            label="Enquiries"
            value={adminDataLoading ? "..." : enquiryData.length}
            sub="Leads received"
            color="#3A9295"
          />
          <StatCard
            icon={FileSpreadsheet}
            label="Demat Leads"
            value={adminDataLoading ? "..." : dematAccountData.length}
            sub="Account requests"
            color="#1f8a70"
          />
          <StatCard
            icon={BookOpen}
            label="Active Blogs"
            value={blogsLoading ? "..." : blogStats.published}
            sub={`${blogStats.drafts} drafts`}
            color="#1f7a6d"
          />
          <StatCard
            icon={BarChart2}
            label="Today's Results"
            value={`${todaysResults.length} Rows`}
            sub="Daily update block"
            color="#63C1BB"
          />
          <StatCard
            icon={FileSpreadsheet}
            label="Performance Sheet"
            value={performanceMeta.totalTrades || "0"}
            sub="Uploaded trades"
            color="#2f7d80"
          />
          <StatCard
            icon={Database}
            label="Unlisted Sheet"
            value={unlistedMeta.totalRows || "0"}
            sub="Opportunity rows"
            color="#205d63"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#63C1BB] to-[#3A9295]">
                <User className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Admin Profile
                </p>
                <p className="text-xs text-slate-400">
                  Logged-in administrator information
                </p>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              <InfoRow icon={User} label="Full Name" value={user.fullName} />
              <InfoRow icon={Mail} label="Email Address" value={user.email} />
              <InfoRow icon={MapPin} label="City" value={user.city} />
              <InfoRow icon={ShieldCheck} label="Access Level" value="Admin" />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={RefreshCcw}
              eyebrow="Workflow"
              title="How the admin uses this daily"
              description="Check new users and enquiries, export CSVs when needed, then update the public site sections."
            />
            <div className="grid gap-3">
              {[
                "Review the users table for new signups.",
                "Check fresh enquiries and export them as CSV.",
                "Update Today's Results and upload the latest sheets.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-2">
          <div>
            <StatusBanner
              kind={adminDataStatus.kind}
              text={adminDataStatus.text}
            />
            <TableCard
              title="Registered Users"
              count={usersData.length}
              description="All signed-up accounts are listed here for admin review."
              rows={userRows}
              loading={adminDataLoading}
              onExport={() =>
                downloadCsv(
                  "indexmoney-users.csv",
                  [
                    "Full Name",
                    "Email",
                    "Mobile Number",
                    "City",
                    "Role",
                    "Joined At",
                  ],
                  usersData.map((entry) => [
                    entry.fullName,
                    entry.email,
                    entry.mobileNumber,
                    entry.city,
                    entry.isAdmin ? "Admin" : "User",
                    fmt(entry.createdAt),
                  ]),
                )
              }
              columns={[
                { key: "fullName", label: "Full Name" },
                {
                  key: "email",
                  label: "Email",
                  render: (row) => (
                    <div>
                      <div className="font-medium text-slate-800">
                        {row.email || "-"}
                      </div>
                      <div className="text-xs text-slate-400">
                        {row.isAdmin ? "Admin" : "User"}
                      </div>
                    </div>
                  ),
                },
                { key: "mobileNumber", label: "Mobile" },
                { key: "city", label: "City" },
                {
                  key: "createdAt",
                  label: "Joined",
                  render: (row) => fmt(row.createdAt),
                },
              ]}
            />
          </div>

          <TableCard
            title="Enquiries"
            count={enquiryData.length}
            description="Homepage enquiry submissions appear here in reverse chronological order."
            rows={enquiryRows}
            loading={adminDataLoading}
            onExport={() =>
              downloadCsv(
                "indexmoney-enquiries.csv",
                ["Name", "Email", "Phone", "Plan Type", "Created At"],
                enquiryData.map((entry) => [
                  entry.name,
                  entry.email,
                  entry.phone,
                  entry.planType,
                  fmt(entry.createdAt),
                ]),
              )
            }
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "planType", label: "Plan" },
              {
                key: "createdAt",
                label: "Received",
                render: (row) => fmt(row.createdAt),
              },
            ]}
          />
        </div>

        <div className="mt-8">
          <TableCard
            title="Demat Account Requests"
            count={dematAccountData.length}
            description="Demat account form submissions appear here separately from general enquiries."
            rows={dematAccountRows}
            loading={adminDataLoading}
            onExport={() =>
              downloadCsv(
                "indexmoney-demat-account-requests.csv",
                ["Full Name", "Mobile Number", "Email", "Created At"],
                dematAccountData.map((entry) => [
                  entry.fullName,
                  entry.mobileNumber,
                  entry.email,
                  fmt(entry.createdAt),
                ]),
              )
            }
            columns={[
              { key: "fullName", label: "Full Name" },
              { key: "mobileNumber", label: "Mobile" },
              { key: "email", label: "Email" },
              {
                key: "createdAt",
                label: "Received",
                render: (row) => fmt(row.createdAt),
              },
            ]}
          />
        </div>

        <div className="mt-8">
          <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={BookOpen}
              eyebrow="Blog CMS"
              title="Create, Draft, and Publish Blogs"
              description="Write SEO-ready blogs with slug, meta title, meta description, keywords, and a public cover image URL."
              action={
                <button
                  type="button"
                  onClick={() => navigate("/blogs")}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Eye className="h-4 w-4" />
                  View Blogs
                </button>
              }
            />
            <StatusBanner kind={blogStatus.kind} text={blogStatus.text} />

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="title"
                    type="text"
                    value={blogForm.title}
                    onChange={handleBlogChange}
                    placeholder="Blog title"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                  />
                  <input
                    name="slug"
                    type="text"
                    value={blogForm.slug}
                    onChange={handleBlogChange}
                    placeholder="SEO slug, auto-created if empty"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                  />
                </div>

                <textarea
                  name="excerpt"
                  rows={3}
                  value={blogForm.excerpt}
                  onChange={handleBlogChange}
                  placeholder="Short SEO excerpt"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                />

                <BlogRichTextEditor
                  value={blogForm.content}
                  onChange={handleBlogChange}
                  placeholder="Paste Google Docs content here. Headings, bullets, paragraphs, and tables will be preserved."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="coverImageUrl"
                    type="url"
                    value={blogForm.coverImageUrl}
                    onChange={handleBlogChange}
                    placeholder="Cover image URL"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                  />
                  <input
                    name="authorName"
                    type="text"
                    value={blogForm.authorName}
                    onChange={handleBlogChange}
                    placeholder="Author name"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="metaTitle"
                    type="text"
                    value={blogForm.metaTitle}
                    onChange={handleBlogChange}
                    placeholder="Meta title"
                    maxLength={70}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                  />
                  <input
                    name="keywords"
                    type="text"
                    value={blogForm.keywords}
                    onChange={handleBlogChange}
                    placeholder="Keywords, comma separated"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                  />
                </div>

                <textarea
                  name="metaDescription"
                  rows={2}
                  value={blogForm.metaDescription}
                  onChange={handleBlogChange}
                  placeholder="Meta description"
                  maxLength={170}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => saveBlog("draft")}
                    disabled={blogSaving}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    {blogSaving ? "Saving..." : "Save Draft"}
                  </button>
                  <button
                    type="button"
                    onClick={() => saveBlog("published")}
                    disabled={blogSaving}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#105F68] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <BookOpen className="h-4 w-4" />
                    {blogSaving ? "Publishing..." : "Publish Blog"}
                  </button>
                  <button
                    type="button"
                    onClick={resetBlogForm}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-white"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white">
                <div className="border-b border-slate-100 p-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Total
                      </p>
                      <p className="mt-1 text-xl font-bold text-slate-800">
                        {blogStats.total}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                        Active
                      </p>
                      <p className="mt-1 text-xl font-bold text-emerald-700">
                        {blogStats.published}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                        Drafts
                      </p>
                      <p className="mt-1 text-xl font-bold text-amber-700">
                        {blogStats.drafts}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="max-h-[650px] divide-y divide-slate-100 overflow-y-auto">
                  {blogs.length ?
                    blogs.map((blog) => (
                      <div key={blog.id || blog._id} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-bold text-slate-900">
                                {blog.title}
                              </h3>
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                  blog.status === "published" ?
                                    "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                                }`}
                              >
                                {blog.status === "published" ?
                                  "Active"
                                : "Draft"}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">
                              /{blog.slug}
                            </p>
                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                              {blog.excerpt}
                            </p>
                            <p className="mt-2 text-xs text-slate-400">
                              Updated {fmt(blog.updatedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => editBlog(blog)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          {blog.status === "published" ?
                            <button
                              type="button"
                              onClick={() => navigate(`/blogs/${blog.slug}`)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </button>
                          : null}
                          <button
                            type="button"
                            onClick={() => deleteBlog(blog)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  : <div className="p-8 text-center text-sm text-slate-400">
                      {blogsLoading ?
                        "Loading blogs..."
                      : "No blogs yet. Write the first one on the left."}
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_1fr]">
          <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={Save}
              eyebrow="Home Module 1"
              title="Today's Results Admin"
              description="These rows feed the small Today's Results card on the home hero."
            />
            <StatusBanner
              kind={homepageStatus.kind}
              text={homepageStatus.text}
            />
            {homepageStatus.kind === "success" ?
              <QuickViewLinks
                links={[
                  {
                    label: "View Home Page",
                    onClick: () => navigate("/"),
                  },
                ]}
              />
            : null}
            <div className="space-y-3">
              {todaysResults.map((row, index) => (
                <div
                  key={`${index}-${row.label}`}
                  className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_1fr_auto]"
                >
                  <input
                    type="text"
                    value={row.label}
                    onChange={(e) =>
                      setTodaysResults((current) =>
                        current.map((item, i) =>
                          i === index ?
                            { ...item, label: e.target.value }
                          : item,
                        ),
                      )
                    }
                    placeholder="Label"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                  />
                  <input
                    type="text"
                    value={row.points}
                    onChange={(e) =>
                      setTodaysResults((current) =>
                        current.map((item, i) =>
                          i === index ?
                            { ...item, points: e.target.value }
                          : item,
                        ),
                      )
                    }
                    placeholder="Points"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                  />
                  <input
                    type="text"
                    value={row.note}
                    onChange={(e) =>
                      setTodaysResults((current) =>
                        current.map((item, i) =>
                          i === index ?
                            { ...item, note: e.target.value }
                          : item,
                        ),
                      )
                    }
                    placeholder="Note"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                  />
                  <button
                    type="button"
                    disabled={todaysResults.length <= 1}
                    onClick={() =>
                      setTodaysResults((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  setTodaysResults((current) => [
                    ...current,
                    { label: "", points: "", note: "" },
                  ])
                }
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Add Row
              </button>
              <button
                type="button"
                onClick={saveHomepageResults}
                disabled={homepageSaving || homepageLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#105F68] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {homepageSaving ? "Saving..." : "Save Today's Results"}
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={Upload}
              eyebrow="Past Performance Module"
              title="Past Performance Sheet Upload"
              description="Upload the past performance Excel here so the public cards and table stay current."
            />
            <StatusBanner
              kind={performanceStatus.kind}
              text={performanceStatus.text}
            />
            {performanceStatus.kind === "success" ?
              <QuickViewLinks
                links={[
                  {
                    label: "View Past Performance",
                    onClick: () => navigate("/past-performance"),
                  },
                  {
                    label: "View Home Page",
                    onClick: () => navigate("/"),
                  },
                ]}
              />
            : null}
            <div className="mb-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-700">
                Required Excel columns
              </p>
              <p className="mt-2">
                `date`, `index`, `callType`, `entry`, `sl`, `target`, `result`,
                `points`
              </p>
              <p className="mt-3 font-semibold text-slate-700">
                Optional extra columns
              </p>
              <p className="mt-2">`tradeId`</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={performanceForm.title}
                onChange={(e) =>
                  setPerformanceForm((current) => ({
                    ...current,
                    title: e.target.value,
                  }))
                }
                placeholder="Upload title"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
              />
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) =>
                  setPerformanceForm((current) => ({
                    ...current,
                    file: e.target.files?.[0] || null,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#E7F7F5] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#105F68]"
              />
              <button
                type="button"
                onClick={() => uploadSheet("performance")}
                disabled={performanceUploading || performanceLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3A9295] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Upload className="h-4 w-4" />
                {performanceUploading ?
                  "Uploading..."
                : "Upload Performance Sheet"}
              </button>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-100 bg-[#f8fcfb] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Latest uploaded file
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {performanceMeta.sourceFileName || "No file uploaded yet"}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {performanceMeta.title || "No upload title yet"}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-400">
                {performanceMeta.totalTrades} trade rows available
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8">
          <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={FileSpreadsheet}
              eyebrow="Unlisted Module"
              title="Unlisted Opportunities Sheet Upload"
              description="Upload the unlisted shares Excel sheet here. The public cards and detail pages fetch the latest uploaded data automatically."
            />
            <StatusBanner
              kind={unlistedStatus.kind}
              text={unlistedStatus.text}
            />
            {unlistedStatus.kind === "success" ?
              <QuickViewLinks
                links={[
                  {
                    label: "View Unlisted Shares",
                    onClick: () => navigate("/unlisted-shares"),
                  },
                ]}
              />
            : null}
            <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-700">
                    Required Excel columns
                  </p>
                  <p className="mt-2">
                    `company`, `sector`, `price`, `minimumInvestment`, `status`
                  </p>
                  <p className="mt-4 font-semibold text-slate-700">
                    Optional card/detail columns
                  </p>
                  <p className="mt-2 leading-6">
                    `code`, `slug`, `logoUrl`, `badge`, `description`,
                    `marketCap`, `isin`, `faceValue`, `eps`, `pbRatio`,
                    `bookValue`, `debtEquityRatio`, `settlementPeriod`,
                    `minUnits`, `aboutCompany`, `strengths`, `weaknesses`
                  </p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Use `strengths` and `weaknesses` with values separated by
                    `|` to show bullet points on each share detail page.
                  </p>
                </div>
                <input
                  type="text"
                  value={unlistedForm.title}
                  onChange={(e) =>
                    setUnlistedForm((current) => ({
                      ...current,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Upload title"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/20"
                />
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) =>
                    setUnlistedForm((current) => ({
                      ...current,
                      file: e.target.files?.[0] || null,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#E7F7F5] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#105F68]"
                />
                <button
                  type="button"
                  onClick={() => uploadSheet("unlisted")}
                  disabled={unlistedUploading || unlistedLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#105F68] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Upload className="h-4 w-4" />
                  {unlistedUploading ? "Uploading..." : "Upload Unlisted Sheet"}
                </button>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-[#f8fcfb] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Latest uploaded file
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {unlistedMeta.sourceFileName || "No file uploaded yet"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {unlistedMeta.title || "No upload title yet"}
                </p>
                <p className="mt-2 text-xs font-medium text-slate-400">
                  {unlistedMeta.totalRows} rows available
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
