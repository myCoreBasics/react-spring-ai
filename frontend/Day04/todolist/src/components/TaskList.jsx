import Task from "./Task";

// ==========================================
// Task List Component
// ==========================================

export default function TaskList({tasks, onCheckTask, onDeleteTask, onChangeTask}) {

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id}>
          <Task onCheckTask={onCheckTask} onDeleteTask={onDeleteTask} onChangeTask={onChangeTask} task={task} />
        </li>
      ))}
    </ul>
  );
}

