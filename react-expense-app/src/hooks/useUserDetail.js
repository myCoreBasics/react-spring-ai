/**
 * 사용자 상세 정보 로드 커스텀 훅
 * 
 * 특정 사용자의 정보를 로드하고 관리하는 로직을 담당합니다.
 * 
 * @param {string} userId - 사용자 ID (URL 파라미터에서 가져온 값)
 * @param {boolean} isCreateMode - 등록 모드 여부
 * @returns {object} { user, loading, error, refetch }
 */
import { useState, useEffect } from 'react';
import { getUserById } from '../utils/api';

export function useUserDetail(userId, isCreateMode) {
  const [user, setUser] = useState(null);
  // 등록 모드일 때는 로딩 불필요
  const [loading, setLoading] = useState(!isCreateMode);
  const [error, setError] = useState(null);

  // 등록 모드가 아닐 때만 사용자 정보 로드
  useEffect(() => {
    if (!isCreateMode && userId) {
      loadUser();
    }
  }, [userId, isCreateMode]);

  async function loadUser() {
    try {
      setLoading(true);
      setError(null);
      
      // 특정 사용자 정보 조회
      const foundUser = await getUserById(parseInt(userId));
      
      setUser(foundUser);
    } catch (err) {
      setError(err.message || '사용자 정보를 불러오는데 실패했습니다.');
      console.error('사용자 정보 로드 오류:', err);
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading,
    error,
    refetch: loadUser, // 수동으로 다시 로드할 수 있는 함수
  };
}



