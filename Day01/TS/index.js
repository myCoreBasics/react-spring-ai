// ============================================
// 🎯 TypeScript 기본 문법 실습 가이드
// ============================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ============================================
// 1️⃣ 기본 타입 (Primitive Types)
// ============================================
// 문자열 (string)
var userName = "홍길동";
var greeting = "\uC548\uB155\uD558\uC138\uC694, ".concat(userName, "\uB2D8!"); // 템플릿 리터럴
console.log(greeting);
// 숫자 (number)
var age = 25;
var height = 175.5;
var hexValue = 0xff; // 16진수
// 불리언 (boolean)
var isActive = true;
var isCompleted = false;
// null과 undefined
var nullValue = null;
var undefinedValue = undefined;
// any - 모든 타입 허용 (가능하면 사용 자제)
var anyValue = "문자열";
anyValue = 123; // OK
anyValue = true; // OK
// unknown - any보다 안전한 타입
var unknownValue = "문자열";
// unknownValue.length; // 에러! 타입 확인 필요
if (typeof unknownValue === "string") {
    console.log(unknownValue.length); // OK
}
// void - 반환값이 없는 함수
function logMessage(message) {
    console.log(message);
}
// never - 절대 반환하지 않는 함수
function throwError(message) {
    throw new Error(message);
}
// ============================================
// 2️⃣ 배열 (Arrays)
// ============================================
// 배열 타입 선언 방법 1
var numbers = [1, 2, 3, 4, 5];
// 배열 타입 선언 방법 2 (제네릭)
var fruits = ["사과", "바나나", "오렌지"];
// 읽기 전용 배열
var readonlyNumbers = [1, 2, 3];
// readonlyNumbers.push(4); // 에러! 수정 불가
// ============================================
// 3️⃣ 튜플 (Tuples)
// ============================================
// 고정된 길이와 타입을 가진 배열
var userInfo = ["홍길동", 25];
var coordinate = [10, 20, 30];
// 선택적 요소가 있는 튜플
var optionalTuple = ["안녕"];
// ============================================
// 4️⃣ 열거형 (Enum)
// ============================================
// 숫자 열거형
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right"; // 4
})(Direction || (Direction = {}));
var moveDirection = Direction.Up;
// 문자열 열거형
var Color;
(function (Color) {
    Color["Red"] = "RED";
    Color["Green"] = "GREEN";
    Color["Blue"] = "BLUE";
})(Color || (Color = {}));
var favoriteColor = Color.Blue;
// ============================================
// 5️⃣ 객체 타입 (Object Types)
// ============================================
// 기본 객체 타입
var person = {
    name: "김철수",
    age: 30
};
// 선택적 속성 (Optional Properties)
var optionalPerson = {
    name: "이영희"
    // age는 선택사항
};
// 읽기 전용 속성
var readonlyPerson = {
    id: 1,
    name: "박민수"
};
var user1 = {
    id: 1,
    name: "홍길동",
    email: "hong@example.com"
};
var employee1 = {
    id: 1,
    name: "김개발",
    email: "kim@company.com",
    department: "개발팀",
    salary: 5000000
};
var add = function (a, b) { return a + b; };
var subtract = function (a, b) { return a - b; };
var point1 = { x: 10, y: 20 };
var orderStatus = "pending";
var personType = { name: "홍길동", age: 25 };
// ============================================
// 8️⃣ 유니온 타입 (Union Types)
// ============================================
// 여러 타입 중 하나
var idValue;
idValue = "abc123";
idValue = 123;
var btnSize = "medium";
// 함수에서 유니온 타입
function printId(id) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    }
    else {
        console.log(id);
    }
}
// ============================================
// 9️⃣ 함수 (Functions)
// ============================================
// 기본 함수 타입
function greet(name) {
    return "\uC548\uB155\uD558\uC138\uC694, ".concat(name, "\uB2D8!");
}
// 화살표 함수
var multiply = function (a, b) { return a * b; };
// 선택적 매개변수
function buildName(firstName, lastName) {
    return lastName ? "".concat(firstName, " ").concat(lastName) : firstName;
}
// 기본 매개변수
function createGreeting(name, greeting) {
    if (greeting === void 0) { greeting = "안녕하세요"; }
    return "".concat(greeting, ", ").concat(name, "\uB2D8!");
}
// 나머지 매개변수 (Rest Parameters)
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (acc, curr) { return acc + curr; }, 0);
}
function formatValue(value) {
    if (typeof value === "string") {
        return value.trim();
    }
    return value.toFixed(2);
}
// ============================================
// 🔟 클래스 (Classes)
// ============================================
var Animal = /** @class */ (function () {
    function Animal(name, age, species) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    Object.defineProperty(Animal.prototype, "animalAge", {
        // getter
        get: function () {
            return this.age;
        },
        // setter
        set: function (value) {
            if (value > 0) {
                this.age = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    // 메서드
    Animal.prototype.speak = function () {
        console.log("".concat(this.name, "\uC774(\uAC00) \uC18C\uB9AC\uB97C \uB0C5\uB2C8\uB2E4."));
    };
    return Animal;
}());
// 클래스 상속
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name, age, breed) {
        var _this = _super.call(this, name, age, "개") || this;
        _this.breed = breed;
        return _this;
    }
    // 메서드 오버라이드
    Dog.prototype.speak = function () {
        console.log("".concat(this.name, "\uC774(\uAC00) \uBA4D\uBA4D \uC9D6\uC2B5\uB2C8\uB2E4."));
    };
    // 추가 메서드
    Dog.prototype.fetch = function () {
        console.log("".concat(this.name, "\uC774(\uAC00) \uACF5\uC744 \uAC00\uC838\uC635\uB2C8\uB2E4."));
    };
    return Dog;
}(Animal));
// 추상 클래스
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.prototype.describe = function () {
        console.log("\uC774 \uB3C4\uD615\uC758 \uBA74\uC801\uC740 ".concat(this.getArea(), "\uC785\uB2C8\uB2E4."));
    };
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(radius) {
        var _this = _super.call(this) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.getArea = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
    return Circle;
}(Shape));
// ============================================
// 1️⃣1️⃣ 제네릭 (Generics)
// ============================================
// 제네릭 함수
function identity(value) {
    return value;
}
var stringValue = identity("Hello");
var numberValue = identity(42);
var stringBox = { value: "문자열" };
var numberBox = { value: 123 };
// 제네릭 클래스
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    };
    Object.defineProperty(Queue.prototype, "length", {
        get: function () {
            return this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    return Queue;
}());
function logLength(value) {
    console.log(value.length);
}
logLength("문자열"); // OK
logLength([1, 2, 3]); // OK
// logLength(123);       // 에러! number는 length 속성이 없음
// ============================================
// 1️⃣2️⃣ 타입 가드 (Type Guards)
// ============================================
// typeof 타입 가드
function processValue(value) {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }
    else {
        console.log(value * 2);
    }
}
// instanceof 타입 가드
var Cat = /** @class */ (function () {
    function Cat() {
    }
    Cat.prototype.meow = function () {
        console.log("야옹");
    };
    return Cat;
}());
var Bird = /** @class */ (function () {
    function Bird() {
    }
    Bird.prototype.fly = function () {
        console.log("훨훨");
    };
    return Bird;
}());
function makeSound(animal) {
    if (animal instanceof Cat) {
        animal.meow();
    }
    else {
        animal.fly();
    }
}
function move(animal) {
    if ("swim" in animal) {
        animal.swim();
    }
    else {
        animal.fly();
    }
}
// 사용자 정의 타입 가드
function isString(value) {
    return typeof value === "string";
}
var partialTodo = { title: "공부하기" };
var pages = {
    home: { title: "홈" },
    about: { title: "소개" }
};
// ReturnType<T> - 함수 반환 타입 추출
function getUser() {
    return { id: 1, name: "홍길동" };
}
// ============================================
// 1️⃣4️⃣ 타입 단언 (Type Assertions)
// ============================================
// as 문법
var someValue = "문자열입니다";
var strLength = someValue.length;
// 꺾쇠 괄호 문법 (JSX에서는 사용 불가)
var anotherValue = "또 다른 문자열";
var anotherLength = anotherValue.length;
// const 단언
var constArray = [1, 2, 3]; // readonly [1, 2, 3]
function fetchUser() {
    return {
        data: { id: 1, username: "hong", email: "hong@example.com" },
        status: 200,
        message: "Success",
        timestamp: new Date()
    };
}
var handleClick = function (event) {
    console.log("\uD074\uB9AD \uC704\uCE58: (".concat(event.x, ", ").concat(event.y, ")"));
};
function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "SET_VALUE":
            return action.payload;
        default:
            return state;
    }
}
console.log("✅ TypeScript 기본 문법 학습 파일이 준비되었습니다!");
console.log("각 섹션의 코드를 수정하고 실험해보세요.");
