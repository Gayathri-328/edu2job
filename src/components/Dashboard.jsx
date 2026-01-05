// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Dashboard.css";

// // Milestone-4 charts (only added)
// import EducationBar from "./EducationBar";
// import JobPredictionPie from "./JobPredictionPie";


// function Dashboard() {
//   const [page, setPage] = useState("dashboard");
//   const [darkMode, setDarkMode] = useState(false);
//   const [prediction, setPrediction] = useState([]);
//   const [resume, setResume] = useState(null);

//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     branch: "",
//     cgpa: "",
//     university: "",
//     graduationYear: "",
//     projects: "",
//     courses: "",
//     internships: "",
//     codingLevel: "",
//     certifications: "",
//   });

//   const [skills, setSkills] = useState({
//     aptitude: 5,
//     reasoning: 5,
//     networking: 5,
//     cybersecurity: 5,
//     marketing: 5,
//     coding: 5,
//     cloud: 5,
//     ml: 5,
//   });

//   // ================= LOAD USER PROFILE =================
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/dashboard", {
//         headers: { Authorization: token },
//       })
//       .then((res) => setProfile(res.data))
//       .catch((err) => console.log("Profile load failed", err));
//   }, []);

//   // ================= LOAD LAST PREDICTIONS =================
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/api/predictions/last", {
//         headers: { Authorization: token },
//       })
//       .then((res) => setPrediction(res.data || []))
//       .catch((err) => console.log("Prediction load failed", err));
//   }, []);

//   // ================= HANDLERS =================
//   const handleChange = (e) =>
//     setProfile({ ...profile, [e.target.name]: e.target.value });

//   const handleSkillChange = (e) =>
//     setSkills({ ...skills, [e.target.name]: Number(e.target.value) });

//   // ================= SAVE EDUCATION =================
//   const saveEducation = async () => {
//     const token = localStorage.getItem("token");
//     await axios.post("http://localhost:5000/update", profile, {
//       headers: { Authorization: token },
//     });
//     alert("Education details saved");
//     setPage("dashboard");
//   };

//   /* ================= JOB PREDICTION ================= */
//   const predictJobs = async () => {
//     let jobs = [];

//     if (skills.ml > 5)
//       jobs.push({ role: "Data Scientist", acc: 60 + skills.ml * 4, company: "Amazon, Deloitte" });

//     if (skills.coding > 5)
//       jobs.push({ role: "Software Engineer", acc: 55 + skills.coding * 4, company: "Google, Infosys" });

//     if (skills.cloud > 5)
//       jobs.push({ role: "Cloud Engineer", acc: 50 + skills.cloud * 4, company: "AWS, Microsoft" });

//     if (skills.cybersecurity > 5)
//       jobs.push({ role: "Cyber Security Analyst", acc: 55 + skills.cybersecurity * 4, company: "IBM, Cisco" });

//     if (skills.networking > 5)
//       jobs.push({ role: "Network Engineer", acc: 50 + skills.networking * 4, company: "HCL, Tech Mahindra" });

//     if (skills.marketing > 5)
//       jobs.push({ role: "Digital Marketer", acc: 50 + skills.marketing * 4, company: "Flipkart, Zoho" });

//     if (skills.aptitude > 6 && skills.reasoning > 6)
//       jobs.push({
//         role: "Business Analyst",
//         acc: 55 + (skills.aptitude + skills.reasoning) * 3,
//         company: "EY, Accenture",
//       });

//     setPrediction(jobs);

//     const token = localStorage.getItem("token");
//     await axios.post("http://localhost:5000/api/predictions", jobs, {
//       headers: { Authorization: token },
//     });

//     const res = await axios.get("http://localhost:5000/api/predictions/last", {
//       headers: { Authorization: token },
//     });
//     setPrediction(res.data || []);
//   };

//   // ================= LOGOUT =================
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <div className={`dashboard-layout ${darkMode ? "dark-mode" : ""}`}>
//       {/* SIDEBAR */}
//       <aside className="sidebar">
//         <h2 className="sidebar-logo">🎓 Edu2Job</h2>
//         <ul className="sidebar-menu">
//           <li className={page === "dashboard" ? "active" : ""} onClick={() => setPage("dashboard")}>Dashboard</li>
//           <li className={page === "education" ? "active" : ""} onClick={() => setPage("education")}>Education</li>
//           <li className={page === "predictor" ? "active" : ""} onClick={() => setPage("predictor")}>Job Prediction</li>
//             <li className={page === "insights" ? "active" : ""} onClick={() => setPage("insights")}>
//             Career Insights
//           </li>
//           <li className={page === "settings" ? "active" : ""} onClick={() => setPage("settings")}>Settings</li>
//         </ul>
//       </aside>

