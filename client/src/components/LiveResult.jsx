import Countdown from "./Countdown";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/liveResult.css";

function LiveResult() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLiveResult = async () => {
    try {
      const response = await api.get("/result/live");
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching live result:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveResult();

    const interval = setInterval(fetchLiveResult, 1000);

    return () => clearInterval(interval);
  }, []);

  // Loading
  if (loading) {
    return (
      <section id="live" className="live-result">
        <div className="result-card loading-card">
          <h2>Loading Live Result...</h2>
        </div>
      </section>
    );
  }

  // No Result
  if (!result || result.success === false) {
    return (
      <section id="live" className="live-result">
        <div className="result-card error-card">
          <h2>No Result Available</h2>
          <p>Please check again later.</p>
        </div>
      </section>
    );
  }

  // ===========================
  // WINNER MODE
  // ===========================

  if (result.mode === "winner") {
    return (
      <section id="live" className="live-result">

        <div className="result-card">

          <span className="winner-badge">
            🏆 LIVE WINNER
          </span>

          <h2 className="winner-heading">
            Congratulations
          </h2>

          <div className="winner-name">
            {result.data.winnerName}
          </div>

          <div className="divider"></div>

          <p className="ticket-label">
            Winning Ticket Number
          </p>

          <div className="ticket-number">
            {result.data.ticketNumber}
          </div>

          <div className="divider"></div>

          <div className="draw-info">
            Draw Time
            <strong>{result.data.drawTime}</strong>
          </div>

        </div>

      </section>
    );
  }

  // ===========================
  // COUNTDOWN MODE
  // ===========================

  return (
    <section id="live" className="live-result">

      <Countdown
        drawTime={result.drawTime}
        visibleAt={result.visibleAt}
        onComplete={fetchLiveResult}
      />

    </section>
  );
}

export default LiveResult;