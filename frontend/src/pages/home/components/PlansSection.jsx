import React from "react";
import { TrendingUp, BarChart2, Activity, CheckCircle2, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ─── Data ──────────────────────────────────────────────────────────────────────

const plans = [
    { title: "Nifty Option Plan", icon: TrendingUp, price: "₹1,999", popular: false },
    { title: "Bank Nifty Option Plan", icon: BarChart2, price: "₹2,499", popular: true },
    { title: "Sensex Option Plan", icon: Activity, price: "₹1,999", popular: false },
    { title: "Nifty Futures Plan", icon: TrendingUp, price: "₹3,499", popular: false },
    { title: "Bank Nifty Futures Plan", icon: BarChart2, price: "₹3,999", popular: false },
    { title: "Sensex Futures Plan", icon: Activity, price: "₹3,499", popular: false },
];

const features = [
    "Technical analysis based research",
    "Entry, stop-loss & target provided",
    "Real-time updates",
    "Trade management guidance",
];

// ─── Plan Card ─────────────────────────────────────────────────────────────────

const PlanCard = ({ title, icon: Icon, price, popular }) => (
    <motion.div
        whileHover={{ y: -7, boxShadow: "0 24px 48px rgba(0,0,0,0.10)" }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className={`relative bg-white rounded-2xl shadow-md border flex flex-col p-6 gap-5 cursor-default transition-colors duration-300 h-full
            ${popular
                ? "border-teal-500 ring-2 ring-teal-400/30"
                : "border-slate-100 hover:border-teal-300"
            }`}
    >
        {/* Popular badge */}
        {popular && (
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                <Star className="w-3 h-3 fill-white" />
                Most Popular
            </span>
        )}

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mt-1">
            <div className={`p-2.5 rounded-xl ${popular ? "bg-teal-50" : "bg-slate-50"}`}>
                <Icon
                    className={`w-5 h-5 ${popular ? "text-teal-600" : "text-slate-500"}`}
                    strokeWidth={2}
                />
            </div>
            <h3 className="text-slate-800 font-semibold text-base leading-snug">{title}</h3>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2 flex-1">
            {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                    <CheckCircle2
                        className="w-4 h-4 text-teal-500 mt-0.5 shrink-0"
                        strokeWidth={2}
                    />
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

// ─── Main Component ────────────────────────────────────────────────────────────

const PlansSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
                        Choose Your{" "}
                        <span className="text-teal-600">Trading Plan</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
                        Professional index and F&amp;O advisory services designed for disciplined traders.
                    </p>
                </div>

                {/* Slider wrapper */}
                <div className="relative px-10 md:px-12">

                    {/* Custom nav buttons */}
                    <button
                        id="pl-prev"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:border-teal-400 hover:text-teal-600 text-slate-500 transition-colors duration-200"
                        aria-label="Previous plan"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        id="pl-next"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:border-teal-400 hover:text-teal-600 text-slate-500 transition-colors duration-200"
                        aria-label="Next plan"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        navigation={{
                            prevEl: "#pl-prev",
                            nextEl: "#pl-next",
                        }}
                        pagination={{
                            clickable: true,
                            el: "#pl-pagination",
                        }}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="!pb-2"
                    >
                        {plans.map((plan, i) => (
                            <SwiperSlide key={i} className="h-auto !flex">
                                <div className="w-full pt-5">
                                    <PlanCard {...plan} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Pagination dots */}
                <div id="pl-pagination" className="flex justify-center gap-2 mt-8 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-slate-300 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:bg-teal-500 [&_.swiper-pagination-bullet-active]:w-5" />

            </div>
        </section>
    );
};

export default PlansSection;
