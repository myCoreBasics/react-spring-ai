// ============================================
// 연습 문제 1: 기본 타입 연습
// 실행: pnpm run src/exercises/exercise-01.ts
// ============================================

// 📝 문제 1: 아래 변수들에 적절한 타입을 추가하세요
// TODO: 타입을 추가하세요
let productName = "아이폰 15";
let price = 1500000;
let inStock = true;
let tags = ["전자제품", "스마트폰", "Apple"];

// 📝 문제 2: Person 인터페이스를 완성하세요
// TODO: 인터페이스를 완성하세요
interface Product {
  // id: ???
  // name: ???
  // price: ???
  // category?: ???  // 선택적
}

// 📝 문제 3: 함수의 매개변수와 반환 타입을 추가하세요
// TODO: 타입을 추가하세요
function calculateTotal(price, quantity) {
  return price * quantity;
}

// 📝 문제 4: 제네릭 함수를 작성하세요
// 배열의 첫 번째 요소를 반환하는 함수
// TODO: 함수를 구현하세요
// function getFirst<T>(arr: T[]): ??? {
//   
// }

// ============================================
// 테스트 코드 (완성 후 주석 해제)
// ============================================

/*
console.log("=== 문제 1 테스트 ===");
console.log(productName, price, inStock, tags);

console.log("\n=== 문제 2 테스트 ===");
const product: Product = {
  id: 1,
  name: "맥북",
  price: 2000000,
  category: "노트북"
};
console.log(product);

console.log("\n=== 문제 3 테스트 ===");
console.log(calculateTotal(10000, 3));

console.log("\n=== 문제 4 테스트 ===");
console.log(getFirst([1, 2, 3]));
console.log(getFirst(["a", "b", "c"]));
*/

console.log("📝 연습 문제를 풀어보세요!");
console.log("완성 후 테스트 코드의 주석을 해제하세요.");

