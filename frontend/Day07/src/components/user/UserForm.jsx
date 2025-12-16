
export default function UserForm({formData, loading, error, success, isCreateMode, handleChange, handleSubmit, handleCancel}) {
  return (
    <>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          {isCreateMode 
            ? '사용자가 성공적으로 추가되었습니다.'
            : '사용자 정보가 성공적으로 업데이트되었습니다.'}
        </div>
      )}
      <form onSubmit={handleSubmit} className="user-detail-form">
        <div className="form-group">
          <label htmlFor="name">이름 *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            minLength={2}
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일 *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* 등록 모드일 때만 비밀번호 필드 표시 */}
        {isCreateMode && (
          <div className="form-group">
            <label htmlFor="password">비밀번호 *</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              minLength={6}
            />
            <small>최소 6자 이상 입력해주세요.</small>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="role">역할</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="일반사용자">일반사용자</option>
            <option value="관리자">관리자</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">상태</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="활성">활성</option>
            <option value="비활성">비활성</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading 
              ? (isCreateMode ? '등록 중...' : '저장 중...')
              : (isCreateMode ? '사용자 등록' : '저장')}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary"
            disabled={loading}
          >
            취소
          </button>
        </div>
      </form>

    </>
  )
}