//       {/* MAIN */}
//       <div className="main-area">
//         <div className="top-bar">
//           <h3>{page.toUpperCase()}</h3>
//           <div className="marquee-text">
//             🌟 Welcome to <b>Edu2Job</b>, {profile.name || "User"} 🚀
//           </div>
//           <div>
//             <button onClick={() => setDarkMode(!darkMode)}>
//               {darkMode ? "☀" : "🌙"}
//             </button>
//             <button onClick={logout}>Logout</button>
//           </div>
//         </div>

//         {/* ================= DASHBOARD ================= */}
//         {page === "dashboard" && (
//           <div className="dashboard-full">
//             <div className="dashboard-cards">
//               <div className="stat-box">
//                 <h3>Placement Chance</h3>
                
//                 <h1>{profile.cgpa >= 8 ? "85%" : "65%"}</h1>
//               </div>

//               <div className="profile-box">
//                 <h3>Education Overview</h3>
//                 <p>Branch: {profile.branch}</p>
//                 <p>University: {profile.university}</p>
//                 <p>CGPA: {profile.cgpa}</p>
//                 <p>Projects: {profile.projects}</p>
//               </div>

//               <div className="job-box">
//                 <h3>Suggested Companies</h3>
//                 {prediction.map((p, i) => (
//                   <p key={i}>🏢 {p.company}</p>
//                 ))}
//               </div>
//             </div>

//             <div className="last-prediction-section">
//               <h2>Last Predictions</h2>
//               {prediction.map((p, i) => (
//                 <div key={i} className="last-prediction-card">
//                   {p.role} – {p.acc}%
//                 </div>
//               ))}
//             </div>

//             🔥 Milestone-4 Charts (ONLY ADDITION)
//             <div style={{ marginTop: "40px" }}>
//               <h2>Career Insights</h2>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
//                 <EducationBar />
//                 <JobPredictionPie />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= EDUCATION ================= */}
//         {page === "education" && (
//           <div className="education-grid">
//             <input name="branch" value={profile.branch} onChange={handleChange} />
//             <input name="cgpa" value={profile.cgpa} onChange={handleChange} />
//             <button onClick={saveEducation}>Save</button>
//           </div>
//         )}

//         {/* ================= JOB PREDICTOR ================= */}
//         {page === "predictor" && (
//           <div className="job-predictor">
//             {Object.keys(skills).map((s) => (
//               <input key={s} type="range" min="0" max="10" name={s} value={skills[s]} onChange={handleSkillChange} />
//             ))}
//             <button onClick={predictJobs}>Predict Career</button>
//           </div>
//         )}
//           {/* ================= CAREER INSIGHTS (NEW) ================= */}
//         {page === "insights" && (
//           <>
//             <h2>Career Insights</h2>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
//               <EducationBar />
//               <JobPredictionPie />
//             </div>
//           </>
//         )}
//         {/* ================= SETTINGS (RESTORED ✅) ================= */}
//         {page === "settings" && (
//           <div className="page-box">
//             <h1>Settings</h1>
//             <p>Email: {profile.email}</p>
//             <button className="logout-btn" onClick={logout}>Logout</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Dashboard.css";

// // Milestone-4 charts
// import EducationBar from "./EducationBar";
// import JobPredictionPie from "./JobPredictionPie";

// function Dashboard() {
//   const [page, setPage] = useState("dashboard");
//   const [darkMode, setDarkMode] = useState(false);
//   const [prediction, setPrediction] = useState([]);

//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     branch: "",
//     cgpa: "",
//     university: "",
//     graduationYear: "",
//     projects: "",
//     courses: "",
//     internships: "",
//     certifications: "",
//   });

//   const [skills, setSkills] = useState({
//     aptitude: 5,
//     reasoning: 5,
//     networking: 5,
//     cybersecurity: 5,
//     marketing: 5,
//     coding: 5,
//     cloud: 5,
//     ml: 5,
//   });

