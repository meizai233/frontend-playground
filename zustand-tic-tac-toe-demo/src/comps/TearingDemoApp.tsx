import { useState, useEffect, useRef, useTransition } from "react";

// 外部存储实现
const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (newState) => {
      state = typeof newState === "function" ? newState(state) : newState;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

// 创建共享存储
const store = createStore({ count: 0 });

// 不安全的Hook实现 - 会出现撕裂
function useExternalStoreUnsafe() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 使用setTimeout模拟异步更新，增加撕裂机会
      setTimeout(() => {
        setState(store.getState());
      }, 0);
    });
    return unsubscribe;
  }, []);

  return state;
}

// 添加时间戳的组件 - 帮助观察渲染时间
function CounterDisplayA() {
  const state = useExternalStoreUnsafe();
  const renderTime = useRef(Date.now()).current;

  return (
    <div className="counter-a" style={{ background: "#ffdddd", padding: "10px", margin: "10px 0" }}>
      <h3>组件A</h3>
      <p>计数值: {state.count}</p>
      <p>渲染时间: {renderTime}</p>
    </div>
  );
}

function CounterDisplayB() {
  const state = useExternalStoreUnsafe();
  const renderTime = useRef(Date.now()).current;

  return (
    <div className="counter-b" style={{ background: "#ddffdd", padding: "10px", margin: "10px 0" }}>
      <h3>组件B</h3>
      <p>计数值: {state.count}</p>
      <p>渲染时间: {renderTime}</p>
    </div>
  );
}

// 超级耗时组件 - 强制中断渲染
function VeryExpensiveComponent() {
  const startTime = performance.now();

  // 阻塞主线程500ms以上，确保渲染被中断
  while (performance.now() - startTime < 500) {
    // 密集计算循环
  }

  return (
    <div style={{ background: "#ddddff", padding: "10px", margin: "10px 0" }}>
      <h3>耗时组件</h3>
      <p>渲染耗时: {Math.round(performance.now() - startTime)}ms</p>
    </div>
  );
}

function TearingDemoApp() {
  const [isPending, startTransition] = useTransition();
  const [showDemo, setShowDemo] = useState(false);

  // 使用并发模式显示内容
  const startDemo = () => {
    store.setState({ count: 0 });
    startTransition(() => {
      setShowDemo(true);
    });

    // 确保在渲染过程中触发状态更新
    setTimeout(() => {
      store.setState((prev) => ({ count: prev.count + 1 }));
    }, 100);
  };

  return (
    <div className="app">
      <h1>改进的撕裂问题演示</h1>

      <div className="controls">
        <button onClick={startDemo} disabled={isPending}>
          {isPending ? "渲染中..." : "开始演示"}
        </button>
        <button onClick={() => store.setState({ count: store.getState().count + 1 })}>增加计数</button>
      </div>

      {showDemo && (
        <>
          <CounterDisplayA />
          <VeryExpensiveComponent />
          <CounterDisplayB />
        </>
      )}

      <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ccc" }}>
        <h3>如何观察撕裂:</h3>
        <p>1. 点击"开始演示"</p>
        <p>2. 观察组件A和B的计数值和渲染时间</p>
        <p>3. 如果出现撕裂: 计数值不同且渲染时间相差较大</p>
        <p>4. 使用您的useSyncExternalStore实现替换Hook后重试</p>
      </div>
    </div>
  );
}

export default TearingDemoApp;
