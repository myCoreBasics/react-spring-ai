import { useState } from "react";

export default function AddTask({onAddTask}) {
  const [task, setTask] = useState('');
  
  return (
    <>
      <input
        className="task-input"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        autoFocus
      />
      <button 
        className="btn btn-primary"
        onClick={() => {
          onAddTask(task)
          setTask(''); 
        }}
      >
        Add Task
      </button>
    </>
  );
}