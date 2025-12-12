import { createContext, useContext } from 'react';

// 1. Context 생성
export const TaskContext = createContext(null);

// 2. 커스텀 훅
export function useTaskContext() {
  return useContext(TaskContext);
}

