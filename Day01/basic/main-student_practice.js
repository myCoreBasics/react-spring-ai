// ============================================================
// JavaScript 기본 문법 실습
// 설명: 각 섹션의 TODO를 완성하며 JavaScript 핵심 문법을 학습합니다.
// 실행: node main-student.js 또는 Chrome DevTools Console에서 실행
// ============================================================

console.log("====== [Start] JavaScript 기본 문법 실습 ======\n");

// ==========================================
// 1. Hello, World!
// ==========================================
console.log("\n==== 1. Hello, World! ===");
// TODO:
// 1-1) "Hello, JavaScript!" 메시지를 한 줄 더 출력해 보세요.
// 1-2) 자신의 이름을 포함한 인사말(예: "Hello, Alice!")을 출력해 보세요.

console.log("1-1. Hello, JavaScript!");
console.log("1-2. Hello, Hyejin!");

// ==========================================
// 2. Variables and Types (변수와 타입)
// ==========================================
console.log("\n=== 2. Variables and Types ===");
// TODO:
// 2-1) 자신의 이름, 나이, 좋아하는 언어(favoriteLanguage)를 나타내는 변수를 선언하고 콘솔에 출력해 보세요.
// 2-2) 각 변수의 타입을 typeof 연산자로 함께 출력해 보세요.
// 2-3) const로 선언한 변수는 값을 바꾸면 에러가 나는지 실험해 보세요. (PI를 다른 값으로 재할당 해보기)

let myName = "Hyejin";
let myAge = 30;
let favoriteLanguage = "Java";

console.log("2-2.");
console.log("myName : ", myName, ", type : ", typeof myName);
console.log("myAge : ", myAge, ", type : ", typeof myAge)
console.log("favoriteLanguage : ", favoriteLanguage, ", type : ", typeof favoriteLanguage)
console.log("2-3.");
// const today = "thu";
// let today = "fri";

// ==========================================
// 3. Arrays (배열)
// ==========================================
console.log("\n=== 3. Arrays ===");
// TODO:
// 3-1) 좋아하는 색깔 3개로 이루어진 배열 favoriteColors를 만들어 보세요.
// 3-2) favoriteColors의 첫 번째와 마지막 원소를 콘솔에 출력해 보세요.
// 3-3) 인덱스를 벗어난 위치를 출력하면 어떤 값이 나오는지 실험해 보세요. (예: favoriteColors[10])

let favoriteColors = ["yellow", "pink", "purple"];

console.log("3-1. favoriteColors : ", favoriteColors);
console.log("3-2. ", favoriteColors[0], favoriteColors[2]);
console.log("3-3. ",favoriteColors[3]);

// ==========================================
// 4. Manipulating Arrays (배열 조작)
// ==========================================
console.log("\n=== 4. Manipulating Arrays ===");
// TODO:
// 4-1) 빈 배열 shoppingList를 만든 뒤, push로 3개 이상 항목을 추가해 보세요.
// 4-2) pop을 이용해 마지막 항목을 제거하고, 제거된 항목을 콘솔에 출력해 보세요.
// 4-3) indexOf로 특정 항목의 위치를 찾고, -1이 나오는 경우도 실험해 보세요.

console.log("4-1.");
let shoppingList = [];
console.log("초기 shoppingList : ", shoppingList);

shoppingList.push("mouse", "tablet", "notebook");
console.log("push 후 shoppingList : ", shoppingList);

console.log("4-2.");
let lastshoppingList = shoppingList.pop();
console.log("pop 항목 : ", lastshoppingList);
console.log("pop 후 shoppingList : ", lastshoppingList);

console.log("4-3.");
shoppingList.push("stock");
let index = shoppingList.indexOf("stock");
console.log('"stock" index : ', index);

// ==========================================
// 5. Operators (연산자)
// ==========================================
console.log("\n=== 5. Operators ===");
// TODO:
// 5-1) 임의의 숫자 두 개 x, y를 만들어 사칙연산 결과를 모두 출력해 보세요.
// 5-2) ==와 === 차이가 드러나는 예제를 직접 만들어 보세요.
// 5-3) &&, ||, !을 조합해 조건식을 2개 이상 만들어 보고 값을 출력해 보세요.

