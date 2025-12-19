import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { logout } from '../../services/authApi';
import Swal from 'sweetalert2';
import profileImg from '../../assets/profile.jpg';
import '../../styles/navigation/NavigationBar.css';
import { Box, Text, Image, Button } from "@chakra-ui/react";

export function NavigationBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // localStorage에서 로그인 상태 확인
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || 'User_10';
      setIsLoggedIn(loggedIn);
      setUserName(name);
    };
    
    checkLoginStatus();
  }, []);

  // localStorage 변경 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || 'User_10';
      setIsLoggedIn(loggedIn);
      setUserName(name);
    };

    window.addEventListener('storage', handleStorageChange);
    // 같은 탭에서의 변경도 감지하기 위해 커스텀 이벤트 사용
    window.addEventListener('loginStateChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('loginStateChange', handleStorageChange);
    };
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };
  // const handleUpdateProfile = async () => {
  //   // 프로필 업데이트 기능 (향후 구현)
  // }

  const handleLogout = async () => {
    try {
      await logout();
      
      // localStorage에서 로그인 정보 제거
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      
      // 상태 변경 이벤트 발생
      window.dispatchEvent(new Event('loginStateChange'));
      
      setIsDropdownOpen(false);
      
      Swal.fire({
        icon: 'success',
        title: '로그아웃 완료',
        text: '안전하게 로그아웃되었습니다.',
        timer: 1000,
        showConfirmButton: false
      });
      
      navigate('/Login');
    } catch (error) {
      console.error('로그아웃 오류:', error);
      // 오류가 발생해도 로컬에서 로그아웃 처리
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      window.dispatchEvent(new Event('loginStateChange'));
      setIsDropdownOpen(false);
      navigate('/Login');
    }
  };

  const handleMyPage = async () => {
    try {
      setIsDropdownOpen(false);
      navigate('/profile');
    } catch (error) {
      console.error('마이페이지 이동 오류:', error);
      navigate('/');
    }
  }

  return (
    <nav>
      <Box className="nav-profile-container" ref={dropdownRef}>
        {!isLoggedIn ? (
          <Box className="nav-profile">
            <NavLink to="/login">Login</NavLink>
          </Box>
        ) : (
          <>
            <Box 
              className="nav-profile nav-profile-clickable"
              onClick={handleProfileClick}
            >
              <Image src={profileImg} alt="profile" />
              <Text>{userName}</Text>
            </Box>
            {isDropdownOpen && (
              <Box className="nav-dropdown">
                <Button
                  className="nav-dropdown-item"
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  fontSize="15px"
                  fontWeight="500"
                  color="#4b5563"
                  onClick={handleMyPage}
                >
                  MyPage
                </Button>
                <Button
                  className="nav-dropdown-item"
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  fontSize="15px"
                  fontWeight="500"
                  color="#4b5563"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

      <Box className="nav-links">
        <Box>
          <NavLink to="/">Home</NavLink>
        </Box>
        {/* <Box>
          <NavLink to="/profile">Mypage</NavLink>
        </Box> */}
        <Box>
          <NavLink to="/tasks">Task Dashboard</NavLink>
        </Box>
      </Box>
    </nav>
  );
}