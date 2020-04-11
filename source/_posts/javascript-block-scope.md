---
title: "var, let, const 차이"
date: 2019-06-05 08:12:48
categories: "javascript"
tags: [javascript]
---

`var`는 변수를 선언하는 키워드이며, ES6부터 `let`과 `const`가 추가되었다.
`var`는 함수 스코프를 가지고 `let`과 `const`는 블록 스코프를 가진다. 여기서 스코프란 코드가 실행되는 유효범휘이다.

<!-- more -->

## 블록 스코프
블록 스코프는 중괄호{}로 감싸진 범위를 말한다. 아래는 조건문(if), 반복문(for), 함수(function)가 블록 스코프를 가지고 있는 모습이다.

```javascript
if (true) {
    // 블록 스코프
}

for (var i = 0; i < 10; i++) {
    // 블록 스코프
}

function func() {
    // 블록 스코프
}
```

## var
기존의 `var`는 위 세개중 함수에서만 스코프를 가진다.

```javascript
if (true) {
    var a = 1;
}
console.log(a);
// 1

for (var i = 0; i < 1; i++) {
    var b = 2;
}
console.log(b);
// 2

function func() {
    var c = 3;
}
console.log(c);
// Uncaught ReferenceError: foo is not defined at window.onload
```

`var`는 중복 선언이 가능하다.

```javascript
var a = 1;
    a = 2;
console.log(a);
// 2
```

## let, const
ES6부터 추가된 `let`, `const`는 조건문과 반복문에도 스코프를 가진다.

```javascript
if (true) {
    let a = 1;
    const b = 2;
    console.log(a); // 1
    console.log(B); // 2
}
console.log(a);
// Uncaught ReferenceError: a is not defined at window.onload
console.log(b);
// Uncaught ReferenceError: a is not defined at window.onload

for (var i = 0; i < 1; i++) {
    let c = 3;
    const d = 4;
    console.log(c); // 3
    console.log(d); // 4
}
console.log(c); // Uncaught ReferenceError: a is not defined at window.onload
console.log(d); // Uncaught ReferenceError: a is not defined at window.onload

function func() {
    let e = 5;
    const f = 6;
    console.log(e); // 5
    console.log(f); // 6
}
func();
console.log(e);
// Uncaught ReferenceError: foo is not defined at window.onload
console.log(f);
// Uncaught ReferenceError: foo is not defined at window.onload
```

`let`과 `const`의 차이는 const 가 좀 더 엄격하다. `let`은 중복선언이 되지만 `const`는 중복선언이 안되기 때문에 변수가 선언될 때 값을 할당하여야 한다. `const`는 DB환경정보, API응답값 등 변하지 않을 값을 담을 때 사용한다.

```javascript
let a;
    a = 1;
console.log(a);
// 1

const b;
    b = 2;
// Uncaught TypeError: Assignment to constant variable.
```

## 결론

* `var`은 함수 스코프에서만 유효
* `let`, `const`는 블록 스코프에서 유효
* `const`는 선언과 동시에 할당이 일어나야하고, 재할당이 불가

## References
> [자바스크립트 변수와 스코프(유효범위)](https://yuddomack.tistory.com/entry/자바스크립트-변수와-스코프유효범위)
