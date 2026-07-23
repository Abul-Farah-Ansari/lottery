import { useState, useEffect } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">

        <a href="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">🎰</span>

          <div className="logo-text">
            <h2>Bombay Jackpot</h2>
            <p>Live Lottery Results</p>
          </div>
        </a>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="#history" onClick={closeMenu}>History</a>
        </div>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
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