---
title: "IOS 스크롤 방지"
date: 2018-06-11 21:51:16
categories: "jquery"
tags: [jquery, javascript]
thumbnail: "/gallery/thumbnail-jquery.png"
---

모달 팝업에서 백그라운드 영역의 스크롤을 방지하고자 할 때 Android는 body에 `overflow: hidden` 속성만 줘도 스크롤이 방지되지만 IOS의 경우는 먹히지 않는다.  
이럴 경우 body를 `position: fixed` 로 고정시킨 뒤 스크롤, 터치, 마우스 휠 이벤트를 막아버리면 된다.

<!-- more -->

```css
.scrollOff {
    position: fixed;
    overflow: hidden;
    height: 100%;
}
```

```javascript
// ios 스크롤 방지
$('body').addClass('scrollOff').on('scroll touchmove mousewheel', function (e) {
    e.preventDefault()
});

// ios 스크롤 방지
$('body').removeClass('scrollOff').off('scroll touchmove mousewheel')
```
