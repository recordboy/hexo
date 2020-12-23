---
title: "[JavaScript] 자바스크립트 변수 명명 규칙"
date: 2020-02-05 15:01:00
categories: [front-end, javascript]
tags: [javascript]
# thumbnail: "/gallery/thumbnail-js.png"
toc: true
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

## 변수, 함수명은 카멜 케이스를 사용한다.
첫글자는 소문자, 단위로 첫글자 대문자를 사용, 중간에 언더바(_)사용 금지한다. 대표적인 표기법으로 카멜 케이스, 파스칼 표기법, 헝가리안 표기법, 스네이크 표기법이 있으며 사용하는 언어에 따라 권장사항이 다르다.

<!-- more -->

```javascript
var pageName;
```

## 상수는 영문 대문자 스네이크 표기법을 사용한다.

```javascript
var SYMBOLIC_NAME;
```

여러 단어가 합쳐져 만들어진 약어(HTML, XML)의 경우는 전부 대문자로 사용한다.

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

<div style="overflow: hidden;">
<a href="https://coupa.ng/bOfEJC" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/70ea7a712597c36c2ccda0e85ccea62a@2x.jpg" alt="Apple 애플워치3, 38mm, GPS, 스페이스 그레이 알루미늄 케이스, 블랙 스포츠 밴드" width="100%" /></a>
<a href="https://coupa.ng/bOfGfF" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/d69a83f91f18a50260d858fa60d16c78@2x.jpg" alt="피컴 목스트레칭기구 목해먹 넥해먹 목견인기 목당기미 목보호대, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFGi" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/399c2e5ea57e8fc6fc0045985f9cf53c@2x.jpg" alt="얼라이브 원스 데일리 포맨 멀티 비타민, 60정, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFCk" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/2e7537ed1bf44257aed8693d97fafddf@2x.jpg" alt="아이소라이프 [아이소넥] 목마사지기 정형용 일자목 운동 의료기기, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFv0" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/66bfeb60f8065217012074be5d62f027@2x.jpg" alt="[한우 판매 인증점][소돼박]결제 후 당일 배송 가능!매일 16시 배송출발!1+등급 이상 프리미엄 한우 선물 세트(꽃갈비살600g 꽃등심600g 총 - 1200g)" width="100%" /></a>
</div>

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

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
