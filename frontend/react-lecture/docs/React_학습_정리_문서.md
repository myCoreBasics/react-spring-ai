# React 학습 정리 문서

## 📚 목차
1. [Day 01: React 기초와 ES6 문법](#day-01-react-기초와-es6-문법)
2. [Day 02: React 컴포넌트 구조](#day-02-react-컴포넌트-구조)
3. [Day 03: React 컴포넌트 심화](#day-03-react-컴포넌트-심화)
4. [Day 04: State 관리와 Reducer 패턴](#day-04-state-관리와-reducer-패턴)
5. [Day 05: API 연동과 비동기 처리](#day-05-api-연동과-비동기-처리)
6. [Day 06: React Router를 활용한 라우팅](#day-06-react-router를-활용한-라우팅)
7. [Day 07: Context API를 활용한 전역 상태 관리](#day-07-context-api를-활용한-전역-상태-관리)
8. [Day 08-09: 실전 프로젝트 - 지출 관리 앱](#day-08-09-실전-프로젝트---지출-관리-앱)
9. [Day 10: Next.js 기초](#day-10-nextjs-기초)

---

# Day 01: React 기초와 ES6 문법

## 📋 사용된 명령어 및 개념

### 1. const / let (변수 선언)

**정의**
- `const`: 상수 선언, 재할당 불가 (기본적으로 사용)
- `let`: 변수 선언, 재할당 가능 (값이 변경되어야 할 때만 사용)

**중요 내용**
- React에서는 불변성을 유지하기 위해 `const`를 기본으로 사용
- `var`는 사용하지 않음 (호이스팅 문제, 함수 스코프)
- `const`로 선언해도 객체나 배열의 내부 값은 변경 가능

**사용 예제**
```javascript
const topic = "React Integration";  // 상수 (기본 사용)
let progress = 0;                    // 변수 (값 변경 필요 시)
progress = 100;                      // 재할당 가능
```

---

### 2. 템플릿 리터럴 (Template Literals)

**정의**
- 백틱(`)을 사용하여 문자열과 변수를 함께 표현하는 문법
- `${변수명}` 형태로 변수를 삽입

**중요 내용**
- 반드시 백틱(`)을 사용해야 함 (작은따옴표나 큰따옴표는 변수 치환 안 됨)
- 여러 줄 문자열 작성 가능
- 표현식도 사용 가능

**사용 예제**
```javascript
const topic = "React Integration";
const year = 2025;
const progress = 100;

// 템플릿 리터럴 사용
const message = `Class: ${topic}, Year: ${year}, Progress: ${progress}%`;

// 여러 줄 문자열
const multiLine = `
  첫 번째 줄
  두 번째 줄
  세 번째 줄
`;

// 표현식 사용
const result = `결과: ${progress > 50 ? '성공' : '실패'}`;
```

---

### 3. 구조 분해 할당 (Destructuring)

**정의**
- 객체나 배열의 값을 변수로 추출하는 문법
- 코드를 간결하게 만들어줌

**중요 내용**
- 객체의 중첩된 속성도 추출 가능
- 기본값 설정 가능
- 배열도 구조 분해 할당 가능

**사용 예제**
```javascript
// 객체 구조 분해 할당
const developer = {
  id: 1,
  name: "Kim",
  skills: {
    frontend: "React",
    backend: "Java"
  }
};

// 기본 구조 분해
const { name, id } = developer;
console.log(name); // "Kim"

// 중첩된 객체 구조 분해
const { name, skills: { backend } } = developer;
console.log(backend); // "Java"

// 기본값 설정
const { name, age = 25 } = developer;

// 배열 구조 분해
const numbers = [1, 2, 3];
const [first, second, third] = numbers;
console.log(first); // 1
```

---

### 4. 전개 연산자 (Spread Operator)

**정의**
- `...` 연산자를 사용하여 객체나 배열을 펼치는 문법
- 기존 객체/배열을 복사하거나 병합할 때 사용

**중요 내용**
- React에서 불변성을 유지하면서 상태를 업데이트할 때 필수
- 얕은 복사(shallow copy)를 수행
- 객체나 배열을 새로 생성하여 원본을 변경하지 않음

**사용 예제**
```javascript
const developer = {
  id: 1,
  name: "Kim",
  skills: {
    frontend: "React",
    backend: "Java"
  }
};

// 기존 객체를 복사하고 새로운 필드 추가
const updatedDeveloper = {
  ...developer,           // 기존 내용 복사
  role: "Full Stack",     // 새로운 필드 추가
  name: "Kim (Promoted)"  // 기존 필드 덮어쓰기
};

console.log(developer);        // 원본은 변하지 않음
console.log(updatedDeveloper);  // 새 객체 생성

// 배열에서 사용
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
```

---

### 5. 배열 메서드 - filter()

**정의**
- 배열에서 조건에 맞는 요소만 추출하여 새 배열을 반환하는 메서드
- 원본 배열은 변경하지 않음

**중요 내용**
- 조건을 만족하는 모든 요소를 반환
- 빈 배열을 반환할 수도 있음
- React에서 리스트 필터링에 자주 사용

**사용 예제**
```javascript
const products = [
  { id: 1, name: "Laptop", price: 1000, inStock: true },
  { id: 2, name: "Phone", price: 500, inStock: false },
  { id: 3, name: "Mouse", price: 50, inStock: true }
];

// 재고가 있는 상품만 필터링
const availableProducts = products.filter(p => p.inStock);
// 결과: [{ id: 1, name: "Laptop", ... }, { id: 3, name: "Mouse", ... }]

// 가격이 100 이상인 상품 필터링
const expensiveProducts = products.filter(p => p.price >= 100);
```

---

### 6. 배열 메서드 - map()

**정의**
- 배열의 각 요소를 변환하여 새 배열을 반환하는 메서드
- UI 렌더링에 필수적으로 사용

**중요 내용**
- 원본 배열은 변경하지 않음
- 각 요소를 변환하여 새 배열 생성
- React에서 리스트를 렌더링할 때 사용

**사용 예제**
```javascript
const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Mouse", price: 50 }
];

// 상품 객체를 문자열로 변환
const productListUI = products.map(p => 
  `<div>${p.name} - $${p.price}</div>`
);

// React에서 사용 예시
const ProductList = () => {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          {product.name} - ${product.price}
        </div>
      ))}
    </div>
  );
};
```

---

### 7. 화살표 함수 (Arrow Function)

**정의**
- `function` 키워드 대신 `=>`를 사용하여 함수를 선언하는 문법
- 더 간결한 문법 제공

**중요 내용**
- `this` 바인딩이 다름 (lexical this)
- React에서 이벤트 핸들러나 콜백 함수에 자주 사용
- 한 줄일 때는 중괄호와 return 생략 가능

**사용 예제**
```javascript
// 일반 함수
function add(a, b) {
  return a + b;
}

// 화살표 함수
const add = (a, b) => {
  return a + b;
};

// 한 줄일 때 (자동 return)
const add = (a, b) => a + b;

// 매개변수가 하나일 때 괄호 생략 가능
const square = x => x * x;

// 배열 메서드와 함께 사용
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8]
```

---

### 8. 비동기 처리 (Async/Await)

**정의**
- 비동기 작업을 동기 코드처럼 작성할 수 있게 해주는 문법
- `async` 함수 내에서 `await`를 사용하여 Promise를 기다림

**중요 내용**
- `async` 함수는 항상 Promise를 반환
- `await`는 Promise가 완료될 때까지 기다림
- `try-catch`로 에러 처리 필요
- React에서 API 호출 시 필수적으로 사용

**사용 예제**
```javascript
// Promise를 반환하는 함수
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId: "user_01", userName: "Lee Manager" });
    }, 1000);
  });
};

// async/await 사용
const executeAsyncLogic = async () => {
  try {
    console.log("데이터 로딩 시작...");
    
    // await: 데이터가 올 때까지 기다림
    const user = await fetchUserData();
    
    console.log(`[서버 응답 완료] 환영합니다, ${user.userName}님!`);
  } catch (error) {
    console.error("에러 발생:", error);
  }
};

// React 컴포넌트에서 사용
const UserComponent = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error("사용자 데이터 로드 실패:", error);
      }
    };
    loadUser();
  }, []);
  
  return <div>{user?.userName}</div>;
};
```

---

### 9. 단축 평가 (Short-circuit Evaluation)

**정의**
- 논리 연산자(`&&`, `||`)를 사용하여 조건부 실행이나 기본값 설정을 간단하게 하는 문법

**중요 내용**
- `&&`: 앞이 true면 뒤를 실행 (조건부 렌더링에 사용)
- `||`: 앞이 false(null, undefined 등)면 뒤를 실행 (기본값 설정)
- React에서 조건부 렌더링에 자주 사용

**사용 예제**
```javascript
const isLoggedIn = true;
const userName = "Park";
const userTitle = null;

// && 연산자: 조건부 실행
// React에서 {isLoggedIn && <LogoutButton />} 형태로 많이 사용
isLoggedIn && console.log(`${userName}님, 로그인 되었습니다.`);

// || 연산자: 기본값 설정
const displayTitle = userTitle || "Guest"; // userTitle이 없으면 "Guest"
console.log(`사용자 타이틀: ${displayTitle}`); // "Guest"

// React에서 조건부 렌더링
const Component = () => {
  const [user, setUser] = useState(null);
  
  return (
    <div>
      {user && <UserProfile user={user} />}
      {!user && <LoginButton />}
      <h1>{user?.name || "Guest"}</h1>
    </div>
  );
};
```

---

### 10. useState Hook

**정의**
- React Hook 중 하나로, 함수 컴포넌트에서 상태(state)를 관리할 수 있게 해주는 Hook
- 상태가 변경되면 컴포넌트가 자동으로 리렌더링됨

**중요 내용**
- 배열 구조 분해 할당으로 사용: `const [state, setState] = useState(초기값)`
- 상태는 직접 변경하지 않고 setter 함수를 사용해야 함
- 상태 업데이트는 비동기적으로 처리됨
- 객체나 배열을 업데이트할 때는 불변성을 유지해야 함

**사용 예제**
```jsx
import { useState } from "react";

// 기본 사용법
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>React Counter</h2>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <p>{count}</p>
    </div>
  );
}

// 객체 상태 관리
function UserProfile() {
  const [user, setUser] = useState({ name: "", age: 0 });
  
  const updateName = (name) => {
    setUser({ ...user, name }); // 불변성 유지
  };
  
  return <div>{user.name}</div>;
}

// 배열 상태 관리
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]); // 불변성 유지
  };
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

---

### 11. Vanilla JavaScript vs React

**정의**
- **Vanilla JS**: 순수 JavaScript로 DOM을 직접 조작하는 방식
- **React**: 선언형 프로그래밍 방식으로 Virtual DOM을 통해 UI를 관리

**중요 내용**
- Vanilla JS는 명령형(어떻게 할지), React는 선언형(무엇을 할지)
- React는 상태 기반으로 UI가 자동 업데이트됨
- React는 컴포넌트 재사용성과 유지보수성이 높음

**사용 예제**
```javascript
// Vanilla JS 방식 (명령형)
const button = document.getElementById('btn');
const counter = document.getElementById('counter');
let count = 0;

button.addEventListener('click', () => {
  count++;
  counter.textContent = count; // 직접 DOM 조작
});
```

```jsx
// React 방식 (선언형)
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <p>{count}</p> {/* 상태가 변경되면 자동으로 업데이트 */}
    </div>
  );
}
```

---

# Day 02: React 컴포넌트 구조

## 📋 사용된 명령어 및 개념

### 1. React 컴포넌트

**정의**
- 재사용 가능한 UI 단위
- 함수나 클래스로 정의할 수 있으며, 현재는 함수 컴포넌트를 주로 사용
- JSX를 반환하여 UI를 구성

**중요 내용**
- 컴포넌트 이름은 대문자로 시작해야 함
- 하나의 컴포넌트는 하나의 최상위 요소를 반환해야 함
- 작은 컴포넌트들을 조합하여 큰 애플리케이션 구성
- 컴포넌트는 독립적이고 재사용 가능해야 함

**사용 예제**
```jsx
// 함수 컴포넌트 정의
export default function Game() {
  return (
    <div>
      <Board />
    </div>
  );
}

// 컴포넌트 계층 구조
// App
// └── Game
//     └── Board
//         └── Square (9개)
```

---

### 2. Props (Properties)

**정의**
- 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법
- 함수의 매개변수와 유사

**중요 내용**
- Props는 읽기 전용 (불변성 유지)
- Props를 통해 컴포넌트 간 데이터 전달
- 객체 구조 분해 할당으로 받는 것이 일반적
- 기본값 설정 가능

**사용 예제**
```jsx
// 부모 컴포넌트에서 Props 전달
function App() {
  return <Square value="X" handleClick={() => console.log('clicked')} />;
}

// 자식 컴포넌트에서 Props 받기
function Square({ value, handleClick }) {
  return (
    <button onClick={handleClick}>
      {value}
    </button>
  );
}

// 기본값 설정
function Square({ value = "", handleClick }) {
  return <button onClick={handleClick}>{value}</button>;
}
```

---

### 3. 이벤트 핸들러 (Event Handler)

**정의**
- 사용자의 액션(클릭, 입력 등)에 반응하는 함수
- React에서는 camelCase로 이벤트 이름을 사용 (예: `onClick`)

**중요 내용**
- 이벤트 핸들러는 함수를 전달해야 함 (함수 호출이 아님)
- 화살표 함수로 인라인 정의 가능
- 이벤트 객체를 매개변수로 받을 수 있음

**사용 예제**
```jsx
function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  
  // 이벤트 핸들러 함수 정의
  function handleClick(index) {
    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
  }
  
  return (
    <div>
      {/* 함수 참조 전달 */}
      <Square handleClick={() => handleClick(0)} value={board[0]} />
      
      {/* 인라인 화살표 함수 */}
      <button onClick={() => console.log('clicked')}>Click</button>
      
      {/* 이벤트 객체 사용 */}
      <input onChange={(e) => console.log(e.target.value)} />
    </div>
  );
}
```

---

### 4. useEffect Hook

**정의**
- 컴포넌트의 사이드 이펙트(side effect)를 처리하는 Hook
- 컴포넌트가 렌더링된 후에 실행됨

**중요 내용**
- 마운트, 업데이트, 언마운트 시점에 실행 가능
- 의존성 배열로 실행 조건 제어
- 빈 배열 `[]`이면 마운트 시 한 번만 실행
- 클린업 함수로 정리 작업 가능

**사용 예제**
```jsx
import { useEffect, useState } from 'react';

export default function Board() {
  const [randomNumbers, setRandomNumbers] = useState([]);

  // 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    const squares = [];
    for (let i = 1; i <= 20; i++) {
      squares.push(i);
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function getRandomSquares() {
      const shuffled = [...squares];
      shuffleArray(shuffled);
      return shuffled.slice(0, 9);
    }

    setTimeout(() => {
      setRandomNumbers(getRandomSquares());
    }, 0);
  }, []); // 빈 배열 = 마운트 시 한 번만 실행

  // 특정 값이 변경될 때마다 실행
  useEffect(() => {
    console.log('board 상태가 변경되었습니다:', board);
  }, [board]); // board가 변경될 때마다 실행

  // 클린업 함수 (언마운트 시 실행)
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('타이머 실행');
    }, 1000);

    return () => {
      clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, []);

  return <div>{/* ... */}</div>;
}
```

---

### 5. State 끌어올리기 (Lifting State Up)

**정의**
- 여러 컴포넌트가 공유하는 상태를 가장 가까운 공통 부모 컴포넌트로 올리는 패턴
- Props를 통해 자식 컴포넌트에 전달

**중요 내용**
- 상태를 공유해야 할 때 사용
- 단방향 데이터 흐름 유지
- 상태는 최상위 공통 조상에 위치

**사용 예제**
```jsx
// Board 컴포넌트에서 상태 관리
export default function Board() {
  const [isX, setIsX] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));

  function bingGoClick(index) {
    if (board[index]) return;

    const newBoard = board.slice();
    if (isX) {
      newBoard[index] = 'X';
    } else {
      newBoard[index] = 'O';
    }
    setBoard(newBoard);
    setIsX(!isX);
  }
  
  return (
    <div className="board">
      <div className='board-row'>
        <Square 
          handleClick={() => bingGoClick(0)} 
          value={board[0]} 
        />
        {/* ... 나머지 Square들 */}
      </div>
    </div>
  );
}

// Square 컴포넌트는 Props만 받음
function Square({ value, handleClick }) {
  return (
    <button onClick={handleClick}>
      {value}
    </button>
  );
}
```

---

# Day 03: React 컴포넌트 심화

## 📋 사용된 명령어 및 개념

### 1. CSS 모듈화

**정의**
- 컴포넌트별로 CSS 파일을 분리하여 관리하는 방법
- 스타일 충돌을 방지하고 유지보수성을 높임

**중요 내용**
- 각 컴포넌트마다 별도의 CSS 파일 생성
- 클래스명을 의미있게 작성
- 조건부 스타일링 가능

**사용 예제**
```jsx
// Board.jsx
import '../styles/Board.css';

export default function Board() {
  return <div className="board">{/* ... */}</div>;
}

// Board.css
.board {
  display: flex;
  flex-direction: column;
}

.board-row {
  display: flex;
}
```

---

### 2. 조건부 렌더링

**정의**
- 조건에 따라 다른 UI를 렌더링하는 방법
- 삼항 연산자나 논리 연산자 사용

**중요 내용**
- `&&` 연산자로 조건부 렌더링
- 삼항 연산자로 두 가지 경우 처리
- null을 반환하면 아무것도 렌더링하지 않음

**사용 예제**
```jsx
function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* && 연산자 사용 */}
      {isLoggedIn && <UserProfile />}
      {!isLoggedIn && <LoginButton />}

      {/* 삼항 연산자 사용 */}
      {count > 0 ? (
        <p>카운트: {count}</p>
      ) : (
        <p>카운트가 0입니다</p>
      )}

      {/* null 반환 (아무것도 렌더링 안 함) */}
      {count < 0 && null}
    </div>
  );
}
```

---

### 3. 폼 입력 처리

**정의**
- 사용자 입력을 받아서 상태로 관리하는 방법
- 제어 컴포넌트(Controlled Component) 패턴 사용

**중요 내용**
- input의 value를 state로 관리
- onChange 이벤트로 상태 업데이트
- 제어 컴포넌트는 React가 값을 완전히 제어

**사용 예제**
```jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    console.log('이름:', name, '이메일:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

---

# Day 04: State 관리와 Reducer 패턴

## 📋 사용된 명령어 및 개념

### 1. useReducer Hook

**정의**
- 복잡한 State 로직을 관리하는 Hook
- `useState`의 대체제로, 상태 업데이트 로직을 reducer 함수로 분리
- Redux의 reducer 패턴과 유사

**중요 내용**
- `const [state, dispatch] = useReducer(reducer, initialState)`
- dispatch 함수로 action을 전달하여 상태 업데이트
- 복잡한 상태 로직에 적합
- 상태 업데이트 로직이 한 곳에 집중되어 테스트하기 쉬움

**사용 예제**
```javascript
// reducer 함수 정의 (순수 함수)
export function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added':
      return [...tasks, { 
        id: action.id, 
        text: action.text, 
        done: false 
      }];
    case 'changed':
      return tasks.map(t => 
        t.id === action.task.id ? action.task : t
      );
    case 'deleted':
      return tasks.filter(t => t.id !== action.id);
    case 'loaded':
      return action.tasks;
    default:
      return tasks;
  }
}

// 초기 상태
export const initialTasks = [
  { id: 0, text: 'React 기본 문법 익히기', done: true },
  { id: 1, text: 'React 컴포넌트 구조 잡기', done: false },
];
```

```jsx
// 컴포넌트에서 사용
import { useReducer } from 'react';
import { tasksReducer, initialTasks } from '../utils/tasksReducer';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const handleAddTask = (text) => {
    dispatch({
      type: 'added',
      id: Date.now(),
      text: text,
    });
  };

  const handleChangeTask = (task) => {
    dispatch({
      type: 'changed',
      task: task,
    });
  };

  const handleDeleteTask = (id) => {
    dispatch({
      type: 'deleted',
      id: id,
    });
  };

  return (
    <div>
      {/* UI 렌더링 */}
    </div>
  );
}
```

---

### 2. Reducer 패턴

**정의**
- 상태 업데이트 로직을 reducer 함수로 분리하는 패턴
- Action 객체를 통해 상태 변경을 명시적으로 표현

**중요 내용**
- Reducer는 순수 함수여야 함 (부수 효과 없음)
- 같은 입력에 대해 항상 같은 출력
- 상태를 직접 변경하지 않고 새 상태를 반환
- Action은 type과 payload를 가진 객체

**사용 예제**
```javascript
// Action 타입 정의
// { type: 'added', id: 1, text: '할 일' }
// { type: 'changed', task: { id: 1, text: '수정된 할 일', done: true } }
// { type: 'deleted', id: 1 }

// Reducer 함수
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added':
      // 불변성 유지하며 새 항목 추가
      return [...tasks, { 
        id: action.id, 
        text: action.text, 
        done: false 
      }];
    
    case 'changed':
      // 특정 항목만 업데이트
      return tasks.map(t => 
        t.id === action.task.id ? action.task : t
      );
    
    case 'deleted':
      // 특정 항목 제거
      return tasks.filter(t => t.id !== action.id);
    
    default:
      // 알 수 없는 action은 상태 변경 없음
      return tasks;
  }
}
```

---

### 3. 불변성 (Immutability)

**정의**
- 상태를 직접 변경하지 않고 새로운 객체/배열을 생성하여 업데이트하는 원칙
- React의 핵심 개념 중 하나

**중요 내용**
- 상태를 직접 변경하면 React가 변경을 감지하지 못함
- 전개 연산자(`...`)를 사용하여 새 객체/배열 생성
- 배열 메서드 중 원본을 변경하는 것(`push`, `pop` 등)은 사용하지 않음
- 원본을 변경하는 메서드 대신 새 배열을 반환하는 메서드 사용

**사용 예제**
```javascript
// ❌ 잘못된 방법 (불변성 위반)
const tasks = [{ id: 1, text: '할 일' }];
tasks.push({ id: 2, text: '새 할 일' }); // 원본 배열 변경
tasks[0].done = true; // 원본 객체 변경

// ✅ 올바른 방법 (불변성 유지)
const tasks = [{ id: 1, text: '할 일' }];

// 배열에 추가
const newTasks = [...tasks, { id: 2, text: '새 할 일' }];

// 배열에서 제거
const filteredTasks = tasks.filter(t => t.id !== 1);

// 객체 속성 변경
const updatedTasks = tasks.map(t => 
  t.id === 1 ? { ...t, done: true } : t
);

// 중첩된 객체 업데이트
const user = {
  name: 'Kim',
  profile: { age: 25, city: 'Seoul' }
};
const updatedUser = {
  ...user,
  profile: { ...user.profile, age: 26 }
};
```

---

# Day 05: API 연동과 비동기 처리

## 📋 사용된 명령어 및 개념

### 1. Fetch API

**정의**
- 브라우저에 내장된 HTTP 요청 API
- Promise 기반으로 비동기 요청 처리
- 추가 라이브러리 설치 불필요

**중요 내용**
- `fetch(url, options)` 형태로 사용
- 기본적으로 GET 요청
- POST 요청 시 body와 headers 설정 필요
- 응답은 Promise를 반환하므로 `then` 또는 `async/await` 사용

**사용 예제**
```javascript
// GET 요청
fetch('/api/tasks')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST 요청
fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: '새 할 일',
    done: false
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// async/await 사용
async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

### 2. Axios

**정의**
- HTTP 클라이언트 라이브러리
- Fetch API보다 더 간결하고 강력한 기능 제공
- npm으로 설치 필요: `npm install axios`

**중요 내용**
- 자동으로 JSON 변환
- 요청/응답 인터셉터 지원
- 에러 처리 용이 (`err.response`로 응답 접근 가능)
- 브라우저와 Node.js 모두에서 사용 가능

**사용 예제**
```javascript
import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET 요청
async function getTasks() {
  try {
    const response = await api.get('/api/tasks');
    return response.data; // 자동으로 JSON 파싱
  } catch (error) {
    if (error.response) {
      // 서버가 응답했지만 에러 상태 코드
      console.error('Error:', error.response.data);
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.error('No response:', error.request);
    } else {
      // 요청 설정 중 에러
      console.error('Error:', error.message);
    }
  }
}

// POST 요청
async function createTask(task) {
  try {
    const response = await api.post('/api/tasks', task);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// PUT 요청
async function updateTask(id, task) {
  try {
    const response = await api.put(`/api/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// DELETE 요청
async function deleteTask(id) {
  try {
    await api.delete(`/api/tasks/${id}`);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}
```

---

### 3. 낙관적 업데이트 (Optimistic Update)

**정의**
- 서버 응답을 기다리지 않고 즉시 UI를 업데이트하는 패턴
- 사용자 경험을 향상시키는 기법

**중요 내용**
- 서버 요청 전에 UI를 먼저 업데이트
- 서버 요청이 실패하면 롤백(rollback) 처리 필요
- 임시 ID를 사용하여 나중에 실제 ID로 교체
- 빠른 반응성으로 사용자 경험 향상

**사용 예제**
```jsx
const handleAddTask = async (text) => {
  // 1단계: 임시 ID 생성
  const tempId = Date.now();
  
  // 2단계: 화면에 즉시 추가 (낙관적 업데이트)
  dispatch({
    type: 'added',
    id: tempId,
    text: text,
  });

  try {
    // 3단계: 서버에 요청
    const responseData = await request('/api/tasks', 'POST', { text });
    const newTask = fromApiFormat(responseData);
    
    // 4단계: 성공 시 임시 Task를 실제 Task로 교체
    dispatch({ type: 'deleted', id: tempId });
    dispatch({
      type: 'added',
      id: newTask.id,
      text: newTask.text,
    });
  } catch (err) {
    // 5단계: 실패 시 롤백 (임시 Task 제거)
    dispatch({ type: 'deleted', id: tempId });
    setError(err.message);
  }
};
```

---

### 4. 에러 처리 (Error Handling)

**정의**
- API 요청 중 발생할 수 있는 에러를 적절히 처리하는 방법
- 사용자에게 친화적인 에러 메시지 표시

**중요 내용**
- try-catch 블록으로 에러 처리
- Axios는 `error.response`로 서버 응답 접근 가능
- 에러 상태에 따라 다른 처리 필요
- 사용자에게 명확한 에러 메시지 제공

**사용 예제**
```jsx
const loadTasks = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const data = await request('/api/tasks', 'GET');
    dispatch({ type: 'loaded', tasks: data });
  } catch (err) {
    // Axios 에러 처리
    const errorMessage = err.response?.data?.message 
      || err.message 
      || 'Task 목록을 불러오는데 실패했습니다.';
    
    setError(errorMessage);
    console.error('Task 목록 로드 실패:', err);
  } finally {
    setLoading(false);
  }
};

// UI에서 에러 표시
return (
  <div>
    {error && (
      <div className="error-message">
        <strong>오류:</strong> {error}
        <button onClick={loadTasks}>다시 시도</button>
      </div>
    )}
  </div>
);
```

---

### 5. 로딩 상태 관리

**정의**
- API 요청이 진행 중일 때 사용자에게 로딩 상태를 표시하는 방법
- 사용자 경험 향상에 중요

**중요 내용**
- 요청 시작 시 `loading`을 `true`로 설정
- 요청 완료 시 `loading`을 `false`로 설정
- `finally` 블록에서 항상 `loading`을 `false`로 설정하는 것이 안전

**사용 예제**
```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const loadTasks = async () => {
  try {
    setLoading(true);  // 로딩 시작
    setError(null);
    
    const data = await request('/api/tasks', 'GET');
    dispatch({ type: 'loaded', tasks: data });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);  // 항상 로딩 종료
  }
};

// UI에서 로딩 상태 표시
return (
  <div>
    {loading && <div>로딩 중...</div>}
    {error && <div>에러: {error}</div>}
    {!loading && !error && <TaskList tasks={tasks} />}
  </div>
);
```

---

# Day 06: React Router를 활용한 라우팅

## 📋 사용된 명령어 및 개념

### 1. React Router

**정의**
- React 애플리케이션에서 라우팅을 구현하는 라이브러리
- SPA(Single Page Application)에서 페이지 전환을 처리
- npm 설치: `npm install react-router-dom`

**중요 내용**
- `BrowserRouter`로 앱을 감싸서 라우팅 활성화
- `Routes`와 `Route`로 경로 정의
- 페이지 새로고침 없이 화면 전환
- URL에 따라 다른 컴포넌트 렌더링

**사용 예제**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskApp from './pages/TaskApp';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> {/* 404 페이지 */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

### 2. Link 컴포넌트

**정의**
- React Router에서 제공하는 네비게이션 컴포넌트
- `<a>` 태그 대신 사용하여 페이지 새로고침 없이 이동

**중요 내용**
- `to` prop으로 이동할 경로 지정
- 페이지 새로고침 없이 클라이언트 사이드 라우팅
- 활성 링크 스타일링 가능 (`NavLink` 사용)

**사용 예제**
```jsx
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/tasks">할 일 목록</Link>
      <Link to="/login">로그인</Link>
    </nav>
  );
}

// 동적 경로
<Link to={`/expenses/${expense.id}`}>상세 보기</Link>
```

---

### 3. useNavigate Hook

**정의**
- 프로그래밍 방식으로 네비게이션을 수행하는 Hook
- 함수 호출로 페이지 이동 가능

**중요 내용**
- `navigate(path)` 형태로 사용
- `replace` 옵션으로 히스토리에 추가하지 않음
- `-1`로 이전 페이지로 이동 가능

**사용 예제**
```jsx
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/dashboard'); // 로그인 성공 시 이동
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };
  
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  
  return (
    <div>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
}
```

---

### 4. useParams Hook

**정의**
- URL 파라미터를 가져오는 Hook
- 동적 라우팅에서 경로의 변수 값을 읽을 때 사용

**중요 내용**
- Route에서 `:변수명` 형태로 정의한 파라미터 접근
- 객체 형태로 반환
- 모든 파라미터는 문자열로 반환

**사용 예제**
```jsx
// Route 정의
<Route path="/expenses/:id" element={<ExpenseDetail />} />
<Route path="/users/:userId/posts/:postId" element={<PostDetail />} />

// 컴포넌트에서 사용
import { useParams } from 'react-router-dom';

function ExpenseDetail() {
  const { id } = useParams(); // { id: "123" }
  
  useEffect(() => {
    // id를 사용하여 데이터 조회
    loadExpense(id);
  }, [id]);
  
  return <div>지출 ID: {id}</div>;
}

function PostDetail() {
  const { userId, postId } = useParams();
  // { userId: "1", postId: "5" }
  
  return <div>User: {userId}, Post: {postId}</div>;
}
```

---

### 5. 중첩 라우팅 (Nested Routes)

**정의**
- 라우트 안에 또 다른 라우트를 중첩하는 구조
- 공통 레이아웃을 공유할 때 유용

**중요 내용**
- `Outlet` 컴포넌트로 자식 라우트를 렌더링할 위치 지정
- 부모 경로를 공유하는 자식 라우트들

**사용 예제**
```jsx
// Layout 컴포넌트
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <NavigationBar />
      <main>
        <Outlet /> {/* 자식 라우트가 여기에 렌더링됨 */}
      </main>
      <Footer />
    </div>
  );
}

// App.jsx
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/upload" element={<Upload />} />
</Route>
```

---

### 6. Protected Route (보호된 라우트)

**정의**
- 인증이 필요한 페이지를 보호하는 컴포넌트
- 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트

**중요 내용**
- 인증 상태를 확인하여 조건부 렌더링
- `Navigate` 컴포넌트로 리다이렉트
- `replace` prop으로 히스토리에 남기지 않음

**사용 예제**
```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// 사용
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/upload" element={<Upload />} />
</Route>
```

---

# Day 07: Context API를 활용한 전역 상태 관리

## 📋 사용된 명령어 및 개념

### 1. Context API

**정의**
- React에서 제공하는 전역 상태 관리 솔루션
- Props Drilling 문제를 해결
- 여러 컴포넌트에서 공유해야 하는 상태를 관리

**중요 내용**
- `createContext`로 Context 생성
- `Provider`로 값을 제공
- `useContext`로 값 사용
- 필요한 범위에서만 사용해야 함 (성능 고려)

**사용 예제**
```jsx
import { createContext, useContext, useState } from 'react';

// 1. Context 생성
const AuthContext = createContext(null);

// 2. Provider 컴포넌트
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    user,
    isAuthenticated,
    login: (userData) => {
      setUser(userData);
      setIsAuthenticated(true);
    },
    logout: () => {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용 가능합니다.');
  }
  return context;
}
```

---

### 2. createContext

**정의**
- 새로운 Context를 생성하는 함수
- 전역 상태를 공유할 수 있는 공간 생성

**중요 내용**
- 초기값을 설정할 수 있음
- Context는 Provider와 함께 사용
- 여러 Context를 만들어서 관심사 분리 가능

**사용 예제**
```jsx
import { createContext } from 'react';

// 초기값 없이 생성
const AuthContext = createContext(null);

// 초기값과 함께 생성
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});
```

---

### 3. useContext Hook

**정의**
- Context의 현재 값을 읽는 Hook
- 가장 가까운 Provider의 값을 반환

**중요 내용**
- Provider 밖에서 사용하면 초기값 반환
- Custom Hook으로 감싸서 에러 처리 가능
- Provider가 없으면 에러 발생 가능

**사용 예제**
```jsx
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function UserProfile() {
  const { user, isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <div>로그인이 필요합니다.</div>;
  }
  
  return <div>안녕하세요, {user.name}님!</div>;
}

// Custom Hook으로 사용 (권장)
function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  
  return <div>{user?.name}</div>;
}
```

---

### 4. useMemo Hook

**정의**
- 계산 비용이 큰 값을 메모이제이션하는 Hook
- 의존성 배열의 값이 변경될 때만 재계산

**중요 내용**
- 불필요한 재계산 방지로 성능 최적화
- Context Provider의 value에 자주 사용
- 의존성 배열을 정확히 지정해야 함

**사용 예제**
```jsx
import { useMemo } from 'react';

function ExpensiveComponent({ items }) {
  // items가 변경될 때만 재계산
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.price - b.price);
  }, [items]);
  
  return <div>{/* ... */}</div>;
}

// Context Provider에서 사용
const value = useMemo(() => ({
  user,
  isAuthenticated,
  login,
  logout,
}), [user, isAuthenticated, login, logout]);
```

---

### 5. useCallback Hook

**정의**
- 함수를 메모이제이션하는 Hook
- 의존성 배열의 값이 변경될 때만 새 함수 생성

**중요 내용**
- 자식 컴포넌트에 함수를 props로 전달할 때 유용
- 불필요한 리렌더링 방지
- useMemo와 함께 사용하여 성능 최적화

**사용 예제**
```jsx
import { useCallback, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  
  // count가 변경될 때만 새 함수 생성
  const handleClick = useCallback(() => {
    console.log('Clicked:', count);
  }, [count]);
  
  return <Child onClick={handleClick} />;
}

// Context에서 사용
const login = useCallback(async (email, password) => {
  try {
    const response = await loginApi({ email, password });
    setUser(response.user);
    setIsAuthenticated(true);
  } catch (error) {
    console.error('로그인 실패:', error);
  }
}, []); // 의존성 없음 (함수 내부에서 외부 변수 사용 안 함)
```

---

### 6. localStorage

**정의**
- 브라우저에 데이터를 저장하는 Web Storage API
- 페이지를 새로고침해도 데이터가 유지됨

**중요 내용**
- 문자열만 저장 가능 (객체는 JSON.stringify 필요)
- 동기적으로 동작
- 같은 도메인에서만 접근 가능
- 용량 제한: 약 5-10MB

**사용 예제**
```jsx
// 저장
localStorage.setItem('token', 'abc123');
localStorage.setItem('user', JSON.stringify({ name: 'Kim', age: 25 }));

// 읽기
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

// 삭제
localStorage.removeItem('token');

// 전체 삭제
localStorage.clear();

// Context와 함께 사용
useEffect(() => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  if (token && userData) {
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setIsAuthenticated(true);
  }
}, []);
```

---

# Day 08-09: 실전 프로젝트 - 지출 관리 앱

## 📋 사용된 명령어 및 개념

### 1. 페이지네이션 (Pagination)

**정의**
- 대량의 데이터를 여러 페이지로 나누어 표시하는 기법
- 사용자 경험과 성능을 향상시킴

**중요 내용**
- 현재 페이지, 페이지 크기, 전체 페이지 수 관리
- 이전/다음 페이지 버튼
- 페이지 번호 클릭으로 이동

**사용 예제**
```jsx
const [currentPage, setCurrentPage] = useState(0);
const [pageSize] = useState(12);
const [pagination, setPagination] = useState({
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
});

useEffect(() => {
  loadExpenses();
}, [currentPage]);

async function loadExpenses() {
  try {
    const result = await getAllExpenses({ 
      page: currentPage, 
      size: pageSize 
    });
    
    setExpenses(result.content);
    setPagination({
      totalElements: result.totalElements,
      totalPages: result.totalPages,
      hasNext: !result.last,
      hasPrevious: !result.first,
    });
  } catch (err) {
    setError(err.message);
  }
}

// Pagination 컴포넌트 사용
<Pagination 
  currentPage={currentPage}
  pageSize={pageSize}
  pagination={pagination}
  onPageChange={setCurrentPage}
/>
```

---

### 2. 파일 업로드

**정의**
- 사용자가 파일을 선택하여 서버에 전송하는 기능
- FormData를 사용하여 파일 전송

**중요 내용**
- `<input type="file">`로 파일 선택
- FormData 객체로 파일과 데이터 전송
- multipart/form-data 형식으로 전송
- 파일 크기 및 형식 검증 필요

**사용 예제**
```jsx
const [file, setFile] = useState(null);
const [uploading, setUploading] = useState(false);

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    // 파일 크기 검증 (예: 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }
    
    // 파일 형식 검증 (예: 이미지만)
    if (!selectedFile.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    
    setFile(selectedFile);
  }
};

const handleUpload = async () => {
  if (!file) return;
  
  setUploading(true);
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('merchant', merchantName);
    
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('업로드 성공:', response.data);
  } catch (error) {
    console.error('업로드 실패:', error);
  } finally {
    setUploading(false);
  }
};

return (
  <div>
    <input 
      type="file" 
      accept="image/*" 
      onChange={handleFileChange} 
    />
    <button onClick={handleUpload} disabled={!file || uploading}>
      {uploading ? '업로드 중...' : '업로드'}
    </button>
  </div>
);
```

---

### 3. 옵셔널 체이닝 (Optional Chaining)

**정의**
- `?.` 연산자를 사용하여 객체의 속성에 안전하게 접근하는 문법
- 속성이 없어도 에러가 발생하지 않음

**중요 내용**
- `undefined`나 `null`인 경우 `undefined` 반환
- 중첩된 객체 접근 시 유용
- 배열 인덱스 접근에도 사용 가능

**사용 예제**
```jsx
// 객체 속성 접근
const userName = user?.name; // user가 null이어도 에러 없음
const backend = developer?.skills?.backend;

// 배열 접근
const firstItem = items?.[0];

// 함수 호출
const result = api?.getData?.();

// 실제 사용 예시
<span className="expense-amount">
  ₩{expense.totalAmount?.toLocaleString() || 0}
</span>

{expense.category && (
  <span className="expense-category">{expense.category}</span>
)}
```

---

### 4. 통합 개발 경험

**정의**
- 여러 React 개념을 조합하여 실제 애플리케이션을 개발하는 과정
- 컴포넌트 구조, 상태 관리, API 연동 등을 통합

**중요 내용**
- 컴포넌트를 작은 단위로 분리
- 상태 관리 전략 수립
- API 통신 및 에러 처리
- 사용자 경험 개선
- 코드 리팩토링

**실전 프로젝트 구조**
```
src/
├── components/      # 재사용 가능한 컴포넌트
├── pages/          # 페이지 컴포넌트
├── contexts/       # Context API
├── services/       # API 호출 함수
├── utils/          # 유틸리티 함수
└── styles/         # CSS 파일
```

---

# Day 10: Next.js 기초

## 📋 사용된 명령어 및 개념

### 1. Next.js

**정의**
- React 기반 풀스택 프레임워크
- 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG) 지원
- 프로덕션 환경에 최적화된 기능 제공

**중요 내용**
- 파일 기반 라우팅 (폴더 구조로 라우팅 자동 생성)
- API Routes (백엔드 API를 Next.js 내에서 구현)
- 자동 코드 분할
- 이미지 최적화

**주요 특징**
- **SSR (Server-Side Rendering)**: 서버에서 HTML 생성
- **SSG (Static Site Generation)**: 빌드 시 HTML 생성
- **ISR (Incremental Static Regeneration)**: 정적 페이지를 주기적으로 재생성

---

## 🎯 종합 정리

### 학습한 주요 개념들

1. **React 기초**
   - 컴포넌트 기반 개발
   - JSX 문법
   - Props와 State
   - 이벤트 처리

2. **React Hooks**
   - useState: 상태 관리
   - useEffect: 사이드 이펙트 처리
   - useReducer: 복잡한 상태 관리
   - useContext: 전역 상태 관리
   - useCallback, useMemo: 성능 최적화

3. **상태 관리**
   - Local State (useState)
   - Reducer Pattern (useReducer)
   - Context API (전역 상태)
   - Props Drilling 해결

4. **라우팅**
   - React Router
   - 동적 라우팅
   - Protected Routes
   - 중첩 라우팅

5. **API 연동**
   - Fetch API
   - Axios
   - 비동기 처리 (async/await)
   - 에러 처리
   - 낙관적 업데이트

6. **실전 프로젝트**
   - 컴포넌트 구조 설계
   - 상태 관리 전략
   - API 통신
   - 사용자 인증
   - 파일 업로드

### 💪 습득한 역량

- React를 활용한 컴포넌트 기반 개발 능력
- 상태 관리 패턴 이해 및 적용
- API 연동 및 비동기 처리 능력
- 라우팅을 통한 SPA 구현
- Context API를 활용한 전역 상태 관리
- 실전 프로젝트 개발 경험

### 📝 향후 학습 방향

- React 성능 최적화 기법
- 테스트 코드 작성 (Jest, React Testing Library)
- TypeScript와 React 결합
- 상태 관리 라이브러리 (Redux, Zustand)
- Next.js 심화 학습
- React Native (모바일 개발)

---

## 📚 참고 자료

- React 공식 문서: https://react.dev
- React Router 문서: https://reactrouter.com
- Next.js 문서: https://nextjs.org
- MDN Web Docs: https://developer.mozilla.org

---

*이 문서는 React 강의를 통해 학습한 내용을 정리한 것입니다.*
