import { useState } from "react";
import "../styles/history.css";

function DateSearch({ onSearch }) {
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    onSearch(date);
  };

  return (
    <div className="history-search">

      <div className="date-field">

        <label htmlFor="drawDate">
          📅 Select Draw Date
        </label>

        <input
          id="drawDate"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

      </div>

      <button
        className="search-btn"
        onClick={handleSearch}
      >
        🔍 Search Results
      </button>

    </div>
  );
}

export default DateSearch;