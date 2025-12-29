/**
 * 타입 정의 진입점
 * 모든 타입을 이 파일에서 re-export 합니다.
 * 
 * 사용 예시:
 * import type { User, Expense, ModalProps } from '@/types';
 */

// 사용자 관련 타입
export type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserFormData,
  UseUserDetailReturn,
  UseUserFormReturn,
} from './user';

// 인증 관련 타입
export type {
  AuthUser,
  SignupRequest,
  LoginRequest,
  AuthResponse,
  LoginFormData,
  RegisterFormData,
  CheckEmailResponse,
  AuthContextType,
} from './auth';

// 지출/영수증 관련 타입
export type {
  Expense,
  ExpenseItem,
  ExpenseFormData,
  AnalyzeExpenseResponse,
} from './expense';

// API 공통 타입
export type {
  ApiResponse,
  PaginatedResponse,
  PaginationOptions,
} from './api';

// 컴포넌트 Props 타입
export type {
  ModalProps,
  ConfirmModalProps,
} from './components';
