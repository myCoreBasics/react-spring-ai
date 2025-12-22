// ============================================
// 예제 1: 기본 타입 실습
// 실행: pnpm run src/examples/01-basic-types.ts
// ============================================
// 1. 기본 타입 선언
var userName = "홍길동";
var age = 25;
var isStudent = true;
console.log("=== 기본 타입 ===");
console.log("\uC774\uB984: ".concat(userName));
console.log("\uB098\uC774: ".concat(age));
console.log("\uD559\uC0DD \uC5EC\uBD80: ".concat(isStudent));
// 2. 배열과 튜플
var fruits = ["사과", "바나나", "오렌지"];
var score = ["수학", 95];
console.log("\n=== 배열과 튜플 ===");
console.log("\uACFC\uC77C: ".concat(fruits.join(", ")));
console.log("".concat(score[0], " \uC810\uC218: ").concat(score[1], "\uC810"));
var person = {
    name: "김철수",
    age: 30
};
console.log("\n=== 객체 타입 ===");
console.log("\uC774\uB984: ".concat(person.name, ", \uB098\uC774: ").concat(person.age));
// 4. 유니온 타입
function printId(id) {
    if (typeof id === "string") {
        console.log("\uBB38\uC790\uC5F4 ID: ".concat(id.toUpperCase()));
    }
    else {
        console.log("\uC22B\uC790 ID: ".concat(id));
    }
}
console.log("\n=== 유니온 타입 ===");
printId("abc123");
printId(12345);
console.log("\n✅ 예제 1 완료!");
