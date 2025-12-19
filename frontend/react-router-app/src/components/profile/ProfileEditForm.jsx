import { useState, useEffect } from 'react';
import '../../styles/profile/ProfileEditForm.css';
import { EmailIcon, AtSignIcon, CalendarIcon, LockIcon } from '@chakra-ui/icons';
import {
  Text,
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

// 사용자 아이콘 SVG 컴포넌트
function UserIcon({ color = "#BDBDBD", size = "20px" }) {
  const iconColor = color;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill={iconColor}
      />
      <path
        d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
        fill={iconColor}
      />
    </svg>
  );
}

export function ProfileEditForm({ user, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    userEmail: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        userEmail: user.userEmail || '',
        userName: user.userName || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 에러 초기화
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.userEmail) {
      newErrors.userEmail = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      newErrors.userEmail = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.userName) {
      newErrors.userName = '이름을 입력해주세요.';
    }

    if (formData.password && formData.password.length < 4) {
      newErrors.password = '비밀번호는 최소 4자 이상이어야 합니다.';
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const updateData = {
        userEmail: formData.userEmail,
        userName: formData.userName,
      };
      // 비밀번호가 입력된 경우에만 포함
      if (formData.password) {
        updateData.password = formData.password;
      }
      onSubmit(updateData);
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} className="profile-edit-form">
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.userEmail} isRequired>
          <FormLabel className="profile-form-label">이메일</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="#BDBDBD" />
            </InputLeftElement>
            <Input
              className="profile-edit-input"
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              disabled={isLoading}
            />
          </InputGroup>
          {errors.userEmail && (
            <Alert status="error">
              <AlertIcon />
              {errors.userEmail}
            </Alert>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.userName} isRequired>
          <FormLabel className="profile-form-label">이름</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <UserIcon color="#BDBDBD" />
            </InputLeftElement>
            <Input
              className="profile-edit-input"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              disabled={isLoading}
            />
          </InputGroup>
          {errors.userName && (
            <Alert status="error">
              <AlertIcon />
              {errors.userName}
            </Alert>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel className="profile-form-label">새 비밀번호 (선택사항)</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <LockIcon color="#BDBDBD" />
            </InputLeftElement>
            <Input
              className="profile-password-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 변경하려면 입력하세요."
              disabled={isLoading}
            />
          </InputGroup>
          {errors.password && (
            <Alert status="error">
              <AlertIcon />
              {errors.password}
            </Alert>
          )}
        </FormControl>

        {formData.password && (
          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel className="profile-form-label">비밀번호 확인</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="#BDBDBD" />
              </InputLeftElement>
              <Input
                className="profile-password-input"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요."
                disabled={isLoading}
              />
            </InputGroup>
            {errors.confirmPassword && (
              <Alert status="error">
                <AlertIcon />
                {errors.confirmPassword}
              </Alert>
            )}
          </FormControl>
        )}

        {user?.createdAt && (
          <FormControl>
            <FormLabel className="profile-form-label">가입일</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CalendarIcon color="#BDBDBD" />
              </InputLeftElement>
              <Input
                className="profile-createdAt-input"
                type="text"
                value={user.createdAt}
                isReadOnly
                placeholder="가입일"
              />
            </InputGroup>
          </FormControl>
        )}

        <Button
          className='profile-button'
          type="submit"
          variant='gradient'
          colorScheme="blue"
          color="white"
          isLoading={isLoading}
          loadingText="저장 중..."
        >
          저장
        </Button>
      </VStack>
    </Box>
  );
}
