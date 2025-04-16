import React from "react";
import "./Color.css"; // Make sure your CSS matches the updated class names

function Color() {
  return (
    <div className="legend-container">
      
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
  );
}

export default Color;
