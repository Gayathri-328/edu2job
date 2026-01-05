import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [prediction, setPrediction] = useState([]);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    branch: "",
    cgpa: "",
    university: "",
    graduationYear: "",
    projects: "",
    certifications: ""
  });

  // Skill levels
  const [skills, setSkills] = useState({
    communication: "",
    coding: "",
    problem: "",
    network: ""
  });

  // Load user profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/dashboard", {
      headers: { Authorization: token }
    }).then(res => setProfile(res.data));
  }, []);

  // Load last predictions
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/predictions/last", {
      headers: { Authorization: token }
    }).then(res => setPrediction(res.data || []));
  }, []);

  // Handle skill select
  const selectSkill = (skill, level) => {
    setSkills({ ...skills, [skill]: level });
  };

  // Job prediction logic
  const predictJobs = async () => {
    let jobs = [];

    if (skills.coding === "advanced")
      jobs.push({ role: "Software Engineer", acc: 85, company: "Google, Infosys" });

    if (skills.network === "advanced" || skills.network === "moderate")
      jobs.push({ role: "Cloud / Network Engineer", acc: 80, company: "AWS, Microsoft" });

    if (skills.problem === "advanced")
      jobs.push({ role: "Business Analyst", acc: 75, company: "EY, Accenture" });

    if (skills.communication === "advanced" || skills.communication === "moderate")
      jobs.push({ role: "HR / Consultant", acc: 70, company: "TCS, Deloitte" });

    setPrediction(jobs);

    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/predictions", jobs, {
      headers: { Authorization: token }
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className={`dashboard-layout ${darkMode ? "dark-mode" : ""}`}>

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🎓 Edu2Job</h2>
        <ul>
          <li onClick={() => setPage("dashboard")}>Dashboard</li>
          <li onClick={() => setPage("predictor")}>Job Prediction</li>
          <li onClick={() => setPage("settings")}>Settings</li>
        </ul>
      </aside>

      {/* Main */}
      <div className="main-area">
        <div className="top-bar">
          <h3>{page.toUpperCase()}</h3>
          <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? "☀" : "🌙"}</button>
          <button onClick={logout}>Logout</button>
        </div>

        {/* Dashboard */}
        {page === "dashboard" && (
          <div>
            <h2>Last Predictions</h2>
            {prediction.map((p, i) => (
              <div key={i} className="prediction-bar">
                {p.role} – {p.acc}% <small>{p.company}</small>
              </div>
            ))}
          </div>
        )}

        {/* Job Prediction */}
        {page === "predictor" && (
          <>
            <h2>Rate Your Skills</h2>

            <div className="skills-grid">

              {[
                ["communication", "Communication Skills"],
                ["coding", "Coding"],
                ["problem", "Problem Solving"],
                ["network", "Networks & Cloud"]
              ].map(([key, label]) => (
                <div key={key} className="skill-card">
                  <h4>{label}</h4>

                  <label>
                    <input type="radio" checked={skills[key] === "advanced"} onChange={() => selectSkill(key, "advanced")} />
                    Advanced
                  </label>

                  <label>
                    <input type="radio" checked={skills[key] === "moderate"} onChange={() => selectSkill(key, "moderate")} />
                    Moderate
                  </label>

                  <label>
                    <input type="radio" checked={skills[key] === "average"} onChange={() => selectSkill(key, "average")} />
                    Average
                  </label>
                </div>
              ))}

            </div>

            <button onClick={predictJobs}>🚀 Predict Career</button>

            {prediction.map((p, i) => (
              <div key={i} className="prediction-bar">
                {p.role} – {p.acc}% <small>{p.company}</small>
              </div>
            ))}
          </>
        )}

        {/* Settings */}
        {page === "settings" && (
          <div>
            <p>{profile.email}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
