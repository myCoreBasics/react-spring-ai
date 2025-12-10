import api from "../api/axios";

// ==========================================
// API 서버 통신 함수들
// 이 파일은 React 컴포넌트와 API 서버 사이의 통신을 담당합니다.
// fetch API를 사용하여 HTTP 요청을 보내고 응답을 받습니다.
// ==========================================

export const getTasks = () => {
  return api.get('/api/tasks');
};

export const createTask = (task) => {
  return api.post('/api/tasks', task);
};

export const updateTask = (taskId, task) => {
  return api.put(`/api/tasks/${taskId}`, task);
};

export const deleteTask = (taskId) => {
  return api.delete(`/api/tasks/${taskId}`);
};