import { MdDashboard } from "react-icons/md";
import { FaListAlt, FaSignOutAlt } from "react-icons/fa";

import "../styles/AdminHeader.css";

function AdminHeader({
  activeTab,
  setActiveTab,
  onLogout,
}) {
  return (
    <header className="admin-header">

      {/* =========================
          HEADER LEFT / BRAND
      ========================== */}
      <div className="header-left">

        <img
          src="/logo.png"
          alt="Bombay Jackpot Raja Rani"
          className="admin-logo"
          width="90"
          height="70"
        />

        <div className="header-brand-text">
          <h1>Lottery Admin</h1>
          <span>Management System</span>
        </div>

      </div>

      {/* =========================
          HEADER CENTER / NAVIGATION
      ========================== */}
      <div className="header-center">

        <button
          type="button"
          className={
            activeTab === "dashboard"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() => setActiveTab("dashboard")}
        >
          <MdDashboard className="nav-icon" />
          Dashboard
        </button>

        <button
          type="button"
          className={
            activeTab === "results"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() => setActiveTab("results")}
        >
          <FaListAlt className="nav-icon" />
          Results
        </button>

      </div>

      {/* =========================
          HEADER RIGHT / LOGOUT
      ========================== */}
      <div className="header-right">

        <button
          type="button"
          className="logout-btn"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </header>
  );
}

export default AdminHeader;