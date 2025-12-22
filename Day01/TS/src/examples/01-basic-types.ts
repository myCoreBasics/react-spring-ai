// ============================================
// 예제 1: 기본 타입 실습
// 실행: pnpm run src/examples/01-basic-types.ts
// ============================================

// 1. 기본 타입 선언
const userName: string = "홍길동";
const age: number = 25;
const isStudent: boolean = true;

console.log("=== 기본 타입 ===");
console.log(`이름: ${userName}`);
console.log(`나이: ${age}`);
console.log(`학생 여부: ${isStudent}`);

// 2. 배열과 튜플 : JavaScript 자체에는 튜플이 없고, TypeScript에서 타입으로 구분합니다. 런타임에서는 둘 다 배열로 동작합니다!
const fruits: string[] = ["사과", "바나나", "오렌지"];
const score: [string, number] = ["수학", 95];

console.log("\n=== 배열과 튜플 ===");
console.log(`과일: ${fruits.join(", ")}`);
console.log(`${score[0]} 점수: ${score[1]}점`);

// 3. 객체 타입
interface Person {
  name: string;
  age: number;
  email?: string; // 선택적 속성
}

const person: Person = {
  name: "김철수",
  age: 30
};

console.log("\n=== 객체 타입 ===");
console.log(`이름: ${person.name}, 나이: ${person.age}`);

// 4. 유니온 타입
function printId(id: string | number): void {
  if (typeof id === "string") {
    console.log(`문자열 ID: ${id.toUpperCase()}`);
  } else {
    console.log(`숫자 ID: ${id}`);
  }
}

console.log("\n=== 유니온 타입 ===");
printId("abc123");
printId(12345);

console.log("\n✅ 예제 1 완료!");

