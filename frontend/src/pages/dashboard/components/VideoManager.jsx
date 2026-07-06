import React, { useState, useEffect } from "react";
import { Save, Pencil, Trash2, Youtube, Play, Plus, X } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export default function VideoManager({ authHeaders }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: "",
    title: "",
    slug: "",
    youtubeUrl: "",
    description: "",
    status: "draft",
  });
  const [statusMsg, setStatusMsg] = useState({ kind: "", text: "" });

  const loadVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/videos/admin`, {
        headers: authHeaders,
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setVideos(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));
  };

  const handleEdit = (video) => {
    setForm({
      id: video.id || video._id,
      title: video.title,
      slug: video.slug,
      youtubeUrl: video.youtubeUrl,
      description: video.description || "",
      status: video.status,
    });
    setStatusMsg({ kind: "", text: "" });
  };

  const handleDelete = async (video) => {
    const confirmed = window.confirm(`Delete video "${video.title}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/videos/admin/${video.id || video._id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (res.ok) {
        setStatusMsg({ kind: "success", text: "Video deleted successfully." });
        loadVideos();
        if (form.id === (video.id || video._id)) {
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
      youtubeUrl: "",
      description: "",
      status: "draft",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ kind: "", text: "" });

    if (!form.title || !form.youtubeUrl) {
      setStatusMsg({ kind: "error", text: "Title and YouTube URL are required." });
      return;
    }

    try {
      const isEdit = Boolean(form.id);
      const url = isEdit ? `${API_BASE}/videos/admin/${form.id}` : `${API_BASE}/videos/admin`;
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
          text: isEdit ? "Video updated successfully." : "Video added successfully.",
        });
        clearForm();
        loadVideos();
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
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Youtube className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-800">Learn - Video Playlist</h3>
            <p className="text-xs text-slate-400">Manage youtube guides and walkthroughs</p>
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
            <label className="text-xs font-bold text-slate-500 uppercase">Video Title *</label>
            <input
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Zepto IPO 2026: Should you buy?"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">YouTube Link *</label>
            <input
              name="youtubeUrl"
              type="text"
              required
              value={form.youtubeUrl}
              onChange={handleChange}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Slug (Auto if empty)</label>
            <input
              name="slug"
              type="text"
              value={form.slug}
              onChange={handleChange}
              placeholder="e.g. zepto-ipo-2026-should-you-buy-at-40"
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
          <label className="text-xs font-bold text-slate-500 uppercase">Description / Transcript Summary</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Write a brief overview or key highlights of the video content..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0466c8] focus:ring-2 focus:ring-[#0466c8]/20"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#023e7d] px-5 py-2.5 text-xs font-bold text-white shadow-sm"
          >
            <Save className="h-3.5 w-3.5" />
            {form.id ? "Update Video" : "Save Video"}
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
        <h4 className="mb-4 text-sm font-bold text-slate-800">Saved Videos ({videos.length})</h4>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-bold uppercase text-slate-500">Thumbnail</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold uppercase text-slate-500">Title</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold uppercase text-slate-500">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold uppercase text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-slate-400">Loading videos...</td>
                </tr>
              ) : videos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-slate-400">No videos found.</td>
                </tr>
              ) : (
                videos.map((v) => (
                  <tr key={v.id || v._id}>
                    <td className="px-4 py-2">
                      <img src={v.thumbnailUrl} alt="" className="h-10 w-16 rounded object-cover border border-slate-100" />
                    </td>
                    <td className="px-4 py-2 font-semibold text-slate-700">
                      <div>{v.title}</div>
                      <div className="text-[11px] font-normal text-slate-400">{v.youtubeUrl}</div>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                        v.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(v)}
                          className="inline-flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs font-bold text-slate-600 hover:bg-slate-50"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(v)}
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
