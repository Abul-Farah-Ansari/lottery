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

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

        {/* Left Card */}
      
        <div className="nav-container">

          {/* Logo */}
          <a href="/" className="logo" onClick={closeMenu}>
            <span className="logo-icon">🎰</span>

            <div className="logo-text">
              <h2>Bombay Jackpot</h2>
              <p>Live Lottery Results</p>
            </div>
          </a>

          {/* Navigation */}
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <a href="/" onClick={closeMenu}>
              Home
            </a>

            <a href="#rules" onClick={closeMenu}>
              Rules
            </a>

            <a href="#history" onClick={closeMenu}>
              History
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>

        {/* Right Card */}
       
      </nav>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
}

export default Navbar;