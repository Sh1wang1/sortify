import React from "react";
import "./Contact.css";

const ContactSection = ({ isVisible, onClose }) => {
  return (
    <div className={`contact-section ${isVisible ? "show" : ""}`}>
      <span className="close-icon" onClick={onClose}>&times;</span>
      <h2>Feel free to reach out!</h2>
      <div className="social-icons">
        <a
          href="mailto:shiwangiverma2003@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-envelope"></i>
        </a>
        <a
          href="https://github.com/sh1wang1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/shiwangi-verma-97b1582a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
