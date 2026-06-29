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

// MongoDB connection
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
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
