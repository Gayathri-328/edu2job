import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [predictions, setPredictions] = useState([]);
  const navigate = useNavigate();

  // 🔴 LOGOUT
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (activePage === "predictions") {
      fetchPredictions();
    }
  }, [activePage]);

  const fetchPredictions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/predictions",
        {
          headers: {
            Authorization: `Bearer ${token}`, // backend handles Bearer
          },
        }
      );

      setPredictions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load predictions");
    }
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">Edu2Job</h2>

        <ul className="menu">
          <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li>

          <li
            className={activePage === "predictions" ? "active" : ""}
            onClick={() => setActivePage("predictions")}
          >
            Predictions
          </li>

          <li
            className={activePage === "analytics" ? "active" : ""}
            onClick={() => setActivePage("analytics")}
          >
            Analytics
          </li>

          <li
            className={activePage === "feedback" ? "active" : ""}
            onClick={() => setActivePage("feedback")}
          >
            Feedback
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <>
            <div className="topbar">
              <h1>Admin Dashboard</h1>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
              <span className="admin-badge">Administrator</span>
            </div>

            <div className="cards">
              <div className="card blue">
                <h3>{predictions.length}</h3>
                <p>Total Predictions</p>
              </div>
              <div className="card green">
                <h3>Live</h3>
                <p>System Status</p>
              </div>
              <div className="card cyan">
                <h3>Admin</h3>
                <p>Role</p>
              </div>
              <div className="card orange">
                <h3>{new Date().toLocaleDateString()}</h3>
                <p>Date</p>
              </div>
            </div>
          </>
        )}

        {/* PREDICTIONS */}
        {activePage === "predictions" && (
          <div className="table-container">
            <h2>Prediction Records</h2>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Job Role</th>
                  <th>Accuracy</th>
                  <th>Company</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {predictions.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No records found
                    </td>
                  </tr>
                ) : (
                  predictions.map((p, index) => (
                    <tr key={index}>
                      <td>{p.userName}</td>
                      <td>{p.email}</td>
                      <td>{p.role}</td>
                      <td>
                        <span className="badge">{p.accuracy}%</span>
                      </td>
                      <td>{p.company}</td>
                      <td>{new Date(p.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ANALYTICS */}
        {activePage === "analytics" && (
          <div className="placeholder">
            <h2>Analytics</h2>
            <p>Charts & statistics will appear here</p>
          </div>
        )}

        {/* FEEDBACK */}
        {activePage === "feedback" && (
          <div className="placeholder">
            <h2>User Feedback</h2>
            <p>Ratings & reviews will appear here</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
