import React from "react";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

// ─── Testimonial data ─────────────────────────────────────────────────────────



const videoTestimonials = [
    { name: "Rajesh Kumar", city: "Bengaluru", plan: "Nifty Option Plan", bg: "from-[#105F68] to-[#3A9295]" },
    { name: "Meera Nair", city: "Chennai", plan: "Bank Nifty Plan", bg: "from-[#3A9295] to-[#63C1BB]" },
    { name: "Arjun Patel", city: "Surat", plan: "Sensex Futures", bg: "from-[#63C1BB] to-[#9ED5D1]" },
    { name: "Divya Rao", city: "Kolkata", plan: "Nifty Futures", bg: "from-[#105F68] to-[#63C1BB]" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const TestimonialsSection = () => {

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
