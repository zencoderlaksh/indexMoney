import React from "react";
import { TrendingUp, BarChart2, Activity, CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
    {
        title: "Nifty Option Plan",
        icon: TrendingUp,
        price: "₹1,999",
        popular: false,
    },
    {
        title: "Bank Nifty Option Plan",
        icon: BarChart2,
        price: "₹2,499",
        popular: true,
    },
    {
        title: "Sensex Option Plan",
        icon: Activity,
        price: "₹1,999",
        popular: false,
    },
    {
        title: "Nifty Futures Plan",
        icon: TrendingUp,
        price: "₹3,499",
        popular: false,
    },
    {
        title: "Bank Nifty Futures Plan",
        icon: BarChart2,
        price: "₹3,999",
        popular: false,
    },
    {
        title: "Sensex Futures Plan",
        icon: Activity,
        price: "₹3,499",
        popular: false,
    },
];

const features = [
    "Technical analysis based research",
    "Entry, stop-loss & target provided",
    "Real-time updates",
    "Trade management guidance",
];

const PlanCard = ({ title, icon: Icon, price, popular }) => (
    <motion.div
        whileHover={{ y: -7, boxShadow: "0 24px 48px rgba(0,0,0,0.11)" }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className={`relative bg-white rounded-2xl shadow-md border flex flex-col p-6 gap-5 cursor-default
      ${popular ? "border-teal-500 ring-2 ring-teal-400/30" : "border-slate-100 hover:border-teal-300"}
      transition-colors duration-300`}
    >
        {/* Popular badge */}
        {popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                <Star className="w-3 h-3 fill-white" />
                Most Popular
            </span>
        )}

        {/* Icon + Title */}
        <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${popular ? "bg-teal-50" : "bg-slate-50"}`}>
                <Icon className={`w-5 h-5 ${popular ? "text-teal-600" : "text-slate-500"}`} strokeWidth={2} />
            </div>
            <h3 className="text-slate-800 font-semibold text-base leading-snug">{title}</h3>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2 flex-1">
            {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" strokeWidth={2} />
                    {f}
                </li>
            ))}
        </ul>

        {/* Price */}
        <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800">{price}</span>
            <span className="text-sm text-slate-400">/ month</span>
        </div>

        {/* CTA */}
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200
        ${popular
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                }`}
        >
            Subscribe Now
        </motion.button>
    </motion.div>
);

const PlansSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
                        Choose Your <span className="text-teal-600">Trading Plan</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
                        Professional index and F&amp;O advisory services designed for disciplined traders.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <PlanCard key={index} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlansSection;
