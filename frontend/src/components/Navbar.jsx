import React from "react";
import "../styles/Navbar.css"; // Create separate styles for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div><strong>M-SHIGANA</strong></div>
      <div className="nav-links">
        {[
          { label: "HOME", onClick: () => console.log("Home clicked") },
          { label: "ABOUT", onClick: () => console.log("About clicked") },
          { label: "PAGES", onClick: () => console.log("Pages clicked") },
          { label: "FEATURES", onClick: () => console.log("Features clicked") },
          { label: "BLOG", onClick: () => console.log("Blog clicked") },
        ].map((link) => (
          <button key={link.label} onClick={link.onClick} className="nav-button">
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;