require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const requestLogger = require("./middlewares/logger");
const routes = require("./routes");

const app = express();
const PORT = config.port;
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "https://indexmoney.netlify.app",
  "https://indexmoney.in",
  "https://www.indexmoney.in",
  "https://indexmoney.onrender.com",
  "https://indexmoney-api.onrender.com",
  ...(process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

// Migration helper for legacy upload collections to standalone documents
const migrateLegacyData = async () => {
  try {
    const db = mongoose.connection.db;

    // 1. Migrate Unlisted Opportunities
    const unlistedColls = await db.listCollections({ name: "unlistedopportunityuploads" }).toArray();
    if (unlistedColls.length > 0) {
      const oldCollection = db.collection("unlistedopportunityuploads");
      const oldUploads = await oldCollection.find({}).toArray();
      if (oldUploads.length > 0) {
        console.log(`[Migration] Found ${oldUploads.length} legacy unlisted upload documents. Migrating...`);
        const UnlistedOpportunity = require("./models/unlistedOpportunityModel");
        let count = 0;
        for (const upload of oldUploads) {
          const opportunities = upload.opportunities || [];
          for (const opp of opportunities) {
            const query = opp.isin ? { isin: opp.isin } : { company: opp.company };
            const exists = await UnlistedOpportunity.findOne(query);
            if (!exists) {
              await UnlistedOpportunity.create({
                company: opp.company,
                sector: opp.sector,
                price: opp.price,
                minimumInvestment: opp.minimumInvestment,
                status: opp.status || "Available",
                code: opp.code || "",
                slug: opp.slug || "",
                logoUrl: opp.logoUrl || "",
                badge: opp.badge || "",
                description: opp.description || "",
                marketCap: opp.marketCap || "",
                isin: opp.isin || "",
                faceValue: opp.faceValue || "",
                eps: opp.eps || "",
                pbRatio: opp.pbRatio || "",
                bookValue: opp.bookValue || "",
                debtEquityRatio: opp.debtEquityRatio || "",
                settlementPeriod: opp.settlementPeriod || "",
                minUnits: opp.minUnits || "",
                aboutCompany: opp.aboutCompany || "",
                strengths: opp.strengths || "",
                weaknesses: opp.weaknesses || "",
              });
              count++;
            }
          }
        }
        if (count > 0) {
          console.log(`[Migration] Successfully migrated ${count} unlisted opportunities.`);
        }
      }
    }

    // 2. Migrate Performance Trades
    const performanceColls = await db.listCollections({ name: "performanceuploads" }).toArray();
    if (performanceColls.length > 0) {
      const oldCollection = db.collection("performanceuploads");
      const oldUploads = await oldCollection.find({}).toArray();
      if (oldUploads.length > 0) {
        console.log(`[Migration] Found ${oldUploads.length} legacy performance uploads. Migrating...`);
        const PerformanceTrade = require("./models/performanceTradeModel");
        let count = 0;
        for (const upload of oldUploads) {
          const trades = upload.trades || [];
          for (const trade of trades) {
            const exists = await PerformanceTrade.findOne({ tradeId: trade.tradeId });
            if (!exists) {
              await PerformanceTrade.create({
                tradeId: trade.tradeId,
                date: trade.date,
                index: trade.index,
                callType: trade.callType,
                entry: trade.entry,
                sl: trade.sl,
                target: trade.target,
                result: trade.result,
                points: trade.points,
                chartUrl: trade.chartUrl || "",
                chartTitle: trade.chartTitle || "",
                chartNotes: trade.chartNotes || "",
              });
              count++;
            }
          }
        }
        if (count > 0) {
          console.log(`[Migration] Successfully migrated ${count} performance trades.`);
        }
      }
    }
  } catch (err) {
    console.error("[Migration] Error migrating legacy data:", err);
  }
};

// MongoDB connection
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    await migrateLegacyData();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(requestLogger);

// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to indexMoney API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  const status = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(status).json({ error: errorMessage });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
