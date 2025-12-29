/**
 * 사용자 상세 페이지 헤더 컴포넌트
 */

import { useNavigate } from 'react-router-dom';

interface UserDetailHeaderProps {
  isCreateMode: boolean;
  isFormMode: boolean;
  handleEdit: () => void;
}

export default function UserDetailHeader({
  isCreateMode,
  isFormMode,
  handleEdit,
}: UserDetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="user-detail-header">
      <div className="header-left">
        <button onClick={() => navigate('/users')} className="btn-back">
          ← 목록으로
        </button>
        <h1>{isCreateMode ? '새 사용자 등록' : '사용자 상세 정보'}</h1>
      </div>
      {!isFormMode && (
        <div className="header-actions">
          <button onClick={handleEdit} className="btn-secondary">
            수정
          </button>
        </div>
      )}
    </div>
  );
}

