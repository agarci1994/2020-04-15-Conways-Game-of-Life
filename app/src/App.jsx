import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import "./App.css";

const numRows = 40;
const numCols = 90;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generate = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }

  return rows;
};

function App() {
  const [running, setRunning] = useState(false)
  const [grid, setGrid] = useState(generate())

  const runningRef = useRef()
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(grid =>
      produce(grid, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              newI >= 0 &&
                newI < numRows &&
                newK >= 0 &&
                newK < numCols &&
                (neighbors += grid[newI][newK]);
            });

            (neighbors < 2 || neighbors > 3) && (gridCopy[i][k] = 0)
            grid[i][k] === 0 && neighbors === 3 && (gridCopy[i][k] = 1)
          }
        }
      })
    );

    setTimeout(runSimulation, 200);
  }, []);

  return (
    <>
      <div className="header">
        <h1 className="title">GAME OF LIFE</h1>
        <button
          className="button"
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true
              runSimulation();
            }
          }}
        >
          {running ? "STOP" : "START"}
        </button>
      </div>

      <div className="App">
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              className={col ? "active" : "inactive"}
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
