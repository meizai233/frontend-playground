import { applyPatches, enablePatches, produce } from "immer";

// 激活 patches 功能
enablePatches();

const base = {
  squares: Array(2).fill(0),
  xIsNext: true,
};

let patches = [];
let inversePatches = [];

// 使用 produce 并捕获 patches
const nextState = produce(
  base,
  (draft) => {
    draft.squares[0] = 1;
  },
  // 第三个参数：接收 patches 和 inversePatches 的回调
  (patches_, inversePatches_) => {
    patches = patches_;
    inversePatches = inversePatches_;
  }
);

const newState = applyPatches(base, inversePatches);
console.log(newState);
