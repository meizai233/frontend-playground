import { useState } from "react";
import "./App.css";
// 子组件
function ChildComponent({ name, age }) {
  console.log("Child rendering with:", name, age);
  return (
    <div className="child">
      <h3>子组件</h3>
      <p>姓名: {name}</p>
      <p>年龄: {age}</p>
    </div>
  );
}

// 父组件(有问题的版本)
function ParentComponent() {
  const [name, setName] = useState("张三");
  const [age, setAge] = useState(25);

  // 模拟异步操作后更新状态
  const updatePersonInfo = () => {
    // 假设这是一个API响应或异步操作
    setTimeout(() => {
      // 在React 18之前，这些更新不会被批处理
      setName("李四"); // 触发一次渲染
      setAge(30); // 触发另一次渲染
    }, 100);
  };

  return (
    <div className="parent">
      <h2>父组件</h2>
      <p>
        当前人员: {name}, {age}岁
      </p>
      <button onClick={updatePersonInfo}>更新信息</button>
      <ChildComponent name={name} age={age} />
    </div>
  );
}
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ParentComponent />
    </>
  );
}

export default App;
