import { useState, useLayoutEffect, useEffect } from "react";

export default function useSyncExternalStore(subscribe, getSnapshot) {
  // 先自己写一遍好吗

  // 有一个快照
  const value = getSnapshot();
  const [{ inst }, forceUpdate] = useState({ inst: { value, getSnapshot } });

  useLayoutEffect(() => {
    // 每次deps变化 修改value 如果value变化了就强制刷新视图
    inst.value = value;
    inst.getSnapshot = getSnapshot;

    // 如果变化了就刷新视图
    // 待办 检查下源码是不是用的useState
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({ inst });
    }

    // 为什么是这三个依赖???
  }, [subscribe, value, getSnapshot]);

  useEffect(() => {
    debugger;
    // 在触发订阅事件前先判断数据快照是否发生了变化
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({ inst });
    }

    // 处理 store 发生变化时的订阅事件
    // 如果inst有变化 强制刷新
    // 就相当于 state的getSnapshot计算出来如果有变化 强制setState(计算结果) 然后会自动添加到更新队列刷新组件
    //

    // 内部实现: react内部给subscribe首先订阅了一个listener 该事件比较前后的inst的快照 发生改变的话就强制刷新forceUpdate
    // 这个强制更新过程是通过useState实现的
    // 在crud inst过程 会遍历调用listeners
    // 为了防止撕裂 每次渲染前都会用useEffect(不添加任何依赖 每次渲染都会调用) checkIfSnapshotChanged 更改了就重新forceUpdate
    const handleStoreChange = () => {
      // 检查从我们上次读取数据快照以来是否有再发生变化
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({ inst });
      }
    };

    // 订阅数据并在组件卸载的时候取消订阅，当数据发生变化的时候就会去触发上面的回调
    return subscribe(handleStoreChange);
  }, [subscribe]);

  return value;
}

function checkIfSnapshotChanged(inst) {
  const latestGetSnapshot = inst.getSnapshot;
  // 上一个数据快照
  const prevValue = inst.value;
  try {
    // 获取新的数据快照
    const nextValue = latestGetSnapshot();
    // 比较新老数据快照是否相同
    return !is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}
