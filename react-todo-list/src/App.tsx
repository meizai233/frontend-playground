const treeData = [
  {
    id: "1",
    name: "北京",
    children: [
      {
        id: "1-1",
        name: "朝阳区",
        children: [
          { id: "1-1-1", name: "三里屯", children: [] },
          { id: "1-1-2", name: "望京", children: [] },
        ],
      },
      {
        id: "1-2",
        name: "海淀区",
        children: [
          { id: "1-2-1", name: "中关村", children: [] },
          { id: "1-2-2", name: "五道口", children: [] },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "上海",
    children: [
      {
        id: "2-1",
        name: "浦东新区",
        children: [
          { id: "2-1-1", name: "陆家嘴", children: [] },
          { id: "2-1-2", name: "张江", children: [] },
        ],
      },
      {
        id: "2-2",
        name: "静安区",
        children: [
          { id: "2-2-1", name: "南京西路", children: [] },
          { id: "2-2-2", name: "静安寺", children: [] },
        ],
      },
    ],
  },
];

const TreeNode = ({ node }) => {
  return (
    <>
      <p>
        {node.id} {node.name}
      </p>
      <p>
        children:
        {node.children?.map((node) => (
          <TreeNode node={node} key={node.id} />
        ))}
      </p>
    </>
  );
};

export default function App() {
  return (
    <>
      <button onClick={() => }
    {treeData.map((node) => <TreeNode node={node} key={node.id} />)}
    </>
  );
}
