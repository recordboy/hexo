---
title: "[CSS] 수정, 배포 CSS파일 캐시 방지"
date: 2020-03-01 18:58:52
categories: [front-end, css]
tags: [css, javascript]
thumbnail: "/gallery/thumbnail-css.png"
---

웹사이트를 운영중 이미지 및 css 또는 js를 수정해도 반영이 안되어있을 때가 있다. 브라우저 내에 저장되어 있는 캐시 때문인데, 이를 해결하려면 사용자가 직접 캐시를 지우거나 강력 새로고침을 해야하는 번거로운 상황이 있다. 이를 방지하려면 작업자가 수정된 파일의 url 뒤에 `?ver=1`라고 쿼리스트링을 붙여주면버전 정보를 적어주면 브라우저가 새로운 파일로 인식하고 파일들을 다시 다운로드 한다.

<!-- more -->

**html**
```html
<link type="text/css" href="./common.css?ver=1" />
```

위 방법은 수정될 때 마다 쿼리스트링을 변경해줘야되는데, 이것도 번거롭다면 자바스크립트를 이용하여 동적으로 랜덤한 쿼리스트링을 생성하여 붙여주는 방법이 있다.

**javascript**
```javascript
var bust = Math.floor((Math.random() * 1000));
document.write('<link type="text/css" href="./common.css?bust=' + bust + '" />');
```

이 방법은 브라우저가 로딩될 때 마다 쿼리스트링 값이 다르기 때문에 항상 파일을 새로 불러오게 된다.

## References
> [수정배포된 CSS/JS 파일 캐시 방지](https://www.letmecompile.com/css-js-파일-캐시-방지/)
