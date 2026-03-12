import React from "react";

const Footer = () => (
  <footer
    className="bg-light border-top w-100"
    style={{
      width: "100%",
      left: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem"
    }}
  >
    <div className="container-fluid px-4" style={{ maxWidth: "1400px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h5 className="mb-2" style={{ fontSize: "1.1rem" }}>Contact Details</h5>
          <ul className="list-unstyled mb-0" style={{ fontSize: "0.95rem" }}>
            <li><strong>Email:</strong> support@smartshoppinglist.com</li>
            <li><strong>Phone:</strong> +1 (555) 123-4567</li>
            <li><strong>Address:</strong> 123 Main Street, City, Country</li>
            <li><strong>Customer Service:</strong> +1 (555) 222-3333</li>
          </ul>
          <div className="mt-2">
            <a href="https://facebook.com/grocerygenie" target="_blank" rel="noopener noreferrer" style={{ marginRight: "12px", color: "#4267B2", fontSize: "1.3rem" }}>
              <i className="fab fa-facebook-square" aria-label="Facebook"></i>
            </a>
            <a href="https://instagram.com/grocerygenie" target="_blank" rel="noopener noreferrer" style={{ color: "#E1306C", fontSize: "1.3rem" }}>
              <i className="fab fa-instagram" aria-label="Instagram"></i>
            </a>
          </div>
          <hr style={{ margin: "0.5rem 0" }} />
          <p className="mb-0" style={{ fontSize: "0.9rem" }}>For any inquiries or feedback, feel free to reach out to us!</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;