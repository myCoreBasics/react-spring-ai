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
import { getUserById, createUser, updateUser } from '../utils/api';
import './UserDetail.css';

function UserDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isCreateMode = id === 'new';
  console.log(isCreateMode);

  const mode = searchParams.get('mode') || 'view';
  const isEditMode = mode === 'edit';

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFormMode = isCreateMode || isEditMode;
  
  // TODO: 폼 데이터 상태
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', // 등록 모드에서만 사용
    role: '일반사용자',
    status: '활성'
  });
  
  // TODO: 제출 관련 상태
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // ============================================
  // 사용자 데이터 로드
  // ============================================
  useEffect(() => {
   if(!isCreateMode){
    loadUser();
   }
  }, [id, isCreateMode]);
  

  async function loadUser(){
    try{
      setLoading(true);
      setError(null);
      const result = await getUserById(id);
      setUser(result);
      setFormData({
        name: result.name,
        email: result.email,
        password : '',
        role : result.role || '일반사용자',
        status : result.status || '활성'
      })
    }catch(error){
      setError(error.message || '사용자정보 조회 실패');
    }finally{
      setLoading(false);
    }
  }

  function handleEdit(){
    setSearchParams({ mode : 'edit'});
    setSubmitError(null);
    setSubmitSuccess(false);
  }

  function handleCancel(){
    if(isCreateMode){
      navigate('/users');
    }else{
      if(user){
        setFormData({
          name : user.name,
          email : user.email,
          password : '',
          role : user.role || '일반사용자',
          status : user.status || '활성'
        });
      }
      setSearchParams({});
    }
    setSubmitError(null);
    setSubmitSuccess(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSubmitError(null);
    setSubmitSuccess(false);
  }

async function handleSubmit(e){
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    // 유효성 검사
    try{
      if(isCreateMode){
        const newUser = await createUser({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          role : formData.role,
          status : formData.status
        });
        setSubmitSuccess(true);
        setTimeout(()=>{
          navigate('/users');
        }, 1500);
      }else{
        const updatedUser = await updateUser(id, {
          email : formData.email,
          name: formData.name,
          role: formData.role,
          status: formData.status,
        });
        setUser(updatedUser);
        setSubmitSuccess(true);
        setSearchParams({});

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }
    }catch(error){
      setSubmitError(error.message || '사용자 등록이 실패');
      setSubmitSuccess(false)
    }finally{
      setSubmitLoading(false);
    }
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

