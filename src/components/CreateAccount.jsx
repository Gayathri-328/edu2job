import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CreateAccount.css";

function CreateAccount() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/register", form);
       
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create account");
    }
  };

  // ✅ Google Sign-in handler
  const handleGoogleLogin = () => {
    // This will call your backend Google route
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="signup-container">
      {/* LEFT SIDE IMAGE */}
      <div className="left-panel">
        <div className="overlay-text">
          <h2>
            Education for a <br />
            Brighter <span>Edu2Job</span> Future
          </h2>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="right-panel">
        <div className="form-card">
          <h1>Create an account</h1>

          <p className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button className="submit-btn" type="submit">
              Create Account
            </button>
          </form>

          <div className="other-login">
            <p>Or register with</p>

            <div className="social-buttons">
              {/* ✅ Google login button */}
              <button
                type="button"
                className="google-btn"
                onClick={handleGoogleLogin}
              >
                Continue with Google
              </button>

              {/* Apple button (dummy / disabled for now) */}
              <button
                type="button"
                className="apple-btn"
                disabled
              >
                Apple 
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
