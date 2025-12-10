import { useReducer, useEffect, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { initialTasks, tasksReducer } from '../utils/tasksReducer';
import { TaskSearch } from './TaskSearch';
import { arrayMove } from '@dnd-kit/sortable';
import confetti from 'canvas-confetti';
import { TaskContext } from '../context/TaskContext';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskApi';
import Swal from 'sweetalert2';

export default function TaskApp() {
  // 로컬 스토리지에서 가져오기
  // const savedTasks = localStorage.getItem('tasks');
  // 있으면 변환, 없으면 initialTasks
  // const initial = savedTasks ? JSON.parse(savedTasks) : initialTasks;
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  
  // 서버 연동했으면 로컬 스토리지 제거
  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);

  const totalCount = tasks.length;
  const completedCount = tasks.filter(task => task.done).length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount)*100) : 0

  const [filter, setFilter] = useState('all');
  const [searchTask, setSearchTask] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        
      // 컴포넌트가 언마운트되었으면 실행 안 함
      if (cancelled) return;

        // response.data가 있는지 확인
        if (!response || !response.data) {
          console.error('서버 응답이 없습니다.');
          return;
        }

        let serverTasks = response.data;
        const savedOrder = localStorage.getItem('taskOrder');
        
        if (savedOrder) {
          const orderIds = JSON.parse(savedOrder);
          // 저장된 순서대로 정렬 (없는 task는 맨 뒤로)
          serverTasks.sort((a, b) => {
            const indexA = orderIds.indexOf(a.id);
            const indexB = orderIds.indexOf(b.id);
            // 둘 다 있으면 순서대로
            if (indexA !== -1 && indexB !== -1) {
              return indexA - indexB;
            }
            // A만 있으면 A가 앞으로
            if (indexA !== -1) return -1;
            // B만 있으면 B가 앞으로
            if (indexB !== -1) return 1;
            // 둘 다 없으면 원래 순서 유지
            return 0;
          });
        }
        
        dispatch({ type: 'init', tasks: serverTasks });
    } catch (error) {
        console.error('Task 목록 불러오기 실패:', error);
        Swal.fire({
          icon: 'error',
          title: '목록 불러오기 실패',
          text: '서버 연결을 확인해주세요.',
        });
      }
    };
    fetchTasks();
  }, []);

  const handleCheckTask = async task => {
    await updateTask(task.id, { ...task, done: !task.done });
    dispatch({type: 'check', id: task.id})
  }

  const handleDeleteTask = async task => {
    try {
      // 1. 서버에 요청 (기다림)
      await deleteTask(task.id); 
      // 2. 로컬 state 업데이트
      dispatch({type: 'delete', id: task.id})
      // 3. 순서에서도 제거
      const savedOrder = localStorage.getItem('taskOrder');
      if (savedOrder) {
        const orderIds = JSON.parse(savedOrder);
        const newOrderIds = orderIds.filter(id => id !== task.id);
        localStorage.setItem('taskOrder', JSON.stringify(newOrderIds));
      }
    } catch (error) {
      console.log('삭제 실패 : ', error);
      Swal.fire({
        icon: 'error',
        title: '삭제 실패!',
        text: '다시 시도해주세요.'
      });
    }
  }

  const handleChangeTask = async task => {
    try {
    await updateTask(task.id, task);
    dispatch({type: 'change', id: task.id, text: task.text});
    console.log('수정 성공!');
      Swal.fire({
        icon: 'success',
        title: '수정 성공!',
        text: '변경이 완료되었습니다.'
      });
    } catch (error) {
      console.log('수정 실패 : ', error);
      Swal.fire({
        icon: 'error',
        title: '수정 실패!',
        text: '다시 시도해주세요.'
      });
    }
  }

  const handleDragEnd = (event) => {
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
      
      const orderIds = newTasks.map(task => task.id);
      localStorage.setItem('taskOrder', JSON.stringify(orderIds));
    } 

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
              const response = await createTask({text});
              dispatch({ type: 'add', id: response.data.id, text: response.data.text});
              const savedOrder = localStorage.getItem('taskOrder');
              if (savedOrder) {
                const orderIds = JSON.parse(savedOrder);
                orderIds.push(response.data.id);
                localStorage.setItem('taskOrder', JSON.stringify(orderIds));
              } else {
                // 순서가 없으면 새로 만들기
                localStorage.setItem('taskOrder', JSON.stringify([response.data.id]));
              }
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