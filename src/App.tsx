import {useEffect, useRef, useState} from "react";
import confetti from "canvas-confetti";

import styles from "./App.module.css";

const CELLS = 9;
const WINNERS = [
  // Horizontales
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Verticales
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8],

  // Diagonal
  [2, 4, 6],
  [0, 4, 8],
];
const INITIAL = new Array(CELLS).fill("");

function App() {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(INITIAL);
  const canvas = useRef<HTMLCanvasElement>(null);

  function handleCell(index: number) {
    if (cells[index]) return;

    setCells((cells) => {
      const draft = cells.slice();

      draft.splice(index, 1, turn);

      return draft;
    });

    setTurn((turn) => (turn === "X" ? "O" : "X"));
  }

  useEffect(() => {
    for (let comp of WINNERS) {
      const isXWinner = comp.every((cell) => cells[cell] === "X");
      const isOWinner = comp.every((cell) => cells[cell] === "O");

      if (isXWinner) {
        const cannon = confetti.create(canvas.current as HTMLCanvasElement);

        console.log("GANO X");
        cannon({
          particleCount: 500,
          startVelocity: 30,
          spread: 360,
        });
        setTurn("X");
        setCells(INITIAL);
      } else if (isOWinner) {
        const cannon = confetti.create(canvas.current as HTMLCanvasElement);

        console.log("GANO O");
        cannon({
          particleCount: 5000,
          startVelocity: 30,
          spread: 360,
        });
        setTurn("O");
        setCells(INITIAL);
      }
    }
  }, [cells]);

  return (
    <main className={styles.main}>
      <canvas ref={canvas} />
      {cells.map((cell, index) => (
        <div key={index} onClick={() => handleCell(index)}>
          {cell}
        </div>
      ))}
    </main>
  );
}

export default App;
