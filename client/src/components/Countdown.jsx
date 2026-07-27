import { useEffect, useState } from "react";
import "../styles/countdown.css";

function Countdown({ drawTime, visibleAt, onComplete }) {

  const calculateTimeLeft = () => {
    const target = new Date(visibleAt).getTime();
    const now = Date.now();

    let difference = target - now;

    if (difference < 0) {
      difference = 0;
    }

    return {
      minutes: Math.floor(difference / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      completed: difference === 0,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();

      setTimeLeft(remaining);

      if (remaining.completed) {
        clearInterval(timer);

        // Wait 1 second before requesting the winner
        setTimeout(() => {
          onComplete?.();
        }, 1000);
      }
      console.log("Client Time:", new Date().toLocaleTimeString());

console.log("Target Time:", new Date(visibleAt).toLocaleTimeString());

console.log(
  "Difference (seconds):",
  Math.floor((new Date(visibleAt).getTime() - Date.now()) / 1000)
);

    }, 1000);

    return () => clearInterval(timer);
    

  }, [visibleAt, onComplete]);

  return (
    <div className="countdown-card">

      {/* Background Glow */}
      <div className="card-glow"></div>

      {/* Animated Border Rays */}
      <div className="border-rays"></div>

      {/* Floating Particles */}
      <div className="card-particles">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              "--delay": `${i * 0.4}s`,
              "--left": `${10 + i * 11}%`,
            }}
          />
        ))}
      </div>

      <span className="countdown-badge">
        ⏳ NEXT DRAW
      </span>

      <h2 className="draw-time">
        {drawTime}
      </h2>

      <div className="countdown-grid">
        <div className="time-box timer">
          <div className="timer-value">
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>

          <div className="timer-label">
            TIME REMAINING
          </div>
        </div>
      </div>

      <p className="waiting-text">
        🎯 Result will be announced in a few moments.
      </p>

    </div>
  );
}

export default Countdown;