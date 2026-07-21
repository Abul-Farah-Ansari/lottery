const ExcelJS = require("exceljs");
const Result = require("../models/Result");

const exportResults = async (req, res) => {
  try {
    const { date } = req.query;

    const query = {};

    if (date) {
      query.drawDate = date;
    }

    const results = await Result.find(query).sort({
      visibleAt: 1,
    });

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet(
      "Lottery Results"
    );

    worksheet.columns = [
      {
        header: "Draw Time",
        key: "drawTime",
        width: 18,
      },
      {
        header: "Winner Name",
        key: "winnerName",
        width: 30,
      },
      {
        header: "Ticket Number",
        key: "ticketNumber",
        width: 25,
      },
      {
        header: "Draw Date",
        key: "drawDate",
        width: 20,
      },
    ];

    results.forEach((item) => {
      worksheet.addRow({
        drawTime: item.drawTime,
        winnerName: item.winnerName,
        ticketNumber: item.ticketNumber,
        drawDate: item.drawDate,
      });
    });

    worksheet.getRow(1).font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    };

    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=LotteryResults.xlsx`
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  exportResults,
};