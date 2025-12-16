
export default function UserInfo({user}) {
  return (
    <div className="user-info">
    <div className="info-item">
        <label>사용자 ID</label>
        <div className="info-value">{user?.id}</div>
    </div>
    <div className="info-item">
        <label>이름</label>
        <div className="info-value">{user?.name}</div>
    </div>
    <div className="info-item">
        <label>이메일</label>
        <div className="info-value">{user?.email}</div>
    </div>
    <div className="info-item">
        <label>역할</label>
        <div className="info-value">
        <span className={`role-badge role-${user?.role === '관리자' ? 'admin' : 'user'}`}>
            {user?.role || '일반사용자'}
        </span>
        </div>
    </div>
    <div className="info-item">
        <label>상태</label>
        <div className="info-value">
        <span className={`status-badge status-${user?.status === '활성' ? 'active' : 'inactive'}`}>
            {user?.status || '활성'}
        </span>
        </div>
    </div>
    <div className="info-item">
        <label>가입일</label>
        <div className="info-value">
        {user?.createdAt 
            ? new Date(user.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
            : '-'}
        </div>
    </div>
    {user?.updatedAt && (
        <div className="info-item">
        <label>수정일</label>
        <div className="info-value">
            {new Date(user.updatedAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            })}
        </div>
        </div>
    )}
    </div>
  )
}
