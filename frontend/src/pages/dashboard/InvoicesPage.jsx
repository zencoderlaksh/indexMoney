import React from "react";
import { Download, FileText } from "lucide-react";
import { invoicesData } from "./data/dummyData";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const InvoicesPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#48cae4] mb-2">
          Dashboard
        </p>
        <h1 className="text-4xl font-serif font-bold text-white">Invoices</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
        <h2 className="text-xl font-bold text-white mb-6">Billing History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="pb-3 font-medium">Invoice No</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/90">
              {invoicesData.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#48cae4]" />
                      <span className="font-mono text-white/80">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="py-4">{invoice.date}</td>
                  <td className="py-4 font-semibold">{invoice.description}</td>
                  <td className="py-4 font-bold">{formatCurrency(invoice.amount)}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        invoice.status === "paid"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#48cae4] transition-colors">
                      <Download className="h-4 w-4" />
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

export default InvoicesPage;
