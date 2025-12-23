# 📊 TypeScript 점진적 변환 - 의존성 분석 및 변환 순서

## 🔍 의존성 그래프

```
                           ┌─────────────────────────────────────────────────────────────┐
                           │                        main.tsx                              │
                           │                           │                                  │
                           │                        App.tsx                               │
                           │                           │                                  │
                           │          ┌────────────────┼────────────────┐                 │
                           │          │                │                │                 │
                           │    AuthContext      Layout.tsx      ProtectedRoute           │
                           │          │                │                │                 │
                           │          │         NavigationBar           │                 │
                           │          │                │                │                 │
                           │          └────────────────┼────────────────┘                 │
                           │                           │                                  │
                           │                      (uses)                                  │
                           │                           │                                  │
                           │                       api.ts                                 │
                           │                           │                                  │
                           │              ┌────────────┴────────────┐                     │
                           │              │                         │                     │
                           │         hooks/*.ts              pages/*.tsx                  │
                           │              │                         │                     │
                           │     ┌───────┴───────┐                  │                     │
                           │     │               │                  │                     │
                           │ useUserDetail  useUserForm       components/*.tsx            │
                           │                                        │                     │
                           │                                user/*.tsx                    │
                           └─────────────────────────────────────────────────────────────┘
```

---

## 📋 파일별 의존성 분석

### Level 0: 의존성 없음 (최우선 변환)

| 파일 | Import 대상 | 사용처 | 변환 난이도 |
|------|-------------|--------|------------|
| `src/types/index.ts` | - | 전체 | ✅ 완료 |
| `src/utils/api.jsx` | - | hooks, contexts, pages | ⭐ 쉬움 |

### Level 1: utils만 의존

| 파일 | Import 대상 | 사용처 | 변환 난이도 |
|------|-------------|--------|------------|
| `src/hooks/useUserDetail.js` | api.jsx | UserDetail.jsx | ⭐ 쉬움 |
| `src/hooks/useUserForm.js` | api.jsx | UserDetail.jsx | ⭐ 쉬움 |
| `src/contexts/AuthContext.jsx` | api.jsx | 여러 컴포넌트 | ⭐⭐ 보통 |

### Level 2: React Router만 의존 (독립적 컴포넌트)

| 파일 | Import 대상 | 사용처 | 변환 난이도 |
|------|-------------|--------|------------|
| `src/components/user/UserDetailHeader.jsx` | react-router-dom | UserDetail | ⭐ 쉬움 |
| `src/components/user/UserForm.jsx` | - (props만) | UserDetail | ⭐ 쉬움 |
| `src/components/user/UserInfo.jsx` | - (props만) | UserDetail | ⭐ 쉬움 |
| `src/components/pagination/Pagination.jsx` | - (props만) | Dashboard | ⭐ 쉬움 |

### Level 3: Context 의존

| 파일 | Import 대상 | 사용처 | 변환 난이도 |
|------|-------------|--------|------------|
| `src/components/NavigationBar.jsx` | AuthContext, react-router-dom | Layout | ⭐⭐ 보통 |
| `src/components/ProtectedRoute.jsx` | AuthContext, react-router-dom | App | ⭐ 쉬움 |

### Level 4: 여러 컴포넌트 조합

| 파일 | Import 대상 | 사용처 | 변환 난이도 |
|------|-------------|--------|------------|
| `src/components/Layout.jsx` | NavigationBar, react-router-dom | App | ⭐ 쉬움 |

### Level 5: 페이지 컴포넌트 (의존성 낮은 순)

| 파일 | Import 대상 | 변환 난이도 |
|------|-------------|------------|
| `src/pages/Home.jsx` | react, react-dom | ⭐⭐ 보통 |
| `src/pages/NotFound.jsx` | react | ⭐ 쉬움 |
| `src/pages/About.jsx` | react | ⭐ 쉬움 |
| `src/pages/Contack.jsx` | react | ⭐ 쉬움 |
| `src/pages/TaskList.jsx` | react | ⭐⭐ 보통 |
| `src/pages/OpenAIPractice.jsx` | react, openai | ⭐⭐ 보통 |
| `src/pages/UserProfile.jsx` | react, react-router-dom | ⭐ 쉬움 |

### Level 6: 페이지 컴포넌트 (Context/API 의존)

