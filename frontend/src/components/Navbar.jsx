import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Create separate styles for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div><strong>M-SHIGANA</strong></div>
      <div className="nav-links">
        {[
          { label: "HOME", path: "/" },
          { label: "ABOUT", path: "/about" },
          { label: "PAGES", path: "/pages" },
          { label: "FEATURES", path: "/features" },
          { label: "BLOG", path: "/blog" },
        ].map((link) => (
          <Link key={link.label} to={link.path} className="nav-button">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;