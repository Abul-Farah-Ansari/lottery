const Result = require("../models/Result");

const getDashboardStats = async (req, res) => {
  try {
    // Today's date (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // Total results
    const totalResults = await Result.countDocuments();

    // Today's results
    const todayResults = await Result.countDocuments({
      drawDate: today,
    });

    // Latest winner
    const latestWinner = await Result.findOne()
      .sort({ visibleAt: -1 })
      .select("winnerName ticketNumber drawTime drawDate");

    // Last 5 winners
    const recentResults = await Result.find()
      .sort({ visibleAt: -1 })
      .limit(5)
      .select(
        "winnerName ticketNumber drawTime drawDate"
      );

    res.status(200).json({
      success: true,
      data: {
        totalResults,
        todayResults,
        latestWinner,
        recentResults,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};

module.exports = {
  getDashboardStats,
};