import { produce, enablePatches, applyPatches } from "immer";

// 激活 patches 功能
enablePatches();

// 基础状态
const baseState = {
  users: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ],
  settings: {
    darkMode: false,
  },
};

// 定义接收 patches 的回调函数
let patches = [];
let inversePatches = [];

// 使用 produce 并捕获 patches
const nextState = produce(
  baseState,
  (draft) => {
    // 这里没有显示return 为啥
    draft.users[0].name = "Alicia";
    draft.settings.darkMode = true;
    // draft.users.push({ id: 3, name: "Charlie" });
  },
  // 第三个参数：接收 patches 和 inversePatches 的回调
  (generatedPatches, inverseGeneratedPatches) => {
    patches = generatedPatches;
    inversePatches = inverseGeneratedPatches;
  }
);

// console.log(patches);
console.log(inversePatches);

// patch记录一组修改（每一次修改都会单独记录）
// applyPatch应用一组修改
// const patchedState = applyPatches(baseState, patches);

// console.log(patchedState === nextState); // false (不同引用)
// console.log(JSON.stringify(patchedState) === JSON.stringify(nextState)); // true (内容相同)

console.log(applyPatches(nextState, inversePatches));
// console.log(nextState);
