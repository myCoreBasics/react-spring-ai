/**
 * NavigationBar 컴포넌트
 */
import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import './NavigationBar.css';

const PRACTICE_MENUS = [
  {path:'/practice/openai', label:'OpenAI API 실습'},
  {path:'/practice/cart', label:'useReducer(cart)'},
];


function NavigationBar() {
  // 현재 경로 정보 가져오기
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* 로고/브랜드 */}
        <Link to="/" className="navbar-brand">
          💰 AI 지출 관리 (v0.0)
        </Link>
        
        {/* 메뉴 링크들 */}
        <div className="navbar-menu">
          <NavLink className='navbar-link' to="/">Home </NavLink>
          <NavLink className='navbar-link' to="/Dashboard">구매관리</NavLink>
          <NavLink className='navbar-link' to="/upload">영수증 업로드</NavLink>

          <div className='navbar-dropdown' 
              onMouseEnter={()=> setIsPracticeOpen(true)}
              onMouseLeave={()=> setIsPracticeOpen(false)}
            >
            <button className={`navebar-link navbar-dropdown-toggle ${location.pathname.startsWith('practice') ? 'active' : ''}`}
              onClick={()=> setIsPracticeOpen(!isPracticeOpen)} >추가학습  </button>
            {isPracticeOpen && (
              <div className='navbar-dropdown-menu'>
                {PRACTICE_MENUS.map(menu => (
                  <NavLink key={menu.path} to={menu.path}
                    className='navbar-dropdown-item' onClick={()=>setIsPracticeOpen(false)}>{menu.label} </NavLink>
                ))}
              </div>
            )}  

          </div>

          
          {/* 인증 상태에 따른 메뉴 (더미 데이터 사용) */}
          {isAuthenticated ? (
            <>
              <NavLink className='navbar-link' to="/users" >사용자 관리</NavLink>
              <div className="navbar-user">
                <span className="navbar-username">{user?.name || '사용자'}</span>
                <button onClick={handleLogout} className="navbar-logout">
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <NavLink className='navbar-link' to="/login"> 로그인 </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;

