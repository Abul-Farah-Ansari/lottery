import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = (results, fileName = "Lottery_Results") => {
  if (!results.length) return;

  const data = results.map((item) => ({
    "Draw Time": item.drawTime,
    "Winner Name": item.winnerName,
    "Ticket Number": item.ticketNumber,
    Date: new Date(item.drawDate).toLocaleDateString("en-IN"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Lottery Results"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
};

export default exportToExcel;