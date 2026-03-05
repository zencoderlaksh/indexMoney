import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        name: "Rahul Sharma",
        city: "Delhi",
        initials: "RS",
        color: "from-teal-400 to-emerald-500",
        rating: 5,
        review:
            "The trading guidance from Index Money is structured and disciplined. Clear entry and stop-loss levels help me trade with confidence.",
    },
    {
        name: "Priya Mehta",
        city: "Mumbai",
        initials: "PM",
        color: "from-cyan-400 to-teal-500",
        rating: 5,
        review:
            "Extremely professional advisory service. The technical analysis is spot-on and the support team responds quickly during market hours.",
    },
    {
        name: "Arjun Verma",
        city: "Bangalore",
        initials: "AV",
        color: "from-emerald-400 to-green-500",
        rating: 5,
        review:
            "Index Money has transformed how I approach trading. The defined SL and target system keeps emotions out of the trade completely.",
    },
    {
        name: "Sneha Patel",
        city: "Ahmedabad",
        initials: "SP",
        color: "from-teal-500 to-cyan-600",
        rating: 5,
        review:
            "I've been following Index Money for 8 months and the accuracy is impressive. Transparent results, no fake calls.",
    },
    {
        name: "Karan Singh",
        city: "Jaipur",
        initials: "KS",
        color: "from-green-400 to-teal-500",
        rating: 4,
        review:
            "Well-researched Bank Nifty calls with clear reasoning. The real-time updates during market hours are very helpful.",
    },
    {
        name: "Anita Reddy",
        city: "Hyderabad",
        initials: "AR",
        color: "from-cyan-500 to-emerald-600",
        rating: 5,
        review:
            "Trustworthy, disciplined, and professional. Index Money is the best advisory I have subscribed to in over 5 years of trading.",
    },
];

const StarRating = ({ count }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < count ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
            />
        ))}
    </div>
);

const TestimonialCard = ({ name, city, initials, color, rating, review }) => (
    <motion.div
        whileHover={{ y: -6, boxShadow: "0 22px 44px rgba(0,0,0,0.10)" }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="bg-white rounded-2xl shadow-md border border-slate-100 hover:border-teal-200 transition-colors duration-300 p-6 flex flex-col gap-4 relative overflow-hidden"
    >
        {/* Decorative quote icon */}
        <Quote className="absolute top-4 right-5 w-10 h-10 text-teal-50 fill-teal-50 stroke-none" />

        {/* Stars */}
        <StarRating count={rating} />

        {/* Review text */}
        <p className="text-slate-600 text-sm leading-relaxed flex-1">
            "{review}"
        </p>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Client info */}
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm`}>
                {initials}
            </div>
            <div>
                <p className="text-slate-800 font-semibold text-sm">{name}</p>
                <p className="text-slate-400 text-xs">{city}</p>
            </div>
        </div>
    </motion.div>
);

const CARDS_PER_PAGE_DESKTOP = 3;
const CARDS_PER_PAGE_MOBILE = 1;

const TestimonialsSection = () => {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE_DESKTOP);

    const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
    const next = () => setPage((p) => (p + 1) % totalPages);

    const visible = testimonials.slice(
        page * CARDS_PER_PAGE_DESKTOP,
        page * CARDS_PER_PAGE_DESKTOP + CARDS_PER_PAGE_DESKTOP
    );

    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
                        What Our <span className="text-teal-600">Clients Say</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
                        Real feedback from traders who use Index Money advisory services.
                    </p>
                </div>

                {/* Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {visible.map((t, i) => (
                            <TestimonialCard key={t.name + i} {...t} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination controls */}
                <div className="flex items-center justify-center gap-4 mt-10">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prev}
                        className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:border-teal-400 hover:text-teal-600 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </motion.button>

                    {/* Dots */}
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`rounded-full transition-all duration-300 ${i === page
                                        ? "bg-teal-500 w-6 h-2.5"
                                        : "bg-slate-200 w-2.5 h-2.5"
                                    }`}
                            />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={next}
                        className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:border-teal-400 hover:text-teal-600 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
