/**
 * API 공통 타입 정의
 */

// 공통 API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalCount: number;
}

// 페이지네이션 옵션 타입
export interface PaginationOptions {
  page?: number;
  size?: number;
}

