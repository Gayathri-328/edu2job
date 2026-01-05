// import { useNavigate } from "react-router-dom";
// import axios from "../axios";


// export default function Login() {
//   const navigate = useNavigate();

//   return (
//     <div className="form-container">
//       <h2>Login Page</h2>
//       <button onClick={() => navigate("/dashboard")}>Login</button>
//     </div>
//   );
// }
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../axios";

// export default function Login() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // Send form data to backend
//       const res = await axios.post("/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch (err: any) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Login Page</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           placeholder="Name"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../axios";
// import "./Login.css";
// // navigate("/dashboard");

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="form-container">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             placeholder="Email"
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             minLength={8}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//           <button type="submit">Login</button>
//         </form>

//         {/* Link to signup page */}
//         <p style={{ marginTop: "15px" }}>
//           Don’t have an account? <Link to="/create-account">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// Login.tsx

// import axios from "../axios";
// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";   // ✅ Connect CSS

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) navigate("/dashboard");
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = axios.post("http://localhost:5000/api/auth/login", {
//   email,
//   password,
// });


//       // ✅ Save JWT token
//       localStorage.setItem("token", res.data.token);

//       alert("Login successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       alert(error.response?.data?.message || "Invalid email or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h1>Login</h1>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit">Login</button>
//         </form>

//         <p>
//           Don’t have an account?{" "}
//           <Link to="/signup">Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   // If already logged in, go to dashboard
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) navigate("/dashboard");
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // ✅ FIX: await is REQUIRED
//       const res = await axios.post(
//         "http://localhost:5000/login",
//         {
//           email,
//           password,
//         }
//       );

//       // ✅ Save JWT token
//       localStorage.setItem("token", res.data.token);

//       alert("Login successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       alert(error.response?.data?.message || "Invalid email or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h1>Login</h1>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit">Login</button>
//         </form>

//         <p>
//           Don’t have an account?{" "}
//           <Link to="/signup">Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔁 Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  // 🔐 LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );

      // ✅ Save JWT & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      alert("Login successful!");

      // ✅ Redirect by role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

 
