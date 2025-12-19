import { useState, useEffect } from 'react'
import { getUserById } from '../utils/api';

export function useUserDetail(userId, isCreateMode) {
  const [user, setUser] = useState(null);
  const [loading, setLoding] = useState(!isCreateMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isCreateMode && userId){
      loadUser();
    }
  }, [userId, isCreateMode]);

  async function loadUser(){
    try {
      setLoding(true);
      setError(null);
      const result = await getUserById(userId);
      setUser(result);

    } catch (error) {
      setError(error.message || '사용자 정보를 불러오는데 실패했습니다.')
    } finally {
      setLoding(false);
    }
  }

  return {
    user, loading, error, refetch: loadUser
  }
  
}
