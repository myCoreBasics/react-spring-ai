# 📘 TypeScript 기본 문법 강의 교안

---

## 📋 강의 개요

| 항목 | 내용 |
|------|------|
| **강의명** | TypeScript 기초부터 실전까지 |
| **대상** | JavaScript 기본 문법을 알고 있는 개발자 |
| **소요시간** | 약 4시간 (이론 2시간 + 실습 2시간) |
| **학습목표** | TypeScript의 타입 시스템을 이해하고 실무에 적용할 수 있다 |

---

## 📚 목차

1. [TypeScript 소개](#1-typescript-소개)
2. [기본 타입](#2-기본-타입)
3. [배열과 튜플](#3-배열과-튜플)
4. [열거형 (Enum)](#4-열거형-enum)
5. [인터페이스](#5-인터페이스)
6. [타입 별칭](#6-타입-별칭)
7. [유니온과 인터섹션 타입](#7-유니온과-인터섹션-타입)
8. [함수](#8-함수)
9. [클래스](#9-클래스)
10. [제네릭](#10-제네릭)
11. [타입 가드](#11-타입-가드)
12. [유틸리티 타입](#12-유틸리티-타입)
13. [실습 과제](#13-실습-과제)

---

## 1. TypeScript 소개

### 1.1 TypeScript란?

> **TypeScript**는 Microsoft에서 개발한 JavaScript의 상위 집합(Superset) 언어입니다.

#### 주요 특징

| 특징 | 설명 |
|------|------|
| **정적 타입** | 컴파일 시점에 타입 오류를 발견할 수 있습니다 |
| **객체 지향** | 클래스, 인터페이스, 상속 등을 완벽하게 지원합니다 |
| **ES6+ 지원** | 최신 JavaScript 문법을 모두 사용할 수 있습니다 |
| **도구 지원** | IDE에서 강력한 자동완성과 리팩토링을 제공합니다 |

### 1.2 왜 TypeScript를 사용해야 할까?

```
JavaScript의 문제점                    TypeScript의 해결책
─────────────────────                  ────────────────────
런타임에 타입 오류 발생        →       컴파일 시점에 오류 발견
코드 자동완성 제한적           →       강력한 IntelliSense 지원
대규모 프로젝트 유지보수 어려움 →       명확한 타입으로 코드 이해도 향상
리팩토링 시 오류 발생 가능     →       안전한 리팩토링 가능
```

### 1.3 개발 환경 설정

#### npm 사용

```bash
# TypeScript 전역 설치
npm install -g typescript

# 프로젝트에 설치 (권장)
npm install --save-dev typescript
```

#### pnpm 사용

```bash
# TypeScript 전역 설치
pnpm add -g typescript

# 프로젝트에 설치 (권장)
pnpm add -D typescript
```

#### 공통 명령어

```bash
# 버전 확인
tsc --version

# TypeScript 파일 컴파일
tsc index.ts

# tsconfig.json 생성
tsc --init
```

#### ⚠️ `tsc` 명령어가 안 될 때

로컬에만 TypeScript를 설치한 경우, `tsc` 명령어를 찾을 수 없다는 에러가 발생할 수 있습니다.

```bash
$ tsc
zsh: command not found: tsc
```

**원인**: `tsc`는 시스템 PATH에서 실행 파일을 찾지만, 로컬 설치는 `node_modules/.bin/`에 설치됩니다.

**해결 방법**: `pnpm tsc` 또는 `npx tsc` 사용

| 명령어 | 동작 방식 |
|--------|-----------|
| `tsc` | 시스템 PATH에서 찾음 → 전역 설치 필요 |
| `pnpm tsc` | 프로젝트의 `node_modules/.bin/tsc` 실행 |
| `npx tsc` | 프로젝트의 `node_modules/.bin/tsc` 실행 |

```bash
# pnpm 사용 시
pnpm tsc --version      # 버전 확인
pnpm tsc index.ts       # 파일 컴파일
pnpm tsc --init         # tsconfig.json 생성
pnpm tsc --watch        # 워치 모드

# npm 사용 시
npx tsc --version
npx tsc index.ts
npx tsc --init
```

> 💡 **Tip**: 로컬 설치 + `pnpm tsc` 방식이 프로젝트별 버전 관리에 더 좋습니다!

---

## 2. 기본 타입

### 2.1 학습 목표
- TypeScript의 기본 타입들을 이해한다
- 각 타입의 사용 상황을 구분할 수 있다

### 2.2 원시 타입 (Primitive Types)

#### 📌 string, number, boolean

```typescript
// 문자열
let userName: string = "홍길동";
let greeting: string = `안녕하세요, ${userName}님!`;  // 템플릿 리터럴

// 숫자
let age: number = 25;
let height: number = 175.5;
let hexValue: number = 0xff;      // 16진수
let binaryValue: number = 0b1010; // 2진수

// 불리언
let isActive: boolean = true;
let isCompleted: boolean = false;
```

#### 📌 null과 undefined

```typescript
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// 유니온 타입으로 nullable 표현
let name: string | null = null;
name = "홍길동";  // OK
```

### 2.3 특수 타입

#### 📌 any vs unknown

| 타입 | 특징 | 사용 권장 |
|------|------|----------|
| `any` | 모든 타입 허용, 타입 검사 무시 | ❌ 가능하면 사용 자제 |
| `unknown` | 모든 타입 허용, 사용 시 타입 확인 필수 | ✅ any 대신 사용 권장 |

```typescript
// any - 타입 검사 우회 (위험!)
let anyValue: any = "문자열";
anyValue = 123;          // OK
anyValue.toUpperCase();  // 런타임 에러 가능!

// unknown - 안전한 any
let unknownValue: unknown = "문자열";
// unknownValue.toUpperCase();  // ❌ 컴파일 에러!

// 타입 확인 후 사용
if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());  // ✅ OK
}
```

#### 📌 void와 never

```typescript
// void - 반환값이 없는 함수
function logMessage(message: string): void {
  console.log(message);
  // return 없음
}

// never - 절대 반환하지 않는 함수
function throwError(message: string): never {
  throw new Error(message);  // 함수가 종료되지 않음
}

function infiniteLoop(): never {
  while (true) {}  // 무한 루프
}
```

### 2.4 핵심 정리

```
┌─────────────────────────────────────────────────────────────┐
│  💡 기본 타입 선택 가이드                                      │
├─────────────────────────────────────────────────────────────┤
│  • 문자열 → string                                          │
│  • 숫자 → number (정수, 실수, 16진수 모두 포함)               │
│  • 참/거짓 → boolean                                        │
│  • 값이 없음 → null 또는 undefined                           │
│  • 타입을 모를 때 → unknown (any 대신!)                       │
│  • 반환값 없음 → void                                        │
│  • 절대 반환 안함 → never                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 배열과 튜플

### 3.1 학습 목표
- 배열 타입을 선언하는 두 가지 방법을 이해한다
- 튜플의 개념과 사용법을 익힌다

### 3.2 배열 (Array)

```typescript
// 방법 1: 타입[]
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["사과", "바나나", "오렌지"];

// 방법 2: Array<타입> (제네릭)
let scores: Array<number> = [90, 85, 92];
let names: Array<string> = ["김철수", "이영희"];

// 읽기 전용 배열
let readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4);  // ❌ 에러! 수정 불가
```

### 3.3 튜플 (Tuple)

> **튜플**은 고정된 길이와 각 위치별 타입이 정해진 배열입니다.

```typescript
// 기본 튜플
let userInfo: [string, number] = ["홍길동", 25];
let coordinate: [number, number, number] = [10, 20, 30];

// 선택적 요소
let optionalTuple: [string, number?] = ["안녕"];  // OK
optionalTuple = ["안녕", 123];  // OK

// 나머지 요소
let flexibleTuple: [string, ...number[]] = ["점수", 90, 85, 92, 88];
```

### 3.4 배열 vs 튜플 비교

| 특징 | 배열 | 튜플 |
|------|------|------|
| 길이 | 가변적 | 고정적 |
| 타입 | 동일 타입 요소 | 위치별 다른 타입 가능 |
| 사용 예 | 목록, 컬렉션 | 좌표, 키-값 쌍 |

---

## 4. 열거형 (Enum)

### 4.1 학습 목표
- Enum의 개념과 종류를 이해한다
- 적절한 상황에서 Enum을 사용할 수 있다

### 4.2 숫자 열거형

```typescript
enum Direction {
  Up = 1,
  Down,    // 2 (자동 증가)
  Left,    // 3
  Right    // 4
}

let move: Direction = Direction.Up;
console.log(move);  // 1

// 역방향 매핑 가능
console.log(Direction[1]);  // "Up"
```

### 4.3 문자열 열거형

```typescript
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

let favoriteColor: Color = Color.Blue;
console.log(favoriteColor);  // "BLUE"
```

### 4.4 const enum

> 컴파일 시 인라인으로 대체되어 성능 향상

```typescript
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}

// 컴파일 후: let status = 200;
let status = HttpStatus.OK;
```

### 4.5 Enum 사용 권장 사례

```
✅ 사용하면 좋은 경우                    ❌ 피해야 하는 경우
─────────────────────                  ───────────────────
• 관련된 상수 그룹화                    • 단순 상수값 정의
• 상태 코드 정의                       • 동적으로 변하는 값
• 방향, 색상 등 제한된 옵션              • 외부 API 응답값
```

---

## 5. 인터페이스

### 5.1 학습 목표
- 인터페이스를 사용하여 객체 구조를 정의할 수 있다
- 인터페이스 확장(상속)을 이해한다

### 5.2 기본 인터페이스

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com"
};
```

### 5.3 선택적 속성과 읽기 전용

```typescript
interface Product {
  readonly id: number;      // 읽기 전용
  name: string;
  price: number;
  description?: string;     // 선택적 (있어도 되고 없어도 됨)
}

const product: Product = {
  id: 1,
  name: "노트북",
  price: 1500000
  // description은 생략 가능
};

// product.id = 2;  // ❌ 에러! 읽기 전용 속성
```

### 5.4 인터페이스 확장

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: "김개발",
  age: 30,
  employeeId: 12345,
  department: "개발팀"
};
```

### 5.5 함수 타입 인터페이스

```typescript
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
```

---

## 6. 타입 별칭

### 6.1 학습 목표
- 타입 별칭(Type Alias)의 개념을 이해한다
- 인터페이스와 타입 별칭의 차이를 구분한다

### 6.2 기본 타입 별칭

```typescript
// 단순 타입 별칭
type ID = string | number;
type UserName = string;

// 객체 타입 별칭
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };
```

### 6.3 리터럴 타입

```typescript
// 문자열 리터럴 타입
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending";
// orderStatus = "cancelled";  // ❌ 에러!

// 숫자 리터럴 타입
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
let dice: DiceValue = 4;
```

### 6.4 인터페이스 vs 타입 별칭

| 기능 | interface | type |
|------|-----------|------|
| 객체 타입 정의 | ✅ | ✅ |
| 확장 (extends) | ✅ | ❌ (& 사용) |
| 유니온 타입 | ❌ | ✅ |
| 선언 병합 | ✅ | ❌ |
| 기본 타입 별칭 | ❌ | ✅ |

```typescript
// interface - 확장 가능, 선언 병합 가능
interface User {
  name: string;
}
interface User {  // 선언 병합
  age: number;
}

// type - 유니온, 기본 타입 별칭 가능
type StringOrNumber = string | number;
type ID = string;
```

---

## 7. 유니온과 인터섹션 타입

### 7.1 학습 목표
- 유니온 타입과 인터섹션 타입을 이해한다
- 적절한 상황에서 두 타입을 사용할 수 있다

### 7.2 유니온 타입 (|)

> **"A 또는 B"** - 여러 타입 중 하나

```typescript
// 기본 유니온 타입
let id: string | number;
id = "abc123";  // OK
id = 123;       // OK

// 함수에서 유니온 타입
function printId(id: string | number): void {
  // 타입에 따라 다른 처리
  if (typeof id === "string") {
    console.log(id.toUpperCase());  // 문자열 메서드 사용 가능
  } else {
    console.log(id.toFixed(2));     // 숫자 메서드 사용 가능
  }
}
```

### 7.3 인터섹션 타입 (&)

> **"A 그리고 B"** - 모든 타입의 속성을 포함

```typescript
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;  // name과 age 모두 필수

const person: Person = {
  name: "홍길동",
  age: 25
};
```

### 7.4 비교 정리

```
┌──────────────────────────────────────────────────────────┐
│  유니온 (|)                   인터섹션 (&)                │
├──────────────────────────────────────────────────────────┤
│  A | B = A 또는 B            A & B = A 그리고 B           │
│                                                          │
│  type Pet = Dog | Cat;       type DogCat = Dog & Cat;   │
│  → 강아지이거나 고양이        → 강아지이면서 고양이        │
│                                 (두 타입의 모든 속성)     │
└──────────────────────────────────────────────────────────┘
```

---

## 8. 함수

### 8.1 학습 목표
- 함수의 매개변수와 반환 타입을 정의할 수 있다
- 선택적 매개변수, 기본 매개변수를 사용할 수 있다

### 8.2 기본 함수 타입

```typescript
// 함수 선언문
function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}

// 화살표 함수
const multiply = (a: number, b: number): number => a * b;

// 함수 타입 변수
let operation: (x: number, y: number) => number;
operation = (a, b) => a + b;
```

### 8.3 선택적 & 기본 매개변수

```typescript
// 선택적 매개변수 (?)
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

buildName("홍");           // "홍"
buildName("홍", "길동");    // "홍 길동"

// 기본 매개변수 (=)
function createGreeting(
  name: string, 
  greeting: string = "안녕하세요"
): string {
  return `${greeting}, ${name}님!`;
}

createGreeting("홍길동");              // "안녕하세요, 홍길동님!"
createGreeting("홍길동", "반갑습니다"); // "반갑습니다, 홍길동님!"
```

### 8.4 나머지 매개변수

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5));  // 15
```

### 8.5 함수 오버로딩

```typescript
// 오버로드 시그니처
function formatValue(value: string): string;
function formatValue(value: number): string;

// 구현 시그니처
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.trim();
  }
  return value.toFixed(2);
}

formatValue("  hello  ");  // "hello"
formatValue(3.14159);      // "3.14"
```

---

## 9. 클래스

### 9.1 학습 목표
- TypeScript 클래스의 접근 제어자를 이해한다
- 클래스 상속과 추상 클래스를 사용할 수 있다

### 9.2 기본 클래스와 접근 제어자

```typescript
class Animal {
  public name: string;       // 어디서든 접근 가능 (기본값)
  private age: number;       // 클래스 내부에서만 접근 가능
  protected species: string; // 클래스 내부 + 자식 클래스에서 접근 가능

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
}
```

### 9.3 접근 제어자 비교

| 제어자 | 클래스 내부 | 자식 클래스 | 외부 |
|--------|:-----------:|:-----------:|:----:|
| public | ✅ | ✅ | ✅ |
| protected | ✅ | ✅ | ❌ |
| private | ✅ | ❌ | ❌ |

### 9.4 클래스 상속

```typescript
class Dog extends Animal {
  breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age, "개");  // 부모 생성자 호출
    this.breed = breed;
  }

  // 메서드 오버라이드
  speak(): void {
    console.log(`${this.name}이(가) 멍멍 짖습니다.`);
  }
}

const myDog = new Dog("바둑이", 3, "진돗개");
myDog.speak();  // "바둑이이(가) 멍멍 짖습니다."
```

### 9.5 추상 클래스

```typescript
abstract class Shape {
  // 추상 메서드 - 자식 클래스에서 반드시 구현
  abstract getArea(): number;
  
  // 일반 메서드 - 공통 로직 제공
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

const circle = new Circle(5);
circle.describe();  // "이 도형의 면적은 78.54...입니다."
```

---

## 10. 제네릭

### 10.1 학습 목표
- 제네릭의 개념과 필요성을 이해한다
- 제네릭 함수, 인터페이스, 클래스를 작성할 수 있다

### 10.2 제네릭이란?

> **제네릭**은 타입을 매개변수처럼 사용하여 재사용 가능한 컴포넌트를 만드는 기법입니다.

```typescript
// 제네릭 없이 - 타입별로 함수 작성 필요
function identityString(value: string): string { return value; }
function identityNumber(value: number): number { return value; }

// 제네릭 사용 - 하나의 함수로 모든 타입 처리
function identity<T>(value: T): T {
  return value;
}

identity<string>("Hello");  // 타입: string
identity<number>(42);       // 타입: number
identity(true);             // 타입 추론: boolean
```

### 10.3 제네릭 인터페이스

```typescript
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "문자열" };
const numberBox: Box<number> = { value: 123 };

// API 응답 타입
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "홍길동" },
  status: 200,
  message: "Success"
};
```

### 10.4 제네릭 클래스

```typescript
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }
}

const numberQueue = new Queue<number>();
numberQueue.enqueue(1);
numberQueue.enqueue(2);

const stringQueue = new Queue<string>();
stringQueue.enqueue("a");
stringQueue.enqueue("b");
```

### 10.5 제네릭 제약 조건

```typescript
// T는 반드시 length 속성을 가져야 함
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(value: T): void {
  console.log(value.length);
}

logLength("문자열");      // OK (length: 3)
logLength([1, 2, 3]);    // OK (length: 3)
// logLength(123);       // ❌ 에러! number는 length 없음
```

---

## 11. 타입 가드

### 11.1 학습 목표
- 타입 가드의 종류와 사용법을 이해한다
- 유니온 타입을 안전하게 처리할 수 있다

### 11.2 typeof 타입 가드

```typescript
function processValue(value: string | number): void {
  if (typeof value === "string") {
    // 이 블록에서 value는 string 타입
    console.log(value.toUpperCase());
  } else {
    // 이 블록에서 value는 number 타입
    console.log(value.toFixed(2));
  }
}
```

### 11.3 instanceof 타입 가드

```typescript
class Cat {
  meow(): void { console.log("야옹"); }
}

class Dog {
  bark(): void { console.log("멍멍"); }
}

function makeSound(animal: Cat | Dog): void {
  if (animal instanceof Cat) {
    animal.meow();  // Cat 타입으로 추론
  } else {
    animal.bark();  // Dog 타입으로 추론
  }
}
```

### 11.4 in 연산자 타입 가드

```typescript
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function move(animal: Fish | Bird): void {
  if ("swim" in animal) {
    animal.swim();  // Fish 타입
  } else {
    animal.fly();   // Bird 타입
  }
}
```

### 11.5 사용자 정의 타입 가드

```typescript
// value is string - 타입 서술어 (Type Predicate)
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processUnknown(value: unknown): void {
  if (isString(value)) {
    // value는 string 타입으로 좁혀짐
    console.log(value.toUpperCase());
  }
}
```

---

## 12. 유틸리티 타입

### 12.1 학습 목표
- TypeScript 내장 유틸리티 타입을 활용할 수 있다

### 12.2 주요 유틸리티 타입

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
```

#### Partial\<T\> - 모든 속성을 선택적으로

```typescript
type PartialTodo = Partial<Todo>;
// { title?: string; description?: string; completed?: boolean; }

function updateTodo(todo: Todo, updates: Partial<Todo>): Todo {
  return { ...todo, ...updates };
}
```

#### Required\<T\> - 모든 속성을 필수로

```typescript
type RequiredTodo = Required<Todo>;
// 모든 속성이 필수
```

#### Pick\<T, K\> - 특정 속성만 선택

```typescript
type TodoPreview = Pick<Todo, "title" | "completed">;
// { title: string; completed: boolean; }
```

#### Omit\<T, K\> - 특정 속성 제외

```typescript
type TodoWithoutDesc = Omit<Todo, "description">;
// { title: string; completed: boolean; }
```

#### Record\<K, T\> - 키-값 쌍 타입 생성

```typescript
type PageInfo = { title: string };
type Pages = Record<"home" | "about" | "contact", PageInfo>;

const pages: Pages = {
  home: { title: "홈" },
  about: { title: "소개" },
  contact: { title: "연락처" }
};
```

### 12.3 유틸리티 타입 정리표

| 유틸리티 | 설명 | 예시 |
|----------|------|------|
| `Partial<T>` | 모든 속성 선택적 | `Partial<User>` |
| `Required<T>` | 모든 속성 필수 | `Required<User>` |
| `Readonly<T>` | 모든 속성 읽기 전용 | `Readonly<User>` |
| `Pick<T, K>` | 특정 속성만 선택 | `Pick<User, "id">` |
| `Omit<T, K>` | 특정 속성 제외 | `Omit<User, "password">` |
| `Record<K, T>` | 키-값 맵 타입 생성 | `Record<string, number>` |
| `Exclude<T, U>` | 특정 타입 제외 | `Exclude<"a"\|"b", "a">` |
| `Extract<T, U>` | 특정 타입만 추출 | `Extract<"a"\|"b", "a">` |
| `NonNullable<T>` | null, undefined 제외 | `NonNullable<string\|null>` |
| `ReturnType<T>` | 함수 반환 타입 추출 | `ReturnType<typeof fn>` |

---

## 13. 실습 과제

### 📝 과제 1: 기본 타입 연습

다음 변수들에 적절한 타입을 지정하세요.

```typescript
// TODO: 타입을 추가하세요
let productName = "아이폰 15";
let price = 1500000;
let inStock = true;
let tags = ["전자제품", "스마트폰", "Apple"];
let rating = null;
```

### 📝 과제 2: 인터페이스 설계

온라인 쇼핑몰의 주문 시스템을 위한 인터페이스를 설계하세요.

```typescript
// TODO: 아래 인터페이스를 완성하세요

interface Product {
  // 상품 정보
}

interface Customer {
  // 고객 정보
}

interface Order {
  // 주문 정보 (Product, Customer 활용)
}
```

### 📝 과제 3: 제네릭 함수 작성

배열에서 첫 번째와 마지막 요소를 반환하는 제네릭 함수를 작성하세요.

```typescript
// TODO: 제네릭 함수를 구현하세요
function getFirstAndLast<T>(arr: T[]): [T, T] {
  // 구현
}

// 테스트
console.log(getFirstAndLast([1, 2, 3, 4, 5]));  // [1, 5]
console.log(getFirstAndLast(["a", "b", "c"]));  // ["a", "c"]
```

### 📝 과제 4: 유틸리티 타입 활용

아래 User 인터페이스를 활용하여 요구사항에 맞는 타입을 만드세요.

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: 새 유저 생성 시 사용할 타입 (id, createdAt, updatedAt 제외)
type CreateUserDto = ???

// TODO: 유저 정보 수정 시 사용할 타입 (모든 필드 선택적, id 제외)
type UpdateUserDto = ???

// TODO: 공개 프로필 타입 (password, email 제외)
type PublicProfile = ???
```

---

## 📌 참고 자료

### 공식 문서
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)

### 추천 학습 순서

```
1주차: 기본 타입, 배열, 튜플, Enum
   ↓
2주차: 인터페이스, 타입 별칭, 유니온/인터섹션
   ↓
3주차: 함수, 클래스
   ↓
4주차: 제네릭, 타입 가드, 유틸리티 타입
```

---

## ✅ 학습 체크리스트

- [ ] 기본 타입(string, number, boolean 등)을 선언할 수 있다
- [ ] any와 unknown의 차이를 설명할 수 있다
- [ ] 배열과 튜플의 차이를 이해한다
- [ ] 인터페이스를 정의하고 확장할 수 있다
- [ ] 유니온 타입과 인터섹션 타입을 사용할 수 있다
- [ ] 함수의 매개변수와 반환 타입을 정의할 수 있다
- [ ] 클래스와 접근 제어자를 사용할 수 있다
- [ ] 제네릭을 사용하여 재사용 가능한 코드를 작성할 수 있다
- [ ] 타입 가드를 사용하여 타입을 좁힐 수 있다
- [ ] 주요 유틸리티 타입을 활용할 수 있다

---

> 💡 **Tip**: 실습 파일 `index.ts`와 함께 학습하면 더 효과적입니다!

