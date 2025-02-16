import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import { getBubbleSortAnimations } from "../../SortingAlgorithm/bubbleSort";
import { getQuickSortAnimations } from "../../SortingAlgorithm/quickSort";
import { getMergeSortAnimations } from "../../SortingAlgorithm/mergeSort";
import { getHeapSortAnimations } from "../../SortingAlgorithm/heapSort";
import { getSelectionSortAnimations } from "../../SortingAlgorithm/selectionSort";
import { getInsertionSortAnimations } from "../../SortingAlgorithm/insertionSort";

const PRIMARY_COLOR = "#3b82f6"; // Blue
const SECONDARY_COLOR = "#ef4444"; // Red
const SUCCESS_COLOR = "#22c55e"; // Green

const SortingVisualizer = ({ isDarkMode }) => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [maxValue, setMaxValue] = useState(1);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const generateNewArray = () => {
    const newArray = Array.from({ length: arraySize }, () =>
      randomIntFromInterval(5, 400)
    );
    updateArray(newArray);
  };

  const handleUserInput = () => {
    const parsedArray = userInput
      .split(",")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num) && num > 0);
    if (parsedArray.length > 0) {
      updateArray(parsedArray);
    }
  };

  const updateArray = (newArray) => {
    setArray(newArray);
    setMaxValue(Math.max(...newArray));
  };

  const animateSorting = async (sortingFunction) => {
    setIsSorting(true);
    const animations = sortingFunction([...array]);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, type] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;

      if (type === "compare") {
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
        await delayAnimation();
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
      } else if (type === "swap") {
        barOneStyle.height = `${(barTwoIdx / maxValue) * 100}%`;
        barOneStyle.backgroundColor = SUCCESS_COLOR;
        await delayAnimation();
        barOneStyle.backgroundColor = PRIMARY_COLOR;
      }
    }

    setIsSorting(false);
    // Enable array generation after sorting is complete
    setArray([...array]);
  };

  const delayAnimation = () =>
    new Promise((resolve) => setTimeout(resolve, 101 - speed));

  return (
    <div className={`container ${isDarkMode ? "dark" : "light"}`}>
      <h2>Sorting Algorithm Visualizer</h2>

      <div className="controls">
        <button onClick={generateNewArray} disabled={isSorting}>
          New Array
        </button>
        <button onClick={() => animateSorting(getBubbleSortAnimations)} disabled={isSorting}>
          Bubble Sort
        </button>
        <button onClick={() => animateSorting(getQuickSortAnimations)} disabled={isSorting}>
          Quick Sort
        </button>
        <button onClick={() => animateSorting(getMergeSortAnimations)} disabled={isSorting}>
          Merge Sort
        </button>
        <button onClick={() => animateSorting(getHeapSortAnimations)} disabled={isSorting}>
          Heap Sort
        </button>
        <button onClick={() => animateSorting(getSelectionSortAnimations)} disabled={isSorting}>
          Selection Sort
        </button>
        <button onClick={() => animateSorting(getInsertionSortAnimations)} disabled={isSorting}>
          Insertion Sort
        </button>
      </div>

      <div className="settings">
        <label>
          Array Size:
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isSorting}
          />
        </label>
        <label>
          Speed:
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
        </label>
      </div>

      <div className="custom-array">
        <input
          type="text"
          placeholder="Enter comma-separated numbers..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSorting}
        />
        <button onClick={handleUserInput} disabled={isSorting}>
          Set Custom Array
        </button>
      </div>

      {/* Visualization Wrapper */}
      <div className="visualizer-container">
        <div className="visualizer">
          {array.map((value, idx) => (
            <div
              key={idx}
              className="array-bar"
              style={{
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: PRIMARY_COLOR,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default SortingVisualizer;
