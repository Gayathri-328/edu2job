import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
// =================  FEEDBACK DATA =================
const dummyFeedbacks = [
  {
    name: "Anjali Sharma",
    email: "anjali.sharma@gmail.com",
    rating: 5,
    comment: "Excellent platform! Job predictions are very accurate.",
    date: "2026-01-1"
  },
  {
    name: "Rahul Verma",
    email: "rahul.verma@gmail.com",
    rating: 4,
    comment: "Good experience overall. Clean UI and useful features.",
    date: "2025-12-21"
  },
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@gmail.com",
    rating: 5,
    comment: "Very helpful for students. Easy to understand dashboard.",
    date: "2025-12-28"
  },
  {
    name: "Arjun Patel",
    email: "arjun.patel@gmail.com",
    rating: 3,
    comment: "Predictions are okay but can be improved.",
    date: "2025-12-31"
  }
];


function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [predictions, setPredictions] = useState([]);
  const [modelStatus, setModelStatus] = useState({});
  
  const navigate = useNavigate();

  /* ================= DATASET UPLOAD STATE ================= */
  const [datasetFile, setDatasetFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ================= FETCH MODEL STATUS ================= */
  const fetchModelStatus = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/model/status"
      );
      setModelStatus(res.data);
    } catch (err) {
      console.error("Failed to fetch model status");
    }
  };

  /* ================= RETRAIN MODEL ================= */
  const retrainModel = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/model/retrain");
      alert("Model retraining started");
      fetchModelStatus();
    } catch (err) {
      alert("Failed to retrain model");
    }
  };

  /* ================= UPLOAD DATASET ================= */
  const uploadDataset = async () => {
    if (!datasetFile) {
      alert("Please select a dataset file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("dataset", datasetFile);

      await axios.post(
        "http://localhost:5000/api/admin/model/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUploadStatus("Dataset uploaded successfully");
      fetchModelStatus();
    } catch (err) {
      setUploadStatus("Failed to upload dataset");
    }
  };

  /* ================= FETCH PREDICTIONS ================= */
  const fetchPredictions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/predictions",
        {
          headers: { Authorization: token },
        }
      );

      setPredictions(res.data);
    } catch (err) {
      alert("Failed to load predictions");
    }
  };

  /* ================= FLAG PREDICTION ================= */
  const flagPrediction = async (userId, predictionId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/admin/predictions/flag",
        { userId, predictionId },
        {
          headers: { Authorization: token },
        }
      );

      alert("Prediction flagged");
      fetchPredictions();
    } catch (err) {
      alert("Failed to flag prediction");
    }
  };

  /* ================= EFFECTS ================= */
  useEffect(() => {
    fetchModelStatus();
    const interval = setInterval(fetchModelStatus, 2000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
  setFeedbacks(dummyFeedbacks);
}, []);


  useEffect(() => {
    if (activePage === "predictions") {
      fetchPredictions();
    }
  }, [activePage]);

  return (
    <div className="admin-layout">
      {/* ================= SIDEBAR ================= */}
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

          {/* ONLY LOGOUT (SIDEBAR BOTTOM) */}
          <li className="sidebar-logout" onClick={logout}>
            Logout
          </li>
        </ul>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="main">
        {activePage === "dashboard" && (
          <>
            <div className="topbar">
              <h1>Admin Dashboard</h1>
              <span className="admin-badge">Administrator</span>
            </div>

            {/* ===== CARDS ===== */}
            <div className="cards">
              <div className="card blue">
                <h3>{predictions.length}</h3>
                <p>Total Predictions</p>
              </div>

              <div className="card green">
                <h3>{modelStatus.status || "idle"}</h3>
                <p>Model Status</p>
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

            {/* ===== DATASET + MODEL ===== */}
            <div className="model-dataset-row">
              {/* Dataset Upload */}
              <div className="model-status-card">
                <h2>Dataset Upload</h2>

                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setDatasetFile(e.target.files[0])}
                />

                <button className="upload-btn" onClick={uploadDataset}>
                  Upload Dataset
                </button>

                {uploadStatus && <p>{uploadStatus}</p>}
              </div>

              {/* Model Controller */}
              <div className="model-status-card">
                <h2>Model Controller</h2>

                <p>
                  <strong>Status:</strong> {modelStatus.status || "idle"}
                </p>
                <p>
                  <strong>Last Trained:</strong>{" "}
                  {modelStatus.lastTrained
                    ? new Date(modelStatus.lastTrained).toLocaleString()
                    : "—"}
                </p>
                <p>
                  <strong>Dataset Used:</strong>{" "}
                  {modelStatus.datasetUsed || "—"}
                </p>

                <button
                  className="retrain-btn"
                  onClick={retrainModel}
                  disabled={modelStatus.status === "training"}
                >
                  {modelStatus.status === "training"
                    ? "Training..."
                    : "Retrain Model"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ================= OTHER PAGES ================= */}
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
                  <th>Flag</th>
                </tr>
              </thead>
              <tbody>
                {predictions.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No records found
                    </td>
                  </tr>
                ) : (
                  predictions.map((p, i) => (
                    <tr key={i}>
                      <td>{p.userName}</td>
                      <td>{p.email}</td>
                      <td>{p.role}</td>
                      <td>
                        <span className="badge">{p.accuracy}%</span>
                      </td>
                      <td>{p.company}</td>
                      <td>{new Date(p.date).toLocaleDateString()}</td>
                      <td>
                        {p.flagged ? "🚩 Flagged" : (
                          <button
                            className="flag-btn"
                            onClick={() =>
                              flagPrediction(p.userId, p.predictionId)
                            }
                          >
                            🚩 Flag
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activePage === "analytics" && (
          <div className="placeholder">
            <h2>Analytics</h2>
            <p>Charts & statistics will appear here</p>
          </div>
        )}

        {activePage === "feedback" && (
          <div className="table-container">
            
            <h2>User Feedback</h2>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length === 0 ? (
                  <tr>
                    <td colSpan="5">No feedback found</td>
                  </tr>
                ) : (
                  feedbacks.map((f, i) => (
                    <tr key={i}>
                      <td>{f.name}</td>
                      <td>{f.email}</td>
                      <td>{"⭐".repeat(f.rating)}</td>
                      <td>{f.comment}</td>
                      <td>{new Date(f.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
                
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
