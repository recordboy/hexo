---
title: "타입스크립트(TypeScript) 시작하기"
date: 2020-05-09 16:36:46
categories: "typescript"
tags: [typescript, javascript]
thumbnail: "/gallery/thumbnail-ts.png"
toc: true
---

## 정의

타입스크립트(TypeScript)는 마이크로소프트에서 개발, 유지하고 있으며 엄격한 문법을 지원한다. 자바스크립트 엔진을 사용하며, 자바스크립트의 상위 집합으로 ECMA의 최신 표준을 지원한다.

<!-- more -->

## 장점
### 정적 타입 언어(static type language)
C#과 Java같은 정적 타입 언어들에서 사용하는 타입 시스템은 높은 가독성과 코드 품질 등을 제공할 수 있고, 런타임이 아닌 컴파일 환경에서 에러가 발생해 치명적인 오류들을 더욱 쉽게 잡아낼 수 있다.

기존의 자바스크립트는 타입 시스템이 없는 동적 프로그래밍 언어로, 변수에 문자열, 숫자, 불리언 등 여러 타입의 값을 가질 수 있다. 이는 약한 타입의 언어라고 하며, 비교적 유연하게 개발할 수 있는 환경을 제공하지만, 타입 안정성이 보장되지 않아 런타임 환경에서 쉽게 에러가 발생할 수 있는 단점을 가진다. 

타입스크립트는 자바스크립트에 타입 시스템을 적용하여 대부분의 에러를 컴파일 환경에서 체크할 수 있다.

## 설치하기
타입스크립트를 설치하는 방법에는 크게 두가지가 있다.

* npm을 이용한 설치
* TypeScript의 Visual Studio 플러그인 설치

여기서는 npm을 이용하여 설치하겠다. 우선 전역에 타입스크립트를 설치해 준다.

```
$ npm install -g typescript
```

기존의 자바스크립트의 확장자가 `.js`이였다면 타입스크립트는 `.ts`라는 확장자를 가진다. 타입스크립트 작성 후 컴파일러를 통해 자바스크립트 파일로 변환되어 사용하게 된다.

### 파일 생성하기
원하는 디렉토리로 이동하여 타입스크립트 파일을 하나 만들어준다. 여기서는 `app.ts`로 만들겠다. 만든 뒤 아래 처럼 코드를 입력한다.

```javascript
function func(msg) {
    return 'hello' + msg;
}
let txt = 'world';
```

### 컴파일 하기
이제 터미널로 가서 아래 명령어를 실행 한다.

```
$ tsc app.ts
```

`app.ts` 파일을 컴파일 하여 아래처럼 `app.js` 파일이 생성되었을 것이다.

```javascript
function func(msg) {
    return 'hello' + msg;
}
var txt = 'world';
```

## 로컬에서 작업 하기
로컬 환경에서 [Parcel 번들러](https://ko.parceljs.org/getting_started.html)를 이용하면 작업을 빠르게 테스트를 할 수 있다.

### Parcel
Parcel 전역 설치
```
$ npm install -g parcel-bundler
```

프로젝트 파일 생성 및 패키지 파일 생성 후 패키지 및 Parcel를 설치해 준다. 프로젝트 폴더명은 `app`으로 하겠다.
```
$ mkdir app
$ cd app
$ npm init -y
$ npm install -D typescript parcel-bundler
```

`tsconfig.json` 파일을 생성하고 아래 옵션을 추가한다.

```javascript
{
  "compilerOptions": {
    "strict": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

`main.ts` 파일을 생성하고 아래 코드를 입력한다.

```javascript
function add(a: number, b: number) {
  return a + b;
}
const sum: number = add(1, 2);
console.log(sum);
```

`index.html` 파일을 생성하고 `main.ts` 파일을 연결한다. Parcel 번들러가 빌드시에 자동으로 타입스크립트를 컴파일한다.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>typescript</title>
</head>
<body>
  <script src="main.ts"></script>
</body>
</html>
```

위에 생성한 프로젝트로 아래 예제들을 확인해 보겠다.

## 타입 기본
### 타입 지정
타입스크립트는 일반 변수, 매개 변수, 객체 속성 등에`: TYPE`과 같은 형태로 타입을 지정할 수 있다.

```javascript
let a: string = 'text';        // 문자열
let b: number = 0;             // 숫자형
let c: boolean = true;         // 논리형
let d: any = true;             // 어떤 타입이 올지 모를 때
let e: string | number = '0';  // 문자열이나 숫자가 올 때
.
.
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
```javascript
let obj: object = {};
```

### 그 외의 타입
타입스크립트는 ES5, ES6의 상위 확장인 언어이므로 자바스크립트의 타입을 그대로 사용하며, 이외에도 타입스크립트의 고유의 타입이 추가로 제공된다.

| Type | JavaScript | TypeScript | Description |
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

## References
> [한눈에 보는 타입스크립트(updated)](https://heropy.blog/2020/01/27/typescript/)  
> [정적 타이핑](https://poiemaweb.com/typescript-typing)  
> [타입스크립트 기초 연습](https://velog.io/@velopert/typescript-basics)  
> [TypeScript-Handbook 한글 문서](https://typescript-kr.github.io/)  
> [리액트, 타입스크립트 시작하기](http://jeonghwan-kim.github.io/dev/2019/06/25/react-ts.html)  
> [타입스크립트, 써야할까?](https://hyunseob.github.io/2018/08/12/do-you-need-to-use-ts/)  

