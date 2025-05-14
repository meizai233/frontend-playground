// store.js - 创建一个简单的共享store
const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = () => state;

  const setState = (newState) => {
    state = typeof newState === "function" ? newState(state) : newState;
    listeners.forEach((listener) => listener());
  };

  return { subscribe, getSnapshot, setState };
};

// 创建一个全局共享的store

// 提问: 如果useSyncExternalStore中使用useState来保存状态和快照，useState不是只在单个组件内部有效的吗？为什么store 钩子可以在多个组件之间共享状态
// 回答: 我createStore的时候 多个组件使用的是同一额subscribe getSnapshot函数等，那么

export const counterStore = createStore(0);
