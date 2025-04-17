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
        <input
          type="text"
          value={userInuptArray}
          onChange={(e) => setUserInuptArray(e.target.value)}
          className="neu-input"
          placeholder="Enter your Array between 1-400"
        />
        <div className="info-wrap">
          <i className="info-icon">i</i>
          <span className="text">
            Provide your array by comma separated integer
          </span>
        </div>
      </div>
      <button className="neu-button" onClick={handleNewArrayGenrate}>
        Generate New Array
      </button>
      <button className="neu-button" onClick={reSet}>
        Reset
      </button>
      <div className="select-wrap">
        
          <div className="child-wrap">
            <label htmlFor="algorithm">
              Algorithum:
              <select
                id="algorithm"
                className="neu-dropdown"
                value={selectedSorting}
                onChange={handleSorting}
              >
                <option value="">Select Sorting</option>
                <option value="bubbleSort">Bubble Sort</option>
                <option value="mergeSort">Merge Sort</option>
                <option value="selectionSort">Selection Sort</option>
              </select>
            </label>
          </div>
          <div className="child-wrap">
            <label htmlFor="speed">
              Speed:
              <select
              value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="neu-dropdown"
              > <option value=''>Select Speed</option>
                <option value={3000}>Super Slow</option>
                <option value={2000}>Extra Slow</option>
                <option value={1000}>Slow</option>
                <option value={500}>Medium</option>
                <option value={200}>Fast</option>
                <option value={50}>Ultra Fast</option>
              </select>
            </label>
          </div>
        </div>
   
    </div>
  );
}

export default Control;
