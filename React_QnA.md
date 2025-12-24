### Q1-1. 이 프로젝트에 대해 설명해 주세요.

**✅ 모범 답변:**
```
React 교육 과정에서 진행한 AI 기반 지출 관리 웹 애플리케이션 실습 프로젝트입니다.

이 프로젝트를 통해 학습한 내용:
1. React의 컴포넌트 기반 개발 방식
2. React Router를 활용한 SPA(Single Page Application, 단일 페이지 애플리케이션) 라우팅
3. Context API를 이용한 전역 상태 관리
4. REST API 통신 및 비동기 처리
5. 사용자 인증(JWT) 구현 방법
6. TypeScript 점진적 도입

주요 기능:
- 영수증 이미지 업로드 및 AI 분석
- 지출 내역 조회 (페이지네이션)
- 사용자 로그인/회원가입
- 사용자 관리 CRUD
```

**💡 면접관이 보는 포인트:**
- 배운 기술을 명확히 정리해서 설명할 수 있는가
- 프로젝트의 목적과 기능을 이해하고 있는가

---

### Q1-2. 이 프로젝트에서 가장 많이 배운 것은 무엇인가요?

**✅ 모범 답변:**
```
가장 많이 배운 것은 "React의 상태 관리와 컴포넌트 설계"입니다.

구체적으로:

1. 상태의 종류 구분
   - 로컬 상태: 특정 컴포넌트에서만 필요한 데이터 (useState)
   - 전역 상태: 여러 컴포넌트에서 공유하는 데이터 (Context API)
   - 서버 상태: API로 가져오는 데이터

2. 컴포넌트 분리 기준
   - 재사용 가능한 UI 컴포넌트 (Layout, Modal)
   - 페이지 단위 컴포넌트 (Dashboard, UserList)
   - 비즈니스 로직은 Custom Hook으로 분리

3. Props와 State의 차이
   - Props: 부모에서 자식으로 전달되는 읽기 전용 데이터
   - State: 컴포넌트 내부에서 관리하는 변경 가능한 데이터
```

---

### Q1-3. 교육 과정에서 React를 선택한 이유가 있나요?

**✅ 모범 답변:**
```
교육 과정 커리큘럼에 포함되어 있었고, React를 배우면서 
프론트엔드 개발의 핵심 개념들을 함께 익힐 수 있었습니다.

React를 통해 배운 핵심 개념:
1. 컴포넌트 기반 아키텍처
2. 선언적 UI 프로그래밍
3. Virtual DOM과 효율적인 렌더링
4. 단방향 데이터 흐름
5. 상태 관리의 중요성

이러한 개념들은 Vue, Angular 등 다른 프레임워크에서도 
유사하게 적용되기 때문에, React를 깊이 이해하면 
다른 기술도 빠르게 습득할 수 있다고 생각합니다.
```

---

## 2. React 기초 개념 질문

### Q2-1. 컴포넌트란 무엇인가요?

**✅ 모범 답변:**
```
컴포넌트는 UI를 구성하는 독립적이고 재사용 가능한 조각입니다.

실습 프로젝트에서 만든 컴포넌트 예시:

1. Layout 컴포넌트 - 공통 레이아웃 (네비게이션, 푸터)
2. Modal 컴포넌트 - 재사용 가능한 모달 창
3. Pagination 컴포넌트 - 페이지 네비게이션
4. ProtectedRoute 컴포넌트 - 인증 보호 래퍼

컴포넌트의 장점:
- 코드 재사용성 향상
- 유지보수 용이
- 독립적인 테스트 가능
- 관심사 분리
```

**📍 프로젝트 코드 예시:**
```javascript
// Layout.jsx - 공통 레이아웃 컴포넌트
function Layout() {
  return (
    <div className="layout">
      <NavigationBar />
      <main className="layout-main">
        <Outlet />  {/* 자식 라우트가 여기에 렌더링 */}
      </main>
      <footer className="layout-footer">
        © 2025 AI 지출 관리 앱
      </footer>
    </div>
  );
}
```

