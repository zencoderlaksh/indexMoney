import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const PartnerPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    source: "",
    message: "",
  });
  const [status, setStatus] = useState({ kind: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ kind: "", text: "" });

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ kind: "error", text: "Please fill in all required fields." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/partners/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit application");

      setStatus({ kind: "success", text: "Thank you! Your application has been submitted successfully." });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        source: "",
        message: "",
      });
    } catch (error) {
      setStatus({ kind: "error", text: error.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#0353a4]">
            Partner Program
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#001233] mb-4">
            Become a partner
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join our network and let's build something great together. Fill out the form below and our team will get in touch with you shortly.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          {status.text && (
            <div
              className={`mb-8 flex items-start gap-3 rounded-2xl border px-5 py-4 text-sm ${
                status.kind === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {status.kind === "success" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              )}
              <span className="leading-relaxed">{status.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Your full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0353a4] focus:ring-2 focus:ring-[#0353a4]/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0353a4] focus:ring-2 focus:ring-[#0353a4]/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Phone <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0353a4] focus:ring-2 focus:ring-[#0353a4]/20 transition-all"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Subject <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0353a4] focus:ring-2 focus:ring-[#0353a4]/20 transition-all"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Where did you find us? <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0353a4] focus:ring-2 focus:ring-[#0353a4]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Select an option</option>
                <option value="Google Search">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Referral">Referral from a friend/colleague</option>
                <option value="News/Blog">News article or blog</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Your message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us a bit more..."
                rows={5}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0353a4] focus:ring-2 focus:ring-[#0353a4]/20 transition-all resize-y"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0353a4] px-4 py-4 text-sm font-bold text-white transition-all hover:bg-[#023e7d] focus:outline-none focus:ring-2 focus:ring-[#0353a4] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                Apply to partner with us
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
