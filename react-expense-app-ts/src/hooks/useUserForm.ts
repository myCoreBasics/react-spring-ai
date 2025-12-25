/**
 * 사용자 폼 상태를 관리하는 커스텀 훅
 */

import { useState, useEffect, useCallback } from 'react';
import { createUser, updateUser } from '../utils/api';
import type { User, CreateUserRequest, UpdateUserRequest } from '../types';

// 폼 데이터 타입
export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

// 훅 반환 타입
export interface UseUserFormReturn {
  formData: UserFormData;
  loading: boolean;
  error: string | null;
  success: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: (originalData?: Partial<UserFormData> | null) => void;
}

const defaultFormData: UserFormData = {
  name: '',
  email: '',
  password: '',
  role: '일반사용자',
  status: '활성',
};

export function useUserForm(
  initialData: Partial<UserFormData> | null,
  isCreateMode: boolean,
  userId: string | number | undefined,
  onSuccess?: (user: User) => void
): UseUserFormReturn {
  const [formData, setFormData] = useState<UserFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultFormData,
        ...initialData,
      });
    }
  }, [initialData, isCreateMode]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(false);
  }, []);

  const resetForm = useCallback((originalData?: Partial<UserFormData> | null) => {
    if (originalData) {
      setFormData({
        name: originalData.name || '',
        email: originalData.email || '',
        password: '',
        role: originalData.role || '일반사용자',
        status: originalData.status || '활성',
      });
    } else {
      setFormData(defaultFormData);
    }
    setError(null);
    setSuccess(false);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isCreateMode) {
        const userData: CreateUserRequest = {
          email: formData.email,
          name: formData.name,
          password: formData.password,
          role: formData.role,
          status: formData.status,
        };
        const newUser = await createUser(userData);

        setSuccess(true);
        if (onSuccess) {
          onSuccess(newUser);
        }
      } else {
        if (!userId) {
          throw new Error('사용자 ID가 필요합니다.');
        }
        
        const userData: UpdateUserRequest = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        };
        const updatedUser = await updateUser(userId, userData);

        setSuccess(true);
        if (onSuccess) {
          onSuccess(updatedUser);
        }

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : isCreateMode
          ? '사용자 등록 실패'
          : '사용자 정보 수정 실패';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [formData, isCreateMode, userId, onSuccess]);

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

