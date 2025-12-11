/**
 * Layout 컴포넌트
 * 
 * 중첩 라우팅을 위한 공통 레이아웃 컴포넌트입니다.
 * NavigationBar와 Outlet을 포함하여 자식 라우트를 렌더링합니다.
 * 
 * 자식 라우트 정보 확인 방법:
 * 1. App.jsx에서 <Route element={<Layout />}> 안의 모든 <Route> 확인
 * 2. useLocation()으로 현재 경로 확인: location.pathname
 * 3. React DevTools로 컴포넌트 트리 확인
 */

import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import './Layout.css';

function Layout() {
  const location = useLocation();
  
  // 개발 모드에서 현재 자식 라우트 정보 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('현재 자식 라우트 경로:', location.pathname);
    console.log('자식 라우트 정보는 App.jsx의 <Route element={<Layout />}> 안에서 확인 가능');
  }
  
  return (
    <div className="layout">
      <NavigationBar />
      <main className="layout-main">
        {/* 
          자식 라우트가 여기에 렌더링됨
          자식 라우트 목록은 App.jsx에서 확인:
          - <Route element={<Layout />}> 안의 모든 <Route>
        */}
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>&copy; 2025 AI 지출 관리. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;

