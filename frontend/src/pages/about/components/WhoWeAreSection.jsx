import React from "react";

const WhoWeAreSection = () => {
  return (
    <section className="pt-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-extrabold text-slate-900">Who We Are</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Index Money was established with a clear vision — to provide retail
          traders with professional-level market insights and structured trading
          guidance. Financial markets are volatile by nature, but with a
          systematic approach and disciplined risk management, traders can
          improve consistency and make better decisions.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Our Philosophy
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            We do not believe in random tips, hot calls, or unrealistic
            promises. Every trading idea is rooted in technical chart analysis,
            price action structure, and risk-first trade management. Our focus
            is to help traders build conviction and clarity instead of chasing
            noise.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            What We Deliver
          </h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            <li className="leading-relaxed">
              <span className="font-semibold text-slate-800">
                Structured trade levels:
              </span>{" "}
              clear entry, stop-loss, and target steps for every setup.
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold text-slate-800">
                Real-time updates:
              </span>{" "}
              market-aware guidance through trade execution and management.
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold text-slate-800">
                Transparent communication:
              </span>{" "}
              no hype, no hidden fees, and no vague promises.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
