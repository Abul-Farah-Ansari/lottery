import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/history.css";
import characterImage from "../assets/images/new-character-(1).jpg";

export default function HistoryTable() {
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==========================
  // Fetch Results For Date
  // ==========================

  const fetchResults = async (selectedDate) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/result/history?date=${selectedDate}&page=1&limit=1000`
      );

      setResults(res.data.data || []);
    } catch (err) {
      console.error("Error fetching history results:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Load Today's Results
  // ==========================

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    setDate(today);
    fetchResults(today);
  }, []);

  // ==========================
  // Search Results
  // ==========================

  const searchResult = () => {
    if (!date) {
      alert("Select a date");
      return;
    }

    fetchResults(date);
  };

  return (
    <section
      className="history"
      id="history"
      aria-labelledby="history-heading"
    >
      <div className="history-content">

        {/* ==========================
            Section Heading
        ========================== */}

        <h2 id="history-heading">
          Previous Winning Results
        </h2>

        <p className="history-description">
          Check previous Bombay Jackpot Raja Rani draw results
          and winning ticket numbers by date.
        </p>

        {/* ==========================
            Date Search
        ========================== */}

        <div className="search-box">

          <label htmlFor="result-date" className="sr-only">
            Select result date
          </label>

          <input
            id="result-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Select a date to view previous winning results"
          />

          <button
            type="button"
            onClick={searchResult}
          >
            Search
          </button>

        </div>

        {/* ==========================
            Results Table
        ========================== */}

        <div
          className="table-box"
          aria-live="polite"
        >
          <table>
            <caption className="sr-only">
              Bombay Jackpot Raja Rani previous winning results
            </caption>

            <thead>
              <tr>
                <th scope="col">
                  Draw Time
                </th>

                <th scope="col">
                  Winning Ticket Number
                </th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="2">
                    Loading previous results...
                  </td>
                </tr>
              ) : results.length > 0 ? (
                results.map((item) => (
                  <tr key={item._id}>

                    <td>
                      {item.drawTime}
                    </td>

                    <td>
                      {item.ticketNumber}
                      {item.hasX ? "X" : ""}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">
                    No winning results found for the selected date.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* ==========================
            Character
        ========================== */}

        <div className="history-character">
          <img
            src={characterImage}
            alt="Bombay Jackpot Raja Rani lottery character"
          />
        </div>

      </div>
    </section>
  );
}