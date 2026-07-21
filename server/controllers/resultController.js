const Result = require("../models/Result");


// ======================================
// Add New Result (Admin)
// ======================================
const addResult = async (req, res) => {
  try {
    const { winnerName, ticketNumber, drawDate, drawTime } = req.body;

    // Validation
    if (!winnerName || !ticketNumber || !drawDate || !drawTime) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Convert Draw Time (12-hour to 24-hour)
    const [time, period] = drawTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    // Create visibleAt
    const visibleAt = new Date(drawDate);
    visibleAt.setHours(hours, minutes, 0, 0);
    console.log("Draw Date:", drawDate);
console.log("Draw Time:", drawTime);
console.log("Visible At:", visibleAt);

    // Prevent duplicate result
    const existingResult = await Result.findOne({
      drawDate,
      drawTime,
    });

    if (existingResult) {
      return res.status(400).json({
        success: false,
        message: "Result already exists for this draw time.",
      });
    }

    // Save Result
    const result = await Result.create({
      winnerName,
      ticketNumber,
      drawDate,
      drawTime,
      visibleAt,
    });

    return res.status(201).json({
      success: true,
      message: "Result added successfully.",
      data: result,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Live Result API
// ======================================
const getLiveResult = async (req, res) => {
  try {
    const now = new Date();
    console.log("=================================");
console.log("Current Server Time:", now);
console.log("Current ISO Time:", now.toISOString());
console.log("=================================");

    // Next upcoming result
    const nextResult = await Result.findOne({
      visibleAt: { $gt: now },
    }).sort({ visibleAt: 1 });

    // If no future result exists
    if (!nextResult) {
      const latestResult = await Result.findOne().sort({
        visibleAt: -1,
      });

      if (!latestResult) {
        return res.status(404).json({
          success: false,
          message: "No results available.",
        });
      }

      return res.status(200).json({
        success: true,
        mode: "winner",
        data: latestResult,
      });
    }

    // Countdown starts 10 minutes before draw
    const countdownStart = new Date(
      nextResult.visibleAt.getTime() - 10 * 60 * 1000
    );

    // Countdown Mode
    if (now >= countdownStart && now < nextResult.visibleAt) {
  return res.status(200).json({
  success: true,
  mode: "countdown",
  drawTime: nextResult.drawTime,
  visibleAt: nextResult.visibleAt,
  serverTime: now,
});
    }

    // Current Winner
    const currentResult = await Result.findOne({
      visibleAt: { $lte: now },
    }).sort({
      visibleAt: -1,
    });

    if (!currentResult) {
      return res.status(404).json({
        success: false,
        message: "No live result found.",
      });
    }

    return res.status(200).json({
      success: true,
      mode: "winner",
      data: currentResult,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/// ======================================
// Result History By Date (Public)
// ======================================
const getResultHistory = async (req, res) => {
  try {
    const date =
      req.query.date ||
      new Date().toISOString().split("T")[0];

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const now = new Date();

    const query = {
      drawDate: date,
      visibleAt: { $lte: now },
    };

    const totalResults = await Result.countDocuments(query);

    const totalPages = Math.ceil(totalResults / limit);

    const results = await Result.find(query)
      .sort({ visibleAt: 1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: results,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Today's Results (Admin)
// ======================================
const getTodayResults = async (req, res) => {
  try {
    const date =
      req.query.date ||
      new Date().toISOString().split("T")[0];

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
      drawDate: date,
    };

    const totalResults = await Result.countDocuments(query);

    const totalPages = Math.ceil(totalResults / limit);

    const results = await Result.find(query)
      .sort({ visibleAt: 1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: results,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Update Result
// ======================================
const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { winnerName, ticketNumber, drawDate, drawTime } = req.body;

    // Find current result
    const result = await Result.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found.",
      });
    }

    // Prevent duplicate draw time for the same date
    const existingResult = await Result.findOne({
      drawDate,
      drawTime,
      _id: { $ne: id }, // Ignore the current record
    });

    if (existingResult) {
      return res.status(400).json({
        success: false,
        message: "Result already exists for this draw time.",
      });
    }

    // Update fields
    result.winnerName = winnerName;
    result.ticketNumber = ticketNumber;
    result.drawDate = drawDate;
    result.drawTime = drawTime;

    // Convert drawTime to visibleAt
    const [time, period] = drawTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const visibleAt = new Date(drawDate);
    visibleAt.setHours(hours, minutes, 0, 0);
    console.log("=================================");
console.log("Draw Date:", drawDate);
console.log("Draw Time:", drawTime);
console.log("Visible At:", visibleAt);
console.log("Visible ISO:", visibleAt.toISOString());
console.log("=================================");

    result.visibleAt = visibleAt;

    await result.save();

    return res.status(200).json({
      success: true,
      message: "Result updated successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Delete Result
// ======================================
const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found.",
      });
    }
  


    await Result.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Result deleted successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const todayResults = await Result.countDocuments({
      drawDate: today,
    });

    const totalResults = await Result.countDocuments();

    const latestWinner = await Result.findOne()
      .sort({ createdAt: -1 })
      .select("winnerName ticketNumber drawTime");

    res.json({
      success: true,
      todayResults,
      totalResults,
      latestWinner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addResult,
  getLiveResult,
  getResultHistory,
  getTodayResults,
  updateResult,
  deleteResult,
  getDashboardStats,
};