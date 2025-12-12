import { useReducer, useEffect, useState } from 'react';
import AddTask from '../components/Task/AddTask';
import TaskList from '../components/Task/TaskList';
import { tasksReducer } from '../utils/tasksReducer';
import { TaskSearch } from '../components/Task/TaskSearch';
import { arrayMove } from '@dnd-kit/sortable';
import confetti from 'canvas-confetti';
import { TaskContext } from '../context/TaskContext';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskApi';
import Swal from 'sweetalert2';
import { Box, Text, Button, Heading, Progress } from "@chakra-ui/react";
import '../styles/TaskApp.css';

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

        // 첫 로드 시에만 원본 텍스트 저장
        // localStorage에 'originalTextsInitialized' 플래그로 확인
        const isInitialized = localStorage.getItem('originalTextsInitialized');
        
        if (!isInitialized) {
          serverTasks.forEach(task => {
            localStorage.setItem(`task_${task.id}_originalText`, task.text);
          });
          localStorage.setItem('originalTextsInitialized', 'true');
        }
        const savedOrder = localStorage.getItem('taskOrder');
        
        if (savedOrder) {
          const orderIds = JSON.parse(savedOrder);

          const allServerIds = serverTasks.map(task => task.id);
          const newTaskIds = allServerIds.filter(id => !orderIds.includes(id));
          const updatedOrderIds = [...orderIds, ...newTaskIds];
          localStorage.setItem('taskOrder', JSON.stringify(updatedOrderIds));

          // 저장된 순서대로 정렬 (없는 task는 맨 뒤로)
          serverTasks.sort((a, b) => {
            const indexA = updatedOrderIds.indexOf(a.id);
            const indexB = updatedOrderIds.indexOf(b.id);
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
        }else {
          const serverOrderIds = serverTasks.map(task => task.id);
          localStorage.setItem('taskOrder', JSON.stringify(serverOrderIds));
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

    return() => {
      cancelled = true;
    }
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
  
  const handleResetTask = async () => {
    try {
      // 1. localStorage의 taskOrder 제거 (순서 초기화)
      localStorage.removeItem('taskOrder');

      // 2. 서버에서 데이터 가져오기
      const response = await getTasks();
      if (response && response.data) {
        // 3. 모든 태스크의 done과 text를 원본으로 초기화
        const resetPromises = response.data.map(task => {
          // 원본 텍스트 가져오기
          const originalText = localStorage.getItem(`task_${task.id}_originalText`) || task.text;
          
          // done이 true이거나 텍스트가 변경된 경우 업데이트
          if (task.done || task.text !== originalText) {
            return updateTask(task.id, { 
              ...task, 
              done: false,
              text: originalText
            });
          }
          return Promise.resolve();
        });
        await Promise.all(resetPromises);

        // 4. 다시 서버에서 데이터 가져오기 (업데이트 반영된 상태)
        const updatedResponse = await getTasks();
        if (updatedResponse && updatedResponse.data) {
          dispatch({ type: 'init', tasks: updatedResponse.data });
        }
      }
      
      // 5. 필터 및 검색어 초기화
      setFilter('all');
      setSearchTask('');
    } catch (error) {
      console.error('초기화 실패:', error);
    }
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
      <Box className="dashboard-container">
        <Box className="dashboard-card">
          <header className="dashboard-header">
            <Heading className="dashboard-title">Task Dashboard</Heading>
            <Text className="dashboard-subtitle">Today's Tasks!</Text>
          </header>

          <Box className="progress-section">
            <Box className="progress-header">
              <Text className="progress-label">Progress</Text>
              <Text className="progress-percentage">{progress}%</Text>
            </Box>
            <Progress 
              value={progress}
              sx={{
                '& > div': {
                  bgGradient :'linear(to-r, red.100 0%, orange.100 25%, yellow.100 50%)'
                }
              }}
              size="md"
              borderRadius="full"
            />
            <Box className="progress-stats">
              <Text>Total: <strong>{totalCount}</strong></Text>
              <Text>Done: <strong>{completedCount}</strong></Text>
            </Box>
          </Box>

          <Box className='search-section'>
            <TaskSearch searchTask={searchTask} onSearchTask={setSearchTask} />
          </Box>

          <Box className="input-section">
            <AddTask onAddTask={ async text => {
              const response = await createTask({text});
              
              // 원본 텍스트를 localStorage에 저장
              localStorage.setItem(`task_${response.data.id}_originalText`, response.data.text);
              
              dispatch({ type: 'add', id: response.data.id, text: response.data.text});
              const savedOrder = localStorage.getItem('taskOrder');
              if (savedOrder) {
                const orderIds = JSON.parse(savedOrder);
                orderIds.push(response.data.id);
                localStorage.setItem('taskOrder', JSON.stringify(orderIds));
              } else {
                localStorage.setItem('taskOrder', JSON.stringify([response.data.id]));
              }
            }} />
          </Box>

          <Box className="reset-section">
            <Button 
              variant='gradient'
              colorScheme="white"
              color="white"
              onClick={handleResetTask}>Reset</Button>
          </Box>

          <Box className="filter-section">
            <Button 
              fontSize="14px"
              variant="ghost"
              colorScheme="gray"
              color="gray"
              onClick={() => setFilter('all')}
              _hover={{ bg: "gray.100" }}
            >
              전체
            </Button>
            <Button 
              fontSize="14px"
              variant="ghost"
              colorScheme="gray"
              color="gray"
              onClick={() => setFilter('completed')}
              _hover={{ bg: "gray.100" }}
            >
              완료
            </Button>
            <Button 
              fontSize="14px"
              variant="ghost"
              colorScheme="gray"
              color="gray"
              onClick={() => setFilter('active')}
              _hover={{ bg: "gray.100" }}
            >
              미완료
            </Button>
          </Box>

          <TaskList tasks={filteredTasks} />
        </Box>
      </Box>
    </TaskContext.Provider>
  );
}