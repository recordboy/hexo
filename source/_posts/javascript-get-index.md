---
title: "[JavaScript] 바닐라 자바스크립트로 인덱스 구하기"
date: 2018-01-15 21:28:59
categories: [front-end, javascript]
tags: [javascript, vanillajs]
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

제이쿼리의 `index()`를 바닐라 자바스크립트로 구현하는 방법이다.

<!-- more -->

## HTML
```html
<ul id="ul">
    <li>0</li>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

## javascript
```javascript
var ul = document.getElementById('ul'),
    li = ul.getElementsByTagName('li');
for (var i = 0; i < li.length; i++) {
    (function(idx) {
        li[idx].onclick = function() {
            alert(idx);
        }
    })(i);
}
```

## 결과
아래 리스트 요소를 클릭하면 인덱스가 경고창에 출력되는 것을 확인할 수 있다.

<ul id="ul">
    <li>0</li>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
<script>
var ul = document.getElementById('ul'),
    li = ul.getElementsByTagName('li');
for (var i = 0; i < li.length; i++) {
    (function(idx) {
        li[idx].onclick = function() {
            alert(idx);
        }
    })(i);
}
</script>

<div style="overflow: hidden;">
<a href="https://coupa.ng/bOfEJC" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/70ea7a712597c36c2ccda0e85ccea62a@2x.jpg" alt="Apple 애플워치3, 38mm, GPS, 스페이스 그레이 알루미늄 케이스, 블랙 스포츠 밴드" width="100%" /></a>
<a href="https://coupa.ng/bOfGfF" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/d69a83f91f18a50260d858fa60d16c78@2x.jpg" alt="피컴 목스트레칭기구 목해먹 넥해먹 목견인기 목당기미 목보호대, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFGi" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/399c2e5ea57e8fc6fc0045985f9cf53c@2x.jpg" alt="얼라이브 원스 데일리 포맨 멀티 비타민, 60정, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFCk" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/2e7537ed1bf44257aed8693d97fafddf@2x.jpg" alt="아이소라이프 [아이소넥] 목마사지기 정형용 일자목 운동 의료기기, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFv0" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/66bfeb60f8065217012074be5d62f027@2x.jpg" alt="[한우 판매 인증점][소돼박]결제 후 당일 배송 가능!매일 16시 배송출발!1+등급 이상 프리미엄 한우 선물 세트(꽃갈비살600g 꽃등심600g 총 - 1200g)" width="100%" /></a>
</div>

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
