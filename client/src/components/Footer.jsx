import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ================= Brand ================= */}

        <div className="footer-column">

          <h2 className="footer-logo">
            🎰 Bombay Jackpot
          </h2>

          <p>
            Bombay Jackpot is your trusted destination for live lottery
            results, previous winning history, draw schedules, and real-time
            result updates. We are committed to providing a fair, transparent,
            and user-friendly experience.
          </p>

          <div className="footer-badge">
            18+ | Play Responsibly
          </div>

        </div>

        {/* ================= Quick Links ================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <a href="/">Home</a>

          <a href="#history">
            Previous Results
          </a>

          <a href="#rules">
            Game Rules
          </a>

          <a href="#how-to-play">
            How to Play
          </a>

          <a href="#stay-updated">
            Stay Updated
          </a>

        </div>

        {/* ================= Policies ================= */}

        <div className="footer-column">

          <h3>Policies</h3>

          <a href="#game-policy">
            Game Policy
          </a>

          <a href="#privacy-policy">
            Privacy Policy
          </a>

          <a href="#terms">
            Terms & Conditions
          </a>

          <a href="#responsible-gaming">
            Responsible Gaming
          </a>

        </div>

        {/* ================= Disclaimer ================= */}

        <div className="footer-column">

          <h3>Disclaimer</h3>

          <p>
            Bombay Jackpot is intended for entertainment purposes only.
            Participation is voluntary and involves financial risk.
            Please play responsibly and within your financial limits.
            Users must be 18 years or older and comply with the laws
            applicable in their jurisdiction.
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        © {new Date().getFullYear()} Bombay Jackpot. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;