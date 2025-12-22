import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getExpenseById } from '../utils/api'
import './ExpenseDetail.css';
import { useEffect } from 'react';

function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadExpense();
  }, [id]);

  async function loadExpense(){
    setLoading(true);
    setError(null);
    try {
      const result = await getExpenseById(id);
      setExpense(result);
    } catch (err) {
      setError(err.message || '지출 내역을 불러오는데 실패했습니다.')
    } finally {
      setError(false);
    }
  }

  return (
    <div className="expense-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← 뒤로 가기
      </button>

      {/* 
        1. expense의 초기값 설정
        2. {expense && (처럼 막아놓기
        3. 초기화 할 때 true로 하고 로딩중...과 같은 화면으로 진입
      */}
      {expense && (
        <div className="detail-card">
          <div className="detail-header">
            <h1>{expense.merchant || '상호명 없음'}</h1>
            <div className="detail-amount">
              ₩{expense.totalAmount?.toLocaleString() || 0}
            </div>
          </div>

          <div className="detail-body">
            <div className="detail-item">
              <label>날짜</label>
              <span>
                {expense.date
                  ? new Date(expense.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : '-'}
              </span>
            </div>

            {expense.category && (
              <div className="detail-item">
                <label>분류</label>
                <span className="category-badge">{expense.category}</span>
              </div>
            )}

            {expense.description && (
              <div className="detail-item">
                <label>설명</label>
                <span>{expense.description}</span>
              </div>
            )}

            {expense.items && expense.items.length > 0 && (
              <div className="detail-item">
                <label>상세 항목</label>
                <div className="items-list">
                  {expense.items.map((item, index) => (
                    <div key={index} className="item-row">
                      <span>{item.name || '항목'}</span>
                      <span>₩{item.amount?.toLocaleString() || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
          
  );
}

export default ExpenseDetail;