//   /* ================= LOAD PROFILE ================= */
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/dashboard", {
//         headers: { Authorization: token },
//       })
//       .then((res) => setProfile(res.data))
//       .catch(() => {});
//   }, []);

//   /* ================= LOAD PREDICTIONS ================= */
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/api/predictions/last", {
//         headers: { Authorization: token },
//       })
//       .then((res) => setPrediction(res.data || []))
//       .catch(() => {});
//   }, []);

//   const handleChange = (e) =>
//     setProfile({ ...profile, [e.target.name]: e.target.value });

//   const handleSkillChange = (e) =>
//     setSkills({ ...skills, [e.target.name]: Number(e.target.value) });

//   const saveEducation = async () => {
//     const token = localStorage.getItem("token");
//     await axios.post("http://localhost:5000/update", profile, {
//       headers: { Authorization: token },
//     });
//     alert("Education saved");
//     setPage("dashboard");
//   };

//   const predictJobs = async () => {
//     let jobs = [];

//     if (skills.coding > 5)
//       jobs.push({ role: "Software Engineer", acc: 70 });

//     if (skills.cloud > 5)
//       jobs.push({ role: "Cloud Engineer", acc: 75 });

//     if (skills.cybersecurity > 5)
//       jobs.push({ role: "Cyber Security Analyst", acc: 80 });

//     setPrediction(jobs);

//     const token = localStorage.getItem("token");
//     await axios.post("http://localhost:5000/api/predictions", jobs, {
//       headers: { Authorization: token },
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <div className={`dashboard-layout ${darkMode ? "dark-mode" : ""}`}>
//       {/* ================= SIDEBAR ================= */}
//       <aside className="sidebar">
//         <h2 className="sidebar-logo">🎓 Edu2Job</h2>
//         <ul className="sidebar-menu">
//           <li className={page === "dashboard" ? "active" : ""} onClick={() => setPage("dashboard")}>Dashboard</li>
//           <li className={page === "education" ? "active" : ""} onClick={() => setPage("education")}>Education</li>
//           <li className={page === "predictor" ? "active" : ""} onClick={() => setPage("predictor")}>Job Prediction</li>

//           {/* ✅ NEW MENU ITEM */}
//           <li className={page === "insights" ? "active" : ""} onClick={() => setPage("insights")}>
//             Career Insights
//           </li>

//           <li className={page === "settings" ? "active" : ""} onClick={() => setPage("settings")}>Settings</li>
//         </ul>
//       </aside>

//       {/* ================= MAIN ================= */}
//       <div className="main-area">
//         <div className="top-bar">
//           <h3>{page.toUpperCase()}</h3>
//           <div>🌟 Welcome to Edu2Job, {profile.name || "User"}</div>
//           <div>
//             <button onClick={() => setDarkMode(!darkMode)}>
//               {darkMode ? "☀" : "🌙"}
//             </button>
//             <button onClick={logout}>Logout</button>
//           </div>
//         </div>

//         {/* ================= DASHBOARD ================= */}
        
//         {page === "dashboard" && (
//           <>
//             <h2>Last Predictions</h2>
//             {prediction.map((p, i) => (
//               <div key={i} className="last-prediction-card">
//                 {p.role} – {p.acc}%
//               </div>
//             ))}
//           </>
//         )}

//         {/* ================= EDUCATION ================= */}
//         {page === "education" && (
//           <div className="education-grid">
//             <input name="name" placeholder="name" value={profile.name} onChange={handleChange} />
//             <input name="University" placeholder="University" value={profile.university} onChange={handleChange} />
//             <input name="branch" placeholder="Branch" value={profile.branch} onChange={handleChange} />
//             <input name="cgpa" placeholder="CGPA" value={profile.cgpa} onChange={handleChange} />
//             <input name="Projects" placeholder="projects" value={profile.projects} onChange={handleChange} />
//             <button onClick={saveEducation}>Save</button>
//           </div>
//         )}

//         {/* ================= JOB PREDICTOR ================= */}
//         {page === "predictor" && (
//           <div className="job-predictor">
//             {Object.keys(skills).map((s) => (
//               <input
//                 key={s}
//                 type="range"
//                 min="0"
//                 max="10"
//                 name={s}
//                 value={skills[s]}
//                 onChange={handleSkillChange}
//               />
//             ))}
//             <button onClick={predictJobs}>Predict Career</button>
//           </div>
//         )}

