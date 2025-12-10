import { useReducer, useEffect, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { initialTasks, tasksReducer } from '../utils/tasksReducer';
import { TaskSearch } from './TaskSearch';
import { arrayMove } from '@dnd-kit/sortable';
import confetti from 'canvas-confetti';
import { TaskContext } from '../context/TaskContext';
import { createTask, getTasks } from '../services/taskApi';

export default function TaskApp() {
  // 로컬 스토리지에서 가져오기
  const savedTasks = localStorage.getItem('tasks');
  // 있으면 변환, 없으면 initialTasks
  const initial = savedTasks ? JSON.parse(savedTasks) : initialTasks;
  const [tasks, dispatch] = useReducer(tasksReducer, initial);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const totalCount = tasks.length;
  const completedCount = tasks.filter(task => task.done).length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount)*100) : 0

  const [filter, setFilter] = useState('all');
  const [searchTask, setSearchTask] = useState('');

  let nextId = 5;

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      dispatch({ type: 'init', tasks: response.data });  // 어떤 action으로 tasks를 설정할까?
    };
    fetchTasks();
  }, []);

  const handleCheckTask = task => {
    dispatch({type: 'check', id: task.id})
  }

  const handleDeleteTask = task => {
    dispatch({type: 'delete', id: task.id})
  }

  const handleChangeTask = task => {
    dispatch({type: 'change', id: task.id, text: task.text})
    
  }

  const handleResetTask = () => {
    localStorage.removeItem('tasks');
    window.location.reload();
  }

  // 전부 완료 시 confetti!
  useEffect(() => {
    if (tasks.length > 0 && tasks.every(task => task.done)) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [tasks]);

  const handleDragEnd = (event) => {
    console.log('드래그 끝!', event);  // ← 추가
    // 1. 꺼내기
    const { active, over } = event;

    // 2. 위치가 바뀌었는지 확인
    if(active?.id !== over?.id) {
      // 3. 원래 위치(originIndex) 찾기
      const originIndex = tasks.findIndex(task => task.id === active.id);
      // 4. 새 위치(newIndex) 찾기
      const newIndex = tasks.findIndex(task => task.id === over.id);
      // 5. arrayMove로 순서 바꾸기
      const newTasks = arrayMove(tasks, originIndex, newIndex);
      // 6. dispatch로 상태 업데이트
      dispatch({type: 'reorder', newTasks: newTasks})    
    } 
  }

  let filteredTasks;

  if (filter === 'all') {
    filteredTasks = tasks;
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.done === true);
  } else {
    filteredTasks = tasks.filter(task => task.done === false);
  }

  if (searchTask) {
    filteredTasks = filteredTasks.filter(task => 
      task.text.toLowerCase().includes(searchTask.toLowerCase())
    );
  }

  const providerValue = {
    tasks,
    dispatch,
    handleResetTask,
    handleCheckTask,
    handleDeleteTask,
    handleChangeTask,
    handleDragEnd
  }

  return (
    <TaskContext.Provider value={providerValue}>
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

          <div className='search-section'>
            <TaskSearch searchTask={searchTask} onSearchTask={setSearchTask} />
          </div>

          <div className="input-section">
            <AddTask onAddTask={ async text => {
              const response = await createTask(text);
              dispatch({ type: 'add', id: response.data.id, text: response.data.text});
            }} />
          </div>

          <div className="reset-section">
            <button className="btn btn-primary" onClick={handleResetTask}>Reset</button>
          </div>

          <div className="filter-section">
            <button 
              className="btn btn-ghost"
              onClick={() => setFilter('all')}
            >
              전체
            </button>
            <button 
              className="btn btn-ghost"
              onClick={() => setFilter('completed')}
            >
              완료
            </button>
            <button 
              className="btn btn-ghost"
              onClick={() => setFilter('active')}
            >
              미완료
            </button>
          </div>

          <TaskList tasks={filteredTasks} />
        </div>
      </div>
    </TaskContext.Provider>
  );
}