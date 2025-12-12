import axios from 'axios';

/**
 * 인증 관련 API 서비스
 * 인증 API는 userId 파라미터가 필요 없으므로 별도 axios 인스턴스 사용
 */

const authApi = axios.create({
  baseURL: 'http://localhost:8080',
  // params 없이 사용 (로그인/회원가입에는 userId 파라미터 불필요)
});

export const login = async (userId, password) => {
  return authApi.post('/api/auth/login', {
    userId,
    password
  });
};

export const signup = async (userId, userEmail, password, userName) => {
  return authApi.post('/api/auth/signup', {
    userId,
    userEmail,
    password,
    userName
  });
};

export const logout = async () => {
  return authApi.post('/api/auth/logout');
};

export const updateUserProfile = async (updateData) => {
  return authApi.put('/api/auth/profile', updateData);
};

