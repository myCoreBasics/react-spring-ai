import { Todo } from '@/types/todo';

// 메모리 기반 데이터 저장소 (서버 재시작 시 초기화됨)
// 실제 운영환경에서는 데이터베이스를 사용해야 합니다.
let todos: Todo[] = [
  {
    id: '1',
    title: '첫 번째 할 일',
    description: 'Next.js REST API 학습하기',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '두 번째 할 일',
    description: 'TypeScript 복습하기',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 고유 ID 생성 함수
let nextId = 3;
export const generateId = (): string => {
  return String(nextId++);
};

// 모든 할 일 조회
export const getAllTodos = (): Todo[] => {
  return [...todos];
};

// 특정 할 일 조회
export const getTodoById = (id: string): Todo | undefined => {
  return todos.find(todo => todo.id === id);
};

// 새 할 일 생성
export const createTodo = (title: string, description?: string): Todo => {
  const now = new Date().toISOString();
  const newTodo: Todo = {
    id: generateId(),
    title,
    description,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
  todos.push(newTodo);
  return newTodo;
};

// 할 일 수정
export const updateTodo = (
  id: string,
  updates: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>
): Todo | null => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return null;

  todos[index] = {
    ...todos[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return todos[index];
};

// 할 일 삭제
export const deleteTodo = (id: string): boolean => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return false;

  todos.splice(index, 1);
  return true;
};

