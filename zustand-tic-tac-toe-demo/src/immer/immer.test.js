const { produce } = require("immer");

test("Immer maintains immutability", () => {
  // 创建一个初始状态
  const baseState = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

  // 使用 Immer 创建一个新状态，添加一个新项
  const nextState = produce(baseState, (draft) => {
    draft.push({ id: 3, name: "Item 3" });
  });
  // 测试 baseState 没有被修改，而 nextState 包含了新项
  expect(baseState.length).toBe(2);
  expect(nextState.length).toBe(3);

  // 可以添加更多断言
  expect(nextState[2].id).toBe(3);
  expect(nextState[2].name).toBe("Item 3");

  // 验证原数组中的对象没有被修改
  expect(baseState[0]).toBe(nextState[0]);
  expect(baseState[1]).toBe(nextState[1]);
});
