---
title: "화살표 함수(Arrow Function)"
date: 2020-04-29 20:13:36
categories: "react"
tags: [react]
thumbnail: "/gallery/thumbnail-es6.png"
toc: true
---

## 정의
ECMAScript6(2015)에서 새로 추가된 화살표 함수(Arrow Function)는 function 키워드 대신 화살표(`=>`)를 사용하여 보다 간략한 방법으로 함수를 선언할 수 있다.

<!-- more -->

### 기존 함수
```javascript
var func = function() {
  ...
};
```

### 화살표 함수
```javascript
const func = () => {
  ...
};
```


## 기본 문법

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
function 키워드로 생선된 일반 함수와 화살표 함수의 가장 큰 차이점은 this이다.

### 일반 함수의 this

추후 수정 예정

## References
> [화살표 함수](https://poiemaweb.com/es6-arrow-function)  
> [JavaScript - 화살표 함수(Arrow function)](https://velog.io/@ki_blank/JavaScript-화살표-함수Arrow-function)  
