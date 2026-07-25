require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("SERVER BREVO_API_KEY:", process.env.BREVO_API_KEY);

const resultRoutes = require("./routes/resultRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      // "http://localhost:5173",
      "https://lottery-5wjp.vercel.app",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/result", resultRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Lottery Backend Running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});