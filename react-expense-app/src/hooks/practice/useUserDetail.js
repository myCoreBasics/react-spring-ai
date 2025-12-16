import { useState, useEffect } from 'react';
import { getUserById } from '../../utils/api';

export function useUserDetail(userId, isCreateMode) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!isCreateMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: 사용자 데이터 로드 로직 구현
  }, [userId, isCreateMode]);

  async function loadUser() {
    // TODO: loadUser 함수 구현
  }

  return {
    user,
    loading,
    error,
    refetch: loadUser,
  };
}

