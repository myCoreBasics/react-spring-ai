/**
 * ExpenseDetail 페이지 컴포넌트 (UI 전용)
 * 
 * 특정 지출 내역의 상세 정보를 보여주는 페이지입니다.
 * UI 전용 프로젝트이므로 더미 데이터를 사용합니다.
 * 
 * 실습: API를 연결하여 실제 데이터를 가져오도록 구현하세요.
 */
import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExpenseById } from '../utils/api';
import './ExpenseDetail.css';

function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadExpense();
  }, [id]);
  
  async function loadExpense(){
    setLoading(true);
    setError(null);
    try{
      const result = await getExpenseById(id);
      setExpense(result);
      console.log(result);
    }catch(err){
      setError(err.message || '지출 내역 조회 실패');
    }finally{
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="expense-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← 뒤로 가기
      </button>
      {error && (
        <div>{error}</div>
      )}
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

