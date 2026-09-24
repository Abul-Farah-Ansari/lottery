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
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="nav-container">

          {/* LOGO */}
          <a
            href="/"
            className="logo"
            onClick={closeMenu}
            aria-label="Bombay Jackpot Raja Rani home"
          >
            <img
              src="/logo.png"
              alt="Bombay Jackpot Raja Rani"
              className="navbar-logo"
              width="150"
              height="70"
            />
          </a>

          {/* NAVIGATION */}
          <div
            id="main-navigation"
            className={`nav-links ${menuOpen ? "active" : ""}`}
          >
            <a
              href="/"
              onClick={closeMenu}
              aria-current="page"
            >
              Home
            </a>

            <a
              href="#history"
              onClick={closeMenu}
            >
              Winner List
            </a>

            <a
              href="#rules"
              onClick={closeMenu}
            >
              Rules
            </a>
          </div>

          {/* MOBILE MENU */}
          <button
            type="button"
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}

export default Navbar;