console.log("5-1.");
let x = 10;
let y = 3;

console.log("x + y =", x + y);
console.log("x - y =", x - y);
console.log("x * y =", x * y);
console.log("x / y =", x / y);
console.log("x % y =", x % y);
console.log("x ** y =", x ** y);

console.log("5-2.");
console.log("x == '10' : ", x == "10");
console.log("x === '10' : ", x === "10");

console.log("5-3.");
let today2 = true;
let tomorrow = false;

console.log("today2 && tomorrow : ", today2 && tomorrow);
console.log("today2 || tomorrow : ", today2 || tomorrow);
console.log("!today2 : ", !today2);

// ==========================================
// 6. Conditions (조건문)
// ==========================================
console.log("\n=== 6. Conditions ===");
// TODO:
// 6-1) 나이를 나타내는 변수 age를 만든 후,
//      0~12: "child", 13~19: "teen", 20 이상: "adult" 를 출력하는 if-else if-else 문을 작성해 보세요.
// 6-2) 요일(dayOfWeek) 변수를 하나 만들고(예: "Mon", "Tue" ...),
//      특정 요일에는 "study day", 다른 요일에는 "rest day"를 출력하는 조건문을 작성해 보세요.

console.log("6-1.");
let age = 30;

if (age <= 12) {
  console.log("child");
} else if (age <= 19) {
  console.log("teen");
} else {
  console.log("adult");
};

console.log("6-2.");
let dayOfWeek = "Thu";

if (dayOfWeek == "sun") {
  console.log("rest day");
} else {
  console.log("study day");
};

// ==========================================
// 7. Loops (반복문)
// ==========================================
console.log("\n=== 7. Loops ===");
// TODO:
// 7-1) 1부터 10까지의 합을 구하는 for 문을 작성하고, 최종 합을 콘솔에 출력해 보세요.
// 7-2) while 문으로 5에서 1까지 거꾸로 출력하는 코드를 작성해 보세요. (5,4,3,2,1)
// 7-3) for...of를 사용해 favoriteColors 배열(3번에서 만든 것)을 순회하며 각 색을 출력해 보세요.

console.log("7-1.");
let sum = 0;

for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log("1~10 합 = ", sum);

console.log("7-2.");
let countdown = 5;

while (countdown >= 1) {
  console.log("countdown = ", countdown);
  countdown--;
}

console.log("7-3.");
for (const color of favoriteColors) {
  console.log(color);
}

// ==========================================
// 8. Objects (객체)
// ==========================================
console.log("\n=== 8. Objects ===");
// TODO:
// 8-1) book이라는 객체를 만들어 보세요.
//      title, author, pages, isRead(읽었는지 여부) 속성을 포함하도록 합니다.
// 8-2) book 객체를 콘솔에 출력하고, 각 속성을 개별적으로도 출력해 보세요.
// 8-3) isRead 값을 true로 바꾸고, 변경된 객체를 다시 출력해 보세요.

let book = {
  title: "JavaScript Basics",
  author: "Winnie",
  pages: 250,
  isRead: false
};

console.log("8-2.");
console.log("book : ", book);
console.log("book.title : ", book.title);
console.log("book.author : ", book.author);
console.log("book.pages : ", book.pages);
console.log("book.isRead : ", book.isRead);

console.log("8-3.");
book.isRead = true;
console.log("수정 후 book.isRead:", book.isRead);

// ==========================================
// 9. Functions (함수)
// ==========================================
console.log("\n=== 9. Functions ===");
// TODO:
// 9-1) 두 숫자를 입력받아(매개변수로) 더 큰 수를 반환하는 함수 max(a, b)를 만들어 보세요.
// 9-2) 이름과 나이를 받아 "OOO is XX years old."를 출력하는 함수 describePerson(name, age)를 만들어 보세요.
// 9-3) favoriteColors 배열을 받아, 각각의 색을 "I like OOO" 형식으로 출력하는 함수 printColors(colors)를 만들어 보세요.

console.log("9-1.");
function max (a, b) {
  return a > b ? a : b;
}
console.log("max (10, 20) = ", max (10, 20)); 

console.log("9-2.");
function describePerson (name, age) {
  console.log(`${name} is ${age} years old.`);
}
describePerson("Hyejin", 30);