| 파일 | Import 대상 | 변환 난이도 |
|------|-------------|------------|
| `src/pages/Login.jsx` | AuthContext, react-router-dom | ⭐⭐ 보통 |
| `src/pages/Register.jsx` | AuthContext, api | ⭐⭐ 보통 |
| `src/pages/Upload.jsx` | api, react-router-dom | ⭐⭐ 보통 |
| `src/pages/UserList.jsx` | api, react-router-dom | ⭐⭐ 보통 |
| `src/pages/ExpenseDetail.jsx` | api, react-router-dom | ⭐⭐ 보통 |
| `src/pages/Dashboard.jsx` | api, Pagination | ⭐⭐ 보통 |

### Level 7: 페이지 컴포넌트 (복잡한 의존성)

| 파일 | Import 대상 | 변환 난이도 |
|------|-------------|------------|
| `src/pages/UserDetail.jsx` | hooks, user components | ⭐⭐⭐ 복잡 |

### Level 8: Practice 페이지 (독립적)

| 파일 | Import 대상 | 변환 난이도 |
|------|-------------|------------|
| `src/pages/practice/ShoppingCart.jsx` | react | ⭐⭐ 보통 |
| `src/pages/practice/ContactItem.jsx` | react | ⭐ 쉬움 |
| `src/pages/practice/ContactList.jsx` | react, ContactItem | ⭐⭐ 보통 |
| `src/pages/practice/PortalPatternDemo.jsx` | react, react-dom, lucide-react | ⭐⭐ 보통 |

### Level 9: 엔트리 포인트

| 파일 | Import 대상 | 변환 난이도 |
|------|-------------|------------|
| `src/App.jsx` | 모든 페이지, 컴포넌트 | ⭐⭐ 보통 |
| `src/main.jsx` | App | ⭐ 쉬움 |

---

## 🎯 권장 변환 순서

### 📦 Phase 1: 기반 레이어 (1일)

```
순서  파일                           상태     예상 시간
──────────────────────────────────────────────────────
1    src/types/index.ts             ✅ 완료   -
2    src/utils/api.jsx → api.ts     ⏳ 대기   30분
```

### 📦 Phase 2: 비즈니스 로직 (반나절)

```
순서  파일                                      상태     예상 시간
───────────────────────────────────────────────────────────────
3    src/hooks/useUserDetail.js → .ts          ⏳ 대기   20분
4    src/hooks/useUserForm.js → .ts            ⏳ 대기   20분
5    src/contexts/AuthContext.jsx → .tsx       ⏳ 대기   30분
```

### 📦 Phase 3: UI 컴포넌트 - User (반나절)

```
순서  파일                                              상태     예상 시간
──────────────────────────────────────────────────────────────────────
6    src/components/user/UserDetailHeader.jsx → .tsx   ⏳ 대기   15분
7    src/components/user/UserForm.jsx → .tsx           ⏳ 대기   20분
8    src/components/user/UserInfo.jsx → .tsx           ⏳ 대기   15분
```

### 📦 Phase 4: UI 컴포넌트 - Core (반나절)

```
순서  파일                                              상태     예상 시간
──────────────────────────────────────────────────────────────────────
9    src/components/pagination/Pagination.jsx → .tsx   ⏳ 대기   15분
10   src/components/ProtectedRoute.jsx → .tsx          ⏳ 대기   15분
11   src/components/NavigationBar.jsx → .tsx           ⏳ 대기   25분
12   src/components/Layout.jsx → .tsx                  ⏳ 대기   10분
```

### 📦 Phase 5: 페이지 - 간단한 것들 (반나절)

```
순서  파일                                    상태     예상 시간
────────────────────────────────────────────────────────────
13   src/pages/NotFound.jsx → .tsx           ⏳ 대기   5분
14   src/pages/About.jsx → .tsx              ⏳ 대기   5분
15   src/pages/Contack.jsx → .tsx            ⏳ 대기   5분
16   src/pages/UserProfile.jsx → .tsx        ⏳ 대기   15분
17   src/pages/TaskList.jsx → .tsx           ⏳ 대기   20분
```

### 📦 Phase 6: 페이지 - 인증 관련 (반나절)

```
순서  파일                                    상태     예상 시간
────────────────────────────────────────────────────────────
18   src/pages/Login.jsx → .tsx              ⏳ 대기   25분
19   src/pages/Register.jsx → .tsx           ⏳ 대기   30분
```

### 📦 Phase 7: 페이지 - 데이터 처리 (1일)

```
순서  파일                                    상태     예상 시간
────────────────────────────────────────────────────────────
20   src/pages/Upload.jsx → .tsx             ⏳ 대기   25분
21   src/pages/UserList.jsx → .tsx           ⏳ 대기   25분
22   src/pages/ExpenseDetail.jsx → .tsx      ⏳ 대기   25분
23   src/pages/Dashboard.jsx → .tsx          ⏳ 대기   30분
24   src/pages/UserDetail.jsx → .tsx         ⏳ 대기   40분
```

