// ============================================
// 🎯 TypeScript 기본 문법 실습 가이드
// ============================================

// ============================================
// 1️⃣ 기본 타입 (Primitive Types)
// ============================================

// 문자열 (string)
let userName: string = "홍길동";
let greeting: string = `안녕하세요, ${userName}님!`; // 템플릿 리터럴
console.log(greeting);

// 숫자 (number)
let age: number = 25;
let height: number = 175.5;
let hexValue: number = 0xff; // 16진수

// 불리언 (boolean)
let isActive: boolean = true;
let isCompleted: boolean = false;

// null과 undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// any - 모든 타입 허용 (가능하면 사용 자제)
let anyValue: any = "문자열";
anyValue = 123; // OK
anyValue = true; // OK

// unknown - any보다 안전한 타입
let unknownValue: unknown = "문자열";
// unknownValue.length; // 에러! 타입 확인 필요
if (typeof unknownValue === "string") {
  console.log(unknownValue.length); // OK
}

// void - 반환값이 없는 함수
function logMessage(message: string): void {
  console.log(message);
}

// never - 절대 반환하지 않는 함수
function throwError(message: string): never {
  throw new Error(message);
}

// ============================================
// 2️⃣ 배열 (Arrays)
// ============================================

// 배열 타입 선언 방법 1
let numbers: number[] = [1, 2, 3, 4, 5];

// 배열 타입 선언 방법 2 (제네릭)
let fruits: Array<string> = ["사과", "바나나", "오렌지"];

// 읽기 전용 배열
let readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4); // 에러! 수정 불가

// ============================================
// 3️⃣ 튜플 (Tuples)
// ============================================

// 고정된 길이와 타입을 가진 배열
let userInfo: [string, number] = ["홍길동", 25];
let coordinate: [number, number, number] = [10, 20, 30];

// 선택적 요소가 있는 튜플
let optionalTuple: [string, number?] = ["안녕"];

// ============================================
// 4️⃣ 열거형 (Enum)
// ============================================

// 숫자 열거형
enum Direction {
  Up = 1,
  Down,    // 2
  Left,    // 3
  Right    // 4
}
let moveDirection: Direction = Direction.Up;

// 문자열 열거형
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}
let favoriteColor: Color = Color.Blue;

// const enum - 컴파일 시 인라인 처리
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}

// ============================================
// 5️⃣ 객체 타입 (Object Types)
// ============================================

// 기본 객체 타입
let person: { name: string; age: number } = {
  name: "김철수",
  age: 30
};

// 선택적 속성 (Optional Properties)
let optionalPerson: { name: string; age?: number } = {
  name: "이영희"
  // age는 선택사항
};

// 읽기 전용 속성
let readonlyPerson: { readonly id: number; name: string } = {
  id: 1,
  name: "박민수"
};
// readonlyPerson.id = 2; // 에러!

// ============================================
// 6️⃣ 인터페이스 (Interface)
// ============================================

// 기본 인터페이스
interface User {
  id: number;
  name: string;
  email: string;
}

let user1: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com"
};

// 선택적 속성과 읽기 전용
interface Product {
  readonly id: number;
  name: string;
  price: number;
  description?: string; // 선택적
}

// 인터페이스 확장 (상속)
interface Employee extends User {
  department: string;
  salary: number;
}

let employee1: Employee = {
  id: 1,
  name: "김개발",
  email: "kim@company.com",
  department: "개발팀",
  salary: 5000000
};

// 함수 타입 인터페이스
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

// ============================================
// 7️⃣ 타입 별칭 (Type Alias)
// ============================================

// 기본 타입 별칭
type ID = string | number;
type UserName = string;

// 객체 타입 별칭
type Point = {
  x: number;
  y: number;
};

let point1: Point = { x: 10, y: 20 };

// 유니온 타입 별칭
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending";

// 인터섹션 타입 (&)
type Named = { name: string };
type Aged = { age: number };
type PersonType = Named & Aged;

let personType: PersonType = { name: "홍길동", age: 25 };

// ============================================
// 8️⃣ 유니온 타입 (Union Types)
// ============================================

// 여러 타입 중 하나
let idValue: string | number;
idValue = "abc123";
idValue = 123;

// 리터럴 유니온 타입
type ButtonSize = "small" | "medium" | "large";
let btnSize: ButtonSize = "medium";

// 함수에서 유니온 타입
function printId(id: string | number): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

// ============================================
// 9️⃣ 함수 (Functions)
// ============================================

// 기본 함수 타입
function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}

// 화살표 함수
const multiply = (a: number, b: number): number => a * b;

// 선택적 매개변수
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

// 기본 매개변수
function createGreeting(name: string, greeting: string = "안녕하세요"): string {
  return `${greeting}, ${name}님!`;
}

// 나머지 매개변수 (Rest Parameters)
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// 함수 오버로딩
function formatValue(value: string): string;
function formatValue(value: number): string;
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.trim();
  }
  return value.toFixed(2);
}

// ============================================
// 🔟 클래스 (Classes)
// ============================================

class Animal {
  // 접근 제어자: public, private, protected
  public name: string;
  private age: number;
  protected species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  // getter
  get animalAge(): number {
    return this.age;
  }

  // setter
  set animalAge(value: number) {
    if (value > 0) {
      this.age = value;
    }
  }

  // 메서드
  speak(): void {
    console.log(`${this.name}이(가) 소리를 냅니다.`);
  }
}

