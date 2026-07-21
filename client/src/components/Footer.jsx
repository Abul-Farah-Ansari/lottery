import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-column">

          <h2 className="footer-logo">
            🎰 Bombay Jackpot
          </h2>

          <p>
            Your trusted destination for live lottery results,
            countdowns, and previous winning history.
          </p>

        </div>

        {/* Links */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <a href="/">Home</a>

          <a href="#history">
            Previous Results
          </a>

          <a href="/admin">
            Admin Panel
          </a>

        </div>

        {/* Draw Schedule */}

        <div className="footer-column">

          <h3>Draw Schedule</h3>

          <p>🕑 2:00 PM</p>

          <p>🕔 5:00 PM</p>

          <p>🕗 8:00 PM</p>

        </div>

        {/* Disclaimer */}

        <div className="footer-column">

          <h3>Disclaimer</h3>

          <p>
            Results displayed on this website are for
            informational purposes only.
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        © {new Date().getFullYear()} Bombay Jackpot.
        All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;