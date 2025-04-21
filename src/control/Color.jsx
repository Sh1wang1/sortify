import React from "react";
import "./Color.css";

function Color({ isVisible, onClose }) {
  return (
    <div className={`color-section ${isVisible ? "show" : ""}`}>
      <span className="close-icon" onClick={onClose}>&times;</span>
    <div className="legend-container">
      <h3 className="visual">Visual Actions</h3>
      <ul className="legend-list">
        <li className="legend-item">
          <span className="legend-indicator red"></span>
          <span className="legend-label">Swapping</span>
        </li>
        <li className="legend-item">
          <span className="legend-indicator yellow"></span>
          <span className="legend-label">Comparing</span>
        </li>
        <li className="legend-item">
          <span className="legend-indicator blue"></span>
          <span className="legend-label">Idle</span>
        </li>
        <li className="legend-item">
          <span className="legend-indicator green"></span>
          <span className="legend-label">Sorted</span>
        </li>
      </ul>
    </div>
    </div>
  );
}

export default Color;
