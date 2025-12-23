/**
 * 인증 관련 타입 정의
 */

// 인증된 사용자 타입
export interface AuthUser {
  userId: number | string;
  email: string;
  name: string;
  token?: string;
}

// 회원가입 요청 타입
export interface SignupRequest {
  email: string;
  name: string;
  password: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 인증 응답 타입
export interface AuthResponse {
  userId: number;
  email: string;
  name: string;
  token: string;
}

// 로그인 폼 데이터 타입
export interface LoginFormData {
  email: string;
  password: string;
}

// 회원가입 폼 데이터 타입
export interface RegisterFormData extends LoginFormData {
  name: string;
  confirmPassword: string;
}

// 이메일 중복 체크 응답 타입
export interface CheckEmailResponse {
  available: boolean;
  message?: string;
}

// AuthContext 타입
export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

