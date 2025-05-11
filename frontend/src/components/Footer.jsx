import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-content">
          <h2 className="footer-title">Empowering Secure & Inclusive Transfers</h2>
          <p className="footer-text">
            Our mission is to make money transfers more affordable, accessible, and secure for everyone—
            especially the unbanked, underbanked, and underserved communities across the globe.
          </p>
          <div className="footer-links">
            <Link to="/About">About Us</Link>
            <Link to="/Features">Features</Link>
            <Link to="/Contact">Contact</Link>
            <Link to="/Privacy">Privacy Policy</Link>
          </div>
          <p className="footer-copy">&copy; {new Date().getFullYear()} Shigana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
