// Todo 타입 정의
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Todo 생성 시 필요한 데이터
export interface CreateTodoInput {
  title: string;
  description?: string;
}

// Todo 수정 시 필요한 데이터
export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}




