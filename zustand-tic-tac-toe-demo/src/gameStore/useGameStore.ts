import { applyPatches, enablePatches, produce } from "immer";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
enablePatches();
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
      // 下棋时：setSquares
      // 时间旅行时：setCurrentSquares和setcurrentMove
      // 时间旅行后又下棋：setSquares
      canUndo: false,
      canRedo: false,
    },
    immer((set, get) => {
      let patches = [];
      let inversePatches = [];
      let currentMove = 0;

      return {
        // 每次set的时候 重制undo和redo
        setSquares: (nextSquares) => {
          // 都没问题
          // currentMove++;
          // get().checkCanDo();

          // 放到produce里有问题
          const nextState = produce(
            get(),
            (draft) => {
              const newSquares = typeof nextSquares === "function" ? nextSquares(draft.squares) : nextSquares;
              // 逐个设置元素，而不是直接替换
              for (let i = 0; i < newSquares.length; i++) {
                draft.squares[i] = newSquares[i];
              }
              // 确保长度正确
              draft.squares.length = newSquares.length;
            },
            (patches_, inversePatches_) => {
              if (currentMove < patches.length) {
                patches = patches.slice(0, currentMove);
                inversePatches = inversePatches.slice(0, currentMove);
              }
              patches.push(...patches_);
              inversePatches.push(...inversePatches_);
              // 重制为最后一步
              currentMove = patches.length;
            }
          );
          set(nextState);

          get().checkCanDo();
        },
        setXIsNext: (nextXIsNext) => {
          set((state) => {
            state.xIsNext = typeof nextXIsNext === "function" ? nextXIsNext(state.xIsNext) : nextXIsNext;
          });
        },
        setUndo: (canUndo) => {
          set((state) => {
            state.canUndo = typeof canUndo === "function" ? canUndo(state.canUndo) : canUndo;
            console.log(state.canUndo);
          });
        },
        setRedo: (canRedo) => {
          set((state) => {
            // debugger;
            state.canRedo = typeof canRedo === "function" ? canRedo(state.canRedo) : canRedo;
          });
        },
        // 1. 撤销了2次，无编辑，再redo 2次，inversePathches不变
        // 2. 撤销了2次，再编辑，不可以redo
        // 3. 撤销了1次 会把那个撤销在push到patch??

        // 撤销时：currentMove--，inversePathces不更新

        // 1. 撤销1次，patches推入，再撤销1次，patch推入，再redo，inverse
        // 2. 撤销1次，再编辑，  此时不允许重做
        // 1 2 3 ， 取3 2放到另一个stach，如果redo了就清空这个st 那这个st就是inverse啊
        // 1 2 3，取3 2，再撤销

        // patches: 1,2,3,4
        // inverse: -1,-2,-3,-4
        // undo后无编辑:
        // undo: -4, -3  把
        // redo: 3, 4

        // unod后编辑:
        // undo: -4,-3
        // do: 4，此时patches: 1,2,4, inverse: -1,-2,4
        // 无法redo 只能undo redo的前提是currentMove不在最后index
        undo: () => {
          // 3 第3-1=2个
          // 2 第2-1=1个
          // 1 取1-1=0个
          console.log(currentMove, inversePatches.slice(currentMove - 1), inversePatches, "111");
          const newState = applyPatches(get(), inversePatches.slice(currentMove - 1));
          // 撤回的时候 currentMove也要撤回
          currentMove--;
          set(newState);
          get().checkCanDo();
        },
        redo: () => {
          // 从curMove开始恢复
          console.log(currentMove, patches, patches.slice(currentMove, currentMove + 1));
          const newState = applyPatches(get(), patches.slice(currentMove, currentMove + 1));
          currentMove++;
          set(newState);
          get().checkCanDo();
          // 描述一下这个问题：用produce+set的时候 先后顺序防止后面的set覆盖到前面的set
        },
        checkCanDo: () => {
          set((state) => {
            // Make a single update to both flags
            state.canUndo = currentMove > 0;
            state.canRedo = currentMove < patches.length;
          });
        },
      };
    })
  )
);

export default {
  useGameStore,
  calculateWinner,
  calculateTurns,
  calculateStatus,
};
