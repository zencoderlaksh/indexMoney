import React, { useRef } from "react";
import { Star, MapPin, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
    {
        name: "Rahul Sharma",
        location: "Mumbai, Maharashtra",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=rahul&backgroundColor=d1fae5",
        review:
            "Index Money has completely transformed the way I trade. The entry, stop-loss, and target levels are spot-on every single time. Consistent profits since day one.",
        rating: 5,
    },
    {
        name: "Priya Mehta",
        location: "Ahmedabad, Gujarat",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=priya&backgroundColor=ccfbf1",
        review:
            "Finally an advisory service that actually delivers. Real-time updates during market hours give me the confidence to execute trades without second-guessing myself.",
        rating: 5,
    },
    {
        name: "Ankit Verma",
        location: "Delhi, NCR",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=ankit&backgroundColor=d1fae5",
        review:
            "The Bank Nifty plan has been incredibly accurate. Their defined SL and target system keeps my risk in check. Best investment I've made for my trading career.",
        rating: 5,
    },
    {
        name: "Sneha Patel",
        location: "Pune, Maharashtra",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=sneha&backgroundColor=ccfbf1",
        review:
            "What I love most is the dedicated support during market hours. Whenever I have a doubt, the team is right there. Highly recommend Index Money to every serious trader.",
        rating: 5,
    },
    {
        name: "Vikram Singh",
        location: "Jaipur, Rajasthan",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=vikram&backgroundColor=d1fae5",
        review:
            "I've tried many advisory services but Index Money stands apart. The disciplined approach with pre-defined levels has helped me maintain consistent profitability.",
        rating: 5,
    },
    {
        name: "Neha Gupta",
        location: "Hyderabad, Telangana",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=neha&backgroundColor=ccfbf1",
        review:
            "The Sensex Option Plan is worth every rupee. Accurate calls, timely updates, and a professional team. My portfolio has grown significantly in just 3 months.",
        rating: 5,
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRating = ({ count = 5 }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" strokeWidth={0} />
        ))}
    </div>
);

const TestimonialCard = ({ name, location, avatar, review, rating }) => (
    <motion.div
        whileHover={{ y: -5, boxShadow: "0 20px 44px rgba(0,0,0,0.09)" }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="relative bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col gap-4 cursor-default hover:border-teal-200 transition-colors duration-300 h-full"
    >
        {/* Watermark quote */}
        <div className="absolute top-4 right-4 opacity-[0.07]">
            <Quote className="w-10 h-10 text-teal-600" />
        </div>

        <StarRating count={rating} />

        <p className="text-slate-500 text-sm leading-relaxed flex-1">
            "{review}"
        </p>

        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
            <img
                src={avatar}
                alt={name}
                className="w-11 h-11 rounded-full object-cover bg-teal-50 border-2 border-teal-100 shrink-0"
            />
            <div className="min-w-0">
                <p className="text-slate-800 font-semibold text-sm truncate">{name}</p>
                <p className="text-teal-500 text-xs flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {location}
                </p>
            </div>
        </div>
    </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const TestimonialsSection = () => {
    const swiperRef = useRef(null);

    return (
        <section className="py-20 bg-transparent">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
                        What Our{" "}
                        <span className="text-teal-600">Clients Say</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
                        Real feedback from traders using Index Money advisory services.
                    </p>
                </motion.div>

                {/* Slider */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                >
                    <Swiper
                        onSwiper={(sw) => (swiperRef.current = sw)}
                        modules={[Pagination, Autoplay, A11y]}
                        pagination={{
                            clickable: true,
                            el: "#tm-pagination",
                        }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        grabCursor={true}
                        className="!pb-2"
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i} className="h-auto !flex">
                                <TestimonialCard {...t} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Controls row */}
                <div className="flex items-center justify-center gap-4 mt-8">

                    {/* Prev */}
                    <motion.button
                        aria-label="Previous testimonial"
                        onClick={() => swiperRef.current?.slidePrev()}
                        whileHover={{ scale: 1.1, borderColor: "#0d9488", color: "#0d9488" }}
                        whileTap={{ scale: 0.92 }}
                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 transition-colors duration-200 hover:shadow-md"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.button>

                    {/* Pagination dots — centered */}
                    <div
                        id="tm-pagination"
                        className="
                            flex flex-1 items-center justify-center gap-1.5
                            [&_.swiper-pagination-bullet]:w-2
                            [&_.swiper-pagination-bullet]:h-2
                            [&_.swiper-pagination-bullet]:rounded-full
                            [&_.swiper-pagination-bullet]:bg-slate-300
                            [&_.swiper-pagination-bullet]:transition-all
                            [&_.swiper-pagination-bullet]:duration-300
                            [&_.swiper-pagination-bullet]:cursor-pointer
                            [&_.swiper-pagination-bullet-active]:bg-teal-500
                            [&_.swiper-pagination-bullet-active]:w-5
                        "
                    />

                    {/* Next */}
                    <motion.button
                        aria-label="Next testimonial"
                        onClick={() => swiperRef.current?.slideNext()}
                        whileHover={{ scale: 1.1, borderColor: "#0d9488", color: "#0d9488" }}
                        whileTap={{ scale: 0.92 }}
                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 transition-colors duration-200 hover:shadow-md"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>

                </div>

            </div>
        </section>
    );
};

export default TestimonialsSection;
