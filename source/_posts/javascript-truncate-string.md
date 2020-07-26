---
title: "문자열 자르기"
date: 2017-12-04 20:50:52
categories: [front-end, javascript]
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
---

## split()

특정 문자열을 기준으로 잘라 배열로 반환한다.

```javascript
var str = '가, 나, 다, 라, 마';
console.log(str.split(','));
// (5) ["가", " 나", " 다", " 라", " 마"]
```

<!-- more -->

## substring(시작인덱스, 종료인덱스)

시작인덱스를 기준으로 종료인덱스 까지 자른다.

```javascript
var str = '가나다라마';
console.log(str.substring(1, 4));
// 나다라
```

## substr(시작인덱스, 길이)

시작인덱스를 기준으로 문자열 길이로 자른다.

```javascript
var str = '가나다라마';
console.log(str.substr(2, 2));
// 다라
```
