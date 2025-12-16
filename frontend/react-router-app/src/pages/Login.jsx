import React, { useState } from 'react';
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';
import '../styles/Login/Login.css';
import { CloseIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel,} from "@chakra-ui/form-control";
import {
  Box,
  VStack,
  Input,
  Button,
  Flex,
  Image,
  Link,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/input";
import { login } from '../services/authApi';
import Swal from 'sweetalert2';

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  function handleChange(e){
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await login(formData.userId, formData.password);
      
      if (response.data && response.data.success) {
        // 로그인 성공 시 localStorage에 로그인 상태 저장
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', response.data.userName || 'User_10');
        localStorage.setItem('userId', response.data.userId || formData.userId);
        localStorage.setItem('userEmail', response.data.userEmail || '');
        
        // 같은 탭에서 상태 변경을 감지하기 위한 커스텀 이벤트 발생
        window.dispatchEvent(new Event('loginStateChange'));
        
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: response.data?.message || '아이디 또는 비밀번호를 확인해주세요.'
        });
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      const errorMessage = error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  }

  function onForgotPassword(){
    console.log('비밀번호 찾기');
    navigate('/credentials');
  }

  return (
    <Box className="login-container">
      <Box className="login-card">
        <Heading className="login-title">로그인</Heading>
        <Text className="login-subtitle">
          다양한 기능을 사용하고 싶다면 로그인해주세요.
        </Text>
        <VStack 
          className="login-form"
          as="form" onSubmit={handleSubmit}
        >
          <FormControl>
            <FormLabel className="login-form-label">아이디</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="#BDBDBD" />
              </InputLeftElement>
              <Input 
                className="login-input"
                type="text" 
                placeholder="아이디를 입력하세요"
                name="userId"
                value={formData.userId}
                onChange={handleChange} 
              />
            </InputGroup>
          </FormControl>
          
          <FormControl>
            <FormLabel className="login-form-label-with-link">
              비밀번호
              <Link onClick={onForgotPassword} className="login-forgot-link">
                비밀번호를 잊으셨나요?
              </Link>
            </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="#BDBDBD" />
                </InputLeftElement>
                <Input 
                  className="login-input"
                  autoComplete="current-password" 
                  placeholder="비밀번호를 입력하세요"
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange} 
                />
              </InputGroup>
          </FormControl>
          
          <Button 
            className="login-button"
            variant='gradient'
            type="submit"
            isLoading={loading}
            loadingText="로그인 중..."
          >
            로그인
          </Button>
          <Text className="login-footer-text">
            아직 계정이 없으신가요?{' '}
            <Link className="login-signup-link" as={RouterLink} to='/register'>
              회원가입.
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}