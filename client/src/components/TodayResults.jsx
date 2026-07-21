import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import ConfirmModal from "./ConfirmModal";

function TodayResults({
  setSelectedResult,
  refresh,
  setRefresh,
}) {
  // ==========================
  // State
  // ==========================
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  // Date Filter
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Draw Time Filter
  const [selectedTime, setSelectedTime] = useState("All");

  // Pagination
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  // Export Loading
  const [exportLoading, setExportLoading] =
    useState(false);

  // ==========================
  // Draw Times
  // ==========================
  const drawTimes = [
    "All",
    "11:00 AM",
    "12:00 AM",
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 PM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
  ];
    // ==========================
  // Fetch Results
  // ==========================
  const fetchResults = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/result/history?date=${selectedDate}&page=${page}&limit=10`
      );

      const data = response.data.data || [];

      setResults(data);
      setFilteredResults(data);

      setPagination(
        response.data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalResults: data.length,
          limit: 10,
          hasNextPage: false,
          hasPrevPage: false,
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to load results.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Load Results
  // ==========================
  useEffect(() => {
    fetchResults();
  }, [refresh, selectedDate, page]);

  // ==========================
  // Search + Time Filter
  // ==========================
  useEffect(() => {
    let filtered = [...results];

    // Search by winner name or ticket number
    if (search.trim()) {
      const keyword = search.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          item.winnerName
            ?.toLowerCase()
            .includes(keyword) ||
          item.ticketNumber
            ?.toString()
            .includes(keyword)
      );
    }

    // Filter by draw time
    if (selectedTime !== "All") {
      filtered = filtered.filter(
        (item) => item.drawTime === selectedTime
      );
    }

    setFilteredResults(filtered);
  }, [results, search, selectedTime]);

  // ==========================
  // Reset page when date changes
  // ==========================
  useEffect(() => {
    setPage(1);
  }, [selectedDate]);
    // ==========================
  // Delete Result
  // ==========================
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/result/${selectedId}`);

      toast.success("Result deleted successfully.");

      setSelectedId(null);
      setShowDeleteModal(false);

      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete result."
      );
    }
  };

  const cancelDelete = () => {
    setSelectedId(null);
    setShowDeleteModal(false);
  };

  // ==========================
  // Reset Filters
  // ==========================
  const handleResetFilters = () => {
    setSearch("");
    setSelectedTime("All");
    setSelectedDate(
      new Date().toISOString().split("T")[0]
    );
    setPage(1);
  };

  // ==========================
  // Export Excel
  // ==========================
  const handleExport = async () => {
    try {
      setExportLoading(true);

      const response = await api.get(
        `/result/export?date=${selectedDate}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `LotteryResults_${selectedDate}.xlsx`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Excel exported successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to export Excel."
      );
    } finally {
      setExportLoading(false);
    }
  };

  // ==========================
  // Loading
  // ==========================
  if (loading) {
    return (
      <div className="loading-results">
        Loading Results...
      </div>
    );
  }
    return (
    <>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Result"
        message="Are you sure you want to delete this result?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <div className="today-results">
        <h2 className="page-title">Lottery Results</h2>

        {/* ==========================
            Filters
        ========================== */}

        <div className="filters-bar">

          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search Winner or Ticket Number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="date"
            className="date-input"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
          />

          <select
            className="time-select"
            value={selectedTime}
            onChange={(e) =>
              setSelectedTime(e.target.value)
            }
          >
            {drawTimes.map((time) => (
              <option
                key={time}
                value={time}
              >
                {time}
              </option>
            ))}
          </select>

          <button
            className="reset-btn"
            onClick={handleResetFilters}
          >
            🔄 Reset
          </button>

          <button
            className="excel-btn"
            onClick={handleExport}
            disabled={exportLoading}
          >
            {exportLoading
              ? "📥 Exporting..."
              : "📥 Export Excel"}
          </button>

        </div>

        {/* ==========================
            Results Table
        ========================== */}

        <div className="table-container">

          <table className="history-table">

            <thead>
              <tr>
                <th>Draw Time</th>
                <th>Winner Name</th>
                <th>Ticket Number</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredResults.length > 0 ? (

                filteredResults.map((result) => (

                  <tr key={result._id}>

                    <td>{result.drawTime}</td>

                    <td>{result.winnerName}</td>

                    <td>{result.ticketNumber}</td>

                    <td>
                      {new Date(
                        result.drawDate
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          title="Edit Result"
                          onClick={() =>
                            setSelectedResult(result)
                          }
                        >
                          ✏️
                        </button>

                        <button
                          className="delete-btn"
                          title="Delete Result"
                          onClick={() =>
                            handleDeleteClick(result._id)
                          }
                        >
                          🗑
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (
                                <tr>
                  <td
                    colSpan="5"
                    className="no-data"
                  >
                    No Results Found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ==========================
            Footer
        ========================== */}

        <div className="table-footer">

          <span>
            Showing{" "}
            <strong>
              {pagination.totalResults === 0
                ? 0
                : (pagination.currentPage - 1) *
                    pagination.limit +
                  1}
            </strong>

            {" - "}

            <strong>
              {Math.min(
                pagination.currentPage *
                  pagination.limit,
                pagination.totalResults
              )}
            </strong>

            {" "}of{" "}

            <strong>
              {pagination.totalResults}
            </strong>{" "}
            results
          </span>

          <div className="pagination">

            <button
              disabled={!pagination.hasPrevPage}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
            >
              ◀ Previous
            </button>

            <span>
              Page {pagination.currentPage} of{" "}
              {pagination.totalPages}
            </span>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() =>
                setPage((prev) => prev + 1)
              }
            >
              Next ▶
            </button>

          </div>

        </div>

      </div>

    </>
  );
}

export default TodayResults;