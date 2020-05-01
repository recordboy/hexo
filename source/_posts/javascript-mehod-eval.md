---
title: "자바스크립트 eval() 함수"
date: 2017-12-01 18:36:04
categories: "javascript"
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
---

## eval() 정의
* eval()은 전역 객체(window)의 함수 속성이다.
* eval()의 인자는 문자열이며 문자열 형태를 연산할 수 있다.

<!-- more -->

```javascript
console.log('2 + 2');
// 2 + 2

console.log(eval('2 + 2'));
// 4
```

## eval() 문제점
* 굳이 eval() 함수를 쓰지 않아도 충분히 동일한 동작을 구현할 수 있는 경우가 많다.
* 보안상 위험한 javascript 코드를 실행할 수 있다는 위험때문에 eval() 함수는 권장되지 않는다.

## References
> [eval()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval)  
> [eval() 사용과 문제점 : #eval() is evil](https://webclub.tistory.com/512)  
> [JavaScript eval 함수](https://programmingsummaries.tistory.com/179)
