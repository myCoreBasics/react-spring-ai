// ============================================
// 예제 2: 함수 실습
// 실행: pnpm run src/examples/02-functions.ts
// ============================================

// 1. 기본 함수
function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}

console.log("=== 기본 함수 ===");
console.log(greet("홍길동"));

// 2. 화살표 함수
const add = (a: number, b: number): number => a + b;
const multiply = (a: number, b: number): number => a * b;

console.log("\n=== 화살표 함수 ===");
console.log(`10 + 5 = ${add(10, 5)}`);
console.log(`10 * 5 = ${multiply(10, 5)}`);

// 3. 선택적 매개변수
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

console.log("\n=== 선택적 매개변수 ===");
console.log(buildName("길동"));
console.log(buildName("길동", "홍"));

// 4. 기본 매개변수
function createGreeting(name: string, greeting: string = "안녕하세요"): string {
  return `${greeting}, ${name}님!`;
}

console.log("\n=== 기본 매개변수 ===");
console.log(createGreeting("철수"));
console.log(createGreeting("영희", "반갑습니다"));

// 5. 나머지 매개변수
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log("\n=== 나머지 매개변수 ===");
console.log(`sum(1, 2, 3) = ${sum(1, 2, 3)}`);
console.log(`sum(1, 2, 3, 4, 5) = ${sum(1, 2, 3, 4, 5)}`);

// 6. 제네릭 함수
function identity<T>(value: T): T {
  return value;
}

console.log("\n=== 제네릭 함수 ===");
console.log(`identity("Hello") = ${identity("Hello")}`);
console.log(`identity(42) = ${identity(42)}`);

console.log("\n✅ 예제 2 완료!");
