import "../styles/hero.css";
import LiveResult from "./LiveResult";

import characterImage from "../assets/images/character (1).png";
import prizeImage from "../assets/images/prize.png";


function Hero() {
  

  return (
    <section className="hero">
      <div className="hero-container">

        {/* ================= LEFT ================= */}

        <div className="hero-left">

          <div className="character-card">

            <div className="character-placeholder">
              <img
  src={characterImage}
  alt="Lottery Character"
  className="character-image"
/>
            </div>

            <div className="feature-card">

              <h3>Why Play With Us?</h3>

              <ul>
                <li>⚡ Fast Live Results</li>
                <li>🗓 Trusted Daily Draws</li>
                <li>🛡 100% Secure</li>
                <li>🔔 Instant Updates</li>
                <li>⭐ Premium Experience</li>
              </ul>

            </div>

          </div>

        </div>

        {/* ================= CENTER ================= */}

        <div className="hero-center">

          <div className="hero-title">

            <span className="hero-tag">
              LIVE RESULT DASHBOARD
            </span>

            <h1>
              Bombay <span>Jackpot</span>
            </h1>

            <p>
              Live Lottery Result Dashboard
            </p>

          </div>

          {/* Live Result (Countdown / Winner) */}

          <div className="dashboard-box">
            <LiveResult />
          </div>

          {/* Buttons */}

        
        </div>

        {/* ================= RIGHT ================= */}

        <div className="hero-right">

          <div className="prize-card">

            <h2>Today's Prize</h2>

            <div className="prize-placeholder">
              <img
  src={prizeImage}
  alt="Today's Prize"
  className="prize-image"
/>
            </div>

            <p>
              Win Big Every Day
            </p>

            <small>
              Your Lucky Number Can Change Your Life!
            </small>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;