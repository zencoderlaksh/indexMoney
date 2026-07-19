import React from "react";
import { MessageSquare, Plus, ExternalLink } from "lucide-react";
import { enquiriesData } from "./data/dummyData";

const EnquiriesPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#48cae4] mb-2">
            Dashboard
          </p>
          <h1 className="text-4xl font-serif font-bold text-white">Enquiries</h1>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#023e7d] hover:bg-[#0353a4] text-white px-5 py-2.5 rounded-full font-bold transition-colors">
          <Plus className="h-4 w-4" /> New Enquiry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6">
          <div className="flex items-center gap-3 text-white/60 mb-2">
            <MessageSquare className="h-5 w-5 text-[#48cae4]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Total</h3>
          </div>
          <p className="text-3xl font-bold text-white">12</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6">
          <div className="flex items-center gap-3 text-amber-400/80 mb-2">
            <MessageSquare className="h-5 w-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Open</h3>
          </div>
          <p className="text-3xl font-bold text-amber-400">1</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6">
          <div className="flex items-center gap-3 text-emerald-400/80 mb-2">
            <MessageSquare className="h-5 w-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resolved</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-400">11</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
        <h2 className="text-xl font-bold text-white mb-6">Recent Enquiries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="pb-3 font-medium">Ticket ID</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Subject</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/90">
              {enquiriesData.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-white/60">{enquiry.id}</td>
                  <td className="py-4">{enquiry.date}</td>
                  <td className="py-4 font-semibold">{enquiry.subject}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        enquiry.status === "open"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#48cae4] hover:text-white transition-colors">
                      View <ExternalLink className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnquiriesPage;
