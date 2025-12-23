/**
 * 사용자 관련 타입 정의
 */

// 사용자 기본 타입
export interface User {
  id: number | string;
  email: string;
  name: string;
  role?: string;
  status?: string;
  createdAt?: string;
}

// 사용자 생성 요청 타입
export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: string;
  status?: string;
}

// 사용자 수정 요청 타입
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

// 사용자 폼 데이터 타입
export interface UserFormData {
  name: string;
  email: string;
}

// useUserDetail 훅 반환 타입
export interface UseUserDetailReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// useUserForm 훅 반환 타입
export interface UseUserFormReturn {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

