import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Wallet,
  TrendingUp,
  Briefcase,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  dashboardMetrics,
  portfolioGrowthData,
  sectorAllocationData,
  recentActivity,
} from "./data/dummyData";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const OverviewPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#48cae4] mb-2">
          Dashboard
        </p>
        <h1 className="text-4xl font-serif font-bold text-white">Overview</h1>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-white/60 mb-4">
            <Wallet className="h-5 w-5 text-[#48cae4]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Total Invested
            </h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {formatCurrency(dashboardMetrics.totalInvested)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-white/60 mb-4">
            <PieChartIcon className="h-5 w-5 text-[#48cae4]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Current Value
            </h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {formatCurrency(dashboardMetrics.currentValue)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp className="h-16 w-16 text-emerald-400" />
          </div>
          <div className="flex items-center gap-3 text-white/60 mb-4 relative z-10">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Total Return
            </h3>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-emerald-400">
              +{formatCurrency(dashboardMetrics.totalReturn)}
            </p>
            <p className="text-sm font-bold text-emerald-400/80 mt-1">
              +{dashboardMetrics.returnPercentage}% Overall
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-white/60 mb-4">
            <Briefcase className="h-5 w-5 text-[#48cae4]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Active Holdings
            </h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {dashboardMetrics.activeInvestments} Companies
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Growth Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
          <h2 className="text-xl font-bold text-white mb-6">Portfolio Growth (1Y)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#48cae4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#48cae4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="month" stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#ffffff60"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#001845", borderColor: "#ffffff20", color: "#fff", borderRadius: "8px" }}
                  itemStyle={{ color: "#48cae4" }}
                  formatter={(value) => [formatCurrency(value), "Value"]}
                />
                <Area type="monotone" dataKey="value" stroke="#48cae4" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
          <h2 className="text-xl font-bold text-white mb-6">Sector Allocation</h2>
          <div className="h-[300px] w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorAllocationData}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sectorAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#001845", borderColor: "#ffffff20", color: "#fff", borderRadius: "8px" }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "12px", color: "#ffffff80" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Units</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/90">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        activity.type === "buy"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {activity.type}
                    </span>
                  </td>
                  <td className="py-4 font-semibold">{activity.company}</td>
                  <td className="py-4 text-white/60">{activity.date}</td>
                  <td className="py-4">{activity.units}</td>
                  <td className="py-4 text-right font-bold">
                    {formatCurrency(activity.amount)}
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

export default OverviewPage;
