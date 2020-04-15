import React, { useState, useEffect } from "react";
import "./App.css";

const createRow = number => {
  const row = [];
  let i = 0;
  while (i < number) {
    row.push(false);
    i++;
  }
  return row;
};

function App() {
  const [grid, setGrid] = useState(createRow(5000));
  const [found, setFound] = useState(false)

  const activeCeils = idx => {
    const newGrid = [...grid];
    newGrid[idx] = !grid[idx];
    setGrid(newGrid);
  };
  
  const heart = () => console.log("RUN!")

  found && setInterval(() => {
        heart()
      }, 1000);

  return (
    <>
    <h1>GAME THE LIVE</h1>
    <div className="App">
      {grid.map((elm, idx) => (
        <div
          className={grid[idx] ? "active" : "inactive"}
          key={idx}
          onClick={() => activeCeils(idx)}
        />
      ))}
    </div>
      <button onClick={() => setFound(!found)}>{found ? "STOP":"START"}</button>
    </>
  );
}

export default App;
