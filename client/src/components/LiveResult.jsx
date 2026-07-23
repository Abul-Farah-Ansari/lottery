import Countdown from "./Countdown";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import api from "../services/api";
import "../styles/liveResult.css";
import winnerBadge from "../assets/images/winner-badge.png";

function LiveResult() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchLiveResult = async () => {
    try {
      const response = await api.get("/result/live");
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching live result:", error);

      // Keep showing the previous result if API fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveResult();

    const interval = setInterval(fetchLiveResult, 100);

    return () => clearInterval(interval);
  }, []);

  // Confetti every 10 seconds while winner is visible
  useEffect(() => {
    if (result?.mode === "winner") {
      setShowConfetti(true);

      const interval = setInterval(() => {
        setShowConfetti(false);

        setTimeout(() => {
          setShowConfetti(true);
        }, 100);
      }, 10000);

      return () => clearInterval(interval);
    } else {
      setShowConfetti(false);
    }
  }, [result]);

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

  // Winner Mode
  if (result.mode === "winner") {
    return (
      <section id="live" className="live-result">

        {showConfetti && (
          <Confetti
            recycle={false}
            numberOfPieces={250}
          />
        )}

<div className="sparkles">
  {[...Array(25)].map((_, i) => (
    <span
      key={i}
      className="sparkle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    >
      ✨
    </span>
  ))}
</div>
        <div className="result-card">

          
         

          <div className="winner-image-container">
            <img
              src={winnerBadge}
              alt="Winner Badge"
              className="winner-image"
            />

            <div className="ticket-number-overlay">
              {result.data.ticketNumber}
            </div>
          </div>

   

          <div className="draw-info">
            Draw Time
            <strong>{result.data.drawTime}</strong>
          </div>

        </div>
      </section>
    );
  }

  // Countdown Mode
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