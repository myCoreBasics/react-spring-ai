/**
 * 인증 상태를 관리하는 Context
 */

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { login as loginApi, signup as signupApi } from '../utils/api';
import type { AuthUser, AuthResponse } from '../types';

// Context 타입 정의
interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, name: string, password: string) => Promise<AuthResult>;
  logout: () => void;
}

// 인증 결과 타입
interface AuthResult {
  success: boolean;
  data?: AuthResponse;
  message?: string;
}

// Provider Props 타입
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AutoProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 초기 로드 시 로컬 스토리지에서 사용자 정보 복원
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser: AuthUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // 로그인
  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      const response = await loginApi({ email, password });

      const authUser: AuthUser = {
        userId: response.userId,
        email: response.email,
        name: response.name,
      };

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(authUser));

      setUser(authUser);
      setIsAuthenticated(true);

      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : '로그인 실패';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // 회원가입
  const signup = useCallback(async (email: string, name: string, password: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      console.log(email, name, password);
      const response = await signupApi({ email, name, password });

      const authUser: AuthUser = {
        userId: response.userId,
        email: response.email,
        name: response.name,
      };

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(authUser));

      setUser(authUser);
      setIsAuthenticated(true);

      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : '회원가입 실패';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // 로그아웃
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Context 값 메모이제이션
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      signup,
      logout,
    }),
    [user, isAuthenticated, loading, login, signup, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * 인증 Context를 사용하는 훅
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth는 AuthProvider 자식 컴포넌트에서만 사용할 수 있습니다.');
  }

  return context;
}

