import { create } from "zustand";
import { combine } from "zustand/middleware";

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export function calculateTurns(squares) {
  return squares.filter((square) => !square).length;
}
export function calculateStatus(winner, turns, player) {
  if (!winner && !turns) return "Draw";
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
}
// create之后 得到了一个store
export const useGameStore = create(
  combine(
    {
      squares: Array(9).fill(null),
      xIsNext: true,
      history: [Array(9).fill(null)],
      currentMove: 1,
      currentSquare: Array(9).fill(null),
      // 下棋时：setSquares
      // 时间旅行时：setCurrentSquares和setcurrentMove
      // 时间旅行后又下棋：setSquares
    },
    (set) => {
      return {
        // set时只做set的逻辑 单个逻辑
        setSquares: (nextSquares) => {
          set((state) => ({
            squares: typeof nextSquares === "function" ? nextSquares(state.squares) : nextSquares,
          }));
        },
        setXIsNext: (nextXIsNext) => {
          set((state) => ({
            xIsNext: typeof nextXIsNext === "function" ? nextXIsNext(state.xIsNext) : nextXIsNext,
          }));
        },
        setHistory: (nextHistory) => {
          set((state) => ({
            history: typeof nextHistory === "function" ? nextHistory(state.history) : nextHistory,
          }));
        },
        setCurrentMove: (nextCurrentMove) => {
          set((state) => ({
            currentMove: typeof nextCurrentMove === "function" ? nextCurrentMove(state.currentMove) : nextCurrentMove,
          }));
        },
        setCurrentSquare: (historyIndex) => {
          set((state) => ({
            currentSquare: state.history[historyIndex],
          }));
        },
      };
    }
  )
);

export default {
  useGameStore,
  calculateWinner,
  calculateTurns,
  calculateStatus,
};
