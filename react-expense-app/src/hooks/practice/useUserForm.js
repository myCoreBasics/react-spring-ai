import { useState, useEffect } from 'react';
import { createUser, updateUserAdmin } from '../../utils/api';

export function useUserForm(initialData, isCreateMode, userId, onSuccess) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // TODO: initialData 변경 시 formData 업데이트 로직 구현
  }, [initialData, isCreateMode]);

  function handleChange(e) {
    // TODO: 입력값 변경 처리 로직 구현
  }

  function resetForm(originalData) {
    // TODO: 폼 초기화 로직 구현
  }

  async function handleSubmit(e) {
    // TODO: 폼 제출 처리 로직 구현
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

