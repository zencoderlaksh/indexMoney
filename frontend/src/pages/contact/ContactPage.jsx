import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const contactCards = [
  {
    icon: MapPin,
    title: "Office Address",
    lines: [
      "Index Money Advisory Services",
      "Business Bay, Sector 62",
      "Noida, Uttar Pradesh - 201309",
    ],
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    lines: [
      "+91-98765-43210",
      "Support Hours:",
      "9:00 AM - 6:00 PM (Market Days)",
    ],
  },
  {
    icon: Mail,
    title: "Email Address",
    lines: [
      "support@indexmoney.com",
      "ceo@indexmoney.com",
      "Priority support for active subscribers",
    ],
  },
];

const supportPoints = [
  "Response within 24 Working Hours",
  "Market Hours Priority Support",
  "Payment Verification within 10-30 Minutes",
];

const subjectOptions = [
  "Subscription Inquiry",
  "Unlisted Shares",
  "Payment Support",
  "General Inquiry",
];

const inputBase =
  "w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#63C1BB] focus:ring-2 focus:ring-[#63C1BB]/30";

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    subject: subjectOptions[0],
    message: "",
  });

  const whatsappLink = "https://wa.me/919876543210";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const mailSubject = encodeURIComponent(
      `Index Money Contact - ${form.subject}`,
    );
    const mailBody = encodeURIComponent(
      [
        `Full Name: ${form.fullName}`,
        `Mobile Number: ${form.mobileNumber}`,
        `Email Address: ${form.email}`,
        `Subject: ${form.subject}`,
        "",
        "Message:",
        form.message,
      ].join("\n"),
    );

    window.location.href = `mailto:support@indexmoney.com?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <div className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,230,226,0.45),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(158,213,209,0.22),transparent_32%)]" />

      <section className="relative px-5 pb-8 pt-14 md:px-8 md:pt-18">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#BFE5DE] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#105F68] shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Contact Us
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 text-4xl font-extrabold leading-tight text-slate-800 md:text-5xl lg:text-6xl"
          >
            Get in Touch With{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #3A9295, #105F68)",
              }}
            >
              Index Money
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600"
          >
            We&apos;re Here to Assist You With Professional Market Guidance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-500"
          >
            <Link to="/" className="transition-colors hover:text-[#105F68]">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-[#105F68]">Contact Us</span>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {contactCards.map(({ icon: Icon, title, lines }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[28px] border border-[#CBE7E1] bg-white/80 p-6 shadow-[0_14px_40px_rgba(16,95,104,0.08)] backdrop-blur-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C8E6E2] to-[#63C1BB] text-[#105F68]">
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{title}</h2>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                {lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-[#0F2830]/96 p-8 shadow-[0_24px_80px_rgba(15,40,48,0.35)] md:p-10"
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8DD4CC]">
              Contact Form
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Send Us a Message
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Mobile Number
                </label>
                <input
                  name="mobileNumber"
                  type="tel"
                  required
                  value={form.mobileNumber}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputBase}
                >
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject} className="bg-[#102831]">
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                className={`${inputBase} resize-none`}
                placeholder="Tell us how we can help you."
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#63C1BB] to-[#3A9295] px-5 py-3.5 text-sm font-bold text-white shadow-[0_16px_30px_rgba(58,146,149,0.26)] transition-transform duration-200 hover:scale-[1.01]"
            >
              Submit Message
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-xs text-slate-400">
              This opens your email app with the message pre-filled so we
              don&apos;t add extra backend complexity.
            </p>
          </form>
        </motion.div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 rounded-[30px] border border-[#9FE2B3] bg-gradient-to-r from-[#1E8F5A] to-[#107D52] px-6 py-7 text-center text-white shadow-[0_20px_50px_rgba(16,125,82,0.25)] md:flex-row md:text-left"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/75">
              Quick Connect
            </p>
            <h2 className="mt-2 text-3xl font-bold">Need Quick Assistance?</h2>
            <p className="mt-2 text-sm text-white/80">
              Connect with our team directly on WhatsApp for faster help during
              market hours.
            </p>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#107D52] shadow-lg transition-transform duration-200 hover:scale-[1.02]"
          >
            Chat With Us on WhatsApp
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </section>

      <section className="relative px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-[28px] border border-[#CBE7E1] bg-white/85 p-7 shadow-[0_14px_38px_rgba(16,95,104,0.08)] backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F7F3] text-[#105F68]">
                <Building2 className="h-5 w-5" strokeWidth={2.1} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Customer Support Policy
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Clear timelines so traders know what to expect.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {supportPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                >
                  <Clock3 className="h-5 w-5 text-[#3A9295]" strokeWidth={2.1} />
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-[28px] border border-[#F2D6C8] bg-gradient-to-br from-white to-[#FFF5F0] p-7 shadow-[0_14px_38px_rgba(164,98,60,0.08)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0E8] text-[#C66B3D]">
                <ShieldAlert className="h-5 w-5" strokeWidth={2.1} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Important Notice
              </h2>
            </div>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
              <p>Index Money provides research-based advisory services.</p>
              <p>We do not guarantee profits.</p>
              <p>
                Investments in securities market are subject to market risks.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 pb-16 pt-8 md:px-8 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-5xl rounded-[34px] border border-[#CBE7E1] bg-white/85 px-6 py-8 text-center shadow-[0_16px_42px_rgba(16,95,104,0.08)] backdrop-blur-sm md:px-10 md:py-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3A9295]">
            Final CTA
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-800 md:text-4xl">
            Start Trading With Confidence
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Explore our plans or start your free trial with the pages you
            already have live in the product.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/#plans-section"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#9ED5D1] bg-white px-5 py-3 text-sm font-bold text-[#105F68] transition-colors duration-200 hover:bg-[#EAF8F4]"
            >
              View Subscription Plans
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#3A9295] to-[#105F68] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(58,146,149,0.22)]"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1.5">
              Market Guidance
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5">
              Real-Time Support
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5">
              Transparent Process
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
