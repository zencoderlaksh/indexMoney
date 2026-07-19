export const dashboardMetrics = {
  totalInvested: 5000000,
  currentValue: 6250000,
  totalReturn: 1250000,
  returnPercentage: 25.0,
  activeInvestments: 8,
};

export const portfolioGrowthData = [
  { month: "Jan", value: 4000000 },
  { month: "Feb", value: 4200000 },
  { month: "Mar", value: 4500000 },
  { month: "Apr", value: 4400000 },
  { month: "May", value: 4800000 },
  { month: "Jun", value: 5000000 },
  { month: "Jul", value: 5200000 },
  { month: "Aug", value: 5400000 },
  { month: "Sep", value: 5300000 },
  { month: "Oct", value: 5800000 },
  { month: "Nov", value: 6000000 },
  { month: "Dec", value: 6250000 },
];

export const sectorAllocationData = [
  { name: "Technology", value: 2500000, fill: "#0353a4" },
  { name: "Fintech", value: 1500000, fill: "#023e7d" },
  { name: "Infrastructure", value: 1000000, fill: "#001845" },
  { name: "Consumer", value: 750000, fill: "#48cae4" },
  { name: "Healthcare", value: 500000, fill: "#90e0ef" },
];

export const recentActivity = [
  {
    id: 1,
    type: "buy",
    company: "ABC Ltd",
    date: "2026-07-15",
    amount: 150000,
    units: 100,
  },
  {
    id: 2,
    type: "buy",
    company: "Tech Innovators",
    date: "2026-07-10",
    amount: 300000,
    units: 250,
  },
  {
    id: 3,
    type: "sell",
    company: "Prime Infra Tech",
    date: "2026-07-05",
    amount: 200000,
    units: 50,
  },
];

export const portfolioHoldings = [
  {
    id: "h1",
    company: "ABC Ltd",
    sector: "Fintech",
    units: 500,
    avgPrice: 800,
    currentPrice: 850,
    invested: 400000,
    currentValue: 425000,
    returnAmount: 25000,
    returnPercentage: 6.25,
  },
  {
    id: "h2",
    company: "Tech Innovators",
    sector: "Technology",
    units: 1000,
    avgPrice: 1100,
    currentPrice: 1350,
    invested: 1100000,
    currentValue: 1350000,
    returnAmount: 250000,
    returnPercentage: 22.72,
  },
  {
    id: "h3",
    company: "Prime Infra Tech",
    sector: "Infrastructure",
    units: 800,
    avgPrice: 600,
    currentPrice: 640,
    invested: 480000,
    currentValue: 512000,
    returnAmount: 32000,
    returnPercentage: 6.66,
  },
  {
    id: "h4",
    company: "Global Consumer Brands",
    sector: "Consumer",
    units: 300,
    avgPrice: 2000,
    currentPrice: 2500,
    invested: 600000,
    currentValue: 750000,
    returnAmount: 150000,
    returnPercentage: 25.0,
  },
  {
    id: "h5",
    company: "NextGen Pharma",
    sector: "Healthcare",
    units: 1000,
    avgPrice: 400,
    currentPrice: 500,
    invested: 400000,
    currentValue: 500000,
    returnAmount: 100000,
    returnPercentage: 25.0,
  },
];

export const kycDocuments = [
  { id: "pan", name: "PAN Card", status: "verified", file: "pan_card.pdf", date: "2026-07-01" },
  { id: "aadhaar", name: "Aadhaar Card", status: "verified", file: "aadhaar.pdf", date: "2026-07-01" },
  { id: "cheque", name: "Cancelled Cheque", status: "pending", file: null, date: null },
  { id: "cmr", name: "Client Master Report (CMR)", status: "missing", file: null, date: null },
];

export const enquiriesData = [
  { id: "ENQ-101", date: "2026-07-18", subject: "Question about ABC Ltd pricing", status: "open" },
  { id: "ENQ-100", date: "2026-07-15", subject: "Requesting callback for bulk purchase", status: "resolved" },
  { id: "ENQ-099", date: "2026-07-10", subject: "Clarification on settlement period", status: "resolved" },
];

export const transactionsData = [
  { id: "TXN-8472", date: "2026-07-15", type: "purchase", description: "Buy 100 ABC Ltd", status: "completed", amount: 80000, isCredit: false },
  { id: "TXN-8471", date: "2026-07-14", type: "deposit", description: "Fund Addition (NEFT)", status: "completed", amount: 100000, isCredit: true },
  { id: "TXN-8450", date: "2026-07-10", type: "purchase", description: "Buy 250 Tech Innovators", status: "completed", amount: 275000, isCredit: false },
  { id: "TXN-8449", date: "2026-07-09", type: "deposit", description: "Fund Addition (UPI)", status: "completed", amount: 300000, isCredit: true },
  { id: "TXN-8390", date: "2026-07-05", type: "withdrawal", description: "Withdrawal to Bank", status: "pending", amount: 50000, isCredit: false },
];

export const invoicesData = [
  { id: "INV-2026-07-15", date: "2026-07-15", description: "Share Purchase - ABC Ltd", amount: 80000, status: "paid" },
  { id: "INV-2026-07-10", date: "2026-07-10", description: "Share Purchase - Tech Innovators", amount: 275000, status: "paid" },
  { id: "INV-2026-06-25", date: "2026-06-25", description: "Advisory Fee - Q2", amount: 5000, status: "paid" },
];
