import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, PlayCircle } from "lucide-react";

/* Decorative background chart lines */
const BgDecor = () => (
    <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        viewBox="0 0 900 300"
        preserveAspectRatio="none"
        fill="none"
    >
        <polyline
            points="0,250 150,180 300,210 450,120 600,80 750,50 900,20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <polyline
            points="0,280 150,240 300,255 450,170 600,140 750,110 900,70"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 4"
        />
    </svg>
);

const FinalCTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-teal-50/40 to-white">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-700 rounded-3xl px-8 py-14 md:px-16 text-center shadow-2xl overflow-hidden"
                >
                    <BgDecor />

                    {/* Icon badge */}
                    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/20 mb-6">
                        <TrendingUp className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>

                    {/* Heading */}
                    <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                        Start Trading With<br className="hidden sm:block" />{" "}
                        Professional Guidance Today
                    </h2>

                    {/* Subheading */}
                    <p className="relative text-white/75 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join Index Money and trade with structured strategies, clear
                        stop-loss levels, and disciplined market research.
                    </p>

                    {/* Buttons */}
                    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 32px rgba(0,0,0,0.25)" }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold text-sm px-8 py-3.5 rounded-xl shadow-md transition-colors duration-200 hover:bg-teal-50 w-full sm:w-auto justify-center"
                        >
                            Get Started Now
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-colors duration-200 w-full sm:w-auto justify-center"
                        >
                            <PlayCircle className="w-4 h-4" />
                            Join Free Trial
                        </motion.button>
                    </div>

                    {/* Trust note */}
                    <p className="relative text-white/50 text-xs mt-8">
                        No credit card required · Cancel anytime · Trusted by 5,000+ traders
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTASection;
