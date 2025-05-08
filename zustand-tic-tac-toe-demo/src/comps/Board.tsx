import Square from "./Square";
import { useCallback } from "react";
import { useGameStore, calculateWinner, calculateTurns, calculateStatus } from "../gameStore/useGameStore";

export default function Board({ xIsNext, squares, onPlay }) {
  // 在这里订阅
  const setSquares = useGameStore((state) => state.setSquares);
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = xIsNext ? "X" : "O";

  const status = calculateStatus(winner, turns, player);
  // 再加一个全局状态 当前是o还是x

  const handleClick = useCallback(
    (i) => {
      if (squares[i]) return;
      // 全量更新
      const nextSquares = squares.slice();
      xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

      onPlay(nextSquares);
    },
    [squares]
  );

  return (
    <>
      <div style={{ marginBottom: "0.5rem" }}>{status}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          width: "calc(3 * 2.5rem)",
          height: "calc(3 * 2.5rem)",
          border: "1px solid #999",
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square value={square} key={squareIndex} onSquareClick={() => handleClick(squareIndex)} />
        ))}
      </div>
    </>
  );
}
