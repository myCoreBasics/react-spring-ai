import { useNavigate } from 'react-router-dom';

export default function UserDetailHeader({isCreateMode, isFormMode, handleEdit}) {

  const navigate = useNavigate()

  return (
    <div className="user-detail-header">
      <div className="header-left">
        <button 
          onClick={() => navigate('/users')}
          className="btn-back"
        >
          ← 목록으로
        </button>
        <h1>
          {isCreateMode ? '새 사용자 등록' : '사용자 상세 정보'}
        </h1>
      </div>
      {!isFormMode && (
        <div className="header-actions">
          <button onClick={handleEdit} className="btn-secondary">
            수정
          </button>
        </div>
      )}
    </div>
  )
}
