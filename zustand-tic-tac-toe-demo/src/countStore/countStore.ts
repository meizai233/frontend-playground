let count: number = 0;
let listeners: Function[] = [];

// store是一个对象。。。
export const countStore = {
  subscribe(listener) {
    listeners.push(listener);

    // 返回取消订阅的函数
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  getSnapshot() {
    return count;
  },

  add() {
    count++;
    // 更改之后 要手动listeners调用一遍
    listeners.forEach((listener) => listener());
  },
};
