import React, { useEffect, useState } from "react";
import "./App.css";
import Visual from "./control/Visual";
import Control from "./control/Control";
import { bubbleSort } from "./algorithm/BubbleSort";
import { MergeSort } from "./algorithm/MergeSort";
import { selectionSort } from "./algorithm/SelectionSort";
import { insertionSort } from "./algorithm/InsertionSort";
import ContactSection from "./control/Contact";
import Color from "./control/Color";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
    return Number(localStorage.getItem("speed")) || "";
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
    if (!userInuptArray.trim()) {
      setArray([]);
      return;
    }
    const userInput = userInuptArray.split(",");
    const filteredInput = userInput
      .map((item) => Number(item))
      .filter((num) => Number.isInteger(num) && num >= 1 && num <= 400);
    setArray([...filteredInput]);
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#5fb8fd";
    }
  }, [userInuptArray]);

  const handleNewArrayGenrate = () => {
    const newArray = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 400)
    );
    setArray(newArray);
    setUserInuptArray(newArray.join(","));
    setTimeout(() => {
      const bars = document.getElementsByClassName("bar");
      for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "#5fb8fd";
      }
    }, 0);
  };

  const reSet = () => {
    setArray([]);
    setSelectedSorting("");
    setUserInuptArray("");
    setSpeed("");
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
      case "insertionSort": {
        const { animations, sorted } = insertionSort(array);
        animateInsertionSorting(animations, sorted);
        break;
      }
      default:
        setIsSorting(false);
        break;
    }
  };
  const bubbleAnimation = (animations, sortedArray) => {
    const barEle = document.getElementsByClassName("bar");

    for (let j = 0; j < barEle.length; j++) {
      barEle[j].style.backgroundColor = "#5fb8fd";
    }

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      setTimeout(() => {
        if (animation.type === "compare") {
          const [barOneInd, barTwoInd] = animation.indices;
          const barOne = barEle[barOneInd];
          const barTwo = barEle[barTwoInd];

          barOne.style.backgroundColor = animation.swap ? "red" : "yellow";
          barTwo.style.backgroundColor = animation.swap ? "red" : "yellow";

          if (animation.swap) {
            const tempHeight = barOne.style.height;
            barOne.style.height = barTwo.style.height;
            barTwo.style.height = tempHeight;

            const tempText = barOne.innerText;
            barOne.innerText = barTwo.innerText;
            barTwo.innerText = tempText;
          }

          setTimeout(() => {
            if (barOne.style.backgroundColor !== "green") {
              barOne.style.backgroundColor = "#5fb8fd";
            }
            if (barTwo.style.backgroundColor !== "green") {
              barTwo.style.backgroundColor = "#5fb8fd";
            }
          }, speed);
        } else if (animation.type === "markSorted") {
          barEle[animation.index].style.backgroundColor = "green";
        }
      }, (i * speed) / 0.5);
    }

    setTimeout(() => {
      setIsSorting(false);
      setArray(sortedArray);
    }, animations.length * speed + speed);
  };

  const animateSelectionSorting = (animations, sortedArray) => {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#5fb8fd";
    }

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isSwap, isSorted] = animations[i];
      const barOne = bars[barOneIdx];
      const barTwo = bars[barTwoIdx];

      setTimeout(() => {
        if (!isSorted) {
          barOne.style.backgroundColor = isSwap ? "red" : "yellow";
          barTwo.style.backgroundColor = isSwap ? "red" : "yellow";

          if (isSwap) {
            const tempHeight = barOne.style.height;
            barOne.style.height = barTwo.style.height;
            barTwo.style.height = tempHeight;

            const tempText = barOne.innerText;
            barOne.innerText = barTwo.innerText;
            barTwo.innerText = tempText;
          }

          setTimeout(() => {
            if (barOne.style.backgroundColor !== "green")
              barOne.style.backgroundColor = "#5fb8fd";
            if (barTwo.style.backgroundColor !== "green")
              barTwo.style.backgroundColor = "#5fb8fd";
          }, speed);
        }

        if (isSorted) {
          bars[barOneIdx].style.backgroundColor = "green";
        }
      }, (i * speed) / 0.5);
    }

    setTimeout(() => {
      setIsSorting(false);
      setArray(sortedArray);
    }, animations.length * speed + speed);
  };

  const animateInsertionSorting = (animations, sortedArray) => {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#5fb8fd";
    }
    bars[0].style.backgroundColor = "green";

    for (let i = 0; i < animations.length; i++) {
      const action = animations[i];

      setTimeout(() => {
        switch (action.type) {
          case "compare": {
            const bar = bars[action.index];
            bar.style.backgroundColor = "yellow";
            break;
          }

          case "swap": {
            const [i1, i2] = action.indices;
            bars[i1].style.backgroundColor = "red";
            bars[i2].style.backgroundColor = "red";
            break;
          }

          case "overwrite": {
            const toBar = bars[action.toIndex];
            const fromBar = bars[action.fromIndex];
            toBar.style.height = fromBar.style.height;
            toBar.innerText = fromBar.innerText;
            break;
          }

          case "insert": {
            const bar = bars[action.index];
            const newHeight = action.value;
            bar.style.height = `${newHeight}px`;
            bar.innerText = action.value;
            break;
          }

          case "sortedUpto": {
            for (let k = 0; k <= action.index; k++) {
              bars[k].style.backgroundColor = "green";
            }
            break;
          }

          default:
            break;
        }
      }, i * speed);
    }

    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * 20);
      }
      setTimeout(() => {
        setIsSorting(false);
        setArray(sortedArray);
      }, bars.length * 20);
    }, animations.length * speed + 100);
  };
  const animateMergeSorting = (animations) => {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#5fb8fd";
    }
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = bars[barOneIdx];
        const barTwo = bars[barTwoIdx];
        const color = i % 3 === 0 ? "yellow" : " #5fb8fd";
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

  return (
    <div className="app-container">
        <div className="sidebar">
          <div className="heading">
            <h2 className="group">
              <span className="sort">Sort</span>
              <span className="ify">ify</span>
            </h2>
          </div>
          <div className="new-sidebar">
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
        </div>
        <div className="visualizer-wrap">
        <div className="visualizer" > 
          <Visual array={array} />
        </div>  
          <div className="button-container">
            <button
              className="play-btn"
              onClick={handlePlay}
              disabled={
                isSorting || array.length === 0 || !selectedSorting || !speed
              }
            >
              PLAY
            </button>
          </div>

      
        {
          showColor && (<Color 
            isVisible={showColor}
            onClose={()=> setShowColor(false)}/>
          )
        }
        </div>

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
