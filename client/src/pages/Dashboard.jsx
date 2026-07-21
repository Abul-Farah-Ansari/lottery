import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaDatabase,
  FaCalendarCheck,
  FaUser,
  FaClock,
} from "react-icons/fa";

import api from "../services/api";
import "../styles/dashboard.css";


import "../styles/dashboard.css";


function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalResults: 0,
    todayResults: 0,
    latestWinner: null,
    recentResults: [],
  });

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await api.get("/result/dashboard");

      setStats(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="loading-results">
        Loading Dashboard...
      </div>
    );
  }

 return (
  <div className="dashboard-page">
    <h1 className="dashboard-title">
      Dashboard Analytics
    </h1>

    <div className="dashboard-grid">

      <div className="dashboard-card blue">
        <div className="card-icon">
          <FaDatabase />
        </div>

        <h3>Total Results</h3>

        <h2>{stats.totalResults}</h2>
      </div>

      <div className="dashboard-card green">
        <div className="card-icon">
          <FaCalendarCheck />
        </div>

        <h3>Today's Results</h3>

        <h2>{stats.todayResults}</h2>
      </div>

      <div className="dashboard-card orange">
        <div className="card-icon">
         <FaUser />
        </div>

        <h3>Latest Winner</h3>

        <h2>
          {stats.latestWinner?.winnerName || "-"}
        </h2>

        <p>
          Ticket :
          {" "}
          {stats.latestWinner?.ticketNumber || "-"}
        </p>
      </div>

      <div className="dashboard-card purple">
        <div className="card-icon">
          <FaClock />
        </div>

        <h3>Latest Draw</h3>

        <h2>
          {stats.latestWinner?.drawTime || "-"}
        </h2>

        <p>
          {stats.latestWinner?.drawDate
            ? new Date(
                stats.latestWinner.drawDate
              ).toLocaleDateString("en-IN")
            : "-"}
        </p>
      </div>

    </div>
  </div>
);
}

export default Dashboard;