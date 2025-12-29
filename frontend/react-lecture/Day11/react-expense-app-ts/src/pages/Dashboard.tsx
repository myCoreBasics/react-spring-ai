/**
 * Dashboard 페이지 컴포넌트
 * 지출 내역 목록을 보여주는 메인 페이지입니다.
 */

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllExpenses } from '../utils/api';
import Pagination from '../components/pagination/Pagination';
import type { Expense } from '../types';
import './Dashboard.css';

interface PaginationState {
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface PagedResponse {
  content?: Expense[];
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
  first?: boolean;
}

function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [_error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize] = useState<number>(12);
  const [pagination, setPagination] = useState<PaginationState>({
    totalElements: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });

  useEffect(() => {
    loadExpenses();
  }, [currentPage]);

  async function loadExpenses() {
    setLoading(true);
    setError(null);
    try {
      const result = (await getAllExpenses({
        page: currentPage,
        size: pageSize,
      })) as PagedResponse | Expense[];

      if ('content' in result && Array.isArray(result.content)) {
        setExpenses(result.content);
        setPagination({
          totalElements: result.totalElements || 0,
          totalPages: result.totalPages || 0,
          hasNext: !result.last || false,
          hasPrevious: !result.first || false,
        });
      } else if (Array.isArray(result)) {
        setExpenses(result);
        setPagination({
          totalElements: result.length,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        });
      } else {
        setExpenses([]);
        setPagination({
          totalElements: 0,
          totalPages: 0,
          hasNext: false,
          hasPrevious: false,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '지출 내역 조회 실패';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>지출 내역</h1>
        <Link to="/upload" className="btn-primary">
          + 새 영수증 등록
        </Link>
      </div>

      {/* 지출 내역이 없을 때 */}
      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>등록된 지출 내역이 없습니다.</p>
          <Link to="/upload" className="btn-primary">
            첫 영수증 업로드하기
          </Link>
        </div>
      ) : (
        /* 지출 내역 목록 */
        <div className="expenses-list">
          {expenses.map((expense) => (
            <Link
              key={expense.id}
              to={`/expenses/${expense.id}`}
              className="expense-card"
            >
              <div className="expense-card-header">
                <h3>{expense.merchant || '상호명 없음'}</h3>
                <span className="expense-amount">
                  ₩{expense.totalAmount?.toLocaleString() || 0}
                </span>
              </div>
              <div className="expense-card-body">
                <div className="expense-info">
                  <span className="expense-date">
                    {expense.date
                      ? new Date(expense.date).toLocaleDateString('ko-KR')
                      : '-'}
                  </span>
                  {expense.category && (
                    <span className="expense-category">{expense.category}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
        itemLabel="건"
      />
    </div>
  );
}

export default Dashboard;