---

### Q2-2. useState와 useEffect에 대해 설명해 주세요.

**✅ 모범 답변:**
```
React Hooks 중 가장 기본이 되는 두 가지입니다.

useState: 컴포넌트에 상태를 추가하는 Hook
```

```javascript
const [count, setCount] = useState(0);  // 초기값 0
setCount(count + 1);  // 상태 변경 → 리렌더링
```

```
useEffect: 부수 효과(Side Effect)를 처리하는 Hook
- API 호출
- 이벤트 리스너 등록/해제
- 타이머 설정
```

```javascript
// 실습 프로젝트 예시 - Dashboard.jsx
useEffect(() => {
  loadExpenses();  // 페이지 로드 시 데이터 조회
}, [currentPage]); // currentPage가 바뀔 때마다 실행
```

```
의존성 배열의 역할:
- [] : 마운트 시 1회만 실행
- [변수] : 해당 변수가 바뀔 때마다 실행
- 생략 : 매 렌더링마다 실행 (주의 필요)
```

---

### Q2-3. Props와 State의 차이점은 무엇인가요?

**✅ 모범 답변:**
```
| 구분 | Props | State |
|------|-------|-------|
| 정의 | 부모가 자식에게 전달하는 데이터 | 컴포넌트 내부에서 관리하는 데이터 |
| 변경 | 읽기 전용 (변경 불가) | setState로 변경 가능 |
| 방향 | 위에서 아래로 (단방향) | 컴포넌트 내부 |

실습 프로젝트 예시:
```

```javascript
// Props: 부모 → 자식으로 전달
<Modal 
  isOpen={isBasicModalOpen}      // Props
  onClose={() => setIsBasicModalOpen(false)}  // Props (함수)
  title="기본 모달"               // Props
>
  <p>모달 내용</p>
</Modal>

// State: 컴포넌트 내부 관리
function Dashboard() {
  const [expenses, setExpenses] = useState([]);     // State
  const [loading, setLoading] = useState(false);    // State
  const [currentPage, setCurrentPage] = useState(0); // State
}
```

---

### Q2-4. createPortal은 무엇이고 왜 사용하나요?

**✅ 모범 답변:**
```
createPortal은 컴포넌트를 DOM의 다른 위치에 렌더링하는 기능입니다.

문제 상황:
모달을 일반적으로 렌더링하면 부모 컴포넌트의 
CSS (z-index, overflow) 영향을 받아 제대로 표시되지 않을 수 있습니다.

해결 방법:
createPortal로 document.body에 직접 렌더링하면 
부모의 CSS 제약에서 벗어날 수 있습니다.
```

```javascript
// 실습에서 배운 Modal 컴포넌트
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body  // ← body에 직접 렌더링
  );
}
```

```
실습을 통해 배운 점:
- Portal의 개념과 필요성
- e.stopPropagation()으로 이벤트 버블링 방지
- 모달 접근성(a11y) 고려 (role, aria-modal)
```

---

## 3. 상태 관리 질문

### Q3-1. Context API는 무엇이고 언제 사용하나요?

**✅ 모범 답변:**
```
Context API는 React의 내장 전역 상태 관리 도구입니다.

사용하는 경우:
- 여러 컴포넌트에서 같은 데이터가 필요할 때
- Props를 여러 단계로 전달해야 할 때 (Prop Drilling 방지)

실습 프로젝트에서의 활용:
인증 상태(로그인 여부, 사용자 정보)를 전역으로 관리했습니다.
```

```javascript
// AuthContext.tsx - 전역 인증 상태
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 모든 자식 컴포넌트에서 접근 가능
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 사용하는 컴포넌트
function NavigationBar() {
  const { user, logout } = useAuth();  // Context 값 사용
  return <span>{user.name}님 환영합니다</span>;
}
```

---

### Q3-2. Custom Hook이란 무엇인가요?

