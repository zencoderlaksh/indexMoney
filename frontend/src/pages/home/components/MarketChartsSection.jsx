import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { TrendingUp, PieChart } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
);

// ─── Data ────────────────────────────────────────────────────────────────────

const niftyLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const niftyPrices = [
  21500, 21900, 22300, 22100, 22700, 23200, 22800, 23500, 24100, 23700, 24400,
  24900,
];

// ─── Chart Configs ────────────────────────────────────────────────────────────

const useLineData = () => {
  const chartRef = useRef(null);

  const getData = (chart) => {
    if (!chart) {
      return {
        labels: niftyLabels,
        datasets: [
          {
            label: "Nifty 50",
            data: niftyPrices,
            borderColor: "#0d9488",
            borderWidth: 2.5,
            pointBackgroundColor: "#0d9488",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: true,
            backgroundColor: "rgba(13,148,136,0.08)",
          },
        ],
      };
    }

    const ctx = chart.canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0, "rgba(13,148,136,0.28)");
    gradient.addColorStop(1, "rgba(13,148,136,0.00)");

    return {
      labels: niftyLabels,
      datasets: [
        {
          label: "Nifty 50",
          data: niftyPrices,
          borderColor: "#0d9488",
          borderWidth: 2.5,
          pointBackgroundColor: "#0d9488",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 7,
          tension: 0.4,
          fill: true,
          backgroundColor: gradient,
        },
      ],
    };
  };

  return { chartRef, getData };
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#94a3b8",
      bodyColor: "#e2e8f0",
      padding: 12,
      cornerRadius: 10,
      callbacks: {
        label: (ctx) => ` ₹${ctx.parsed.y.toLocaleString("en-IN")}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#94a3b8", font: { size: 12 } },
      border: { display: false },
    },
    y: {
      grid: { color: "rgba(148,163,184,0.12)", drawBorder: false },
      ticks: {
        color: "#94a3b8",
        font: { size: 12 },
        callback: (v) => `₹${(v / 1000).toFixed(0)}k`,
      },
      border: { display: false },
    },
  },
  interaction: { intersect: false, mode: "index" },
  animation: { duration: 1200, easing: "easeInOutQuart" },
};

const doughnutData = {
  labels: ["Winning Trades", "Losing Trades"],
  datasets: [
    {
      data: [96, 4],
      backgroundColor: ["#0d9488", "#e2e8f0"],
      hoverBackgroundColor: ["#0f766e", "#cbd5e1"],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "72%",
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#94a3b8",
      bodyColor: "#e2e8f0",
      padding: 12,
      cornerRadius: 10,
      callbacks: {
        label: (ctx) => ` ${ctx.parsed}%`,
      },
    },
  },
  animation: { duration: 1400, easing: "easeInOutQuart" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ChartCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col gap-4"
  >
    {children}
  </motion.div>
);

const ChartBadge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 mb-1">
    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-50">
      <Icon className="w-4 h-4 text-teal-600" strokeWidth={2} />
    </span>
    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
      {label}
    </span>
  </div>
);

// ─── Main LineChart wrapper ───────────────────────────────────────────────────

const NiftyLineChart = () => {
  const { chartRef, getData } = useLineData();
  const [chartData, setChartData] = React.useState(() => getData(null));

  return (
    <Line
      ref={chartRef}
      data={chartData}
      options={lineOptions}
      onElementsClick={() => {}}
      plugins={[
        {
          id: "gradientPlugin",
          beforeDatasetDraw(chart) {
            const updated = getData(chart);
            if (
              chart.data.datasets[0].backgroundColor !==
              updated.datasets[0].backgroundColor
            ) {
              chart.data.datasets[0].backgroundColor =
                updated.datasets[0].backgroundColor;
              chart.update("none");
            }
          },
        },
      ]}
    />
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

const MarketChartsSection = () => {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    let rafId;
    let direction = 1;
    const step = 0.5;

    const loop = () => {
      const el = scrollContainerRef.current;
      if (!el) return;

      if (!isPaused) {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          direction = -1;
        } else if (el.scrollLeft <= 0) {
          direction = 1;
        }

        el.scrollLeft += direction * step;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, [isPaused]);

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
            Market <span className="text-teal-600">Performance</span> Insights
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
            Visual representation of trading trends and index performance.
          </p>
        </motion.div>

        {/* Charts Scroll */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-2 no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* ── Chart 1: Nifty Line Chart ── */}
          <div className="shrink-0 snap-start w-[min(90vw,520px)]">
            <ChartCard delay={0.1}>
              <ChartBadge icon={TrendingUp} label="Nifty Performance Trend" />

              <div>
                <p className="text-2xl font-bold text-slate-800">
                  ₹24,900{" "}
                  <span className="text-sm font-medium text-teal-600">
                    +15.8% YTD
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Jan 2025 — Dec 2025 (projected)
                </p>
              </div>

              <div className="relative h-64">
                <NiftyLineChart />
              </div>

              {/* Legend row */}
              <div className="flex items-center gap-2 pt-1">
                <span className="w-4 h-1 rounded-full bg-teal-500 block" />
                <span className="text-xs text-slate-500 font-medium">
                  Nifty 50 Price Movement
                </span>
              </div>
            </ChartCard>
          </div>

          {/* ── Chart 2: Doughnut Chart ── */}
          <div className="shrink-0 snap-start w-[min(90vw,520px)]">
            <ChartCard delay={0.22}>
              <ChartBadge icon={PieChart} label="Trade Accuracy Rate" />

              {/* Doughnut + centre label */}
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative w-52 h-52 shrink-0 mx-auto sm:mx-0">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                  {/* Centre text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-teal-600">
                      96%
                    </span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5">
                      Win Rate
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-4 flex-1 w-full">
                  {[
                    {
                      color: "bg-teal-500",
                      label: "Winning Trades",
                      value: "96%",
                      sub: "Target Hit",
                    },
                    {
                      color: "bg-slate-200",
                      label: "Losing Trades",
                      value: "4%",
                      sub: "SL Hit",
                    },
                  ].map(({ color, label, value, sub }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-3 h-3 rounded-full ${color} shrink-0`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {label}
                          </p>
                          <p className="text-xs text-slate-400">{sub}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-slate-800">
                        {value}
                      </span>
                    </div>
                  ))}

                  <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 mt-1">
                    <p className="text-xs text-teal-700 font-medium">
                      📊 Based on <span className="font-bold">500+</span> trades
                      tracked over the past 12 months.
                    </p>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketChartsSection;
