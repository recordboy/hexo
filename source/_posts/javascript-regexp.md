---
title: "정규표현식"
date: 2018-03-02 21:41:31
categories: [front-end, javascript]
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
toc: true
---

## 정의

정규표현식은 문자열에 포함된 문자 조합을 찾기 위해 사용되거나 그 문자열을 다른 문자열로 치환해 주는 패턴이다. 예를 들면 회원가입 화면에서 사용자로 부터 입력받는 전화번호가 유효한지 체크할 필요가 있을 때 정규표현식을 사용하면 간단하게 처리할 수 있다.

<!-- more -->

```javascript
var tel = '0101234567팔';
var regExp = /^[0-9]+$/;

console.log(regExp.test(tel)); // false
```

 > 정규표현식은 하나의 언어라고 할 만큼 모든것을 다루기에는 너무 방대하다. 정규표현식 패턴은 [zvon의 정규표현식 tutorials](http://zvon.org/comp/r/tut-Regexp.html#Pages~Contents)에서 확인할 수 있다.


정규표현식은 리터럴 표기법과 생성자 함수로 생성할 수 있다. 

### 리터널 방식

```javascript
var re = /ab + c/;
```

리터널 방식은 스크립트가 불어와질 때 컴파일 된다. 정규직이 상수라면 이렇게 사용하는 것이 성능을 향상시킨다.

### 생성자 함수 방식

```javascript
var re = new RegExp("ab + c");
```

생성자 함수 방식은 정규식이 실행 시점에 컴파일 된다. 정규식의 패턴이 변경될 수 있는 경우, 혹은 사용자 입력과 같이 다른 출처로부터 패턴을 가져와야 하는 경우에 생성자 함수 방식을 쓴다. 정규 표현식 리터럴은 아래와 같이 표현한다.

```javascript
var re = /pa/i;
```

`/` 는 시작, 종료기호 이며, `pa`는 패턴, `i`는 프래그 이다.

## 정규표현식 메소드

자바스크립트에서 정규표현식 패턴들은 `RegExp`의 `exec` 메소드와 `test` 메소드, 그리고 `String`의  `match`메소드, `replace`메소드, `search`메소드, `split` 메소드와 함께 쓰인다. 

|메소드|설명|
|:---|:---|
| RegExp.exec() | 어떤 문자열에서 정규표현식과 일치하는 문자열 검색을 수행한다. 결과로 배열을 리턴하거나 null을 반환한다. |
| RegExp.test() | 대상 문자열 속에 일치하는 문자열이 포함되어 있는지 검사하고 true 또는 false를 반환한다. |
| String.match() | 문자열이 정규식과 매치되는 부분을 검색한다. |
| String.replace() | 대응되는 문자열을 찾아 다른 문자열로 치환하는 String 메소드이다. |
| String.search() | 대응되는 문자열이 있는지 검사하는 String 메소드 이다. 대응된 부분의 인덱스를 반환한다. 대응되는 문자열을 찾지 못했다면 -1을 반환한다. |
| String.split() | 정규식 혹은 문자열로 대상 문자열을 나누어 배열로 반환하는 String 메소드이다. |

```javascript
var str = 'this is a pen.';
var regexr = /is/ig;

// RegExp 객체의 메소드
console.log(regexr.exec(str)); // ["is", index: 2, input: "this is a pen.", groups: undefined]
console.log(regexr.test(str)); // true

// String 객체의 메소드
console.log(str.match(regexr)); // (2) ["is", "is"]
console.log(str.replace(regexr, 'is')); // this is a pen.
console.log(str.search(regexr)); // 2
console.log(str.split(regexr)); // (3) ["th", " ", " a pen."]
```

## References
> [정규표현식](https://opentutorials.org/course/743/6580)  
> [5.26 RegExp 정규표현식](https://poiemaweb.com/js-regexp)  
> [정규 표현식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/정규식)
