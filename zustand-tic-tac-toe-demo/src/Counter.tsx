import "./App.css";
import useCountStore from "./countStore/useCountStore.js";

function Counter() {
  const { count, ...countStore } = useCountStore();
  console.log(count);
  return (
    <>
      <button onClick={countStore.add}>count is {count}</button>
    </>
  );
}

export default Counter;

// 使用场景：一些第三方库 可以用这个hook做基础来实现一些业务hook 来实现某个状态的多种共享
// 订阅一些浏览器api
//
