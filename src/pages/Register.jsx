import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await API.post("/users/signup", { name, email, password });
      const { id, name: userName } = response.data;

      
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", userName);

     
      navigate("/dashboard");
    } catch {
      setError("Signup failed. Email may already be in use.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-4" style={{ maxWidth: "400px", borderRadius: "12px" }}>
        <h2 className="text-center mb-4">Register</h2>
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
