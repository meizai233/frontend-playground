export default function createCountStore() {
  let count: number = 0;
  let listeners: Function[] = [];

  function subscribe(listener) {
    listeners.push(listener);

    // 返回取消订阅的函数
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function getSnapshot() {
    return count;
  }

  function add() {
    count++;
    // 更改之后 要手动listeners调用一遍
    listeners.forEach((listener) => listener());
  }

  return {
    count,
    listeners,
    subscribe,
    getSnapshot,
    add,
  };
}
