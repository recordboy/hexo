---
title: "[JavaScript] 화살표 함수(Arrow Function)"
date: 2020-04-29 20:13:36
categories: [front-end, javascript]
tags: [javascript, es6]
thumbnail: "/gallery/thumbnail-js.png"
toc: true
widgets:
  - type: toc
    position: right
  - type: categories
    position: right
  - type: tags
    position: right
sidebar:
  right:
    sticky: true
---

## 정의
ECMAScript6(2015)에서 새로 추가된 화살표 함수(Arrow Function)는 function 키워드 대신 화살표(`=>`)를 사용하여 보다 간략한 방법으로 함수를 선언할 수 있다.

<!-- more -->

### 기존 함수
#### 함수 표현식
```javascript
var func = function() {
  ...
};
```

#### 함수 선언식
```javascript
function func() {
  ...
}
```

### 화살표 함수
```javascript
const func = () => {
  ...
};
```


## 화살표 함수의 기본 문법

```javascript
// 매개 변수가 없을 경우
const func = () => {
  ...
};

// 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.
const func = x => {
  ...
};

// 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.
const func = (x, y) => {
  ...
}

// 간단하게 한줄로 표현할 땐 중괄호를 생략할 수 있으며 암묵적으로 값이 반환된다. 아래 두 표현은 같다.
const func = (x, y) => x + y;
const func = (x, y) => { return x + y; }

// 객체를 반환시 중괄호를 생략하면 소괄호를 사용한다. 아래 두 표현은 같다.
const func = (x) => { return { a: x } };
const func = (x) => ({ a: x });
```

## 화살표 함수의 호출
화살표 함수는 익명 함수로만 사용할 수 있다. 따라서 함수를 호출하기 위해서는 함수 표현식을 사용한다.

### 함수 표현식
```javascript
// ES5
var func = function(x, y) {
  return x + y;
}
console.log(func(5, 10)); // 15

// ES6
const func = (x, y) => {
  return x + y;
}
console.log(func(5, 10)); // 15
```

### 콜백 함수
콜백 함수의 경우 함수 표현식보다 표현이 간결하다.

```javascript
// ES5
var arr = [1, 2, 3];
var result = arr.map(function(x) {
  return x + x;
});
console.log(result); // [2, 4, 6]
```

```javascript
// ES6
const arr = [1, 2, 3];
const result = arr.map(x => x + x);
console.log(result); // [2, 4, 6]
```

## this
기존의 function 키워드로 생선된 일반 함수와 화살표 함수의 큰 차이점 중 하나는 this이다.

### function 키워드 함수의 this
function 키워드로 생성된 함수는 함수가 어떻게 호출되었는지에 따라 this가 바인딩할 객체가 동적으로 결정된다.

#### 일반 함수의 this
일반 함수(여기서 일반 함수란 중첩 함수나 객체의 함수인 메소드, 콜백 함수가 아닌 전역 스코프에 있는 함수를 말한다.)를 호출하게 되면 this는 전역 객체인 window를 바인딩 한다.

```javascript
function func() {
    console.log(this); // window
}
func();
```

#### 생성자 함수의 this
하지만 new 키워드를 사용하여 생성자함수 호출 방식으로 obj 객체를 생성하면 함수 안에서의 this는 생성자 함수를 바인딩 한다.

```javascript
function Func() {
    console.log(this); // Func {}
}
var obj = new Func();
```

#### 메소드의 this
function 키워드로 만들어진 메소드의 this는 자신을 포함하는 객체를 바인딩 한다.

```javascript
var obj = {
    myName: '나나',
    getName: function() {
        console.log(this); // {myName: "나나", getName: ƒ}
        console.log(this.myName); // 나나
    }
}
obj.getName();
```

obj 객체의 getName 메소드 안에서의 this는 obj 객체를 바인딩 하고 있다. this.myName 호출하면 값이 제대로 출력된다.

### 화살표 함수의 this
화살표 함수는 자신의 this를 바인딩하지 않고 언제나 상위 스코프인 this를 바인딩 한다. 이를 Lexical this 라고 한다.

#### 일반 함수의 this
일반 함수의 경우 function 키워드와 마찬가지로 전역 객체인 window를 바인딩 한다.

```javascript
const func = () => {
    console.log(this); // window
}
func();
```

#### 생성자 함수의 this
화살표 함수는 생성자 함수로 사용할 수 없다.

```javascript
const Func = () => {
    console.log(this);
}
const obj = new Func(); // Uncaught TypeError: Func is not a constructor
```

기존의 function 키워드로 만든 일반적인 생성자 함수는 prototype 프로퍼티를 가지며, prototype 프로퍼티가 가르키는 프로토 타입 객체의 constructor를 사용한다.

```javascript
function Func() {}
console.log(Func.prototype); // {constructor: ƒ}
```

하지만 화살표 함수는 prototype 프로퍼티를 가지고 있지 않다.

```javascript
const Func = () => {}
console.log(Func.prototype) //undefined
```

#### 메소드의 this
```javascript
var obj = {
    myName: '나나',
    getName: () => {
        console.log(this); // window
        console.log(this.myName); // undefined
    }
}
obj.getName();
```
화살표 함수로 만들어진 메소드의 this는 자신을 포함하는 객체를 바인딩하지 않고 window를 바인딩하기 때문에 화살표 함수는 메소드에 적합하지 않다.

## References
> [화살표 함수](https://poiemaweb.com/es6-arrow-function)  
> [JavaScript - 화살표 함수(Arrow function)](https://velog.io/@ki_blank/JavaScript-화살표-함수Arrow-function)  
> [Arrow Function(화살표 함수)이란? :: 마이구미](https://mygumi.tistory.com/229)  
> [ES6 화살표 함수(arrow function) 변경점 요약 (사용법, this등)](https://jeong-pro.tistory.com/110)
