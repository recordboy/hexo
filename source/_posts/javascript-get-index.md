---
title: "[JavaScript] 바닐라 자바스크립트로 인덱스 구하기"
date: 2018-01-15 21:28:59
categories: [front-end, javascript]
tags: [javascript, vanillajs]
# thumbnail: "/gallery/thumbnail-js.png"
widgets:
  - type: toc
    position: right
  - type: categories
    position: right
  - type: tags
    position: right
sidebar:
  right:
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
