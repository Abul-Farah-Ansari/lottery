import { useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo */}

        <a href="/" className="logo">
          <span className="logo-icon">🎰</span>
          <div className="logo-text">
            <h2>Bombay Jackpot</h2>
            <p>Live Lottery Results</p>
          </div>
        </a>

        {/* Desktop Menu */}

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <a href="/" onClick={closeMenu}>
            Home
          </a>

          <a href="#history" onClick={closeMenu}>
            History
          </a>

          <a href="/admin" onClick={closeMenu}>
            Admin
          </a>

        </div>

        {/* Mobile Menu */}

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;