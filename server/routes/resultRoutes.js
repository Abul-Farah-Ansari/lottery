const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  exportResults,
} = require("../controllers/exportController");

const {
  addResult,
  getLiveResult,
  getResultHistory,
  getTodayResults,
  updateResult,
  deleteResult,
} = require("../controllers/resultController");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

// Public Routes
router.get("/live", getLiveResult);
router.get("/today", getTodayResults);
router.get("/history", getResultHistory);
router.get("/export", exportResults);

// Protected Routes
router.get("/dashboard", verifyToken, getDashboardStats);
router.post("/", verifyToken, addResult);
router.put("/:id", verifyToken, updateResult);
router.delete("/:id", verifyToken, deleteResult);

module.exports = router;