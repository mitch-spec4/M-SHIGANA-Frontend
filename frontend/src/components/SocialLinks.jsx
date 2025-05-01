import React from "react";
import "../styles/SocialLinks.css"; // 

const SocialLinks = () => {
  return (
    <footer className="footer">
      <div className="social">
        <p><i className="fab fa-instagram"></i> INSTAGRAM 
           <i className="fab fa-twitter"></i> TWITTER
           <i className="fab fa-facebook"></i> FACEBOOK</p>
      </div>
    </footer>
  );
};

export default SocialLinks;