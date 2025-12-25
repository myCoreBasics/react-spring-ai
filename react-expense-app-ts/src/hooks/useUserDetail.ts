/**
 * 사용자 상세 정보를 관리하는 커스텀 훅
 */

import { useState, useEffect, useCallback } from 'react';
import { getUserById } from '../utils/api';
import type { User } from '../types';

export interface UseUserDetailReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUserDetail(
  userId: string | number | undefined,
  isCreateMode: boolean
): UseUserDetailReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(!isCreateMode);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await getUserById(userId);
      setUser(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '사용자 정보 불러오기 실패';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!isCreateMode && userId) {
      loadUser();
    }
  }, [userId, isCreateMode, loadUser]);

  return { user, loading, error, refetch: loadUser };
}

