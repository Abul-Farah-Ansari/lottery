import { useEffect, useState } from "react";
import "../styles/countdown.css";

function Countdown({ drawTime, visibleAt, onComplete }) {
  const calculateTimeLeft = () => {
    const difference = new Date(visibleAt) - new Date();

    if (difference <= 0) {
      return null;
    }

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      ),
      seconds: Math.floor(
        (difference % (1000 * 60)) / 1000
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();

      setTimeLeft(remaining);

      if (!remaining) {
        clearInterval(timer);

        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="countdown-card">
        <h2>Updating Result...</h2>
      </div>
    );
  }

  return (
    <div className="countdown-card">

      <span className="countdown-badge">
        ⏳ NEXT DRAW
      </span>

      <h2 className="draw-time">
        {drawTime}
      </h2>

      <div className="countdown-grid">

        <div className="time-box">
          <h1>{String(timeLeft.hours).padStart(2, "0")}</h1>
          <span>Hours</span>
        </div>

        <div className="time-box">
          <h1>{String(timeLeft.minutes).padStart(2, "0")}</h1>
          <span>Minutes</span>
        </div>

        <div className="time-box">
          <h1>{String(timeLeft.seconds).padStart(2, "0")}</h1>
          <span>Seconds</span>
        </div>

      </div>

      <p className="waiting-text">
        Waiting for today's lucky winner...
      </p>

    </div>
  );
}

export default Countdown;