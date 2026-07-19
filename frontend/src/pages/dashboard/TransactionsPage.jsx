import React, { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, FileText, Filter } from "lucide-react";
import { transactionsData } from "./data/dummyData";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const TransactionsPage = () => {
  const [filter, setFilter] = useState("all");

  const filteredData = transactionsData.filter((txn) => {
    if (filter === "all") return true;
    return txn.type === filter;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#48cae4] mb-2">
          Dashboard
        </p>
        <h1 className="text-4xl font-serif font-bold text-white">Transactions</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-white">Ledger</h2>
          
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                filter === "all" ? "bg-[#48cae4] text-[#000d26]" : "text-white/60 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("deposit")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                filter === "deposit" ? "bg-[#48cae4] text-[#000d26]" : "text-white/60 hover:text-white"
              }`}
            >
              Deposits
            </button>
            <button
              onClick={() => setFilter("purchase")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                filter === "purchase" ? "bg-[#48cae4] text-[#000d26]" : "text-white/60 hover:text-white"
              }`}
            >
              Purchases
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="pb-3 font-medium">Txn ID</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/90">
              {filteredData.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-white/60">{txn.id}</td>
                  <td className="py-4">{txn.date}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${txn.isCredit ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                        {txn.isCredit ? (
                          <ArrowDownLeft className={`h-4 w-4 text-emerald-400`} />
                        ) : (
                          <ArrowUpRight className={`h-4 w-4 text-rose-400`} />
                        )}
                      </div>
                      <span className="font-semibold">{txn.description}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        txn.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className={`font-bold ${txn.isCredit ? 'text-emerald-400' : 'text-white'}`}>
                      {txn.isCredit ? "+" : "-"}{formatCurrency(txn.amount)}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-white/40">
                    No transactions found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
