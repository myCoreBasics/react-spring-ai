/**
 * UserDetail 페이지 컴포넌트 (실습용 - UI 전용)
 * 
 * 관리자용 사용자 관리 페이지의 UI만 포함된 실습용 컴포넌트입니다.
 * 
 * 주요 기능 (실습 과제):
 * 1. 사용자 등록 (id가 'new'일 때)
 * 2. 사용자 상세 정보 조회 (id가 숫자일 때)
 * 3. 사용자 정보 수정 (관리자)
 * 
 * URL 구조:
 * - /users/new → 등록 모드
 * - /users/:id → 조회 모드
 * - /users/:id?mode=edit → 수정 모드
 * 
 * 실습 시 구현해야 할 내용:
 * - useParams, useNavigate, useSearchParams Hook 사용
 * - 등록 모드 확인 (id === 'new')
 * - 사용자 데이터 로드 (getAllUsers API)
 * - 등록/수정 폼 제출 처리 (createUser, updateUserAdmin API)
 * - 상태 관리 (useState, useEffect)
 * - 에러 처리 및 로딩 상태 관리
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
// TODO: API 함수 import
// import { getAllUsers, createUser, updateUserAdmin } from '../../utils/api';
import './UserDetail.css';

function UserDetail() {
  // TODO: React Router Hooks 사용
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  
  // TODO: 등록 모드 확인 (id가 'new'인 경우)
  // const isCreateMode = id === 'new';
  
  // TODO: URL 쿼리 파라미터에서 mode 확인 (기본값: 'view')
  // const mode = searchParams.get('mode') || 'view';
  // const isEditMode = mode === 'edit';
  
  // TODO: 등록 모드이거나 수정 모드일 때 폼 표시
  // const isFormMode = isCreateMode || isEditMode;
  
  // 임시 값 (실습 시 제거하고 실제 로직 구현)
  const isCreateMode = false;
  const isEditMode = false;
  const isFormMode = false;
  const navigate = () => {};
  const setSearchParams = () => {};

  // ============================================
  // 상태 관리
  // ============================================
  // TODO: 사용자 정보 관련 상태
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // TODO: 폼 데이터 상태
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', // 등록 모드에서만 사용
    role: '일반사용자',
    status: '활성',
  });
  
  // TODO: 제출 관련 상태
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // ============================================
  // 사용자 데이터 로드
  // ============================================
  useEffect(() => {
    // TODO: 등록 모드일 때는 사용자 정보를 로드하지 않음
    // if (isCreateMode) {
    //   setLoading(false);
    //   setFormData({
    //     name: '',
    //     email: '',
    //     password: '',
    //     role: '일반사용자',
    //     status: '활성',
    //   });
    //   return;
    // }
    // TODO: 수정 모드가 아닐 때만 사용자 정보 로드
    // loadUser();
  }, []); // TODO: 의존성 배열에 id, isCreateMode 추가

  // TODO: 사용자 정보 로드 함수 구현
  // async function loadUser() {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     
  //     // 모든 사용자 목록을 가져와서 해당 ID의 사용자 찾기
  //     // (API에 특정 사용자 조회 엔드포인트가 없으므로 목록에서 찾음)
  //     const users = await getAllUsers();
  //     const foundUser = users.find(u => u.id === parseInt(id));
  //     
  //     if (!foundUser) {
  //       setError('사용자를 찾을 수 없습니다.');
  //       setLoading(false);
  //       return;
  //     }
  //     
  //     setUser(foundUser);
  //     setFormData({
  //       name: foundUser.name,
  //       email: foundUser.email,
  //       password: '', // 수정 시에는 비밀번호 필드 사용 안 함
  //       role: foundUser.role || '일반사용자',
  //       status: foundUser.status || '활성',
  //     });
  //   } catch (err) {
  //     setError(err.message || '사용자 정보를 불러오는데 실패했습니다.');
  //     console.error('사용자 정보 로드 오류:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // ============================================
  // 수정 모드 관련 함수
  // ============================================
  // TODO: 수정 모드 전환 함수 구현
  function handleEdit() {
    // TODO: setSearchParams({ mode: 'edit' });
    // TODO: setSubmitError(null);
    // TODO: setSubmitSuccess(false);
  }

  // TODO: 취소 함수 구현
  function handleCancel() {
    // TODO: 등록 모드 취소: 목록으로 이동
    // if (isCreateMode) {
    //   navigate('/users');
    // } else {
    //   // 수정 모드 취소: 폼 데이터를 원래 값으로 복원
    //   if (user) {
    //     setFormData({
    //       name: user.name,
    //       email: user.email,
    //       password: '',
    //       role: user.role || '일반사용자',
    //       status: user.status || '활성',
    //     });
    //   }
    //   setSearchParams({}); // 조회 모드로 전환
    // }
    // TODO: setSubmitError(null);
    // TODO: setSubmitSuccess(false);
  }

  // TODO: 폼 입력 처리 함수 구현
  function handleChange(e) {
    // TODO: const { name, value } = e.target;
    // TODO: setFormData(prev => ({ ...prev, [name]: value }));
    // TODO: setSubmitError(null);
    // TODO: setSubmitSuccess(false);
  }

  // ============================================
  // 사용자 등록/수정 처리
  // ============================================
  // TODO: 폼 제출 처리 함수 구현
  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: setSubmitLoading(true);
    // TODO: setSubmitError(null);

    // TODO: 클라이언트 사이드 유효성 검증
    // if (formData.name.length < 2 || formData.name.length > 50) {
    //   setSubmitError('이름은 2자 이상 50자 이하여야 합니다.');
    //   setSubmitLoading(false);
    //   return;
    // }

    // TODO: 등록 모드일 때 비밀번호 검증
    // if (isCreateMode) {
    //   if (formData.password.length < 6) {
    //     setSubmitError('비밀번호는 최소 6자 이상이어야 합니다.');
    //     setSubmitLoading(false);
    //     return;
    //   }
    // }

    // TODO: API 호출
    // try {
    //   if (isCreateMode) {
    //     // 등록 모드: 사용자 생성
    //     const newUser = await createUser({
    //       email: formData.email,
    //       name: formData.name,
    //       password: formData.password,
    //       role: formData.role,
    //       status: formData.status,
    //     });
    //     
    //     setSubmitSuccess(true);
    //     
    //     // 등록 성공 시 목록으로 이동
    //     setTimeout(() => {
    //       navigate('/users');
    //     }, 1500);
    //   } else {
    //     // 수정 모드: 사용자 정보 업데이트
    //     const updatedUser = await updateUserAdmin(parseInt(id), {
    //       name: formData.name,
    //       email: formData.email,
    //       role: formData.role,
    //       status: formData.status,
    //     });
    //     
    //     setUser(updatedUser);
    //     setSubmitSuccess(true);
    //     setSearchParams({}); // 조회 모드로 전환
    //     
    //     setTimeout(() => {
    //       setSubmitSuccess(false);
    //     }, 3000);
    //   }
    // } catch (err) {
    //   setSubmitError(
    //     err.message || 
    //     (isCreateMode ? '사용자 추가에 실패했습니다.' : '사용자 정보 수정에 실패했습니다.')
    //   );
    // } finally {
    //   setSubmitLoading(false);
    // }
  }

  // ============================================
  // 로딩 상태
  // ============================================
  if (loading) {
    return (
      <div className="user-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // 에러 상태 (등록 모드가 아닐 때만)
  // ============================================
  if (!isCreateMode && error && !user) {
    return (
      <div className="user-detail">
        <div className="error-container">
          <h2>오류가 발생했습니다</h2>
          <p>{error}</p>
          <Link to="/users" className="btn-primary">
            사용자 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // ============================================
  // 렌더링
  // ============================================
  return (
    <div className="user-detail">
      <div className="user-detail-container">
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

        {submitError && (
          <div className="error-message">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="success-message">
            {isCreateMode 
              ? '사용자가 성공적으로 추가되었습니다.'
              : '사용자 정보가 성공적으로 업데이트되었습니다.'}
          </div>
        )}

        {isFormMode ? (
          /* 등록/수정 모드 */
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
                disabled={submitLoading}
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
                disabled={submitLoading}
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
                  disabled={submitLoading}
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
                disabled={submitLoading}
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
                disabled={submitLoading}
              >
                <option value="활성">활성</option>
                <option value="비활성">비활성</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={submitLoading}
              >
                {submitLoading 
                  ? (isCreateMode ? '등록 중...' : '저장 중...')
                  : (isCreateMode ? '사용자 등록' : '저장')}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
                disabled={submitLoading}
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          /* 조회 모드 */
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
        )}
      </div>
    </div>
  );
}

export default UserDetail;