//         {/* ================= CAREER INSIGHTS (NEW) ================= */}
//         {page === "insights" && (
//           <>
//             <h2>Career Insights</h2>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
//               <EducationBar />
//               <JobPredictionPie />
//             </div>
//           </>
//         )}

//         {/* ================= SETTINGS ================= */}
//         {page === "settings" && (
//           <div>
//             <p>Email: {profile.email}</p>
//             <button onClick={logout}>Logout</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
 import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import Review from "./review";


// Milestone-4 charts
import EducationBar from "./EducationBar";
import JobPredictionPie from "./JobPredictionPie";

function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [prediction, setPrediction] = useState([]);
  const [resume, setResume] = useState(null);
  // ✅ Review state
const [review, setReview] = useState("");
const [stars, setStars] = useState(0);
const [submitted, setSubmitted] = useState(false);


  const [profile, setProfile] = useState({
    name: "",
    email: "",
    branch: "",
    cgpa: "",
    university: "",
    graduationYear: "",
    projects: "",
    courses: "",
    internships: "",
    codingLevel: "",
    certifications: "",
  });

  const [skills, setSkills] = useState({
    aptitude: 5,
    reasoning: 5,
    networking: 5,
    cybersecurity: 5,
    marketing: 5,
    coding: 5,
    cloud: 5,
    ml: 5,
  });

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/dashboard", {
        headers: { Authorization: token },
      })
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, []);

  /* ================= LOAD LAST PREDICTIONS ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/predictions/last", {
        headers: { Authorization: token },
      })
      .then((res) => setPrediction(res.data || []))
      .catch(() => {});
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSkillChange = (e) =>
    setSkills({ ...skills, [e.target.name]: Number(e.target.value) });

  /* ================= SAVE EDUCATION ================= */
  const saveEducation = async () => {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/update", profile, {
      headers: { Authorization: token },
    });
    alert("Education details saved");
    setPage("dashboard");
  };

  /* ================= JOB PREDICTION ================= */
  const predictJobs = async () => {
    let jobs = [];

    if (skills.ml > 5)
      jobs.push({ role: "Data Scientist", acc: 60 + skills.ml * 4, company: "Amazon, Deloitte" });

    if (skills.coding > 5)
      jobs.push({ role: "Software Engineer", acc: 55 + skills.coding * 4, company: "Google, Infosys" });

    if (skills.cloud > 5)
      jobs.push({ role: "Cloud Engineer", acc: 50 + skills.cloud * 4, company: "AWS, Microsoft" });

    if (skills.cybersecurity > 5)
      jobs.push({ role: "Cyber Security Analyst", acc: 55 + skills.cybersecurity * 4, company: "IBM, Cisco" });

    if (skills.networking > 5)
      jobs.push({ role: "Network Engineer", acc: 50 + skills.networking * 4, company: "HCL, Tech Mahindra" });

    if (skills.marketing > 5)
      jobs.push({ role: "Digital Marketer", acc: 50 + skills.marketing * 4, company: "Flipkart, Zoho" });

    if (skills.aptitude > 6 && skills.reasoning > 6)
      jobs.push({
        role: "Business Analyst",
        acc: 55 + (skills.aptitude + skills.reasoning) * 3,
        company: "EY, Accenture",
      });

    setPrediction(jobs);

    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/predictions", jobs, {
      headers: { Authorization: token },
    });
  };

  /* ================= RESUME UPLOAD ================= */
  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
    alert("Resume uploaded successfully");
  };
  const handleReview = (type) => {
  setReview(type);
  setSubmitted(true);

  if (type === "excellent") setStars(5);
  else if (type === "good") setStars(4);
  else if (type === "bad") setStars(2);
  else if (type === "verybad") setStars(1);
};


  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className={`dashboard-layout ${darkMode ? "dark-mode" : ""}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">🎓 Edu2Job</h2>
        <ul className="sidebar-menu">
          <li onClick={() => setPage("dashboard")}>Dashboard</li>
          <li onClick={() => setPage("education")}>Education</li>
          <li onClick={() => setPage("predictor")}>Job Prediction</li>
          <li onClick={() => setPage("insights")}>Career Insights</li>
          <li onClick={() => setPage("settings")}>Settings</li>
        </ul>
      </aside>

      {/* MAIN */}
      <div className="main-area">
        <div className="top-bar">
          <h3>{page.toUpperCase()}</h3>
          <div>🌟 Welcome to Edu2Job, {profile.name || "User"} 🚀</div>
          <div>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀" : "🌙"}
            </button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        {/* DASHBOARD */}
        
 
     {page === "dashboard" && (
          <div className="dashboard-full">
            <div className="dashboard-cards">
              <div className="stat-box">
                <h3>Placement Chance</h3>
                <h1>{profile.cgpa >= 8 ? "85%" : "65%"}</h1>
              </div>

              <div className="profile-box">
                <h3>Education Overview</h3>
                <p>Branch: {profile.branch}</p>
                <p>University: {profile.university}</p>
                <p>CGPA: {profile.cgpa}</p>
              </div>

              <div className="job-box">
                <h3>Suggested Companies</h3>
                {prediction.map((p, i) => (
                  <p key={i}>🏢 {p.company}</p>
                ))}
              </div>
            </div>

            <div className="last-prediction-section">
              <h2>Last Predictions</h2>
              {prediction.map((p, i) => (
                <div key={i} className="last-prediction-card">
                  {p.role} – {p.acc}%
                </div>
              ))}
            </div>
          </div>
        )}     
        {/* {page === "dashboard" && (
          <>
          <div className="dashboard-full">
//             <div className="dashboard-cards">
//               <div className="stat-box">
//                 <h3>Placement Chance</h3>
                
//                 <h1>{profile.cgpa >= 8 ? "85%" : "65%"}</h1>
//               </div>

//               <div className="profile-box">
//                 <h3>Education Overview</h3>
//                 <p>Branch: {profile.branch}</p>
//                 <p>University: {profile.university}</p>
//                 <p>CGPA: {profile.cgpa}</p>
//                 <p>Projects: {profile.projects}</p>
//               </div>

//               <div className="job-box">
//                 <h3>Suggested Companies</h3>
//                 {prediction.map((p, i) => (
                  <p key={i}>🏢 {p.company}</p>
                ))}
              </div>
            </div>
            <h2>Last Predictions</h2>
            {prediction.map((p, i) => (
              <div key={i} className="last-prediction-card">
                {p.role} – {p.acc}%
              </div>
            ))}
          </>
        )} */}

                {/* EDUCATION */}
        {page === "education" && (
          <div className="education-grid">
            <div className="education-card">
              <h2>Academic Background</h2>
              <input name="branch" placeholder="Branch" value={profile.branch} onChange={handleChange} />
              <input name="cgpa" placeholder="CGPA (0-10)" value={profile.cgpa} onChange={handleChange} />
              <input name="university" placeholder="University" value={profile.university} onChange={handleChange} />
              <input name="graduationYear" placeholder="Graduation Year" value={profile.graduationYear} onChange={handleChange} />
              <input name="projects" placeholder="Projects Completed" value={profile.projects} onChange={handleChange} />
              <input name="courses" placeholder="Courses Completed" value={profile.courses} onChange={handleChange} />
              <input name="internships" placeholder="Internships" value={profile.internships} onChange={handleChange} />
              <input name="codingLevel" placeholder="Coding Skill Level" value={profile.codingLevel} onChange={handleChange} />
              <button className="save-btn" onClick={saveEducation}>💾 Save Education</button>
            </div>
          </div>
          
        )}

        {/* JOB PREDICTOR */}
        {page === "predictor" && (
          <div className="job-predictor">
            {/* ✅ Resume Upload */}
            <div style={{ marginTop: "20px" }}>
              <label>Upload Resume (PDF)</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
            </div>
            {Object.entries(skills).map(([skill, value]) => (
              <div key={skill} className="skill-row">
                <label>{skill.toUpperCase()}</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  name={skill}
                  value={value}
                  onChange={handleSkillChange}
                />
                <span>{value}</span>
              </div>
            ))}

             

            <button onClick={predictJobs}>Predict Career</button>
          </div>
        )}

        {/* CAREER INSIGHTS */}
        {page === "insights" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            <EducationBar />
            <JobPredictionPie />
          </div>
        )}

       {page === "settings" && (
  <div className="page-box">
    <h2>Account Settings</h2>
    <p><b>Email:</b> {profile.email}</p>

    {/* ✅ REVIEW COMPONENT */}
    <Review />

    <button className="logout-btn" onClick={logout}>
      Logout
    </button>
  </div>
)}


      </div>
    </div>
  );
}

export default Dashboard;
