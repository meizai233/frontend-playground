## 原来的场景：

三个函数都放在父组件

```
function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }
```

## 改为 reducer

reducer 所做的事情就是 将 state 状态和 action 动作结合起来，并返回一个修改后的状态
和数组中的 reduce 方法有点像

## 什么情况下用

- useReducer：基于 state 做各种更新，state 和 action 分离
- context：一般就是为了解决 props 钻取问题
- useSyncExternalStore：订阅外部数据源（不在 react 管理之内的），然后里面有个 listenrs，修改了状态之后会强制更新所有 ❓ 订阅了该状态的函数 会更新所有吗
