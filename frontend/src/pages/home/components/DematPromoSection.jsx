import React from "react";
import { motion } from "framer-motion";
import { Wallet, Zap, Headphones, ArrowRight, TrendingUp, BarChart2, LineChart } from "lucide-react";

const benefits = [
    {
        icon: Wallet,
        title: "Zero Account Opening Charges",
        desc: "Start your trading journey with no upfront cost. Open completely free.",
    },
    {
        icon: Zap,
        title: "Fast Activation Process",
        desc: "Get your demat account activated within minutes with minimal documentation.",
    },
    {
        icon: Headphones,
        title: "Dedicated Assistance Support",
        desc: "Our experts guide you through every step of the account setup process.",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* Inline mini chart SVG illustration */
const MiniChart = () => (
    <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
            </linearGradient>
        </defs>
        {/* Grid lines */}
        {[30, 60, 90].map((y) => (
            <line key={y} x1="10" y1={y} x2="210" y2={y} stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="4 3" />
        ))}
        {/* Area fill */}
        <path
            d="M10,100 L50,75 L90,80 L130,45 L170,30 L210,15 L210,120 L10,120 Z"
            fill="url(#chartFill)"
        />
        {/* Line */}
        <polyline
            points="10,100 50,75 90,80 130,45 170,30 210,15"
            fill="none"
            stroke="#0d9488"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Dots */}
        {[[50, 75], [90, 80], [130, 45], [170, 30], [210, 15]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" fill="#0d9488" />
        ))}
        {/* Highlighted dot */}
        <circle cx="210" cy="15" r="6" fill="#0d9488" fillOpacity="0.2" />
        <circle cx="210" cy="15" r="3.5" fill="#0d9488" />
    </svg>
);

const DematPromoSection = () => {
    return (
        <section className="py-20 bg-transparent">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* ── Left: Content ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col gap-8"
                    >
                        <motion.div variants={itemVariants}>
                            <span className="inline-block text-xs font-semibold text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
                                Free to Start
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-slate-800 leading-tight">
                                Open Free Demat Account &amp;{" "}
                                <span className="text-teal-600">Get Special Benefits</span>
                            </h2>
                        </motion.div>

                        {/* Benefits */}
                        <div className="flex flex-col gap-5">
                            {benefits.map(({ icon: Icon, title, desc }, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="flex items-start gap-4"
                                >
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-teal-600" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-slate-800 font-semibold text-sm">{title}</p>
                                        <p className="text-slate-500 text-sm leading-relaxed mt-0.5">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div variants={itemVariants}>
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(13,148,136,0.30)" }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-md"
                            >
                                Open Demat Account
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Illustration card ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 flex flex-col gap-6">
                            {/* Top stat row */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { icon: TrendingUp, label: "Nifty", value: "+1.2%", up: true },
                                    { icon: BarChart2, label: "BN", value: "+0.8%", up: true },
                                    { icon: LineChart, label: "Sensex", value: "-0.4%", up: false },
                                ].map(({ icon: Icon, label, value, up }) => (
                                    <div key={label} className="bg-slate-50 rounded-xl p-3 flex flex-col items-center gap-1">
                                        <Icon className={`w-4 h-4 ${up ? "text-teal-500" : "text-red-400"}`} strokeWidth={2} />
                                        <span className="text-xs text-slate-500 font-medium">{label}</span>
                                        <span className={`text-sm font-bold ${up ? "text-teal-600" : "text-red-500"}`}>{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Chart */}
                            <div className="h-36 w-full">
                                <MiniChart />
                            </div>

                            {/* Bottom info */}
                            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-4 flex flex-col gap-1">
                                <p className="text-white/80 text-xs font-medium">Portfolio Growth — 2025</p>
                                <p className="text-white text-2xl font-bold">+24.6%</p>
                                <p className="text-white/60 text-xs">Based on Index Money advisory calls</p>
                            </div>

                            {/* Floating badge */}
                            <div className="absolute -top-4 -right-4 bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                ₹0 Opening Fee
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DematPromoSection;
