import React, { useRef } from "react";
import { Star, MapPin, Quote, ChevronLeft, ChevronRight, PlayCircle, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// ─── Testimonial data ─────────────────────────────────────────────────────────

const testimonials = [
    {
        name: "Rahul Sharma",
        location: "Mumbai, Maharashtra",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=rahul&backgroundColor=d1fae5",
        review: "Index Money has completely transformed the way I trade. The entry, stop-loss, and target levels are spot-on every single time. Consistent profits since day one.",
        rating: 5,
    },
    {
        name: "Priya Mehta",
        location: "Ahmedabad, Gujarat",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=priya&backgroundColor=ccfbf1",
        review: "Finally an advisory service that actually delivers. Real-time updates during market hours give me the confidence to execute trades without second-guessing myself.",
        rating: 5,
    },
    {
        name: "Ankit Verma",
        location: "Delhi, NCR",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=ankit&backgroundColor=d1fae5",
        review: "The Bank Nifty plan has been incredibly accurate. Their defined SL and target system keeps my risk in check. Best investment I've made for my trading career.",
        rating: 5,
    },
    {
        name: "Sneha Patel",
        location: "Pune, Maharashtra",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=sneha&backgroundColor=ccfbf1",
        review: "What I love most is the dedicated support during market hours. Whenever I have a doubt, the team is right there. Highly recommend Index Money to every serious trader.",
        rating: 5,
    },
    {
        name: "Vikram Singh",
        location: "Jaipur, Rajasthan",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=vikram&backgroundColor=d1fae5",
        review: "I've tried many advisory services but Index Money stands apart. The disciplined approach with pre-defined levels has helped me maintain consistent profitability.",
        rating: 5,
    },
    {
        name: "Neha Gupta",
        location: "Hyderabad, Telangana",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=neha&backgroundColor=ccfbf1",
        review: "The Sensex Option Plan is worth every rupee. Accurate calls, timely updates, and a professional team. My portfolio has grown significantly in just 3 months.",
        rating: 5,
    },
];

const videoTestimonials = [
    { name: "Rajesh Kumar", city: "Bengaluru", plan: "Nifty Option Plan", bg: "from-[#105F68] to-[#3A9295]" },
    { name: "Meera Nair", city: "Chennai", plan: "Bank Nifty Plan", bg: "from-[#3A9295] to-[#63C1BB]" },
    { name: "Arjun Patel", city: "Surat", plan: "Sensex Futures", bg: "from-[#63C1BB] to-[#9ED5D1]" },
    { name: "Divya Rao", city: "Kolkata", plan: "Nifty Futures", bg: "from-[#105F68] to-[#63C1BB]" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRating = ({ count = 5 }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" strokeWidth={0} />
        ))}
    </div>
);