**✅ 모범 답변:**
```
Custom Hook은 재사용 가능한 로직을 함수로 추출한 것입니다.
"use"로 시작하는 이름 규칙을 따릅니다.

실습 프로젝트에서 만든 Custom Hooks:
```

```javascript
// useUserDetail.ts - 사용자 정보 조회 로직
export function useUserDetail(userId, isCreateMode) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getUserById(userId);
      setUser(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { user, loading, error, refetch: loadUser };
}
```

```
Custom Hook의 장점 (실습에서 배운 것):
1. 컴포넌트 코드가 간결해짐
2. 같은 로직을 여러 컴포넌트에서 재사용
3. 테스트하기 쉬움
4. UI와 비즈니스 로직 분리
```

---

### Q3-3. useCallback과 useMemo는 언제 사용하나요?

**✅ 모범 답변:**
```
성능 최적화를 위해 값이나 함수를 "기억"해두는 Hook입니다.

useCallback: 함수를 메모이제이션
useMemo: 값을 메모이제이션
```

```javascript
// AuthContext.tsx에서 배운 예시

// 함수 메모이제이션 - 같은 함수 참조 유지
const login = useCallback(async (email, password) => {
  // 로그인 로직
}, []);

const logout = useCallback(() => {
  localStorage.removeItem('token');
  setUser(null);
}, []);

// 값 메모이제이션 - 불필요한 재생성 방지
const value = useMemo(
  () => ({ user, isAuthenticated, login, logout }),
  [user, isAuthenticated, login, logout]
);
```

```
실습에서 배운 사용 시점:
- 자식 컴포넌트에 함수를 전달할 때 (useCallback)
- Context value를 만들 때 (useMemo)
- 비용이 큰 계산 결과를 저장할 때 (useMemo)
```

---

## 4. 라우팅 관련 질문

### Q4-1. React Router의 기본 사용법을 설명해 주세요.

**✅ 모범 답변:**
```
React Router는 SPA(Single Page Application)에서 페이지 전환을 구현하는 라이브러리입니다.
페이지 새로고침 없이 URL만 바꿔서 화면을 전환합니다.

실습에서 배운 기본 구조:
```

```javascript
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

```
배운 주요 개념:
1. BrowserRouter - 라우터 최상위 래퍼
2. Routes, Route - 경로와 컴포넌트 매핑
3. Link - 페이지 이동 (새로고침 없이)
4. useNavigate - 프로그래밍 방식 이동
5. useParams - URL 파라미터 접근 (/users/:id)
6. Outlet - 중첩 라우트 렌더링 위치
```

---

### Q4-2. 중첩 라우팅(Nested Routes)이란?

**✅ 모범 답변:**
```
라우트 안에 또 다른 라우트를 배치하는 것입니다.
공통 레이아웃을 유지하면서 내용만 바꿀 때 유용합니다.

실습 프로젝트 구조:
```

```javascript
<Routes>
  {/* Layout 안에 여러 페이지 */}
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    
    {/* 인증 필요 페이지 그룹 */}
    <Route element={<ProtectedRoute />}>
      <Route path="/upload" element={<Upload />} />
      <Route path="/users" element={<UserList />} />
    </Route>
  </Route>
  
  {/* Layout 없이 독립적으로 */}
  <Route path="/login" element={<Login />} />
</Routes>
```

```
실습에서 배운 점:
- Outlet 컴포넌트로 자식 라우트 렌더링 위치 지정
- 공통 레이아웃(네비게이션, 푸터) 재사용
- 인증 체크를 그룹 단위로 적용 가능
```

---

### Q4-3. ProtectedRoute(인증 보호 라우트)는 어떻게 구현하나요?

**✅ 모범 답변:**
```
로그인하지 않은 사용자의 접근을 막는 컴포넌트입니다.

