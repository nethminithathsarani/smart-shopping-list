import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("userName");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-2">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between w-100">
          
          <span className="navbar-brand d-flex align-items-center gap-2 me-auto" style={{ minWidth: "220px", cursor: "pointer" }}>
            <img
              src="/transparency.png"
              alt="Website Logo"
              style={{ width: "48px", height: "48px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            />
            <span className="d-flex flex-column align-items-start" style={{ lineHeight: 1.1 }}>
              <span style={{
                fontWeight: "bold",
                fontSize: "2rem",
                color: "#fff",
                letterSpacing: "2px",
                marginBottom: "0.15em",
                fontFamily: "'Pacifico', cursive"
              }}>Grocery Genie</span>
              <span style={{
                fontSize: "0.85rem",
                color: "#b0b8c1",
                fontWeight: 500,
                fontFamily: "'Roboto', sans-serif",
                letterSpacing: "1px"
              }}>Smart Shopping List</span>
            </span>
          </span>

          
          <button
            className="navbar-toggler ms-2"
            type="button"
            aria-label="Toggle navigation"
            onClick={handleToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse${menuOpen ? " show" : ""}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
             
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" style={{ transition: "color 0.2s" }}>
                  Home
                </Link>
              </li>
             
              <li className="nav-item">
                <Link className="nav-link" to="/items" style={{ transition: "color 0.2s" }}>
                  Shopping Items
                </Link>
              </li>
              {username ? (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light ms-lg-2 mt-2 mt-lg-0"
                      style={{ borderRadius: "20px", fontWeight: "500", transition: "background 0.2s, color 0.2s" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" style={{ transition: "color 0.2s" }}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register" style={{ transition: "color 0.2s" }}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        .navbar-nav .nav-link:hover, .navbar-nav .nav-link:focus {
          color: #ffc107 !important;
        }
        .btn-outline-light:hover, .btn-outline-light:focus {
          background: #ffc107 !important;
          color: #212529 !important;
          border-color: #ffc107 !important;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
