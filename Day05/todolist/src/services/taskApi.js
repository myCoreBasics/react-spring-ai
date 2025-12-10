// ==========================================
// API 서버 통신 함수들
// 이 파일은 React 컴포넌트와 API 서버 사이의 통신을 담당합니다.
// fetch API를 사용하여 HTTP 요청을 보내고 응답을 받습니다.
// ==========================================

import axios from "axios";

// API 서버 주소
const API_BASE_URL = 'http://13.220.93.143:8080/api/tasks';
const DEFAULT_USER_ID = 'USER_10';

export const getTasks = () => {
  return axios.get(`${API_BASE_URL}?userId=${DEFAULT_USER_ID}`);
};

export const createTask = (task) => {
  return axios.post(`${API_BASE_URL}?userId=${DEFAULT_USER_ID}`, task);
};

export const updateTask = (taskId, task) => {
  return axios.put(`${API_BASE_URL}/${taskId}?userId=${DEFAULT_USER_ID}`, task);
};

export const deleteTask = (taskId) => {
  return axios.delete(`${API_BASE_URL}/${taskId}?userId=${DEFAULT_USER_ID}`);
};