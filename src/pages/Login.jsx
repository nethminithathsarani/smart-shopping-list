import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await API.post("/users/login", { email, password });
      const { id, name } = response.data;
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", name);
      navigate("/dashboard");
    } catch {   
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)" }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "18px", background: "rgba(255,255,255,0.95)" }}>
        <div className="text-center mb-4">
          <img src="/icon.png" alt="Logo" style={{ width: 56, height: 56, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
          <h2 className="mt-2 mb-1" style={{ fontWeight: 700, letterSpacing: 1 }}>Grocery Genie</h2>
          <span className="text-muted" style={{ fontSize: "1rem" }}>Sign in to your account</span>
        </div>
        {error && <p className="text-danger text-center mb-3">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: 8, boxShadow: "none" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: 8, boxShadow: "none" }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: 8, fontWeight: 600, letterSpacing: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>Login</button>
        </form>
        <p className="text-center mt-3 mb-0" style={{ fontSize: "0.98rem" }}>
          Don't have an account? <Link to="/register" className="text-decoration-none" style={{ color: "#6366f1", fontWeight: 500 }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
