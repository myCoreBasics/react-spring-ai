/**
 * 컴포넌트 Props 타입 정의
 */

import type { ReactNode } from 'react';

// 모달 Props 타입
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

// 확인 모달 Props 타입
export interface ConfirmModalProps extends Omit<ModalProps, 'children' | 'title'> {
  onConfirm: () => void;
  message: string;
}

