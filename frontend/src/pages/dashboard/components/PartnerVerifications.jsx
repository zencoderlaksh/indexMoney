import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, FileCheck } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const PartnerVerifications = ({ authHeaders }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/partners/verifications`, {
        headers: authHeaders,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch verifications");
      setPartners(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, [authHeaders]);

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to change status to ${newStatus}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/partners/verifications/${id}/status`, {
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

      setPartners(prev =>
        prev.map(p => (p.id === id ? { ...p, partnerStatus: newStatus } : p))
      );
    } catch (err) {
      alert("Error updating verification: " + err.message);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:p-8 mt-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#48cae4]/10 text-[#48cae4]">
          <FileCheck className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Partner Verifications</h2>
          <p className="text-sm text-slate-500">Approve partner payments and unlock bulk pricing access</p>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Partner</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Payment Reference</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-sm text-slate-400">Loading...</td>
              </tr>
            ) : partners.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-sm text-slate-400">No partner verifications found.</td>
              </tr>
            ) : (
              partners.map((partner) => (
                <tr key={partner.id}>
                  <td className="px-4 py-3">
                    <div className="text-sm font-bold text-slate-900">{partner.firstName} {partner.lastName}</div>
                    <div className="text-xs text-slate-500">{partner.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-mono text-slate-700">{partner.partnerPaymentRef || "N/A"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      partner.partnerStatus === 'verified' ? 'bg-green-100 text-green-800' :
                      partner.partnerStatus === 'pending' ? 'bg-amber-100 text-amber-800' :
                      partner.partnerStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {partner.partnerStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(partner.id, "verified")}
                        disabled={partner.partnerStatus === "verified"}
                        className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-30"
                        title="Approve"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(partner.id, "rejected")}
                        disabled={partner.partnerStatus === "rejected"}
                        className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-30"
                        title="Reject"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
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

export default PartnerVerifications;
