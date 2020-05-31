---
title: "타입스크립트(TypeScript) 타입 선언"
date: 2020-05-12 10:46:47
categories: [front-end, typescript]
tags: [typescript, javascript]
thumbnail: "/gallery/thumbnail-ts.png"
toc: true
---

## 타입 기본
### 타입 지정
타입스크립트는 일반 변수, 매개 변수, 객체 속성 등에`: TYPE`과 같은 형태로 타입을 지정할 수 있다.

<!-- more -->

```javascript
let a: string = 'text'; // 문자열
let b: number = 0; // 숫자형
let c: boolean = true; // 논리형
let d: any = true; // 어떤 타입이 올지 모를 때
let e: string | number = '0'; // 문자열이나 숫자가 올 때
```

### 타입 에러
만약 아래와 같이 타입을 선언하고 다른 타입의 값을 대입하거나 값이 선언된 후에 다른 타입의 값이 대입되면 에러를 발생한다.

```javascript
// 문자열로 선언하고 숫자를 대입하면 에러 발생
let a: string = 0; // error

// 문자열 값이 들어가고 이후에 숫자가 대입하면 에러 발생
let b: string = 'text';
b = 1; // error Type '1' is not assignable to type 'string'.  TS2322
```

출력창에서 `TS2322`라는 에러 코드를 볼 수 있으며, 이를 검색하면 쉽게 에러 코드에 대한 정보를 얻을 수 있다.

## 타입 선언
타입스크립트는 ES5, ES6의 상위 확장인 언어이므로 자바스크립트의 타입을 그대로 사용하며, 이외에도 타입스크립트의 고유의 타입이 추가로 제공된다.

| Type | JS | TS | Description |
|:---|:---:|:---:|:---|
| boolean | ◯ | ◯ | true와 false |
| null | ◯ | ◯ | 값이 없다는 것을 명시 |
| undefined | ◯ | ◯ | 값을 할당하지 않은 변수의 초기값 |
| number | ◯ | ◯ | 숫자(정수와 실수, Infinity, NaN) |
| string | ◯ | ◯ | 문자열 |
| symbol | ◯ | ◯ | 고유하고 수정 불가능한 데이터 타입이며 주로 객체 프로퍼티들의 식별자로 사용(ES6에서 추가) |
| object | ◯ | ◯ | 객체형(참조형) |
| array |  | ◯ | 배열 |
| tuple |  | ◯ | 고정된 요소수 만큼의 타입을 미리 선언후 배열을 표현 |
| enum |  | ◯ | 열거형. 숫자값 집합에 이름을 지정한 것 |
| any |  | ◯ | 타입 추론(type inference)할 수 없거나 타입 체크가 필요없는 변수에 사용, var 키워드로 선언한 변수와 같이 어떤 타입의 값이라도 할당 가능 |
| void |  | ◯ | 일반적으로 함수에서 반환값이 없을 경우 사용 |
| never |  | ◯ | 결코 발생하지 않는 값 |

### 논리형(Boolean)
```javascript
let bool01: boolean = true;
let bool02: boolean = false;
```

### 숫자형(Number)
```javascript
let num01: number = 5;
let num02: number = 3.14;
let num03: number = NaN;
```

### 문자열(String)
ES6의 템플릿 문자열도 지원한다.
```javascript
let str01: string = 'text';
let str02: string = `my name is ${val}`;
```

### 배열(Array)
배열은 아래와 같이 두가지 방법으로 타입을 선언할 수 있다.
```javascript
// 문자열만 가지는 배열
let arr01: string[] = ['a', 'b', 'c'];
let arr02: Array<string> = ['a', 'b', 'c'];

// 숫자형만 가지는 배열
let arr03: number[] = [1, 2, 3];
let arr04: Array<number> = [1, 2, 3];

// Union 타입(다중 타입)의 문자열과 숫자를 동시에 가지는 배열
let arr05: (string | number)[] = [1, 'a', 2, 'b', 'c', 3];
let arr06: Array<string | number> = [1, 'a', 2, 'b', 'c', 3];

// 배열이 가지는 값의 타입을 추측할 수 없을 때 any를 사용할 수 있다.
let arr07: (any)[] = [1, 'a', 2, 'b', 'c', 3];
let arr08: Array<any> = [1, 'a', 2, 'b', 'c', 3];
```

### 함수(Function)
함수는 파라미터에 각각 타입을 선언해 주며, 파라미터 우측에는 해당 함수의 리턴값 타입도 선언해 주면 된다.
```javascript
function sum(a: number, b: number): number {
  return a + b;
}
console.log(sum(2, 3)); // 5
```

