console.log("LOADED RESULT CONTROLLER:", __filename);

const Result = require("../models/Result");

// ======================================
// Add New Result (Admin)
// ======================================
const addResult = async (req, res) => {
  try {
    const {
      ticketNumber,
      hasX,
      drawDate,
      drawTime,
    } = req.body;

    if (!ticketNumber || !drawDate || !drawTime) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (
      Number(ticketNumber) < 1 ||
      Number(ticketNumber) > 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Ticket number must be between 1 and 10.",
      });
    }

    // Prevent duplicate
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

    // Convert 12-hour time to 24-hour
    const [time, period] = drawTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const [year, month, day] = drawDate
      .split("-")
      .map(Number);

    // Create the date in IST irrespective of server timezone
    const istOffset = 5.5 * 60;

    const utcMillis =
      Date.UTC(
        year,
        month - 1,
        day,
        hours,
        minutes,
        0,
        0
      ) -
      istOffset * 60 * 1000;

    const drawDateTime = new Date(utcMillis);

    // Countdown starts 5 minutes before draw
    const visibleAt = new Date(
      drawDateTime.getTime() - 5 * 60 * 1000
    );

    // Create result
    const result = await Result.create({
      ticketNumber,
      hasX: hasX === true,
      drawDate,
      drawTime,
      visibleAt,
    });

    console.log(
      "Saved result:",
      result
    );

    console.log(
      "Saved hasX:",
      result.hasX
    );

    console.log(
      "Saved visibleAt:",
      result.visibleAt.toISOString()
    );

    console.log(
      "Server timezone:",
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    console.log(
      "drawDateTime:",
      drawDateTime.toString()
    );

    console.log(
      "drawDateTime ISO:",
      drawDateTime.toISOString()
    );

    return res.status(201).json({
      success: true,
      message: "Result added successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Add Result Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLiveResult = async (req, res) => {
  try {
    const now = new Date();

    const currentResult = await Result.findOne({
      visibleAt: { $lte: now },
    })
      .sort({ visibleAt: -1 })
      .select("ticketNumber hasX drawDate drawTime visibleAt");

    if (!currentResult) {
      return res.status(404).json({
        success: false,
        message: "No live result found.",
      });
    }

    const actualDrawTime = new Date(
      currentResult.visibleAt.getTime() + 5 * 60 * 1000
    );

    // Countdown
    if (now < actualDrawTime) {
      return res.status(200).json({
        success: true,
        mode: "countdown",
        drawTime: currentResult.drawTime,
        visibleAt: actualDrawTime,
        serverTime: now,
      });
    }

    // Winner
    return res.status(200).json({
      success: true,
      mode: "winner",
      data: currentResult,
    });
  } catch (error) {
    console.error("Live Result Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Result History By Date (Public)
// ======================================
const getResultHistory = async (req, res) => {
  try {
    const date =
      req.query.date ||
      new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const now = new Date();

    // ======================================
    // IMPORTANT:
    // visibleAt = draw time - 5 minutes
    //
    // We do NOT want history to appear
    // when countdown starts.
    //
    // History should appear only when the
    // actual draw time has arrived.
    // ======================================

    const historyCutoff = new Date(
      now.getTime() - 5 * 60 * 1000
    );

    const query = {
      drawDate: date,
      visibleAt: {
        $lte: historyCutoff,
      },
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
    console.error("Get Result History Error:", error);

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
      new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
      drawDate: date,
    };

    const totalResults =
      await Result.countDocuments(query);

    const totalPages = Math.ceil(
      totalResults / limit
    );

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

    const {
      ticketNumber,
      hasX,
      drawDate,
      drawTime,
    } = req.body;

    const result = await Result.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found.",
      });
    }

    if (
      !ticketNumber ||
      !drawDate ||
      !drawTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (
      Number(ticketNumber) < 1 ||
      Number(ticketNumber) > 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Ticket number must be between 1 and 10.",
      });
    }

    const existingResult = await Result.findOne({
      drawDate,
      drawTime,
      _id: {
        $ne: id,
      },
    });

    if (existingResult) {
      return res.status(400).json({
        success: false,
        message:
          "Result already exists for this draw time.",
      });
    }

    // Update result
    result.ticketNumber = ticketNumber;
    result.hasX = hasX === true;
    result.drawDate = drawDate;
    result.drawTime = drawTime;

    // Convert 12-hour time to 24-hour
    const [time, period] =
      drawTime.split(" ");

    let [hours, minutes] =
      time.split(":").map(Number);

    if (
      period === "PM" &&
      hours !== 12
    ) {
      hours += 12;
    }

    if (
      period === "AM" &&
      hours === 12
    ) {
      hours = 0;
    }

    const [year, month, day] =
      drawDate.split("-").map(Number);

    // Create the date in IST
    const istOffset = 5.5 * 60;

    const utcMillis =
      Date.UTC(
        year,
        month - 1,
        day,
        hours,
        minutes,
        0,
        0
      ) -
      istOffset * 60 * 1000;

    const drawDateTime =
      new Date(utcMillis);

    // Countdown starts 5 minutes before draw
    const visibleAt =
      new Date(
        drawDateTime.getTime() -
          5 * 60 * 1000
      );

    result.visibleAt = visibleAt;

    await result.save();

    return res.status(200).json({
      success: true,
      message: "Result updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error(
      "Update Result Error:",
      error
    );

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

    const result =
      await Result.findById(id);

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

// ======================================
// Dashboard Stats
// ======================================
const getDashboardStats = async (req, res) => {
  try {
    const today =
      new Date().toLocaleDateString(
        "en-CA",
        {
          timeZone: "Asia/Kolkata",
        }
      );

    const todayResults =
      await Result.countDocuments({
        drawDate: today,
      });

    const totalResults =
      await Result.countDocuments();

    const latestResult =
      await Result.findOne()
        .sort({
          visibleAt: -1,
        })
        .select(
          "ticketNumber hasX drawTime"
        );

    res.json({
      success: true,
      todayResults,
      totalResults,
      latestResult,
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