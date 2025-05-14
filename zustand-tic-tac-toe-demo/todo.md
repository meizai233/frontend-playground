- [x] 实现井字棋
- [x] 得到 winner
- [x] 记录操作 history
- [x] 实现撤销返回操作
- [] 考虑用 immer 重构 ,用 immer 做时间旅行的目的是什么？好在哪里？immer 的原理是啥？相比于自己写时间旅行 好在哪里呢
  - 对于深度嵌套的属性可以简化修改（扯到 proxy 代理，只是对开发来说简化
  - 对于时间旅行的优化，要么限制 history 数量，要么自己差异化存储，但是感觉 immer 也可以做优化
  -
- [x] immer 的 patch 是啥
  - 可以 todo 和 undo
  - 每次操作存放到一个整体的 patches（类似于操作历史记录）和 inversePatches 里，undo 和 redo 的时候重新 apply 一遍历史记录
  - 【踩坑记录】用 immer 的话不能给一整个对象赋值（因为是代理，赋值了就相当于没有代理了），只能给属性赋值，读取/set data.user(某个属性)时才会代理该属性，懒代理
- [x] 关注 patch 导致的性能开销以及 immer 导致的性能开销，如何衡量和优化
  - 对于一些复杂计算/很深的属性修改，不要直接访问 draft 身上的属性，根据 immer 的代理策略，很深的属性会进行逐层递归代理，开销大。直接 origin 拿到原始属性计算/赋值
  - 对于很大复杂的数据，immer 可能会深度 freeze 每个属性，因此我们现手动浅层 freeze 一下，immer 检查到他已经 freeze 了就不会再冻结了

## 问题

- get().setUndo()， 确实更新而且可用，为什么组件没有拿到通知?? zustand 的组件是怎么拿到通知的呢
  - 看下 create 内部做了什么 如何切片得到的通知 useSyncExternalStore 感觉要看这个 store 的细节 怎么 listner 的呢
  - setUndo set 了但是订阅者没有拿到通知，目前还不知道 useSyncExternalStore 的实现细节，感觉需要了解他的细节在 debug...
