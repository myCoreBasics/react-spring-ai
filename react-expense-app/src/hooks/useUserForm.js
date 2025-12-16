/**
 * 사용자 등록/수정 폼 커스텀 훅
 * 
 * 폼 상태 관리 및 제출 로직을 담당합니다.
 * 
 * @param {object} initialData - 폼 초기 데이터
 * @param {boolean} isCreateMode - 등록 모드 여부
 * @param {function} onSuccess - 성공 시 콜백 함수
 * @returns {object} { formData, loading, error, success, handleChange, handleSubmit, resetForm }
 */
import { useState, useEffect } from 'react';
import { createUser, updateUserAdmin } from '../utils/api';

export function useUserForm(initialData, isCreateMode, userId, onSuccess) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // initialData가 변경되면 formData 업데이트
  useEffect(() => {
    if (initialData) {
      if (isCreateMode) {
        // 등록 모드: 항상 초기값으로 설정
        setFormData(initialData);
      } else {
        // 수정 모드: 사용자 정보 로드 후 폼 데이터 설정
        setFormData(initialData);
      }
    }
  }, [initialData, isCreateMode]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(false);
  }

  function resetForm(originalData) {
    if (originalData) {
      setFormData({
        name: originalData.name,
        email: originalData.email,
        password: '',
        role: originalData.role || '일반사용자',
        status: originalData.status || '활성',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '일반사용자',
        status: '활성',
      });
    }
    setError(null);
    setSuccess(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 클라이언트 사이드 유효성 검증
    if (formData.name.length < 2 || formData.name.length > 50) {
      setError('이름은 2자 이상 50자 이하여야 합니다.');
      setLoading(false);
      return;
    }

    // 등록 모드일 때 비밀번호 검증
    if (isCreateMode) {
      if (formData.password.length < 6) {
        setError('비밀번호는 최소 6자 이상이어야 합니다.');
        setLoading(false);
        return;
      }
    }

    try {
      if (isCreateMode) {
        // 등록 모드: 사용자 생성
        const newUser = await createUser({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          role: formData.role,
          status: formData.status,
        });
        
        setSuccess(true);
        
        // 성공 콜백 호출
        if (onSuccess) {
          onSuccess(newUser);
        }
      } else {
        // 수정 모드: 사용자 정보 업데이트
        const updatedUser = await updateUserAdmin(parseInt(userId), {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        });
        
        setSuccess(true);
        
        // 성공 콜백 호출
        if (onSuccess) {
          onSuccess(updatedUser);
        }
        
        // 3초 후 성공 메시지 자동 숨김
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      setError(
        err.message || 
        (isCreateMode ? '사용자 추가에 실패했습니다.' : '사용자 정보 수정에 실패했습니다.')
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    formData,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

