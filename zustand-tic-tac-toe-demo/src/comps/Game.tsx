import { useGameStore } from "../gameStore/useGameStore";
import Board from "./Board";
export default function Game() {
  const squares = useGameStore((state) => state.squares);
  const xIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const setSquares = useGameStore((state) => state.setSquares);
  const undo = useGameStore((state) => state.undo);

  const redo = useGameStore((state) => state.redo);
  const canUndo = useGameStore((state) => state.canUndo);
  const canRedo = useGameStore((state) => state.canRedo);
  const setUndo = useGameStore((state) => state.setUndo);
  const state = useGameStore((state) => state);
  console.log(state, "canUndo");
  // 下棋时
  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleUndo() {
    // 撤销的时候 应该定义一个undo
    undo();
    setXIsNext(!xIsNext);
  }

  function handleRedo() {
    redo();
    setXIsNext(!xIsNext);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex" }}>
        <button disabled={!canUndo} onClick={handleUndo}>
          撤销
        </button>
        <button disabled={!canRedo} onClick={handleRedo}>
          重做
        </button>
      </div>
      <div>
        <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
      </div>
    </div>
  );
}