실습에서 구현한 방식:
```

```javascript
// ProtectedRoute.jsx
export default function ProtectedRoute({ redirectTo = '/login' }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 1. 로딩 중이면 로딩 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 2. 로그인 안 됐으면 로그인 페이지로 이동
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }}  // 원래 가려던 경로 저장
        replace 
      />
    );
  }

  // 3. 로그인 됐으면 자식 라우트 렌더링
  return <Outlet />;
}
```

```
실습에서 배운 점:
- useAuth() 훅으로 인증 상태 확인
- Navigate 컴포넌트로 리다이렉트
- state prop으로 원래 경로 전달 (로그인 후 복귀용)
- replace prop으로 히스토리에 안 남기기
```

---

## 5. API 통신 질문

### Q5-1. fetch API 사용법을 설명해 주세요.

**✅ 모범 답변:**
```
fetch는 JavaScript의 내장 HTTP 요청 함수입니다.

실습에서 배운 기본 사용법:
```

```javascript
// GET 요청
const response = await fetch('/api/users');
const data = await response.json();

// POST 요청
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: '홍길동', email: 'hong@email.com' }),
});
```

```
실습에서 배운 주의점:
1. fetch는 네트워크 에러만 reject됨
2. 404, 500 같은 HTTP 에러는 수동으로 처리 필요
3. response.ok로 성공 여부 확인
```

```javascript
// api.ts에서 배운 에러 처리 패턴
const response = await fetch(url, config);
const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || 'API 요청 실패');
}

return data;
```

---

### Q5-2. API 요청 코드를 어떻게 구조화했나요?

**✅ 모범 답변:**
```
모든 API 요청을 한 파일(api.ts)에 모아서 관리했습니다.

실습에서 배운 구조:
```

```typescript
// api.ts
const API_BASE_URL = 'http://localhost:3001';

// 공통 요청 함수
async function apiRequest<T>(endpoint: string, options = {}): Promise<T> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error('API 요청 실패');
  }
  
  return response.json();
}

// 개별 API 함수들
export const getAllUsers = () => apiRequest('/api/users');
export const getUserById = (id) => apiRequest(`/api/users/${id}`);
export const createUser = (data) => apiRequest('/api/users', {
  method: 'POST',
  body: JSON.stringify(data),
});
```

```
이렇게 구조화하면:
1. API URL 변경 시 한 곳만 수정
2. 인증 토큰 자동 추가
3. 에러 처리 일관성 유지
4. 컴포넌트 코드 간결해짐
```

---

### Q5-3. 비동기 처리와 로딩 상태는 어떻게 관리하나요?

**✅ 모범 답변:**
```
loading, error, data 세 가지 상태로 관리합니다.

실습에서 배운 패턴:
```

```javascript
// Dashboard.jsx
function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadExpenses() {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getAllExpenses();
      setExpenses(result);
    } catch (err) {
      setError(err.message || '데이터 조회 실패');
    } finally {
      setLoading(false);  // 성공/실패 상관없이 로딩 종료
    }
  }

  // 조건부 렌더링
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div>
      {expenses.map(expense => (
        <ExpenseCard key={expense.id} data={expense} />
      ))}
    </div>
  );
}
```

```
실습에서 배운 점:
- try-catch-finally 패턴
- 사용자 경험을 위한 로딩 UI
- 에러 메시지 표시
```

---

## 6. 인증 기능 질문

### Q6-1. JWT 인증 방식을 설명해 주세요.

**✅ 모범 답변:**
```
JWT(JSON Web Token)는 서버가 발급하는 인증 토큰입니다.

실습에서 배운 흐름:

1. 로그인 요청
   사용자 → 서버: { email, password }
   
2. 토큰 발급
   서버 → 사용자: { token: "eyJhbG..." }
   
3. 토큰 저장
   localStorage.setItem('token', token);
   
4. API 요청 시 토큰 포함
   Authorization: Bearer eyJhbG...
   
5. 서버에서 토큰 검증
   유효하면 요청 처리, 아니면 401 에러
```

```javascript
// 실습에서 구현한 로그인
const login = async (email, password) => {
  const response = await loginApi({ email, password });
  
  // 토큰 저장
  localStorage.setItem('token', response.token);
  localStorage.setItem('user', JSON.stringify(response.user));
  
  setIsAuthenticated(true);
};
```

---

### Q6-2. 로그인 상태를 어떻게 유지하나요?

**✅ 모범 답변:**
```
localStorage에 토큰을 저장하고, 앱 시작 시 확인합니다.

