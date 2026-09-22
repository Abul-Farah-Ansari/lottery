import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/history.css";
import characterImage from "../assets/images/character (1).png";

export default function HistoryTable() {
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all results for a specific date
  const fetchResults = async (selectedDate) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/result/history?date=${selectedDate}&page=1&limit=1000`
      );

      setResults(res.data.data || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Load today's data automatically
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    setDate(today);
    fetchResults(today);
  }, []);

  // Search button
  const searchResult = () => {
    if (!date) {
      alert("Select a date");
      return;
    }

    fetchResults(date);
  };

  return (
    <section className="history" id="history">
      <div className="history-content">

        <h2>Winning Results</h2>

        <div className="search-box">

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={searchResult}>
            Search
          </button>

        </div>

        <div className="table-box">

          <table>

            <thead>
              <tr>
                <th>Draw Time</th>
                <th>Ticket Number</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="2">
                    Loading...
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
                    No Results Found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Character below history table */}
        <div className="history-character">
          <img
            src={characterImage}
            alt="Bombay Jackpot Character"
          />
        </div>

      </div>
    </section>
  );
}