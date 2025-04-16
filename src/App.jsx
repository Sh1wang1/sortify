import React, { useEffect, useState } from "react";
import "./App.css";
import Visual from "./control/Visual";
import Control from "./control/Control";
import { bubbleSort } from "./algorithm/BubbleSort";
import { MergeSort } from "./algorithm/MergeSort";
import { selectionSort } from "./algorithm/SelectionSort";
import ContactSection from "./control/Contact";
import Color from "./control/Color";

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [showColor, setShowColor] = useState(false);
  const [array, setArray] = useState(() => {
    const savedArray = localStorage.getItem("array");
    return savedArray ? JSON.parse(savedArray) : [];
  });

  const [userInuptArray, setUserInuptArray] = useState(() => {
    return localStorage.getItem("userInputArray") || "";
  });

  const [speed, setSpeed] = useState(() => {
    return Number(localStorage.getItem("speed")) || 3000;
  });

  const [selectedSorting, setSelectedSorting] = useState(() => {
    return localStorage.getItem("selectedSorting") || "";
  });

  const [isSorting, setIsSorting] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    localStorage.setItem("array", JSON.stringify(array));
  }, [array]);

  useEffect(() => {
    localStorage.setItem("speed", speed);
  }, [speed]);

  useEffect(() => {
    localStorage.setItem("selectedSorting", selectedSorting);
  }, [selectedSorting]);

  useEffect(() => {
    localStorage.setItem("userInputArray", userInuptArray);
  }, [userInuptArray]);

  useEffect(() => {
    if (!userInuptArray.trim()) return;

    const userInput = userInuptArray.split(",");
    const filteredInput = userInput
      .filter((item) => !isNaN(item) && Number.isInteger(parseFloat(item)))
      .map((item) => Number(item) <= 400 && Number(item));
    setArray([...filteredInput]);
  }, [userInuptArray]);

  const handleNewArrayGenrate = () => {
    const newArray = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 400)
    );
    setArray(newArray);
  };

  const reSet = () => {
    setArray([]);
    setSelectedSorting("");
    setUserInuptArray("");
    setSpeed(3000);
    localStorage.removeItem("array");
    localStorage.removeItem("selectedSorting");
    localStorage.removeItem("userInputArray");
    localStorage.removeItem("speed");
  };

  const handleSorting = (e) => {
    const sortingMethod = e.target.value;
    setSelectedSorting(sortingMethod);
  };

  const handlePlay = () => {
    if (!selectedSorting || array.length === 0) return;
    setIsSorting(true);
    setShowColor(true);
    switch (selectedSorting) {
      case "bubbleSort": {
        const { animations, sorted } = bubbleSort(array);
        bubbleAnimation(animations, sorted);
        break;
      }
      case "selectionSort": {
        const { animations, sorted } = selectionSort(array);
        animateSelectionSorting(animations, sorted);
        break;
      }
      case "mergeSort": {
        const animations = MergeSort(array);
        animateMergeSorting(animations);
        break;
      }
      default:
        setIsSorting(false);
        break;
    }
  };

  const bubbleAnimation = (animation, sortedArray) => {
    const barEle = document.getElementsByClassName("bar");
    for (let i = 0; i < animation.length; i++) {
      let [barOneInd, bartwoInd, swap] = animation[i];
      let barOne = barEle[barOneInd];
      let barTwo = barEle[bartwoInd];
      setTimeout(() => {
        barOne.style.backgroundColor = swap ? "red" : "yellow";
        barTwo.style.backgroundColor = swap ? "red" : "yellow";
        if (swap) {
          const heightTemp = barOne.style.height;
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = heightTemp;
          const content = barOne.innerText;
          barOne.innerText = barTwo.innerText;
          barTwo.innerText = content;
        }
        setTimeout(() => {
          barOne.style.backgroundColor = "blue";
          barTwo.style.backgroundColor = "blue";
        }, speed);
      }, i * speed);
    }

    setTimeout(() => {
      for (let j = 0; j < barEle.length; j++) {
        setTimeout(() => {
          barEle[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
      setArray(sortedArray);
    }, animation.length * speed + speed); 
  };

  const animateMergeSorting = (animations) => {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = bars[barOneIdx];
        const barTwo = bars[barTwoIdx];
        const color = i % 3 === 0 ? "yellow" : "blue";
        setTimeout(() => {
          barOne.style.backgroundColor = color;
          barTwo.style.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOne = bars[barOneIdx];
          barOne.style.height = `${newHeight}px`;
          barOne.innerHTML = newHeight;
        }, i * speed);
      }
    }

    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animations.length * speed);
  };

  const animateSelectionSorting = (animations, sortedArray) => {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, swap] = animations[i];
      const barOne = bars[barOneIdx];
      const barTwo = bars[barTwoIdx];
      setTimeout(() => {
        barOne.style.backgroundColor = swap ? "red" : "yellow";
        barTwo.style.backgroundColor = swap ? "red" : "yellow";
        if (swap) {
          const tempHeight = barOne.style.height;
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = tempHeight;
          const tempContent = barOne.innerHTML;
          barOne.innerHTML = barTwo.innerHTML;
          barTwo.innerHTML = tempContent;
        }
        setTimeout(() => {
          barOne.style.backgroundColor = "blue";
          barTwo.style.backgroundColor = "blue";
        }, speed);
      }, i * speed);
    }

    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
      setArray(sortedArray);
    }, animations.length * speed);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="group">
          <span className="sort">Sort</span>
          <span className="ify">ify</span>
        </h2>

        <Control
          handleNewArrayGenrate={handleNewArrayGenrate}
          handleSorting={handleSorting}
          userInuptArray={userInuptArray}
          setUserInuptArray={setUserInuptArray}
          setSpeed={setSpeed}
          reSet={reSet}
          isSorting={isSorting}
          speed={speed}
          selectedSorting={selectedSorting}
        />
        
        <p className="footer" onClick={() => setShowContact(true)}>
          Get In Touch
        </p>
      </div>

      <div className="visualizer">
        <Visual array={array} />
        <button
          className="play-btn"
          onClick={handlePlay}
          disabled={!selectedSorting || isSorting}
        >
          PLAY
        </button>
      </div>
      {showColor && (
  <div className="legend-right">
    <button className="close-legend" onClick={() => setShowColor(false)}>×</button>
    <Color />
  </div>
)}

      {showContact && (
        <ContactSection
          isVisible={showContact}
          onClose={() => setShowContact(false)}
        />
      )}
    </div>
  );
}

export default App;