console.log("9-3.");
function printColors(colors) {
  for (const color of colors) {
    console.log(`I like ${color}`);
  }
}
printColors(favoriteColors);

// ==========================================
// 10. Pop-up Boxes (alert, confirm, prompt)
// ==========================================
console.log("\n=== 10. Pop-up Boxes ===");
console.log("※ 이 섹션은 실제로 팝업을 띄우므로 필요할 때만 주석을 해제해서 사용하세요.");
// TODO:
// 10-1) alert를 사용하여 페이지에 들어온 사용자에게 간단한 인사 메시지를 띄워 보세요.
// 10-2) confirm으로 "Are you a student?"를 물어보고, true / false에 따라
//       각각 다른 메시지를 콘솔에 출력해 보세요.
// 10-3) prompt로 사용자의 나이를 입력받아, 18세 이상이면 "adult", 아니면 "minor"를 콘솔에 출력해 보세요.

// console.log("10-1.");
// alert("Hello from alert!");

// console.log("10-2.");
// let isStudent2 = confirm("Are you a student?");

// if (isStudent2) {
//   console.log("I am a student.");
// } else {
//   console.log("I am not a student.");
// }

// console.log("10-3.");
// let yourAge = prompt("How old are you?");
// let ageNumber = Number(yourAge);

// if (ageNumber >= 18) {
//   console.log("adult");
// } else {
//   console.log("minor");
// }

// ==========================================
// 11. Callbacks (콜백 함수)
// ==========================================
console.log("\n=== 11. Callbacks ===");
// TODO:
// 11-1) 두 숫자의 차이를 구하는 subtractCallback(a, b)를 만들고, doMathOperation으로 호출해 보세요.
// 11-2) 콜백을 익명 함수(anonymous function)로 직접 넘겨서 x와 y의 평균을 계산해 보세요.
//       예: doMathOperation(10, 20, function(a, b) { ... });

console.log("11-1.");
function subtractCallback (a, b) {
  return a - b;
}

function doMathOperation (a, b, callback) {
  let result = callback (a, b);
  console.log("Result : ", result);
}
doMathOperation(5, 2, subtractCallback);

console.log("11-2.");
doMathOperation(10, 20, function(a, b) {
  return (a + b) / 2;
});

// ==========================================
// 12. Arrow Functions (화살표 함수)
// ==========================================
console.log("\n=== 12. Arrow Functions ===");
// TODO:
// 12-1) 문자열 배열 names에서 각 이름에 "Hello, "를 붙여 새 배열을 만드는 arrow function을 작성해 보세요.
//       예: ["Alice", "Bob"] -> ["Hello, Alice", "Hello, Bob"]
// 12-2) numbers 배열에서 짝수만 필터링하는 arrow function을 filter와 함께 사용해 보세요.
//       예: [1,2,3,4,5,6] -> [2,4,6]
// 12-3) 화살표 함수와 일반 함수(function 키워드)의 문법 차이를 코드로 비교해 보세요.

console.log("12-1.");
let names = ["Alice", "Bob"];

const newNames = (names) => {
  let result = [];
  
  for (let i=0; i < names.length; i++) {
    result.push("Hello, " + names[i]);
  }
  return result;
};
console.log(newNames(names));

const newNames2 = names => names.map(name => `Hi, ${name}`);
console.log(newNames2(names));

console.log("12-2.");
let numbers = [1, 2, 3, 4, 5, 6];

const isEven = (numbers) => {
  let even = [];
  for (let i=0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      even.push(numbers[i]);
    }
  }
  return even;
};
console.log(isEven(numbers));

console.log("12-3.");
function isEvenFunction(numbers) {
  let even = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      even.push(numbers[i]);
    }
  }
  return even;
}
console.log(isEvenFunction(numbers));

// ==========================================
// 13. 종합 연습 (선택)
// ==========================================
console.log("\n=== 13. 종합 연습 (선택) ===");
// TODO:
// 위 설명을 바탕으로 자신만의 작은 "자기 소개 프로그램"을 만들어 보세요.
// (함수, 조건문, 배열, 객체, 화살표 함수 등을 자유롭게 활용)

console.log("\n====== [End] 실습 종료 ======");