리턴값을 숫자형으로 선언하였는데 다른 값이 리턴된다면 역시 에러가 난다.
```javascript
function sum(a: number, b: number): number {
  return null; // error
}
```

### 객체(Object)
기본적으로 typeof 연산자가 `object`로 반환하는 모든 타입을 나타낸다. 여러 타입의 상위 타입이기 때문에 그다지 유용하지 않다.

```javascript
let obj: object = {};
let arr: object = [];
let func: object = function() {};
let date: object = new Date();
```

보다 정확하게 타입 지정을 하기 위해 아래와 같이 객체 속성들에 대한 타입을 개별적으로 지정할 수 있다.

```javascript
let user: { name: string, age: number } = {
  name: 'a',
  age: 20
};
console.log(user); // {name: "a", age: 20}
```

### 튜플(Tuple)
배열과 유사하다. 차이점은 정해진 타입의 요소 개수 만큼의 타입을 미리 선언후 배열을 표현한다.
```javascript
let tuple: [string, number];
tuple = ['a', 0];
console.log(tuple); // ["a", 0]
```

정해진 요소의 순서 및 개수가 다르면 오류를 출력한다.
```javascript
let tuple: [string, number];
tuple = [0, 'a']; // error
tuple = ['a', 0, 1]; // error
```

아래와 같이 데이터를 개별 변수로 지정하지 않고, 단일 튜플 타입으로 지정해 사용할 수 있다.
```javascript
// 기존 변수
let name: string = 'a';
let age: number = 20;

// 튜플
let user: [string, number] = ['a', 20];
console.log(user); // ["a", 20]
```

값으로 타입을 대신할 수도 있다. 처음 선언할 때의 값과 다른 값이 할당 되면 에러가 출력된다.

```javascript
let user: ['a', number];
user = ['a', 20]; // ["a", 20]
user = ['a', 30]; // ["a", 30]
user = ['b', 30]; // error
```

튜플은 정해진 타입과 고정된 길이의 배열이지만, 값을 할당할 때만 해당된다. push나 splice같은 메소드를 통해 값을 넣는건 막을 수 없다.

```javascript
let user: [string, number];
user = ['a', 20]
console.log(user); // ["a", 20]
user.push(30);
console.log(user); // ["a", 20, 30]
```

### 열거형(Enum)
숫자 혹은 문자열 값 집합에 이름을 부여할 수 있는 타입으로, 값의 종류가 일정한 범위로 정해져 있는 경우 유용하다. 기본적으로 0부터 시작하며, 값은 1씩 증가한다.

```javascript
enum obj {
  a,
  b,
  c,
  d,
  e
}
console.log(obj);
// 0: "a"
// 1: "b"
// 2: "c"
// 3: "d"
// 4: "e"
// a: 0
// b: 1
// c: 2
// d: 3
// e: 4
```

수동으로 값을 변경할 수 있으며, 변경한 부분부터 다시 1씩 증가한다.

```javascript
enum obj {
  a,
  b = 10,
  c,
  d,
  e
}
console.log(obj.b); // 10
console.log(obj.c); // 11
```

### 모든 타입(Any)
Any는 모든 타입을 의미하며, 기존의 자바스크립트 변수와 마찬가지로 어떠한 타입의 값도 할당할 수 있다. 불가피하게 타입을 선언할 수 없는 경우, 유용할 수 있다.

```javascript
let any:any = 'String';
any = 0;
console.log(any); // 0
any = true;
console.log(any); // true
```

### 알 수 없는 타입(Unknown)
Any와 같은 최상위 타입인 Unknown은 알 수 없는 타입을 의미한다. Any와 같이 Unknown에는 어떠한 타입의 값도 할당할 수 있지만, Unknown을 다른 타입에는 할당할 수 없다. 

```javascript
let a: any = 'text';
let b: unknown = 0;
let c: boolean = a; // 모든 타입(any)은 어디딘 할당이 가능하다.
let d: boolean = b; // 알 수 없는 타입(unknown)은 모든 타입(any)을 제외한 다른 타입에 할당할 수 없다.
```

추가 수정 예정

## References
> [한눈에 보는 타입스크립트(updated)](https://heropy.blog/2020/01/27/typescript/)  
> [정적 타이핑](https://poiemaweb.com/typescript-typing)  
> [타입스크립트 기초 연습](https://velog.io/@velopert/typescript-basics)  
> [TypeScript-Handbook 한글 문서](https://typescript-kr.github.io/)  
> [타입스크립트 기초 연습](https://velog.io/@velopert/typescript-basics)
