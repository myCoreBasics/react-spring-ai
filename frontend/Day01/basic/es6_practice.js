/* * 파일명: es6-practice.js
 * 설명: React 개발을 위한 모던 자바스크립트(ES6+) 핵심 문법 실습
 * 실행: Chrome 개발자 도구(F12) Console 탭에 복사 -> 붙여넣기 -> 엔터
 */

console.log("====== [Start] React 필수 문법 실습 ======");

// ==========================================
// 1. 변수 선언과 템플릿 리터럴 (Variables & Template Literals)
// ==========================================
console.log("\n--- 1. 변수와 문자열 ---");

// const: 상수 (기본적으로 사용)
const topic = "React Integration";
const year = 2025;

// let: 변수 (값이 바뀌어야 할 때만 사용)
let progress = 0;
progress = 100; // 가능

// [주의] 템플릿 리터럴은 반드시 백틱(`)을 사용해야 합니다.
// 작은따옴표(') 사용 시 변수 치환이 안 됩니다.
const message = `Class: ${topic}, Year: ${year}, Progress: ${progress}%`;
console.log(message);


// ==========================================
// 2. 객체와 배열의 불변성 유지 (Object & Array Destructuring, Spread)
// ==========================================
console.log("\n--- 2. 객체/배열 다루기 (Spread & Destructuring) ---");

const developer = {
  id: 1,
  name: "Kim",
  skills: {
    frontend: "React",
    backend: "Java"
  }
};

// 2-1. 비구조화 할당 (Destructuring)
// 객체 내부 값을 변수로 바로 추출
const { name, skills: { backend } } = developer;
console.log(`Developer: ${name}, Backend Skill: ${backend}`);

// 2-2. 전개 연산자 (Spread Operator) - 중요!
// 기존 객체를 건드리지 않고(불변성), 내용을 복사하여 새로운 객체 생성
const updatedDeveloper = {
  ...developer,           // 기존 내용 복사
  role: "Full Stack",     // 새로운 필드 추가
  name: "Kim (Promoted)"  // 기존 필드 덮어쓰기
};

console.log("원본 객체:", developer); // 원본은 변하지 않음 (React State 원칙)
console.log("새 객체:", updatedDeveloper);


// ==========================================
// 3. 함수형 프로그래밍 (Map, Filter, Arrow Function)
// ==========================================
console.log("\n--- 3. 배열 메서드 (Map & Filter) ---");

const products = [
  { id: 1, name: "Laptop", price: 1000, inStock: true },
  { id: 2, name: "Phone", price: 500, inStock: false },
  { id: 3, name: "Mouse", price: 50, inStock: true }
];

// 3-1. Filter: 조건에 맞는 데이터만 추출 (삭제/검색 로직에 사용)
// 재고가 있는(inStock: true) 상품만 필터링
const availableProducts = products.filter(p => p.inStock);
console.log("재고 있음:", availableProducts);

// 3-2. Map: 데이터를 변환 (UI 렌더링에 사용)
// 상품 객체를 "상품명(가격)" 문자열 형태로 변환
const productListUI = availableProducts.map(p => 
  `<div>${p.name} - $${p.price}</div>`
);
console.log("화면 렌더링용 데이터:", productListUI);


// ==========================================
// 4. 비동기 처리 (Async / Await)
// ==========================================
console.log("\n--- 4. 비동기 통신 (Async/Await) ---");

// 가상의 서버 API 요청 함수 (1초 대기)
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId: "user_01", userName: "Lee Manager" });
    }, 1000);
  });
};

// 비동기 함수 실행기
const executeAsyncLogic = async () => {
  try {
    console.log("데이터 로딩 시작...");
    
    // await: 데이터가 올 때까지 기다림 (Java의 동기 코드처럼 작성 가능)
    const user = await fetchUserData();
    
    console.log(`[서버 응답 완료] 환영합니다, ${user.userName}님!`);
  } catch (error) {
    console.error("에러 발생:", error);
  }
};

executeAsyncLogic();

// ==========================================
// 5. (보너스) 단축 평가 (Short-circuit Evaluation)
// ==========================================
console.log("\n--- 5. 단축 평가 (React 조건부 렌더링 필수) ---");

const isLoggedIn = true;
const userName = "Park";

// && 연산자: 앞이 true면 뒤를 실행 (if문 대신 사용)
// React에서 {isLoggedIn && <LogoutButton />} 형태로 많이 사용
isLoggedIn && console.log(`${userName}님, 로그인 되었습니다.`);

// || 연산자: 앞이 false(null, undefined 등)면 뒤를 실행 (기본값 설정)
const userTitle = null;
const displayTitle = userTitle || "Guest"; // userTitle이 없으면 "Guest"
console.log(`사용자 타이틀: ${displayTitle}`);

console.log("\n====== [End] 실습 종료 ======");