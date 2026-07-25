import { useState } from "react";
import api from "../services/api";
import "../styles/history.css";

export default function HistoryTable() {
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchResult = async () => {
    if (!date) return alert("Select a date");

    try {
      setLoading(true);
      setSearched(true);

      const res = await api.get(`/result/history?date=${date}`);
      setResults(res.data.data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="history">

      <h2>Previous Winning Results</h2>

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

      {searched && (

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

              ) : results.length ? (

                results.map((item) => (

                  <tr key={item._id}>

                    <td>{item.drawTime}</td>

                    <td>{item.ticketNumber}</td>

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

      )}

    </section>
  );
}