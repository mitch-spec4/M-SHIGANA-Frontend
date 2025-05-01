import React from "react";
import "../styles/Navbar.css"; // Create separate styles for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div><strong>M-SHIGANA</strong></div>
      <div className="nav-links">
        {["HOME", "ABOUT", "PAGES", "FEATURES", "BLOG"].map((link) => (
          <a key={link} href="#">{link}</a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;