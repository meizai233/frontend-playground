import { useRef, useSyncExternalStore } from "react";
import createCountStore from "./createCountStore";

export default function useCountStore() {
  // 用ref记录
  // 如果当前组件有ref了??
  const storeRef = useRef(null);
  if (storeRef.current === null) {
    storeRef.current = createCountStore();
  }

  const store = storeRef.current;

  const count = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return {
    ...store,
    count, //这是会根据store里的方法动态订阅的值
  };
}
