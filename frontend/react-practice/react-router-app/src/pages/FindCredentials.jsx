import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { findCredentials } from '../services/authApi';
import Swal from 'sweetalert2';
import '../styles/credentials/FindCredentials.css';
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

export function FindCredentials() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('findPassword'); // findId / findPassword
  const [formData, setFormData] = useState({
    userEmail: '',
    password: '',
    userId: ''
  });

  function UserIcon({ color = "#BDBDBD", size = "20px" }) {
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
          fill={color}
        />
        <path
          d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
          fill={color}
        />
      </svg>
    );
  }

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
      if(mode === 'findId') {
        // 아이디 찾기 (이메일, 비밀번호 입력)
        const response = await findCredentials(formData.userEmail, formData.password);
        if (response.data && response.data.success) {
          navigate('/login');
        } else {
          Swal.fire({
            icon: 'error',
            title: '계정찾기 실패',
            text: response.data?.message || '아이디 또는 비밀번호를 확인해주세요.'
          });
        }
      } else if(mode === 'findPassword') {
        // 비밀번호 찾기 (아이디, 이메일, 비밀번호 입력)
        const response = await findCredentials(formData.userId, formData.userEmail, formData.password);
        if(response.data && response.data.success){
          Swal.fire({
            icon: 'success',
            title: '비밀번호 찾기 성공',
            text: `비밀번호 재설정을 위한 링크가 ${formData.userEmail}로 발송되었습니다.`
          });
          setMode('findId'); // 비밀번호 찾기 후 아이디 찾기 화면으로 돌아가기
        } else {
          Swal.fire({
            icon: 'error',
            title: '비밀번호 찾기 실패',
            text: response.data?.message || '입력하신 정보와 일치하는 계정을 찾을 수 없습니다.'
          });
        }
      }
    } catch (error) {
      console.error('계정찾기 오류:', error);
      const errorMessage = error.response?.data?.message || '계정찾기 중 오류가 발생했습니다.';
      Swal.fire({
        icon: 'error',
        title: '계정찾기 실패',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    setMode(prev => prev === 'findId' ? 'findPassword' : 'findId');
  }

  return (
    <Box className="findCredentials-container">
      <Box className="findCredentials-card">
        <Heading className="findCredentials-title">
          {mode === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}
        </Heading>
        <Text className="findCredentials-subtitle">
          {mode === 'findId' 
            ? '계정을 찾으려면 이메일과 비밀번호를 입력해주세요.'
            : '계정을 찾으려면 아이디, 이메일, 비밀번호를 입력해주세요.'}
        </Text>
        <VStack 
          className="findCredentials-form"
          as="form" 
          onSubmit={handleSubmit}
        >
          {mode === 'findId' ? (
            <>
              <FormControl>
                <FormLabel className="findCredentials-form-label-with-link">
                  이메일
                  <Button className="findCredentials-email-verification">이메일 인증</Button>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="#BDBDBD" />
                  </InputLeftElement>
                  <Input 
                    className="findCredentials-input"
                    type="text" 
                    placeholder="이메일을 입력하세요"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange} 
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <Flex justify="space-between" align="center">
                  <FormLabel className="findCredentials-form-label">
                    비밀번호
                  </FormLabel>
                  <Link
                    onClick={toggleMode}
                    className="findCredentials-forgot-link"
                  >
                    비밀번호를 잊으셨나요?
                  </Link>
                </Flex>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <LockIcon color="#BDBDBD" />
                  </InputLeftElement>
                  <Input 
                    className="findCredentials-input"
                    type="password" 
                    placeholder="비밀번호를 입력하세요"
                    name="password"
                    value={formData.password}
                    onChange={handleChange} 
                  />
                </InputGroup>
              </FormControl>

              <Button 
                className="findCredentials-button"
                variant='gradient'
                type="submit"
                isLoading={loading}
                loadingText="아이디 찾는 중..."
              >
                아이디 찾기
              </Button>
              <Text className="findCredentials-footer-text">
                계정이 있으신가요?{' '}
                <Link className="findCredentials-login-link" as={RouterLink} to='/login'>
                  로그인.
                </Link>
              </Text>
            </>
          ) : (
            <>
              <FormControl>
                <FormLabel className="findCredentials-form-label-with-link">
                  이메일
                  <Button className="findCredentials-email-verification">이메일 인증</Button>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="#BDBDBD" />
                  </InputLeftElement>
                  <Input 
                    className="findCredentials-input"
                    type="email" 
                    placeholder="가입한 이메일을 입력하세요"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange} 
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <Flex justify="space-between" align="center">
                  <FormLabel className="findCredentials-form-label">
                    아이디
                  </FormLabel>
                  <Link
                    onClick={toggleMode}
                    className="findCredentials-forgot-link"
                  >
                    아이디를 잊으셨나요?
                  </Link>
                </Flex>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <UserIcon color="#BDBDBD" />
                  </InputLeftElement>
                  <Input 
                    className="findCredentials-input"
                    type="text" 
                    placeholder="아이디를 입력하세요"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange} 
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel className="findCredentials-form-label">비밀번호</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <LockIcon color="#BDBDBD" />
                  </InputLeftElement>
                  <Input 
                    className="findCredentials-input"
                    type="password" 
                    placeholder="비밀번호를 입력하세요"
                    name="password"
                    value={formData.password}
                    onChange={handleChange} 
                  />
                </InputGroup>
              </FormControl>

              <Button 
                className="findCredentials-button"
                variant='gradient'
                type="submit"
                isLoading={loading}
                loadingText="비밀번호 찾는 중..."
              >
                비밀번호 찾기
              </Button>

              <Text className="findCredentials-footer-text">
                아직 계정이 없으신가요?{' '}
                <Link className="findCredentials-signup-link" as={RouterLink} to='/register'>
                  회원가입.
                </Link>
              </Text>
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
