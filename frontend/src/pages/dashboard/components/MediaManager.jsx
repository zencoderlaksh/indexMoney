import React, { useState, useEffect } from "react";
import { Save, Pencil, Trash2, Globe, Plus, X } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export default function MediaManager({ authHeaders }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    sourceName: "",
    sourceUrl: "",
    coverImageUrl: "",
    status: "draft",
  });
  const [statusMsg, setStatusMsg] = useState({ kind: "", text: "" });

  const loadMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/media/admin`, {
        headers: authHeaders,
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setMediaList(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));
  };

  const handleEdit = (media) => {
    setForm({
      id: media.id || media._id,
      title: media.title,
      slug: media.slug,
      excerpt: media.excerpt,
      sourceName: media.sourceName,
      sourceUrl: media.sourceUrl,
      coverImageUrl: media.coverImageUrl || "",
      status: media.status,
    });
    setStatusMsg({ kind: "", text: "" });
  };

  const handleDelete = async (media) => {
    const confirmed = window.confirm(`Delete media mention "${media.title}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/media/admin/${media.id || media._id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (res.ok) {
        setStatusMsg({ kind: "success", text: "Media entry deleted successfully." });
        loadMedia();
        if (form.id === (media.id || media._id)) {
          clearForm();
        }
      } else {
        const json = await res.json();
        throw new Error(json.error || "Delete failed");
      }
    } catch (err) {
      setStatusMsg({ kind: "error", text: err.message });
    }
  };

  const clearForm = () => {
    setForm({
      id: "",
      title: "",
      slug: "",
      excerpt: "",
      sourceName: "",
      sourceUrl: "",
      coverImageUrl: "",
      status: "draft",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ kind: "", text: "" });

    if (!form.title || !form.sourceName || !form.sourceUrl) {
      setStatusMsg({ kind: "error", text: "Title, source name, and source URL are required." });
      return;
    }

    try {
      const isEdit = Boolean(form.id);
      const url = isEdit ? `${API_BASE}/media/admin/${form.id}` : `${API_BASE}/media/admin`;
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (res.ok) {
        setStatusMsg({
          kind: "success",
          text: isEdit ? "Media updated successfully." : "Media entry added successfully.",
        });
        clearForm();
        loadMedia();
      } else {
        throw new Error(json.error || "Save failed");
      }
    } catch (err) {
      setStatusMsg({ kind: "error", text: err.message });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Globe className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-800">Media & Press Center</h3>
            <p className="text-xs text-slate-400">Manage external news clipping links</p>
          </div>
        </div>
      </div>

      {statusMsg.text && (
        <div
          className={`mb-4 rounded-xl border p-3.5 text-xs font-semibold ${
            statusMsg.kind === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Article Title *</label>
            <input
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Index Money facilitates pre-IPO rounds"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Source Name *</label>
            <input
              name="sourceName"
              type="text"
              required
              value={form.sourceName}
              onChange={handleChange}
              placeholder="e.g. Economic Times or Moneycontrol"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Source URL *</label>
            <input
              name="sourceUrl"
              type="text"
              required
              value={form.sourceUrl}
              onChange={handleChange}
              placeholder="e.g. https://economictimes.com/article-url"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Cover Image URL</label>
            <input
              name="coverImageUrl"
              type="text"
              value={form.coverImageUrl}
              onChange={handleChange}
              placeholder="e.g. https://domain.com/images/news.jpg"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">Excerpt / Description Summary</label>
          <textarea
            name="excerpt"
            rows={3}
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Write a brief overview of the news article coverage highlights..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#023e7d] px-5 py-2.5 text-xs font-bold text-white shadow-sm"
          >
            <Save className="h-3.5 w-3.5" />
            {form.id ? "Update Entry" : "Save Entry"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={clearForm}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-50"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="border-t border-slate-100 pt-6">
        <h4 className="mb-4 text-sm font-bold text-slate-800">Press Clippings ({mediaList.length})</h4>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-bold uppercase text-slate-500">Source</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold uppercase text-slate-500">Title</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold uppercase text-slate-500">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold uppercase text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-slate-400">Loading press clippings...</td>
                </tr>
              ) : mediaList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-slate-400">No media entries found.</td>
                </tr>
              ) : (
                mediaList.map((m) => (
                  <tr key={m.id || m._id}>
                    <td className="px-4 py-2 text-indigo-650 font-bold">
                      {m.sourceName}
                    </td>
                    <td className="px-4 py-2 font-semibold text-slate-700">
                      <div>{m.title}</div>
                      <div className="text-[11px] font-normal text-slate-400">{m.sourceUrl}</div>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                        m.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(m)}
                          className="inline-flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs font-bold text-slate-600 hover:bg-slate-50"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(m)}
                          className="inline-flex items-center gap-1 rounded border border-red-100 px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
