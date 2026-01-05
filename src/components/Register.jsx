// ✅ All imports at the top
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../axios";
// // import "./Register.css";

// export default function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/register", form);
//       alert("Registered successfully!");
//       navigate("/");
//     } catch (error) {
//       alert(error?.response?.data?.message || "Registration failed");
//     }
//   };

//   // Google signup callback
//   const handleGoogleResponse = async (resp) => {
//     try {
//       const res = await axios.post("/auth/google-login", {
//         token: resp.credential,
//       });
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch {
//       alert("Google signup failed");
//     }
//   };

//   useEffect(() => {
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//         callback: handleGoogleResponse,
//       });
//       window.google.accounts.id.renderButton(
//         document.getElementById("googleSignup"),
//         { theme: "outline", size: "large" }
//       );
//     }
//   }, []);

//   return (
//     <div className="register-page">
//       <div className="form-container">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleRegister}>
//           <input
//             placeholder="Name"
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <input
//             placeholder="Email"
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//           <button type="submit">Sign Up</button>
//         </form>

//         {/* Google Sign-Up button */}
//         <div id="googleSignup" className="google-container"></div>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../axios";
// import { useNavigate } from "react-router-dom";


// function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     try {
//       const res = await axios.post("/register", form);

//       if (res.data?.message === "Account created successfully!") {
//         navigate("/login"); // redirect to login after signup
//       } else {
//         setErrorMsg(res.data?.message || "Registration failed");
//       }
//     } catch (error) {
//       console.error("Register error:", error);
//       setErrorMsg("Something went wrong, please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Create Account</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label><br />
//           <input
//             type="text"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />
//         </div>

//         <div>
//           <label>Email:</label><br />
//           <input
//             type="email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//           />
//         </div>

//         <div>
//           <label>Password:</label><br />
//           <input
//             type="password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//           />
//         </div>

//         <button type="submit">Sign Up</button>

//         {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Register;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios";   // ✅ axios instance

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("/register", form); // ✅ correct route

      if (res.data?.message === "Account created successfully!") {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        setErrorMsg(res.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register error:", error);
      setErrorMsg(
        error.response?.data?.message || "Server not reachable"
      );
    }
  };

  return (
    <div>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br />
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Password</label><br />
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />
        </div>

        <button type="submit">Sign Up</button>

        {errorMsg && (
          <p style={{ color: "red" }}>{errorMsg}</p>
        )}

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
