import { useState } from "react";
import api from "../services/api";
import DateSearch from "./DateSearch";
import "../styles/history.css";

function HistoryTable() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchResult = async (date) => {
    try {
      setLoading(true);
      setSearched(true);

      const response = await api.get(`/result/history?date=${date}`);

      setResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="history" className="history-section">
      <div className="history-container">

        {/* ================= Heading ================= */}

        <div className="history-heading">

          <span className="history-tag">
            RESULT HISTORY
          </span>

          <h2>
            Previous Winning Results
          </h2>

          <p>
            Search previous lottery draw results by selecting a date.
          </p>

        </div>

        {/* ================= Search ================= */}

        <div className="history-search-card">
          <DateSearch onSearch={searchResult} />
        </div>

        {/* ================= Table ================= */}

        <div className="history-card">

          <div className="table-header">

            <h3>
              Winning History
            </h3>

            <span>
              {results.length} Result{results.length !== 1 ? "s" : ""}
            </span>

          </div>

          <div className="table-wrapper">

            <table className="history-table">

              <thead>

                <tr>
                  <th>Draw Time</th>
                  <th>Ticket Number</th>
                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr className="empty-row">
                    <td colSpan="2">

                      <div className="empty-state">

                        <div className="empty-icon">
                          ⏳
                        </div>

                        <h3>Loading...</h3>

                        <p>
                          Fetching lottery results...
                        </p>

                      </div>

                    </td>
                  </tr>

                ) : results.length > 0 ? (

                  results.map((item) => (

                    <tr key={item._id}>

                      <td>{item.drawTime}</td>

                      <td>{item.ticketNumber}</td>

                    </tr>

                  ))

                ) : searched ? (

                  <tr className="empty-row">

                    <td colSpan="2">

                      <div className="empty-state">

                        <div className="empty-icon">
                          🎟️
                        </div>

                        <h3>
                          No Results Found
                        </h3>

                        <p>
                          No winning result is available for the selected date.
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : (

                  <tr className="empty-row">

                    <td colSpan="2">

                      <div className="empty-state">

                        <div className="empty-icon">
                          📅
                        </div>

                        <h3>
                          Select a Date
                        </h3>

                        <p>
                          Choose a date above and click Search Results.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HistoryTable;