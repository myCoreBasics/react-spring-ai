import { register } from '../services/authApi';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';
import '../styles/credentials/Register.css';
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

export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

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
      const response = await register(formData.userId, formData.password);

      if(response.data && response.data.success) {
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: response.data?.message || '다시 시도해주세요.'
        });
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  }

  function onForgotPassword(){
    console.log('비밀번호 찾기');
    navigate('/FindCredentials');
  }

  return (
    <Box className="register-container">
      <Box className="register-card">
        <Heading className="register-title">회원가입</Heading>
        <Text className="register-subtitle">
          다양한 기능을 사용하고 싶다면 회원가입해주세요.
        </Text>
        <VStack 
          className="register-form"
          as="form" 
          onSubmit={handleSubmit}
        >
          <FormControl>
            <FormLabel className="register-form-label-with-link">
              아이디
              <Link onClick={onForgotPassword} className="register-forgot-link">
                계정을 잊으셨나요?
              </Link>
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <UserIcon color="#BDBDBD" />
              </InputLeftElement>
              <Input 
                className="register-input"
                type="text" 
                placeholder="아이디를 입력하세요"
                name="userId"
                value={formData.userId}
                onChange={handleChange} 
              />
            </InputGroup>
          </FormControl>
          
          <FormControl>
            <FormLabel className="register-form-label-with-link">
              이메일
              <Button className="register-email-verification">이메일 인증</Button>
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="#BDBDBD" />
              </InputLeftElement>
              <Input 
                className="register-input"
                type="text" 
                placeholder="이메일를 입력하세요"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange} 
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel className="register-form-label">
              비밀번호
            </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="#BDBDBD" />
                </InputLeftElement>
                <Input 
                  className="register-input"
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
            className="register-button"
            variant='gradient'
            type="submit"
            isLoading={loading}
            loadingText="회원가입 중..."
          >
            회원가입
          </Button>
          <Text className="register-footer-text">
            계정이 있으신가요?{' '}
            <Link className="register-login-link" as={RouterLink} to='/login'>
              로그인.
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};