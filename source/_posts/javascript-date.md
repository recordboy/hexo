---
title: "[JavaScript] 날짜 구하기(Data 함수)"
date: 2017-12-13 20:48:10
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
  right:
    sticky: true
---

Data 객체는 날짜와 시간을 제공하는 생성자 함수이다. 
인자 없이 객체를 선언하면 현재 날짜와 시간을 반환한다.

<!-- more -->

```javascript
var value = new Date();
console.log(value);
// Thu Jan 09 2020 14:44:13 GMT+0900 (한국 표준시)
```

## 특정 값을 구하는 메서드

| 메서드 | 값 |
|:---|:---|
| getFullYear() | 년 |
| getMonth() | 월 |
| getDate() | 날짜 |
| getDay() | 요일 |

## 응용

2015년 12월 25일의 요일을 구하는 법

```javascript
function func(a, b) {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][new Date(2015, a - 1, b).getDay()];
}
console.log(func(12, 25)); // FRI
```

## References
> [프로그래머스 문제 풀이 Level 1](https://www.zerocho.com/category/Algorithm/post/5b79898d337215001b3a18eb)  
