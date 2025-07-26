import React from "react";
import "./control.css";

function Control({
  handleNewArrayGenrate,
  setSpeed,
  isSorting,
  handleSorting,
  userInuptArray,
  setUserInuptArray,
  reSet,
  selectedSorting,
  speed,
}) {
  return (
    <div className="container">
    <div className="wrapper">
  <div className="input-section">
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', position: 'relative' }}>
      <label htmlFor="array-input" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
        <span>Array Input</span>
        <span style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}>
          <i
            className="info-icon"
            tabIndex={0}
            onClick={e => {
              const tooltip = e.currentTarget.nextSibling;
              tooltip.style.visibility = tooltip.style.visibility === 'visible' ? 'hidden' : 'visible';
              tooltip.style.opacity = tooltip.style.opacity === '1' ? '0' : '1';
            }}
            onBlur={e => {
              const tooltip = e.currentTarget.nextSibling;
              tooltip.style.visibility = 'hidden';
              tooltip.style.opacity = '0';
            }}
            onMouseEnter={e => {
              const tooltip = e.currentTarget.nextSibling;
              tooltip.style.visibility = 'visible';
              tooltip.style.opacity = '1';
            }}
            onMouseLeave={e => {
              const tooltip = e.currentTarget.nextSibling;
              tooltip.style.visibility = 'hidden';
              tooltip.style.opacity = '0';
            }}
          >i</i>
          <span className="text" style={{ minWidth: 260 }}>
            Enter up to <b>15 integers </b>between <b>1 and 400</b>, separated by commas.<br/> Example: 64, 34, 25, 12.

          </span>
        </span>
      </label>
    </div>
    <input
      id="array-input"
      type="text"
      value={userInuptArray}
      onChange={(e) => setUserInuptArray(e.target.value)}
      className="neu-input"
      placeholder="Enter numbers separated by commas (e.g., 64,34,25,12,22,11,90)"
      disabled={isSorting}
    />
  </div>
</div>

      
      <div className="button-section">
        <button className="neu-button" onClick={handleNewArrayGenrate} disabled={isSorting}>
          Generate Random Array
        </button>
        <button className="neu-button" onClick={reSet} disabled={isSorting}>
          Reset Array
        </button>
      </div>
      
      <div className="select-wrap">
        <div className="child-wrap algo">
          <label htmlFor="algorithm">
             Choose Algorithm
            <select
              id="algorithm"
              className="neu-dropdown"
              value={selectedSorting}
              onChange={handleSorting}
              disabled={isSorting}
            >
              <option value="">Select Sorting Algorithm</option>
              <option value="bubbleSort">Bubble Sort</option>
              <option value="insertionSort">Insertion Sort</option>
              <option value="selectionSort">Selection Sort</option>
              <option value="mergeSort">Merge Sort</option>
            </select>
          </label>
        </div>
        <div className="child-wrap">
          <label htmlFor="speed" className="speed-label">
             Animation Speed
            <select
              id="speed"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="neu-dropdown" 
              disabled={isSorting}
            >
              <option value="">Select Animation Speed</option>
              <option value={3000}>🐌 Super Slow</option>
              <option value={2000}>🚶 Extra Slow</option>
              <option value={1000}>🚗 Slow</option>
              <option value={500}>🏃 Medium</option>
              <option value={200}>🚀 Fast</option>
              <option value={50}>⚡ Ultra Fast</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Control;
