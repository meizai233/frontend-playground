import { useState } from "react";

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  function handleSave() {
    onChange({
      ...task,
      text: text,
    });
    setIsEditing(false);
  }

  const taskStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    margin: "8px 0",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
    borderLeft: task.done ? "4px solid #4caf50" : "4px solid #f5f5f5",
  };

  const buttonStyle = {
    padding: "5px 10px",
    margin: "0 5px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <li style={taskStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            onChange({
              ...task,
              done: e.target.checked,
            });
          }}
          style={{ marginRight: "10px" }}
        />

        {isEditing ? (
          <input value={text} onChange={(e) => setText(e.target.value)} autoFocus style={{ padding: "5px" }} />
        ) : (
          <span
            style={{
              textDecoration: task.done ? "line-through" : "none",
              color: task.done ? "#888" : "#000",
            }}
          >
            {task.text}
          </span>
        )}
      </div>

      <div>
        {isEditing ? (
          <button onClick={handleSave} style={{ ...buttonStyle, backgroundColor: "#4caf50", color: "white" }}>
            保存
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} style={{ ...buttonStyle, backgroundColor: "#2196f3", color: "white" }}>
            编辑
          </button>
        )}
        <button onClick={() => onDelete(task.id)} style={{ ...buttonStyle, backgroundColor: "#f44336", color: "white" }}>
          删除
        </button>
      </div>
    </li>
  );
}