실습에서 구현한 방식:
```

```javascript
// AuthContext.tsx
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 앱 시작 시 저장된 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  // 로그아웃 시 토큰 삭제
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };
}
```

```
실습에서 배운 저장소 비교:
- localStorage: 브라우저 닫아도 유지
- sessionStorage: 탭 닫으면 삭제
- Cookie: 서버로 자동 전송됨
```

---

## 7. TypeScript 질문

### Q7-1. TypeScript를 배우면서 느낀 장점은?

**✅ 모범 답변:**
```
실습 프로젝트에서 TypeScript로 점진적 마이그레이션을 진행했습니다.

느낀 장점:

1. 에러 조기 발견
   JavaScript: 런타임에 에러 발생
   TypeScript: 코드 작성 중 에러 표시
   
2. 자동완성 지원
   타입이 정의되어 있으면 IDE가 속성/메서드 추천
   
3. 코드 문서화 효과
   타입 정의만 봐도 데이터 구조 파악 가능
   
4. 리팩토링 안정성
   타입 변경 시 영향받는 코드 즉시 확인
```

```typescript
// 타입 정의 예시 (실습에서 작성)
interface User {
  userId: number;
  email: string;
  name: string;
  role: string;
}

// 타입이 있으면 IDE가 도와줌
const user: User = await getUserById(1);
console.log(user.name);  // 자동완성 지원
```

---

### Q7-2. 타입 정의는 어떻게 했나요?

**✅ 모범 답변:**
```
types 폴더에 도메인별로 타입 파일을 분리했습니다.

실습에서 배운 구조:
```

```
src/types/
├── index.ts      # 모든 타입 re-export
├── user.ts       # 사용자 관련 타입
├── auth.ts       # 인증 관련 타입
├── expense.ts    # 지출 관련 타입
└── api.ts        # API 공통 타입
```

```typescript
// types/user.ts
export interface User {
  userId: number;
  email: string;
  name: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

// types/index.ts - 한 곳에서 export
export type { User, CreateUserRequest } from './user';
export type { AuthUser, LoginRequest } from './auth';

// 사용하는 곳
import type { User, AuthUser } from '../types';
```

---

## 8. 학습 경험 질문

### Q8-1. 교육 과정에서 어려웠던 점은 무엇인가요?

**✅ 모범 답변:**
```
처음에 React의 렌더링 사이클을 이해하는 것이 어려웠습니다.

어려웠던 점:
1. 왜 setState 후에 바로 값이 안 바뀌지?
   → 상태 업데이트는 비동기적으로 처리됨

2. useEffect가 왜 두 번 실행되지?
   → StrictMode에서 의도적으로 두 번 실행

3. 무한 루프가 왜 발생하지?
   → useEffect 의존성 배열 문제

해결 방법:
- 공식 문서 정독
- 콘솔 로그로 실행 순서 확인
- 강사님께 질문
- 디버깅 경험 축적

이 과정을 통해 React의 동작 원리를 더 깊이 이해하게 되었습니다.
```

---

### Q8-2. 실습 외에 추가로 학습한 것이 있나요?

**✅ 모범 답변:**
```
교육 과정 외에도 추가 학습을 진행했습니다.

1. 공식 문서 학습
   - React 공식 문서 (react.dev)
   - TypeScript 핸드북

2. 개인 실습
   - 실습 프로젝트에 새 기능 추가해보기
   - 다른 주제로 미니 프로젝트 만들기

3. 참고 자료
   - 기술 블로그 읽기
   - YouTube 강의

앞으로 더 공부하고 싶은 분야:
- React Query (서버 상태 관리)
- 테스트 코드 작성 (Jest, Testing Library)
- Next.js (서버 사이드 렌더링)
```

---

### Q8-3. 팀 프로젝트나 협업 경험이 있나요?

**✅ 모범 답변:**
```
교육 과정 중 팀 프로젝트/실습에서 협업을 경험했습니다.

경험한 것:
1. Git 기본 사용
   - 브랜치 생성, 커밋, 푸시
   - Pull Request 생성

2. 코드 공유
   - 다른 수강생 코드 참고
   - 같이 문제 해결

3. 소통
   - 막히는 부분 질문
   - 배운 것 공유

실무에서는 더 체계적인 협업이 필요하다는 것을 알고 있고,
Git Flow, 코드 리뷰 등을 입사 후 빠르게 익히고 싶습니다.
```

---

## 9. 트러블슈팅 질문

### Q9-1. 실습 중 겪은 문제와 해결 방법을 설명해 주세요.

**✅ 모범 답변 - 모달 관련 문제:**
```
문제 상황:
모달 열기 버튼 클릭 시 모달이 열렸다가 즉시 닫히는 현상

디버깅 과정:
1. console.log로 상태 변화 추적
2. isOpen이 true → false로 바로 바뀌는 것 확인
3. StrictMode에서 useEffect가 두 번 실행되는 것 확인

원인:
- useEffect의 의존성 배열에 onClose 함수 포함
- 매 렌더링마다 새 함수 생성 → useEffect 재실행

해결:
- useRef를 사용해 함수 참조 안정화
- 의존성 배열에서 onClose 제거
```

```javascript
// 해결 코드
const onCloseRef = useRef(onClose);
onCloseRef.current = onClose;

useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      onCloseRef.current();  // ref 통해 호출
    }
  };
  // ...
}, [isOpen]);  // onClose 제거
```

---

### Q9-2. 404 에러가 발생했을 때 어떻게 해결했나요?

**✅ 모범 답변:**
```
TypeScript 마이그레이션 중 404 에러 경험:

