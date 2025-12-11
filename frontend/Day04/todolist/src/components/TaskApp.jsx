import { useReducer } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { initialTasks, tasksReducer } from '../utils/tasksReducer';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const totalCount = tasks.length;
  const completedCount = tasks.filter(task => task.done).length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount)*100) : 0

  let nextId = 5;

  const handleCheckTask = task => {
    dispatch({type: 'check', id: task.id})
  }

  const handleDeleteTask = task => {
    dispatch({type: 'delete', id: task.id})
  }

  const handleChangeTask = task => {
    dispatch({type: 'change', id: task.id, text: task.text})
    
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Task Dashboard</h1>
          <p className="dashboard-subtitle">React State Management with Reducer Pattern</p>
        </header>

        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-percentage">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <span>Total: <strong>{totalCount}</strong></span>
            <span>Done: <strong>{completedCount}</strong></span>
          </div>
        </div>

        <div className="input-section">
          <AddTask onAddTask={ task => {
            dispatch({ type: 'add', id: nextId++, text: task});
          }} />
        </div>

        <TaskList onCheckTask={handleCheckTask} onDeleteTask={handleDeleteTask} onChangeTask={handleChangeTask} tasks={tasks} />
      </div>
    </div>
  );
}