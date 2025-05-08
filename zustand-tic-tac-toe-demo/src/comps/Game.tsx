import { useGameStore } from "../gameStore/useGameStore";
import Board from "./Board";
export default function Game() {
  const history = useGameStore((state) => state.history);
  const squares = useGameStore((state) => state.squares);
  const setHistory = useGameStore((state) => state.setHistory);
  const xIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const setSquares = useGameStore((state) => state.setSquares);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);
  const setCurrentSquare = useGameStore((state) => state.setCurrentSquare);
  const currentMove = useGameStore((state) => state.currentMove);
  const currentSquare = useGameStore((state) => state.currentSquare);

  console.log(squares);
  // 下棋时
  function handlePlay(nextSquares) {
    // 新建历史记录
    // 检查是否在最后一步 如果不在 则删掉当前步骤的后面步骤
    setCurrentMove((currentMove) => currentMove + 1);
    debugger;
    setHistory(currentMove === history.length ? history.concat([nextSquares]) : history.slice(0, currentMove).concat([nextSquares]));
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function jumpTo(historyIndex) {
    setCurrentMove(historyIndex + 1);
    // 把当前棋盘重制为之前的步骤 也可以覆盖
    setCurrentSquare(historyIndex);
    setXIsNext(historyIndex % 2 === 0);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "monospace",
      }}
    >
      <div>
        {currentMove} {history.length}
        <Board xIsNext={xIsNext} squares={currentMove === history.length ? squares : currentSquare} onPlay={handlePlay} />
      </div>
      <div style={{ marginLeft: "1rem" }}>
        <ol>
          {history.map((_, historyIndex) => {
            const description = historyIndex > 0 ? `Go to move #${historyIndex}` : "Go to game start";

            return (
              <li key={historyIndex}>
                <button onClick={() => jumpTo(historyIndex)}>{description}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