문제:
파일을 api.jsx → api.ts로 변환했는데
브라우저에서 여전히 api.jsx를 요청해서 404 에러

원인:
Vite의 모듈 캐시(node_modules/.vite)에 이전 경로가 남아있음

해결:
1. 캐시 폴더 삭제
   rm -rf node_modules/.vite
   
2. 개발 서버 재시작
   pnpm dev
   
3. 브라우저 강력 새로고침
   Cmd + Shift + R

배운 점:
- 파일 확장자나 경로 변경 시 캐시 문제 의심
- 개발 서버 재시작으로 해결되는 경우 많음
```

---


## 💡 면접 준비 체크리스트 (2-3년차 엔지니어 기준)

### ✅ 기술 질문 대비
- [ ] React 핵심 개념 (컴포넌트, Props, State) 설명 가능
- [ ] useState, useEffect 동작 원리 이해
- [ ] Context API 사용 이유와 방법 설명 가능
- [ ] API 통신 코드 작성 가능
- [ ] 기본적인 TypeScript 타입 정의 가능

### ✅ 기술 심화 질문 대비
- [ ] React 렌더링 최적화 (useMemo, useCallback, React.memo) 적용 경험
- [ ] 상태 관리 라이브러리 비교 (Context vs Redux vs Zustand vs React Query)
- [ ] TypeScript 제네릭, 유틸리티 타입 활용 경험
- [ ] 컴포넌트 설계 패턴 (Compound, Render Props, HOC) 이해
- [ ] 테스트 코드 작성 경험 (Jest, Testing Library)
- [ ] 번들 사이즈 최적화, 코드 스플리팅 경험
- [ ] CI/CD 파이프라인 구축 또는 참여 경험

### ✅ 프로젝트 설명 대비
- [ ] 프로젝트 기능 3문장으로 요약 가능
- [ ] 사용한 기술 스택 나열 가능
- [ ] 어려웠던 점과 해결 방법 1개 이상 준비
- [ ] 코드 보면서 설명할 수 있는 부분 준비

### ✅ 실무 경험 대비
- [ ] 담당했던 기능/서비스의 비즈니스 임팩트 설명 가능
- [ ] 기술 스택 선정 이유와 트레이드오프 설명 가능
- [ ] 성능 이슈 발견 및 개선 사례 준비
- [ ] 레거시 코드 리팩토링 경험 정리
- [ ] 코드 리뷰 문화 참여 경험 및 피드백 사례

### ✅ 협업/리더십 질문 대비
- [ ] 주니어 개발자 멘토링 또는 온보딩 경험
- [ ] 팀 내 기술 공유 (세미나, 문서화) 경험
- [ ] 타 직군(디자이너, PM, 백엔드)과 협업 사례
- [ ] 기술 부채 해결을 위한 제안 경험
- [ ] 프로젝트 일정 산정 및 커뮤니케이션 경험

### ✅ 아키텍처/설계 질문 대비
- [ ] 프로젝트 폴더 구조 설계 경험 및 이유 설명
- [ ] 공통 컴포넌트/유틸리티 설계 경험
- [ ] API 에러 핸들링 전략 수립 경험
- [ ] 인증/권한 관리 구조 설계 참여 경험


---

## 🎯 좋은 답변의 특징

1. **구체적인 예시 포함**
   - ❌ "React를 배웠습니다"
   - ✅ "useState와 useEffect를 사용해 API 데이터를 불러오고 화면에 표시하는 것을 배웠습니다"

2. **솔직한 태도**
   - ❌ "다 알고 있습니다"
   - ✅ "이 부분은 아직 실무 경험이 없지만, 기본 개념은 이해하고 있습니다"

3. **학습 의지 표현**
   - ❌ "모릅니다"
   - ✅ "아직 경험은 없지만, 관련 문서를 찾아보고 학습할 준비가 되어 있습니다"

4. **STAR 구조 활용** (상황-과제-행동-결과)
   - 상황: 모달이 즉시 닫히는 문제 발생
   - 과제: 원인 파악 및 해결 필요
   - 행동: console.log로 디버깅, useRef 적용
   - 결과: 문제 해결 및 React 동작 원리 이해

---

## 📝 이력서 교육 내용 작성 예시

### 버전 1: 한 줄 (간결)
```
React 프론트엔드 개발 과정 수료 (2025.12 - 2025.12)
```

### 버전 2: 두 줄 (기술 스택 포함)
```
React 프론트엔드 개발 과정 수료 (2025.12 - 2025.12)
- React, TypeScript, React Router, Context API, REST API 통신
```

### 버전 3: 세 줄 (실습 프로젝트 포함)
```
React 프론트엔드 개발 과정 수료 (2025.12 - 2025.12)
- 기술 스택: React 19, TypeScript, React Router 7, Vite
- 실습 프로젝트: AI 기반 지출 관리 웹 애플리케이션 개발
```

### 버전 4: 상세 (프로젝트 섹션용)
```
AI 지출 관리 웹 애플리케이션 (교육 프로젝트)
- 기간: 2025.12 - 2025.12
- 기술: React, TypeScript, React Router, Context API
- 역할: 프론트엔드 전체 개발
- 주요 기능: 영수증 AI 분석, 지출 CRUD, JWT 인증
```

### 버전 5: 포트폴리오용 (GitHub 링크 포함)
```
AI 지출 관리 웹 애플리케이션
[GitHub] https://github.com/username/react-expense-manager

• React 19 + TypeScript 기반 SPA 개발
• Context API + Custom Hook을 활용한 상태 관리
• JWT 인증 및 Protected Route 구현
• OpenAI API 연동 영수증 자동 분석 기능
```

---

### ⚠️ 이력서 작성 팁

| DO ✅ | DON'T ❌ |
|------|---------|
| 구체적인 기술명 기재 | "프론트엔드 배웠습니다" |
| 프로젝트 기능 간단히 설명 | 너무 긴 설명 |
| 수료 날짜 명시 | 날짜 누락 |
| 본인 역할 명시 | 모호한 표현 |

---

*이 문서는 교육 과정 수강생의 취업 면접 준비를 위해 작성되었습니다.*
