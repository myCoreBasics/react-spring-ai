/**
 * 지출/영수증 관련 타입 정의
 */

// 지출 항목 타입
export interface ExpenseItem {
  name: string;
  quantity: number;
  price: number;
}

// 지출 내역 타입
export interface Expense {
  id: number | string;
  amount: number;
  category: string;
  description: string;
  date: string;
  userId?: string;
  storeName?: string;
  items?: ExpenseItem[];
}

// 지출 폼 데이터 타입
export interface ExpenseFormData {
  amount: number;
  category: string;
  description: string;
  date: string;
}

// 영수증 분석 응답 타입
export interface AnalyzeExpenseResponse {
  storeName?: string;
  date?: string;
  items?: ExpenseItem[];
  totalAmount?: number;
  category?: string;
}