// 클래스 상속
class Dog extends Animal {
  breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age, "개");
    this.breed = breed;
  }

  // 메서드 오버라이드
  speak(): void {
    console.log(`${this.name}이(가) 멍멍 짖습니다.`);
  }

  // 추가 메서드
  fetch(): void {
    console.log(`${this.name}이(가) 공을 가져옵니다.`);
  }
}

// 추상 클래스
abstract class Shape {
  abstract getArea(): number;
  
  describe(): void {
    console.log(`이 도형의 면적은 ${this.getArea()}입니다.`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

// ============================================
// 1️⃣1️⃣ 제네릭 (Generics)
// ============================================

// 제네릭 함수
function identity<T>(value: T): T {
  return value;
}

let stringValue = identity<string>("Hello");
let numberValue = identity<number>(42);

// 제네릭 인터페이스
interface Box<T> {
  value: T;
}

let stringBox: Box<string> = { value: "문자열" };
let numberBox: Box<number> = { value: 123 };

// 제네릭 클래스
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  get length(): number {
    return this.items.length;
  }
}

// 제네릭 제약 조건
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(value: T): void {
  console.log(value.length);
}

logLength("문자열");     // OK
logLength([1, 2, 3]);    // OK
// logLength(123);       // 에러! number는 length 속성이 없음

// ============================================
// 1️⃣2️⃣ 타입 가드 (Type Guards)
// ============================================

// typeof 타입 가드
function processValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value * 2);
  }
}

// instanceof 타입 가드
class Cat {
  meow(): void {
    console.log("야옹");
  }
}

class Bird {
  fly(): void {
    console.log("훨훨");
  }
}

function makeSound(animal: Cat | Bird): void {
  if (animal instanceof Cat) {
    animal.meow();
  } else {
    animal.fly();
  }
}

// in 연산자 타입 가드
interface Fish {
  swim: () => void;
}

interface BirdInterface {
  fly: () => void;
}

function move(animal: Fish | BirdInterface): void {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}

// 사용자 정의 타입 가드
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// ============================================
// 1️⃣3️⃣ 유틸리티 타입 (Utility Types)
// ============================================

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial<T> - 모든 속성을 선택적으로
type PartialTodo = Partial<Todo>;
let partialTodo: PartialTodo = { title: "공부하기" };

// Required<T> - 모든 속성을 필수로
type RequiredTodo = Required<Todo>;

// Readonly<T> - 모든 속성을 읽기 전용으로
type ReadonlyTodo = Readonly<Todo>;

// Pick<T, K> - 특정 속성만 선택
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit<T, K> - 특정 속성 제외
type TodoWithoutDescription = Omit<Todo, "description">;

// Record<K, T> - 키-값 쌍의 타입 정의
type PageInfo = { title: string };
type Pages = Record<string, PageInfo>;

let pages: Pages = {
  home: { title: "홈" },
  about: { title: "소개" }
};

// Exclude<T, U> - 특정 타입 제외
type MyType = "a" | "b" | "c";
type ExcludedType = Exclude<MyType, "a">; // "b" | "c"

// Extract<T, U> - 특정 타입만 추출
type ExtractedType = Extract<MyType, "a" | "b">; // "a" | "b"

// NonNullable<T> - null, undefined 제외
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // string

// ReturnType<T> - 함수 반환 타입 추출
function getUser() {
  return { id: 1, name: "홍길동" };
}
type UserReturn = ReturnType<typeof getUser>;

// ============================================
// 1️⃣4️⃣ 타입 단언 (Type Assertions)
// ============================================

// as 문법
let someValue: unknown = "문자열입니다";
let strLength: number = (someValue as string).length;

// 꺾쇠 괄호 문법 (JSX에서는 사용 불가)
let anotherValue: unknown = "또 다른 문자열";
let anotherLength: number = (<string>anotherValue).length;

// const 단언
let constArray = [1, 2, 3] as const; // readonly [1, 2, 3]

// ============================================
// 1️⃣5️⃣ 조건부 타입 (Conditional Types)
// ============================================

// 기본 조건부 타입
type IsString<T> = T extends string ? "yes" : "no";
type Result1 = IsString<string>;  // "yes"
type Result2 = IsString<number>;  // "no"

// infer 키워드 사용
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Unwrapped = UnwrapPromise<Promise<string>>; // string

// ============================================
// 1️⃣6️⃣ 맵드 타입 (Mapped Types)
// ============================================

// 기본 맵드 타입
type Flags<T> = {
  [P in keyof T]: boolean;
};

interface PersonFlags {
  name: string;
  age: number;
}

type PersonBooleans = Flags<PersonFlags>;
// { name: boolean; age: boolean }

// 수정자 추가/제거
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// ============================================
// 🎉 실습 예제
// ============================================

// 예제 1: 간단한 API 응답 타입 정의
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface UserData {
  id: number;
  username: string;
  email: string;
}

function fetchUser(): ApiResponse<UserData> {
  return {
    data: { id: 1, username: "hong", email: "hong@example.com" },
    status: 200,
    message: "Success",
    timestamp: new Date()
  };
}

// 예제 2: 이벤트 핸들러 타입
type EventHandler<E> = (event: E) => void;

interface ClickEvent {
  x: number;
  y: number;
  target: string;
}

const handleClick: EventHandler<ClickEvent> = (event) => {
  console.log(`클릭 위치: (${event.x}, ${event.y})`);
};

// 예제 3: 상태 관리 패턴
type Action<T extends string, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P };

type IncrementAction = Action<"INCREMENT">;
type SetValueAction = Action<"SET_VALUE", number>;

function reducer(state: number, action: IncrementAction | SetValueAction): number {
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
