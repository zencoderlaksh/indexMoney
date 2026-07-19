import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Briefcase, TrendingUp } from "lucide-react";
import { portfolioHoldings } from "./data/dummyData";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const PortfolioPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#48cae4] mb-2">
          Dashboard
        </p>
        <h1 className="text-4xl font-serif font-bold text-white">Portfolio</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Holdings Chart */}
        <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-[#48cae4]" />
            <h2 className="text-xl font-bold text-white">Asset Performance</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portfolioHoldings} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="company" stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#ffffff60"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  cursor={{ fill: "#ffffff05" }}
                  contentStyle={{ backgroundColor: "#001845", borderColor: "#ffffff20", color: "#fff", borderRadius: "8px" }}
                  formatter={(value) => [`${value}%`, "Return"]}
                />
                <Bar dataKey="returnPercentage" radius={[4, 4, 0, 0]}>
                  {portfolioHoldings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.returnPercentage > 0 ? "#10b981" : "#ef4444"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="h-6 w-6 text-[#48cae4]" />
          <h2 className="text-xl font-bold text-white">Current Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="pb-3 font-medium whitespace-nowrap">Asset</th>
                <th className="pb-3 font-medium text-right">Units</th>
                <th className="pb-3 font-medium text-right">Avg Price</th>
                <th className="pb-3 font-medium text-right">CMP</th>
                <th className="pb-3 font-medium text-right">Invested</th>
                <th className="pb-3 font-medium text-right">Current Value</th>
                <th className="pb-3 font-medium text-right">Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/90">
              {portfolioHoldings.map((holding) => (
                <tr key={holding.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <div className="font-semibold text-white">{holding.company}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{holding.sector}</div>
                  </td>
                  <td className="py-4 text-right">{holding.units}</td>
                  <td className="py-4 text-right">{formatCurrency(holding.avgPrice)}</td>
                  <td className="py-4 text-right font-medium">{formatCurrency(holding.currentPrice)}</td>
                  <td className="py-4 text-right">{formatCurrency(holding.invested)}</td>
                  <td className="py-4 text-right font-bold text-white">{formatCurrency(holding.currentValue)}</td>
                  <td className="py-4 text-right">
                    <div className={`font-bold ${holding.returnAmount > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {holding.returnAmount > 0 ? "+" : ""}{formatCurrency(holding.returnAmount)}
                    </div>
                    <div className={`text-xs ${holding.returnPercentage > 0 ? "text-emerald-400/80" : "text-rose-400/80"}`}>
                      {holding.returnPercentage > 0 ? "+" : ""}{holding.returnPercentage}%
                    </div>
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

export default PortfolioPage;
