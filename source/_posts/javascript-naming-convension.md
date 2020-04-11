---
title: "자바스크립트 변수 명명 규칙"
date: 2020-02-05 15:01:00
categories: "javascript"
tags: [javascript]
---

## 변수, 함수명은 카멜 케이스를 사용한다.
첫글자는 소문자, 단위로 첫글자 대문자를 사용, 중간에 언더바(_)사용 금지한다. 대표적인 표기법으로 카멜 케이스, 파스칼 표기법, 헝가리안 표기법, 스네이크 표기법이 있으며 사용하는 언어에 따라 권장사항이 다르다.

```javascript
var pageName;
```

## 상수는 영문 대문자 스네이크 표기법을 사용한다.

```javascript
var SYMBOLIC_NAME;
```

## 여러 단어가 합쳐져 만들어진 약어(HTML, XML)의 경우는 전부 대문자로 사용한다.

```javascript
var HTML;
```

## 생성자 함수는 대문자 카멜 케이스를 사용한다.

```javascript
function Func() {
    ...
}
```

## 지역변수 혹은 private 변수는 언더바(_)로 시작한다.

```javascript
var _private;
```

## 예약어를 사용하지 않는다.

```javascript
// bad
var if;
var for;
var this;
...
```

## 전역 변수를 사용하지 않는다.
모든 컴파일 단위는 하나의 공용 전역 객체(window)에 로딩된다. 전역 변수는 언제든지 프로그램의 모든 부분에서 접근할 수 있기 때문에 편하지만, 바꿔 말하면 프로그램의 모든 부분에서 변경될 수 있고, 그로 인해 프로그램에 치명적인 오류를 발생시킬 수 있다.

```javascript
var global = 'data';
```

## 암묵적 전역 변수를 사용하지 않는다.

```javascript
// bad
function sum(x, y) {
  result = x + y;
  return result;
}

// bad
function foo() {
  var a = b = 0; // var a = (b = 0);와 같다. b가 암묵적 전역이 된다.
}

// good
function sum(x, y) {
  var result = x + y;
  return result;
}

// good
function foo() {
  var a, b;
  a = b = 0;
}
```

## References
> [코딩 컨벤션](https://ui.toast.com/fe-guide/ko_CODING-CONVENSION/)
