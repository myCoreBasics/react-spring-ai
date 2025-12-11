import { useState } from "react";

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  
  return (
    <>
      <input
        className="task-input"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <button 
        className="btn btn-primary"
        onClick={() => {
          onAddTask(text)
          setText(''); 
        }}
      >
        Add Task
      </button>
    </>
  );
}