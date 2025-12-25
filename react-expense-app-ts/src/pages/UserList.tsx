/**
 * UserList 페이지 컴포넌트 (UI 전용)
 *
 * 사용자 목록을 보여주는 페이지입니다.
 * UI 전용 프로젝트이므로 더미 데이터를 사용합니다.
 *
 * 실습: API를 연결하여 실제 사용자 목록을 가져오도록 구현하세요.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../utils/api';
import type { User } from '../types';
import './UserList.css';

function UserList() {
  // UI 전용: 더미 데이터 사용
  // 실습: useState와 useEffect를 사용하여 API에서 데이터를 가져오도록 변경하세요
  const [users, setUsers] = useState<User[]>([]);
  const [_loading, setLoading] = useState<boolean>(false);
  const [_error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError(null);
      const result = await getAllUsers();
      setUsers(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '사용자 목록을 불러오는데 실패';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h1>사용자 관리</h1>
        <Link to="/users/new" className="btn-primary">
          + 새 사용자 추가
        </Link>
      </div>

      {/* 사용자 목록이 없을 때 */}
      {users.length === 0 ? (
        <div className="empty-state">
          <p>등록된 사용자가 없습니다.</p>
          <Link to="/users/new" className="btn-primary">
            첫 사용자 추가하기
          </Link>
        </div>
      ) : (
        /* 사용자 목록 테이블 */
        <div className="user-list-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>사용자명</th>
                <th>이메일</th>
                <th>역할</th>
                <th>상태</th>
                <th>가입일</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <Link to={`/users/${user.id}`} className="user-link">
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('ko-KR')
                      : '-'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/users/${user.id}`} className="btn-link">
                        조회
                      </Link>
                      <Link
                        to={`/users/${user.id}?mode=edit`}
                        className="btn-link btn-edit"
                      >
                        수정
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;

