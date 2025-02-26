require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/groups");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Use built-in Express JSON parser

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/groups", require("./routes/groups"));
app.use("/api/groups", groupRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
