---
title: "[JavaScript] 디바이스 구분 스크립트"
date: 2019-11-18 10:10:16
categories: [front-end, javascript]
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
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

어떤 디바이스로 접속했는지 확인 가능한 코드

```javascript
var filter = "win16|win32|win64|macintel|mac|"; // PC일 경우 가능한 값
if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        alert("모바일에서 접속하셨습니다");
    } else {
        alert("PC에서 접속하셨습니다");
    }
}
```
