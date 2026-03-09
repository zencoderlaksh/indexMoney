const express = require("express");
const config = require("./config");
const requestLogger = require("./middlewares/logger");
const routes = require("./routes");

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to indexMoney API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
