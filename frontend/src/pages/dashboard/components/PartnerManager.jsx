import React, { useState, useEffect } from "react";
import { Users, Mail, Phone, ExternalLink } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const PartnerManager = ({ authHeaders }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/partners/applications`, {
        headers: authHeaders,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch applications");
      setApplications(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [authHeaders]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/partners/${id}/status`, {
        method: "PATCH",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update status");
      }

      setApplications(prev =>
        prev.map(app => (app._id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:p-8 mt-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0353a4]/10 text-[#0353a4]">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Partner Applications</h2>
          <p className="text-sm text-slate-500">Manage partnership requests</p>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Applicant</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Details</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-sm text-slate-400">Loading...</td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-sm text-slate-400">No applications found.</td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id}>
                  <td className="px-4 py-3">
                    <div className="text-sm font-bold text-slate-900">{app.fullName}</div>
                    <div className="text-xs text-slate-500">Source: {app.source || "N/A"}</div>
                    <div className="text-xs text-slate-400">{new Date(app.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-slate-700">
                      <Mail className="h-3 w-3 text-slate-400" />
                      <a href={`mailto:${app.email}`} className="hover:text-[#0353a4]">{app.email}</a>
                    </div>
                    {app.phone && (
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-700">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <a href={`tel:${app.phone}`} className="hover:text-[#0353a4]">{app.phone}</a>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-slate-700">{app.subject || "No Subject"}</div>
                    <div className="text-xs text-slate-500 line-clamp-2 max-w-[200px]" title={app.message}>
                      {app.message}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold outline-none transition-colors ${
                        app.status === 'pending' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                        app.status === 'contacted' ? 'border-blue-200 bg-blue-50 text-blue-700' :
                        app.status === 'reviewed' ? 'border-purple-200 bg-purple-50 text-purple-700' :
                        app.status === 'rejected' ? 'border-red-200 bg-red-50 text-red-700' :
                        'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="contacted">Contacted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PartnerManager;
