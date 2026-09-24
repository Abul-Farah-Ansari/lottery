import Countdown from "./Countdown";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import api from "../services/api";
import "../styles/liveResult.css";
import winnerBadge from "../assets/images/new-winner-badge.png";

function LiveResult() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // ==========================
  // Fetch Live Result
  // ==========================

  const fetchLiveResult = async () => {
    try {
      const response = await api.get("/result/live");
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching live result:", error);

      // Keep previous result if API fails
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Fetch Live Result
  // ==========================

  useEffect(() => {
    fetchLiveResult();

    // Check every 5 seconds instead of every 1 second
    const interval = setInterval(() => {
      fetchLiveResult();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ==========================
  // Winner Confetti
  // ==========================

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
    }

    setShowConfetti(false);
  }, [result?.mode]);

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <section
        id="live"
        className="live-result"
        aria-labelledby="live-result-heading"
      >
        <div className="result-card loading-card">
          <h2 id="live-result-heading">
            Live Lottery Result
          </h2>

          <p aria-live="polite">
            Loading the latest result...
          </p>
        </div>
      </section>
    );
  }

  // ==========================
  // No Result
  // ==========================

  if (!result || result.success === false) {
    return (
      <section
        id="live"
        className="live-result"
        aria-labelledby="live-result-heading"
      >
        <div className="result-card error-card">
          <h2 id="live-result-heading">
            Live Lottery Result
          </h2>

          <p>
            No result is currently available. Please check again later.
          </p>
        </div>
      </section>
    );
  }

  // ==========================
  // Winner Mode
  // ==========================

  if (result.mode === "winner") {
    return (
      <section
        id="live"
        className="live-result"
        aria-labelledby="live-result-heading"
      >
        <h2
          id="live-result-heading"
          className="sr-only"
        >
          Bombay Jackpot Raja Rani Live Lottery Result
        </h2>

        {/* Confetti */}
        {showConfetti && (
          <Confetti
            recycle={false}
            numberOfPieces={250}
          />
        )}

        {/* Falling Sparkles */}
        <div
          className="sparkles"
          aria-hidden="true"
        >
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

        {/* Result Card */}
        <div
          className="result-card"
          aria-live="polite"
        >
          <div
            className="border-rays"
            aria-hidden="true"
          ></div>

          {/* Winner Badge */}
          <div className="winner-image-container">
            <img
              src={winnerBadge}
              alt="Winning result badge for Bombay Jackpot Raja Rani"
              className="winner-image"
            />

            <div
              className="ticket-number-overlay"
              aria-label={`Winning ticket number ${
                result.data.ticketNumber
              }${result.data.hasX ? "X" : ""}`}
            >
              {result.data.ticketNumber}
              {result.data.hasX ? "X" : ""}
            </div>
          </div>

          {/* Draw Information */}
          <div className="draw-info">
            <span>Draw Time</span>

            <strong>
              {result.data.drawTime}
            </strong>
          </div>
        </div>
      </section>
    );
  }

  // ==========================
  // Countdown Mode
  // ==========================

  return (
    <section
      id="live"
      className="live-result"
      aria-labelledby="live-countdown-heading"
    >
      <h2
        id="live-countdown-heading"
        className="sr-only"
      >
        Upcoming Bombay Jackpot Raja Rani Lottery Draw
      </h2>

      <Countdown
        drawTime={result.drawTime}
        visibleAt={result.visibleAt}
        onComplete={fetchLiveResult}
      />
    </section>
  );
}

export default LiveResult;