---
title: "ES5 Array.every"
date: 2020-02-20 18:56:51
categories: "javascript"
tags: [javascript, es5]
---

`Array.every`메서드는 `Array.some`와 비슷하지만 모든 요소가 조건을 만족해야 `true`를 반환한다.

## Parameter

1. 현재 배열 요소의 값
2. 현재 배열 요소의 index
3. 현재 돌고 있는 배열 자체

## 예제

```javascript
var arr = [1, 3, 5, 6, 7, 9, 11];

// 배열의 모든 요소가 10보다 작아야 true를 리턴
var val = arr.every(function (item, index, array) {
    return item < 10;
});

console.log(val);
// false
```

## References
> [[JavaScript] Array 객체에서 놓치기 쉬운 6개의 메서드](https://programmingsummaries.tistory.com/357)  
> [Array.prototype.every()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