const TestimonialCard = ({ name, location, avatar, review, rating }) => (
    <motion.div
        whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(99,193,187,0.12), 0 4px 16px rgba(0,0,0,0.06)", borderColor: "#9ED5D1" }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col gap-4 cursor-default transition-colors duration-300 h-full"
    >
        {/* Watermark quote */}
        <div className="absolute top-4 right-4 opacity-[0.06]">
            <Quote className="w-12 h-12 text-[#105F68]" />
        </div>

        <StarRating count={rating} />

        <p className="text-slate-500 text-sm leading-relaxed flex-1 italic">
            "{review}"
        </p>

        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
            <img
                src={avatar}
                alt={name}
                className="w-11 h-11 rounded-full object-cover bg-[#C8E6E2] border-2 border-[#9ED5D1] shrink-0"
            />
            <div className="min-w-0">
                <p className="text-slate-800 font-bold text-sm truncate">{name}</p>
                <p className="text-[#3A9295] text-xs flex items-center gap-1 truncate mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {location}
                </p>
            </div>
        </div>
    </motion.div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────

const TestimonialsSection = () => {
    const swiperRef = useRef(null);

    return (
        <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            {/* Soft background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(200,230,226,0.22) 0%, transparent 65%)" }}
            />

            <div className="relative max-w-6xl mx-auto px-5 md:px-6">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-14"
                >
                    <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C8E6E2] text-[#105F68] border border-[#9ED5D1]">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight mb-4">
                        What Our{" "}
                        <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #3A9295, #105F68)" }}>
                            Clients Say
                        </span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
                        Real feedback from 5,000+ traders who trust Index Money advisory.
                    </p>

                    {/* Social proof bar */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="flex -space-x-2">
                            {["rahul", "priya", "ankit", "sneha"].map((s) => (
                                <img
                                    key={s}
                                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${s}&backgroundColor=d1fae5`}
                                    className="w-7 h-7 rounded-full border-2 border-white bg-[#C8E6E2]"
                                    alt={s}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                            <strong className="text-slate-700">5,000+</strong> active subscribers
                        </span>
                    </div>
                </motion.div>

                {/* Swiper slider */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                >
                    <Swiper
                        onSwiper={(sw) => (swiperRef.current = sw)}
                        modules={[Pagination, Autoplay, A11y]}
                        pagination={{ clickable: true, el: "#tm-pagination" }}
                        autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        loop
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                        grabCursor
                        className="!pb-2"
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i} className="h-auto !flex">
                                <TestimonialCard {...t} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <motion.button
                        aria-label="Previous testimonial"
                        onClick={() => swiperRef.current?.slidePrev()}
                        whileHover={{ backgroundColor: "#63C1BB", color: "#ffffff", scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#C8E6E2] text-[#105F68] shadow-sm transition-colors duration-200"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.button>

                    <div
                        id="tm-pagination"
                        className="flex flex-1 items-center justify-center gap-1.5
                            [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2
                            [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:transition-all
                            [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet]:cursor-pointer
                            [&_.swiper-pagination-bullet]:opacity-100
                            [&_.swiper-pagination-bullet-active]:w-5"
                        style={{
                            "--swiper-pagination-color": "#3A9295",
                            "--swiper-pagination-bullet-inactive-color": "#C8E6E2",
                            "--swiper-pagination-bullet-inactive-opacity": "1",
                        }}
                    />

                    <motion.button
                        aria-label="Next testimonial"
                        onClick={() => swiperRef.current?.slideNext()}
                        whileHover={{ backgroundColor: "#63C1BB", color: "#ffffff", scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#C8E6E2] text-[#105F68] shadow-sm transition-colors duration-200"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </div>

                {/* ── Video Testimonials ─────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.15 }}
                    className="mt-20"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Video Testimonials</h3>
                        <p className="text-slate-500 text-sm">Hear directly from traders who changed their journey with Index Money.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {videoTestimonials.map(({ name, city, plan, bg }, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                className={`relative bg-gradient-to-br ${bg} rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] flex flex-col items-center justify-center shadow-lg`}
                            >
                                {/* Grid overlay */}
                                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                                    <defs><pattern id={`vg${i}`} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.8" /></pattern></defs>
                                    <rect width="100%" height="100%" fill={`url(#vg${i})`} />
                                </svg>

                                {/* Name tag top */}
                                <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
                                    <img
                                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name}&backgroundColor=d1fae5`}
                                        className="w-8 h-8 rounded-full border-2 border-white/40 bg-white/20"
                                        alt={name}
                                    />
                                    <div>
                                        <p className="text-white font-semibold text-xs leading-tight">{name}</p>
                                        <p className="text-white/60 text-[10px]">{city}</p>
                                    </div>
                                </div>

                                {/* Play button */}
                                <motion.div
                                    whileHover={{ scale: 1.15 }}
                                    className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm"
                                >
                                    <PlayCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
                                </motion.div>

                                {/* Plan badge */}
                                <div className="absolute bottom-3 left-3 right-3 text-center">
                                    <span className="text-[10px] font-semibold text-white/80 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full">
                                        {plan}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default TestimonialsSection;
