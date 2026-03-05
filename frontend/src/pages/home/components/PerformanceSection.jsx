import React from "react";
import { motion } from "framer-motion";
import {
    ArrowRightLeft,
    ShieldAlert,
    Target,
    TrendingUp,
    TrendingDown,
    BarChart2,
    LineChart,
    ExternalLink,
} from "lucide-react";

const trades = [
    {
        date: "02 Jan 2025",
        index: "Nifty",
        callType: "CE",
        entry: 210,
        sl: 190,
        target: 255,
        result: "Target Hit",
        points: "+45",
    },
    {
        date: "08 Jan 2025",
        index: "Bank Nifty",
        callType: "PE",
        entry: 380,
        sl: 400,
        target: 320,
        result: "Target Hit",
        points: "+60",
    },
    {
        date: "15 Jan 2025",
        index: "Sensex",
        callType: "CE",
        entry: 145,
        sl: 130,
        target: 175,
        result: "SL Hit",
        points: "-15",
    },
    {
        date: "22 Jan 2025",
        index: "Nifty",
        callType: "Futures",
        entry: 22450,
        sl: 22300,
        target: 22750,
        result: "Target Hit",
        points: "+300",
    },
    {
        date: "29 Jan 2025",
        index: "Bank Nifty",
        callType: "CE",
        entry: 290,
        sl: 265,
        target: 345,
        result: "Target Hit",
        points: "+55",
    },
    {
        date: "05 Feb 2025",
        index: "Sensex",
        callType: "PE",
        entry: 510,
        sl: 535,
        target: 450,
        result: "SL Hit",
        points: "-25",
    },
];

const summaryStats = [
    { label: "Calls This Month", value: "24", icon: BarChart2 },
    { label: "Target Hit", value: "19", icon: TrendingUp },
    { label: "SL Hit", value: "5", icon: TrendingDown },
    { label: "Accuracy", value: "79%", icon: LineChart },
];

const indexColors = {
    Nifty: "bg-teal-50 text-teal-700",
    "Bank Nifty": "bg-emerald-50 text-emerald-700",
    Sensex: "bg-cyan-50 text-cyan-700",
};

const TradeCard = ({ date, index, callType, entry, sl, target, result, points }) => {
    const isProfit = result === "Target Hit";

    return (
        <motion.div
            whileHover={{ y: -6, boxShadow: "0 22px 44px rgba(0,0,0,0.10)" }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="bg-white rounded-2xl shadow-md border border-slate-100 hover:border-teal-200 transition-colors duration-300 flex flex-col overflow-hidden"
        >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-slate-50 to-teal-50/40 px-5 py-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${indexColors[index] || "bg-slate-100 text-slate-600"}`}>
                        {index}
                    </span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {callType}
                    </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">{date}</span>
            </div>

            {/* Chart Placeholder */}
            <div className="relative bg-gradient-to-br from-slate-50 to-teal-50/20 h-28 flex items-center justify-center border-b border-slate-100">
                <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
                        <polyline
                            points={isProfit ? "0,70 40,55 80,60 120,35 160,25 200,10" : "0,20 40,35 80,28 120,50 160,60 200,68"}
                            fill="none"
                            stroke={isProfit ? "#0d9488" : "#ef4444"}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div className={`flex flex-col items-center gap-1 z-10`}>
                    {isProfit
                        ? <TrendingUp className="w-8 h-8 text-teal-400" />
                        : <TrendingDown className="w-8 h-8 text-red-400" />}
                    <span className={`text-xl font-bold ${isProfit ? "text-teal-600" : "text-red-500"}`}>
                        {points} pts
                    </span>
                </div>
            </div>

            {/* Trade Details */}
            <div className="px-5 py-4 flex flex-col gap-2.5 flex-1">
                <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                        { icon: ArrowRightLeft, label: "Entry", value: entry },
                        { icon: ShieldAlert, label: "SL", value: sl },
                        { icon: Target, label: "Target", value: target },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="bg-slate-50 rounded-xl p-2 flex flex-col items-center gap-1">
                            <Icon className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{label}</span>
                            <span className="text-xs font-semibold text-slate-700">{value}</span>
                        </div>
                    ))}
                </div>

                {/* Result Badge */}
                <div className="flex items-center justify-between mt-1">
                    <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${isProfit
                                ? "bg-teal-50 text-teal-700 border border-teal-200"
                                : "bg-red-50 text-red-600 border border-red-200"
                            }`}
                    >
                        {isProfit ? "✓ Target Hit" : "✕ SL Hit"}
                    </span>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 text-xs text-teal-600 font-medium hover:text-teal-800 transition-colors"
                    >
                        View Chart <ExternalLink className="w-3 h-3" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const PerformanceSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
                        Transparency in{" "}
                        <span className="text-teal-600">Performance</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
                        We believe in clear and transparent trade reporting.
                    </p>
                </div>

                {/* Trade Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {trades.map((trade, i) => (
                        <TradeCard key={i} {...trade} />
                    ))}
                </div>

                {/* Monthly Summary Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl shadow-xl px-6 py-8"
                >
                    <p className="text-white/80 text-sm font-medium text-center mb-6 uppercase tracking-widest">
                        Monthly Performance Summary — February 2025
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {summaryStats.map(({ label, value, icon: Icon }) => (
                            <div
                                key={label}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center gap-2 text-white"
                            >
                                <Icon className="w-5 h-5 text-white/70" strokeWidth={2} />
                                <span className="text-2xl font-bold">{value}</span>
                                <span className="text-xs text-white/70 text-center">{label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PerformanceSection;
