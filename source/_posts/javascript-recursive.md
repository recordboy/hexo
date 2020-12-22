---
title: "[JavaScript] 재귀 함수(Recursive Function)"
date: 2017-12-16 21:13:28
categories: [front-end, javascript]
tags: [javascript]
# thumbnail: "/gallery/thumbnail-js.png"
widgets:
  - type: toc
    position: left
  - type: categories
    position: left
  - type: tags
    position: left
sidebar:
  left:
    sticky: true
---

재귀(Recursive)를 정의한다면 한 함수가 자기 자신을 호출하는 순간이다. 재귀함수를 이해하기 전에는 `팩토리얼` 이라는 개념이 필요하다. `팩토리얼`이란 자기 자신의 수에 1 작은 수를 곱하고 또 1 작은 수를 곱하고 해서 1 작은 수가 1이 될때까지 곱하는 것이다. 팩토리얼의 기호는 `!`이며 아래의 예제는 `5!`의 팩토리얼을 나타내고 있다.

<!-- more -->

```
5 * 4 * 3 * 2 * 1 = 120
```

이제 팩토리얼의 개념을 알았으니 재귀함수가 무엇인지 확인해 본다.

```javascript
function factorial(x) {
  if (x < 0) return;
  if (x === 0) return 1;
  return x * factorial(x - 1);
}
console.log(factorial(3)); // 6
```

결과 값이 나오는 과정을 순서대로 살펴보겠다.

1. `factorial` 함수에 인자값으로 `3`을 담아 함수를 실행한다.
2. 파라미터로 `3`을 받아 처음 조건문을 거친다. `3`은 `0`보다 크기 때문에 다음 조건문으로 이동한다. `3`은 `0`이 아니기 때문에 아래 구문으로 넘어간다.
3. `3`에 `factorial` 함수에 `2`를 넣은 결과 값을 곱하라는 구문이다. 다시 `factorial` 함수에 인자로 `2`를 넣어 실행한다.
4. `2`는 `0`보다 크고 `0`이 아니니 다시 아래 구문으로 내려간다. `2`에 `factorial` 함수에 `1`를 넣은 결과 값을 곱하라는 구문이다. 다시 `factorial` 함수에 인자로 `1`를 넣어 실행한다.
5. `1`역시 `0`보다 크고 `0`이 아니니 다시 아래 구문으로 내려간다. `1`에 `factorial` 함수에 `0`를 넣은 결과 값을 곱하라는 구문이다. 다시 `factorial` 함수에 인자로 `0`를 넣어 실행한다. 위와는 다르게 `0`은 두번째 조건문에서 걸려 `1`을 리턴한다. 결국은 `3 * 2 * 1`라는 값을 리턴하게 되는 것이다. 이렇게 함수가 자기 자신을 호출하는 순간을 재귀 라고 한다.

## References
> [재귀 함수](https://www.everdevel.com/JavaScript/recursive-function)  
> [자바스크립트 개발자라면 알아야 할 33가지 개념 #23 자바스크립트 : 자바스크립트 재귀(Recursion) 이해하기](https://velog.io/@jakeseo_me/자바스크립트-개발자라면-알아야-할-33가지-개념-23-자바스크립트-자바스크립트-재귀Recursion-이해하기)  

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
