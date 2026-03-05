import React from "react";
import { BarChart3, TrendingUp, Target, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: BarChart3,
        title: "10+ Years Market Experience",
        description: "Deep market understanding and structured trading insights.",
        color: "bg-teal-50",
        iconColor: "text-teal-600",
    },
    {
        icon: TrendingUp,
        title: "Technical Based Research",
        description: "Strategies built on price action and technical analysis.",
        color: "bg-emerald-50",
        iconColor: "text-emerald-600",
    },
    {
        icon: Target,
        title: "Defined SL & Target System",
        description: "Disciplined trading with predefined stop-loss and targets.",
        color: "bg-green-50",
        iconColor: "text-green-600",
    },
    {
        icon: MessageCircle,
        title: "Dedicated Support",
        description: "Continuous updates and assistance during market hours.",
        color: "bg-cyan-50",
        iconColor: "text-cyan-600",
    },
];

const Trust = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
                        Why Traders Trust{" "}
                        <span className="text-teal-600">Index Money</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
                        Structured strategies backed by technical research and discipline.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(({ icon: Icon, title, description, color, iconColor }, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start gap-4 cursor-default border border-slate-100"
                        >
                            {/* Icon Circle */}
                            <div className={`p-3 rounded-full ${color}`}>
                                <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-slate-800 font-semibold text-base mb-1">
                                    {title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trust;