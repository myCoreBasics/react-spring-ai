/**
 * App 컴포넌트 (UI 전용)
 * 
 * 메인 애플리케이션 컴포넌트입니다.
 * React Router를 사용하여 페이지 라우팅을 처리합니다.
 * 
 * 이 프로젝트는 UI 전용 프로젝트로, 실제 기능은 구현되어 있지 않습니다.
 * 실습을 통해 단계적으로 기능을 추가할 수 있습니다.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import Upload from './pages/Upload';
import ExpenseDetail from './pages/ExpenseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
// 실습 1: 기본 라우팅 설정 컴포넌트
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* 중첩 라우팅: Layout을 부모로 하는 라우트들 */}
            <Route element={<Layout />}>
              {/* 실습 1: 기본 라우팅 설정 */}
              <Route path="/" element={<Home />} />
                {/* 인증이 필요한 라우트 */}
              <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
              <Route 
                  path="/tasks" 
                  element={
                    <ProtectedRoute>
                      <TaskList />
                    </ProtectedRoute>
                  } 
                />
              <Route 
                  path="/upload" 
                  element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  } 
                />
              <Route 
                  path="/expenses/:id" 
                  element={
                    <ProtectedRoute>
                      <ExpenseDetail />
                    </ProtectedRoute>
                  } 
                />
              <Route 
                  path="/users" 
                  element={
                    <ProtectedRoute>
                      <UserList />
                    </ProtectedRoute>
                  } 
                />
              <Route 
                  path="/users/:id" 
                  element={
                    <ProtectedRoute>
                      <UserDetail />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 페이지 - Layout 내부의 404 */}
                <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* 레이아웃 없이 표시되는 라우트 (인증 페이지) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;

