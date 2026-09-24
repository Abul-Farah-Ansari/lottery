import "../styles/hero.css";

import LiveResult from "./LiveResult";

import characterImage from "../assets/images/new-character-(1).jpg";
import prizeImage from "../assets/images/new-prize.jpg";

import leftCard from "../assets/images/1.jpg";
import rightCard from "../assets/images/2.jpg";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-container">

        {/* ================= MOBILE DECORATIVE CARDS ================= */}
        <div className="mobile-cards" aria-hidden="true">
          <img
            src={leftCard}
            alt=""
            width="164"
            height="254"
            className="mobile-card left"
          />

          <img
            src={rightCard}
            alt=""
            className="mobile-card right"
          />
        </div>

        {/* ================= LEFT ================= */}
        <div className="hero-left">
          <div className="character-card">

            <div className="character-placeholder">
              <img
                src={characterImage}
                alt="Bombay Jackpot Raja Rani lottery character"
                width="800"
                height="1000"
                className="character-image"
              />
            </div>

            <div className="feature-card">
              <h2>Why Check Bombay Jackpot Results?</h2>

              <ul>
                <li>⚡ Fast Live Results</li>
                <li>🗓 Daily Draw Results</li>
                <li>🔔 Instant Result Updates</li>
                <li>⭐ Simple Result Checking</li>
              </ul>
            </div>

          </div>
        </div>

        {/* ================= CENTER ================= */}
        <div className="hero-center">

          <div className="hero-title">

            <span className="hero-tag">
              LIVE LOTTERY RESULTS
            </span>

            <h1 id="hero-heading" className="hero-heading">
              Bombay <span>Jackpot</span>
            </h1>

            <p className="hero-subheading">
              <span className="raja-text">Raja</span>{" "}
              <span className="rani-text">Rani</span>
            </p>

            <p className="hero-description">
              Check Bombay Jackpot Raja Rani live lottery results,
              winning ticket numbers, previous results and upcoming
              draw timings.
            </p>

          </div>

          {/* ================= LIVE RESULT ================= */}
          <div
            className="dashboard-box"
            aria-label="Bombay Jackpot Raja Rani live lottery result"
          >
            <LiveResult />
          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="hero-right">

          <div className="prize-card">

            <h2>Today's Prize</h2>

            <div className="prize-placeholder">
              <img
                src={prizeImage}
                alt="Bombay Jackpot Raja Rani daily lottery prize"
                width="1000"
                height="850"
                className="prize-image"
              />
            </div>

            <p>
              Check Today's Winning Result
            </p>

            <small>
              View the latest winning ticket number and draw result.
            </small>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;