### 📦 Phase 8: 페이지 - 특수 기능 (반나절)

```
순서  파일                                    상태     예상 시간
────────────────────────────────────────────────────────────
25   src/pages/Home.jsx → .tsx               ⏳ 대기   30분
26   src/pages/OpenAIPractice.jsx → .tsx     ⏳ 대기   25분
```

### 📦 Phase 9: Practice 페이지 (반나절)

```
순서  파일                                              상태     예상 시간
──────────────────────────────────────────────────────────────────────
27   src/pages/practice/ContactItem.jsx → .tsx         ⏳ 대기   10분
28   src/pages/practice/ContactList.jsx → .tsx         ⏳ 대기   20분
29   src/pages/practice/ShoppingCart.jsx → .tsx        ⏳ 대기   25분
30   src/pages/practice/PortalPatternDemo.jsx → .tsx   ⏳ 대기   25분
```

### 📦 Phase 10: 엔트리 포인트 (30분)

```
순서  파일                                    상태     예상 시간
────────────────────────────────────────────────────────────
31   src/App.jsx → .tsx                      ⏳ 대기   20분
32   src/main.jsx → .tsx                     ⏳ 대기   10분
```

---

## 📊 요약 통계

| 카테고리 | 파일 수 | 예상 시간 |
|----------|---------|-----------|
| types | 1 | ✅ 완료 |
| utils | 1 | 30분 |
| hooks | 2 | 40분 |
| contexts | 1 | 30분 |
| components | 7 | 1시간 55분 |
| pages | 18 | 6시간 |
| practice | 4 | 1시간 20분 |
| entry | 2 | 30분 |
| **합계** | **36** | **약 11시간** |

---

## 🔄 변환 작업 흐름

각 파일 변환 시 다음 단계를 따릅니다:

### Step 1: 파일 확장자 변경
```bash
# .jsx → .tsx (컴포넌트)
# .js → .ts (유틸리티, 훅)
```

### Step 2: 타입 import 추가
```typescript
import { User, Expense, ModalProps } from '@/types';
```

### Step 3: Props 인터페이스 정의
```typescript
interface ComponentProps {
  id: string;
  onClose: () => void;
}
```

### Step 4: State 타입 지정
```typescript
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(true);
```

### Step 5: 이벤트 핸들러 타입 지정
```typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

### Step 6: 컴파일 에러 수정
```bash
pnpm build  # 타입 에러 확인
```

### Step 7: 기능 테스트
```bash
pnpm dev    # 브라우저에서 확인
```

---

## ⚡ 빠른 변환 명령어

```bash
# 1. 파일 확장자 일괄 변경 (수동 권장)
# 2. 빌드로 타입 에러 확인
pnpm build

# 3. 타입 체크만 실행
npx tsc --noEmit

# 4. 특정 파일만 체크
npx tsc --noEmit src/utils/api.ts
```

---

## ✅ 체크리스트

### Phase 1-2 (기반 레이어)
- [x] types/index.ts
- [ ] utils/api.ts
- [ ] hooks/useUserDetail.ts
- [ ] hooks/useUserForm.ts
- [ ] contexts/AuthContext.tsx

### Phase 3-4 (컴포넌트)
- [ ] components/user/UserDetailHeader.tsx
- [ ] components/user/UserForm.tsx
- [ ] components/user/UserInfo.tsx
- [ ] components/pagination/Pagination.tsx
- [ ] components/ProtectedRoute.tsx
- [ ] components/NavigationBar.tsx
- [ ] components/Layout.tsx

### Phase 5-8 (페이지)
- [ ] pages/NotFound.tsx
- [ ] pages/About.tsx
- [ ] pages/Contack.tsx
- [ ] pages/UserProfile.tsx
- [ ] pages/TaskList.tsx
- [ ] pages/Login.tsx
- [ ] pages/Register.tsx
- [ ] pages/Upload.tsx
- [ ] pages/UserList.tsx
- [ ] pages/ExpenseDetail.tsx
- [ ] pages/Dashboard.tsx
- [ ] pages/UserDetail.tsx
- [ ] pages/Home.tsx
- [ ] pages/OpenAIPractice.tsx

### Phase 9 (Practice)
- [ ] pages/practice/ContactItem.tsx
- [ ] pages/practice/ContactList.tsx
- [ ] pages/practice/ShoppingCart.tsx
- [ ] pages/practice/PortalPatternDemo.tsx

### Phase 10 (엔트리)
- [ ] App.tsx
- [ ] main.tsx

---

*작성일: 2025-12-22*
*프로젝트: react-ai-expense-manager*

