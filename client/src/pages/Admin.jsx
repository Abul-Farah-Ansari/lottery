import { useState } from "react";
import { useNavigate } from "react-router-dom";


import AdminHeader from "../components/AdminHeader";
import ResultForm from "../components/ResultForm";
import TodayResults from "../components/TodayResults";
import Dashboard from "./Dashboard";

import "../styles/admin.css";

function Admin() {
  const navigate = useNavigate();

  const [selectedResult, setSelectedResult] =
    useState(null);

  const [refresh, setRefresh] = useState(false);

  // Dashboard | Results
  const [activeTab, setActiveTab] =
    useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <section className="admin-section">
        <div className="admin-container">

          {activeTab === "dashboard" ? (

            <Dashboard />

          ) : (

            <>
              <ResultForm
                selectedResult={selectedResult}
                setSelectedResult={setSelectedResult}
                setRefresh={setRefresh}
              />

              <hr className="admin-divider" />

              <TodayResults
                setSelectedResult={setSelectedResult}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </>

          )}

        </div>
      </section>
    </>
  );
}

export default Admin;