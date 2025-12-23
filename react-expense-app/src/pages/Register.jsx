/**
 * Register 페이지 컴포넌트
 * 
 * 사용자 회원가입을 처리하는 페이지입니다.
 * API를 통해 실제 회원가입 기능을 구현했습니다.
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { checkEmail } from '../utils/api'
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [emailError, setEmailError] = useState(null); 
  
  const navigate = useNavigate();
  const { signup } = useAuth();

  // 렌더링 사이에 값을 유지하면서도, 값 변경으로 리렌더를 발생시키지 않기 위해서
  const emailCheckTimeoutRef = useRef(null);

  async function validateEmail(email){

    // 이메일 형식 오류 확인
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(!email_regex.test(email)){ 
      setIsEmailAvailable(null)
      setEmailError(null)
      return null;
    }

    setIsCheckingEmail(true);
    setEmailError(null);
    try{
      const result = await checkEmail(email);
      if(result.available){
        setIsEmailAvailable(true);
        return true;
      }else{
        setIsEmailAvailable(false);
        return false;
      }
    }catch(error){
      setIsEmailAvailable(null);
      setEmailError('이메일 중복체크 오류가 발생했습니다.', error);
      return null;
    }finally{
      setIsCheckingEmail(false);
    }

  }

  useEffect(() => {

    if(emailCheckTimeoutRef.current){
      clearTimeout(emailCheckTimeoutRef.current);
      emailCheckTimeoutRef.current = null;
    }

    if(!formData.email){
      setIsEmailAvailable(null);
      setIsCheckingEmail(false);
      setEmailError(null);
      return;
    }

    emailCheckTimeoutRef.current = setTimeout( () => {
      validateEmail(formData.email);
      emailCheckTimeoutRef.cuurent = null;
    }, 500);

    return () => {
      if(emailCheckTimeoutRef.current){
        clearTimeout(emailCheckTimeoutRef.current);
        emailCheckTimeoutRef.current = null;
      }
    };
  }, [formData.email]);

  /**
   * 입력 필드 변경 핸들러
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // 에러 메시지 초기화
    if (error) setError(null);
  }

  /**
   * 폼 제출 핸들러
   * 실제 회원가입 API를 호출합니다.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // 이름 유효성 검증
    if (formData.name.length < 2 || formData.name.length > 50) {
      setError('이름은 2자 이상 50자 이하여야 합니다.');
      return;
    }

    if (isEmailAvailable == false){
      setError('이미 사용 중인 이메일입니다.')
      return;
    }

    if (isEmailAvailable === null && formData.email){
      const emailCheckResult = await validateEmail(formData.email);
      if(emailCheckResult == false){
        setError('이미 사용 중인 이메일입니다.');
        return;
      }else if(emailCheckResult == null){
        setError('오류 발생')
        return;
      }
    }

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 길이 확인
    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    try {
      const result = await signup(
        formData.email,
        formData.name,
        formData.password
      );
      
      if (result.success) {
        // 회원가입 성공 시 대시보드로 이동
        navigate('/dashboard', { replace: true });
      } else {
        setError(result.error || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error('회원가입 오류:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register">
      <div className="register-container">
        <h1>회원가입</h1>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="이름을 입력하세요 (2-50자)"
              minLength={2}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="이메일을 입력하세요"
            />
            {isCheckingEmail && (
              <span>확인중...</span>
            )}
            {!isCheckingEmail && isEmailAvailable === true && (
              <span>사용가능 이메일입니다.</span>
            )}
            {!isCheckingEmail && isEmailAvailable === false && (
              <span>이미 사용 중인 이메일입니다.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="비밀번호를 입력하세요 (최소 6자)"
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="비밀번호를 다시 입력하세요"
              minLength={6}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="register-footer">
          <p>
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="link">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;