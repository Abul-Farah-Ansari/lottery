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
      <div className="header-left">
        <h1>Lottery Admin</h1>
        <span>Management System</span>
      </div>

      <div className="header-center">
        <button
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

      <div className="header-right">
        <button
          className="logout-btn"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;