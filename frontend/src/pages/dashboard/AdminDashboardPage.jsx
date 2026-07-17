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
import VideoManager from "./components/VideoManager";
import ResearchManager from "./components/ResearchManager";
import MediaManager from "./components/MediaManager";
import PartnerManager from "./components/PartnerManager";
import PartnerVerifications from "./components/PartnerVerifications";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

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

const StatCard = ({ icon: Icon, label, value, sub, color = "#023e7d" }) => (
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
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7d8597]/40">
      <Icon className="h-4 w-4 text-[#0353a4]" />
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
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E7F7F5] text-[#023e7d]">
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
        <span className="rounded-full bg-[#E7F7F5] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#023e7d]">
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
        className="min-h-[260px] max-h-[420px] overflow-y-auto rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
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

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const authHeaders = React.useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token],
  );

  

  const [performanceTrades, setPerformanceTrades] = React.useState([]);
  const [performanceMeta, setPerformanceMeta] = React.useState({
    title: "Latest Performance",
    totalTrades: 0,
  });
  const [performanceForm, setPerformanceForm] = React.useState({
    id: "",
    tradeId: "",
    date: "",
    index: "Nifty",
    callType: "CE",
    entry: "",
    sl: "",
    target: "",
    result: "Target Hit",
    points: "",
    chartUrl: "",
    chartTitle: "",
    chartNotes: "",
  });
  const [performanceLoading, setPerformanceLoading] = React.useState(true);
  const [performanceSaving, setPerformanceSaving] = React.useState(false);
  const [performanceStatus, setPerformanceStatus] = React.useState({
    kind: "",
    text: "",
  });

  const [unlistedOpportunities, setUnlistedOpportunities] = React.useState([]);
  const [unlistedMeta, setUnlistedMeta] = React.useState({
    title: "Latest Unlisted Opportunities",
    totalRows: 0,
  });
  const [unlistedForm, setUnlistedForm] = React.useState({
    id: "",
    company: "",
    sector: "",
    price: "",
    originalPrice: "",
    minimumInvestment: "",
    status: "Available",
    code: "",
    slug: "",
    logoUrl: "",
    badge: "",
    description: "",
    marketCap: "",
    isin: "",
    faceValue: "",
    eps: "",
    pbRatio: "",
    bookValue: "",
    debtEquityRatio: "",
    settlementPeriod: "",
    minUnits: "",
    aboutCompany: "",
    strengths: "",
    weaknesses: "",
  });
  const [unlistedLoading, setUnlistedLoading] = React.useState(true);
  const [unlistedSaving, setUnlistedSaving] = React.useState(false);
  const [unlistedStatus, setUnlistedStatus] = React.useState({
    kind: "",
    text: "",
  });

  const [usersData, setUsersData] = React.useState([]);
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

  

  

  const loadUnlisted = React.useCallback(async () => {
    try {
      setUnlistedLoading(true);
      const res = await fetch(`${API_BASE}/unlisted/opportunities`);
      const json = await res.json().catch(() => ({}));
      const data = json?.data;
      setUnlistedOpportunities(Array.isArray(data?.opportunities) ? data.opportunities : []);
      setUnlistedMeta({
        title: data?.title || "Latest Unlisted Opportunities",
        totalRows: data?.opportunities?.length || 0,
      });
    } catch {
      setUnlistedOpportunities([]);
      setUnlistedMeta({ title: "Latest Unlisted Opportunities", totalRows: 0 });
    } finally {
      setUnlistedLoading(false);
    }
  }, []);

  const loadAdminData = React.useCallback(async () => {
    if (!token) return;
    try {
      setAdminDataLoading(true);
      setAdminDataStatus({ kind: "", text: "" });
      const [usersRes, dematAccountsRes] = await Promise.all([
        fetch(`${API_BASE}/users`, { headers: authHeaders }),
        fetch(`${API_BASE}/demat-accounts`, { headers: authHeaders }),
      ]);
      const [usersJson, dematAccountsJson] = await Promise.all([
        usersRes.json().catch(() => ({})),
        dematAccountsRes.json().catch(() => ({})),
      ]);
      if (!usersRes.ok || !dematAccountsRes.ok) {
        throw new Error(
          usersJson?.error ||
            dematAccountsJson?.error ||
            "Unable to load admin data",
        );
      }
      setUsersData(Array.isArray(usersJson?.data) ? usersJson.data : []);
      setDematAccountData(
        Array.isArray(dematAccountsJson?.data) ? dematAccountsJson.data : [],
      );
    } catch (error) {
      setUsersData([]);
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
    
    loadUnlisted();
    loadAdminData();
    loadBlogs();
  }, [
    user,
    token,
    
    loadUnlisted,
    loadAdminData,
    loadBlogs,
  ]);

  if (!user || !token || !user.isAdmin) return null;

  

  

  

  

  

  

  const handleUnlistedChange = (e) => {
    const { name, value } = e.target;
    setUnlistedForm((curr) => ({ ...curr, [name]: value }));
  };

  const saveUnlistedOpportunity = async () => {
    setUnlistedStatus({ kind: "", text: "" });
    if (
      !unlistedForm.company.trim() ||
      !unlistedForm.sector.trim() ||
      !unlistedForm.price.trim() ||
      !unlistedForm.minimumInvestment.trim() ||
      !unlistedForm.status.trim()
    ) {
      setUnlistedStatus({
        kind: "error",
        text: "Company, sector, price, minimum investment, and status are required.",
      });
      return;
    }

    setUnlistedSaving(true);
    try {
      const isEditing = Boolean(unlistedForm.id);
      const url = isEditing
        ? `${API_BASE}/unlisted/opportunities/${unlistedForm.id}`
        : `${API_BASE}/unlisted/opportunities`;

      const method = isEditing ? "PUT" : "POST";
      const payload = { ...unlistedForm };
      if (!isEditing) delete payload.id;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Failed to save unlisted opportunity");

      setUnlistedForm({
        id: "",
        company: "",
        sector: "",
        price: "",
        originalPrice: "",
        minimumInvestment: "",
        status: "Available",
        code: "",
        slug: "",
        logoUrl: "",
        badge: "",
        description: "",
        marketCap: "",
        isin: "",
        faceValue: "",
        eps: "",
        pbRatio: "",
        bookValue: "",
        debtEquityRatio: "",
        settlementPeriod: "",
        minUnits: "",
        aboutCompany: "",
        strengths: "",
        weaknesses: "",
      });

      setUnlistedStatus({
        kind: "success",
        text: isEditing
          ? "Unlisted opportunity updated successfully."
          : "Unlisted opportunity created successfully.",
      });
      await loadUnlisted();
    } catch (error) {
      setUnlistedStatus({
        kind: "error",
        text: error.message || "Failed to save unlisted opportunity",
      });
    } finally {
      setUnlistedSaving(false);
    }
  };

  const editUnlistedOpportunity = (opp) => {
    setUnlistedForm({
      id: opp.id || opp._id || "",
      company: opp.company || "",
      sector: opp.sector || "",
      price: opp.price || "",
      originalPrice: opp.originalPrice || "",
      minimumInvestment: opp.minimumInvestment || "",
      status: opp.status || "Available",
      code: opp.code || "",
      slug: opp.slug || "",
      logoUrl: opp.logoUrl || "",
      badge: opp.badge || "",
      description: opp.description || "",
      marketCap: opp.marketCap || "",
      isin: opp.isin || "",
      faceValue: opp.faceValue || "",
      eps: opp.eps || "",
      pbRatio: opp.pbRatio || "",
      bookValue: opp.bookValue || "",
      debtEquityRatio: opp.debtEquityRatio || "",
      settlementPeriod: opp.settlementPeriod || "",
      minUnits: opp.minUnits || "",
      aboutCompany: opp.aboutCompany || "",
      strengths: opp.strengths || "",
      weaknesses: opp.weaknesses || "",
    });
    setUnlistedStatus({ kind: "", text: "" });
    const elem = document.getElementById("unlisted-form-section");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const deleteUnlistedOpportunity = async (opp) => {
    const oppId = opp.id || opp._id;
    if (!oppId) return;

    const confirmed = window.confirm(
      `Delete "${opp.company}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setUnlistedStatus({ kind: "", text: "" });
      const res = await fetch(`${API_BASE}/unlisted/opportunities/${oppId}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Failed to delete opportunity");

      if (unlistedForm.id === oppId) {
        setUnlistedForm({
          id: "",
          company: "",
          sector: "",
          price: "",
          originalPrice: "",
          minimumInvestment: "",
          status: "Available",
          code: "",
          slug: "",
          logoUrl: "",
          badge: "",
          description: "",
          marketCap: "",
          isin: "",
          faceValue: "",
          eps: "",
          pbRatio: "",
          bookValue: "",
          debtEquityRatio: "",
          settlementPeriod: "",
          minUnits: "",
          aboutCompany: "",
          strengths: "",
          weaknesses: "",
        });
      }

      setUnlistedStatus({
        kind: "success",
        text: "Unlisted opportunity deleted successfully.",
      });
      await loadUnlisted();
    } catch (error) {
      setUnlistedStatus({
        kind: "error",
        text: error.message || "Failed to delete unlisted opportunity",
      });
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
  const dematAccountRows = dematAccountData.map((entry) => ({
    ...entry,
    id: entry._id || `${entry.email}-${entry.createdAt}`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7d8597]/20 via-white to-[#5c677d]/15">
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <img
              src={IMAGES.logo}
              alt="Index Money"
              className="h-8 w-auto object-contain object-left invert hue-rotate-180"
            />
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 sm:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0466c8]" />
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
              className="flex items-center gap-1.5 rounded-xl bg-[#0353a4] px-4 py-2 text-xs font-semibold text-white shadow-sm"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#023e7d] to-[#0353a4] px-8 py-7 text-white shadow-lg shadow-[#023e7d]/20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                Admin Dashboard
              </p>
              <h1 className="text-2xl font-bold md:text-3xl">
                Admin-only content and lead management
              </h1>
              <p className="mt-1.5 text-sm text-white/70">
                Review registered users and demat requests, export them, and manage
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
            value={`${performanceTrades.filter(t => new Date(t.date).toDateString() === new Date().toDateString()).length} Rows`}
            sub="Daily update block"
            color="#0466c8"
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
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0466c8] to-[#0353a4]">
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
                "Check demat account requests and export them as CSV.",
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
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                  <input
                    name="slug"
                    type="text"
                    value={blogForm.slug}
                    onChange={handleBlogChange}
                    placeholder="SEO slug, auto-created if empty"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>

                <textarea
                  name="excerpt"
                  rows={3}
                  value={blogForm.excerpt}
                  onChange={handleBlogChange}
                  placeholder="Short SEO excerpt"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
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
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                  <input
                    name="authorName"
                    type="text"
                    value={blogForm.authorName}
                    onChange={handleBlogChange}
                    placeholder="Author name"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
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
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                  <input
                    name="keywords"
                    type="text"
                    value={blogForm.keywords}
                    onChange={handleBlogChange}
                    placeholder="Keywords, comma separated"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>

                <textarea
                  name="metaDescription"
                  rows={2}
                  value={blogForm.metaDescription}
                  onChange={handleBlogChange}
                  placeholder="Meta description"
                  maxLength={170}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
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
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#023e7d] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
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

        <div className="mt-8">
          <section id="unlisted-form-section" className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={Database}
              eyebrow="Unlisted Shares CMS"
              title={unlistedForm.id ? `Edit Unlisted Share: ${unlistedForm.company}` : "Add Unlisted Share"}
              description="Enter unlisted share details and fundamentals directly. No spreadsheet upload required."
            />
            
            <StatusBanner
              kind={unlistedStatus.kind}
              text={unlistedStatus.text}
            />

            {unlistedStatus.kind === "success" && (
              <QuickViewLinks
                links={[
                  {
                    label: "View Unlisted Shares Page",
                    onClick: () => navigate("/unlisted-shares"),
                  },
                ]}
              />
            )}

            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="mb-4 text-sm font-bold text-slate-800">1. Basic Details</h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company Name *</label>
                  <input
                    name="company"
                    type="text"
                    required
                    value={unlistedForm.company}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. Reliance Retail"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sector *</label>
                  <input
                    name="sector"
                    type="text"
                    required
                    value={unlistedForm.sector}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. Retail"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Price *</label>
                  <input
                    name="price"
                    type="text"
                    required
                    value={unlistedForm.price}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. Rs 350"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Original Price (Partner Bulk)</label>
                  <input
                    name="originalPrice"
                    type="text"
                    value={unlistedForm.originalPrice}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. Rs 320"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Min Investment *</label>
                  <input
                    name="minimumInvestment"
                    type="text"
                    required
                    value={unlistedForm.minimumInvestment}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. 100 Shares"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status *</label>
                  <select
                    name="status"
                    value={unlistedForm.status}
                    onChange={handleUnlistedChange}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  >
                    <option value="Available">Available</option>
                    <option value="Limited">Limited</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company Code</label>
                  <input
                    name="code"
                    type="text"
                    value={unlistedForm.code}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. RELRETAIL"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Slug</label>
                  <input
                    name="slug"
                    type="text"
                    value={unlistedForm.slug}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. reliance-retail"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Logo URL</label>
                  <input
                    name="logoUrl"
                    type="text"
                    value={unlistedForm.logoUrl}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. https://domain.com/logo.png"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Badge Tag</label>
                  <input
                    name="badge"
                    type="text"
                    value={unlistedForm.badge}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. Pre-IPO or Hot"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Short Description</label>
                <input
                  name="description"
                  type="text"
                  value={unlistedForm.description}
                  onChange={handleUnlistedChange}
                  placeholder="e.g. A brief overview of company's core offering..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                />
              </div>

              <h3 className="mb-4 mt-6 text-sm font-bold text-slate-800 border-t border-slate-200/50 pt-5">2. Fundamentals Reports (Separated)</h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Market Cap</label>
                  <input
                    name="marketCap"
                    type="text"
                    value={unlistedForm.marketCap}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. Rs 2,50,000 Cr"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ISIN</label>
                  <input
                    name="isin"
                    type="text"
                    value={unlistedForm.isin}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. INE002A01018"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Face Value</label>
                  <input
                    name="faceValue"
                    type="text"
                    value={unlistedForm.faceValue}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. Rs 10"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">EPS</label>
                  <input
                    name="eps"
                    type="text"
                    value={unlistedForm.eps}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. Rs 12.50"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">P/B Ratio</label>
                  <input
                    name="pbRatio"
                    type="text"
                    value={unlistedForm.pbRatio}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. 3.4"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Book Value</label>
                  <input
                    name="bookValue"
                    type="text"
                    value={unlistedForm.bookValue}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. Rs 140"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Debt / Equity</label>
                  <input
                    name="debtEquityRatio"
                    type="text"
                    value={unlistedForm.debtEquityRatio}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. 0.15"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Settlement Period</label>
                  <input
                    name="settlementPeriod"
                    type="text"
                    value={unlistedForm.settlementPeriod}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. T+2 Days"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Min Buy Units</label>
                  <input
                    name="minUnits"
                    type="text"
                    value={unlistedForm.minUnits}
                    onChange={handleUnlistedChange}
                    placeholder="e.g. 100"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
              </div>

              <h3 className="mb-4 mt-6 text-sm font-bold text-slate-800 border-t border-slate-200/50 pt-5">3. Deep-Dive Reports</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">About Company Description</label>
                  <textarea
                    name="aboutCompany"
                    rows={3}
                    value={unlistedForm.aboutCompany}
                    onChange={handleUnlistedChange}
                    placeholder="Detailed history, business lines, and background information about the company..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Strengths (Pipe separated '|')</label>
                    <textarea
                      name="strengths"
                      rows={3}
                      value={unlistedForm.strengths}
                      onChange={handleUnlistedChange}
                      placeholder="e.g. Strong brand presence | Debt-free | High margin expansion"
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Weaknesses / Risks (Pipe separated '|')</label>
                    <textarea
                      name="weaknesses"
                      rows={3}
                      value={unlistedForm.weaknesses}
                      onChange={handleUnlistedChange}
                      placeholder="e.g. Subject to regulatory approvals | High competitive pressure"
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={saveUnlistedOpportunity}
                  disabled={unlistedSaving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#023e7d] px-6 py-3 text-sm font-bold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {unlistedSaving ? "Saving..." : unlistedForm.id ? "Update Share" : "Save New Share"}
                </button>

                {unlistedForm.id && (
                  <button
                    type="button"
                    onClick={() => setUnlistedForm({
                      id: "",
                      company: "",
                      sector: "",
                      price: "",
                      originalPrice: "",
                      minimumInvestment: "",
                      status: "Available",
                      code: "",
                      slug: "",
                      logoUrl: "",
                      badge: "",
                      description: "",
                      marketCap: "",
                      isin: "",
                      faceValue: "",
                      eps: "",
                      pbRatio: "",
                      bookValue: "",
                      debtEquityRatio: "",
                      settlementPeriod: "",
                      minUnits: "",
                      aboutCompany: "",
                      strengths: "",
                      weaknesses: "",
                    })}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-white"
                  >
                    Cancel Edit
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setUnlistedForm({
                    id: "",
                    company: "",
                    sector: "",
                    price: "",
                    originalPrice: "",
                    minimumInvestment: "",
                    status: "Available",
                    code: "",
                    slug: "",
                    logoUrl: "",
                    badge: "",
                    description: "",
                    marketCap: "",
                    isin: "",
                    faceValue: "",
                    eps: "",
                    pbRatio: "",
                    bookValue: "",
                    debtEquityRatio: "",
                    settlementPeriod: "",
                    minUnits: "",
                    aboutCompany: "",
                    strengths: "",
                    weaknesses: "",
                  })}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Clear Form
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-8">
              <h3 className="mb-4 text-lg font-bold text-slate-800">Existing Opportunities ({unlistedOpportunities.length})</h3>
              
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Logo</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Company</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Sector</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Orig. Price</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Min. Investment</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {unlistedOpportunities.length ? (
                      unlistedOpportunities.map((opp) => (
                        <tr key={opp.id || opp._id}>
                          <td className="px-4 py-3 text-sm text-slate-700">
                            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50 text-xs font-bold text-[#023e7d]">
                              {opp.logoUrl ? (
                                <img src={opp.logoUrl} alt={opp.company} className="h-full w-full object-cover" />
                              ) : (
                                opp.company.substring(0, 2).toUpperCase()
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-bold text-slate-850">
                            <div>
                              <div>{opp.company}</div>
                              <div className="text-xs font-normal text-slate-400">Code: {opp.code || "-"} | Slug: {opp.slug || "-"}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700">{opp.sector}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-[#023e7d]">{opp.price}</td>
                          <td className="px-4 py-3 text-sm text-slate-500">{opp.originalPrice || "-"}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">{opp.minimumInvestment}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">
                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                              opp.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {opp.badge || opp.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => editUnlistedOpportunity(opp)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteUnlistedOpportunity(opp)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-sm text-slate-400">
                          {unlistedLoading ? "Loading opportunities..." : "No opportunities found. Enter details above to add the first one."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* New Content Managers for Learn, Research, and Media */}
          <div className="mt-8 grid gap-8 xl:grid-cols-2">
            <VideoManager authHeaders={authHeaders} />
            <MediaManager authHeaders={authHeaders} />
          </div>
          <div className="mt-8">
            <ResearchManager authHeaders={authHeaders} />
          </div>
          <div className="mt-8">
            <PartnerVerifications authHeaders={authHeaders} />
          </div>
          <div className="mt-8">
            <PartnerManager authHeaders={authHeaders} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
