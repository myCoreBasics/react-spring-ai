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

import { useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useUserDetail} from '../hooks/useUserDetail';
import { useUserForm } from '../hooks/useUserForm';
import './UserDetail.css';
import UserDetailHeader from '../components/user/UserDetailHeader';
import UserForm from '../components/user/UserForm';
import UserInfo from '../components/user/UserInfo';

function UserDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isCreateMode = id === 'new';
  console.log(isCreateMode);

  const mode = searchParams.get('mode') || 'view';
  const isEditMode = mode === 'edit';

  const isFormMode = isCreateMode || isEditMode;
  // 사용자 데이터 로드 (커스텀 훅)
  const { user, loading, error, refetch } = useUserDetail(id, isCreateMode);

  const initialFormData = useMemo(() => {
    if(isCreateMode){
      return {
        name: '',
        email: '',
        password: '', // 등록 모드에서만 사용
        role: '일반사용자',
        status: '활성'
      }
    }
    if(user){
      return {
        name: user.name,
        email: user.email,
        password: '',
        role: user.role || '일반사용자',
        status: user.status || '활성',
      };
    }
    return{
      name: '',
      email: '',
      password: '', // 등록 모드에서만 사용
      role: '일반사용자',
      status: '활성'
    };
  }, [isCreateMode, user]);

  const handleSuccess = (updatedUser) => {
    if (isCreateMode){
      setTimeout(() =>{
        navigate('/users');
      }, 1500);
    }else{
      refetch();
      setSearchParams({});
    }
  };

  const {formData, loading : submitLoading, 
      error: submitError, 
      success : submitSuccess, 
      handleChange, handleSubmit, resetForm} = useUserForm(initialFormData, isCreateMode, id, handleSuccess);


  
  function handleEdit(){
    setSearchParams({ mode : 'edit'});
  }

  function handleCancel(){
    if(isCreateMode){
      navigate('/users');
    }else{
      resetForm(user);
      setSearchParams({});
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
        <UserDetailHeader isCreateMode={isCreateMode}  isFormMode={isFormMode}  handleEdit={handleEdit} />
        {isFormMode ? (
          /* 등록/수정 모드 */
          <UserForm 
            formData ={formData}
            loading = {submitLoading}
            error = {submitError}
            success = {submitSuccess}
            isCreateMode = {isCreateMode}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            handleCancel = {handleCancel}
            />
        ) : (
          /* 조회 모드 */
        <UserInfo user={user}/>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
