---
title: "이벤트 위임(Event Delegation)"
date: 2020-03-02 19:05:42
categories: "javascript"
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
---

어플리케이션을 제작할 때 사용자가 페이지 요소들을 조작할 수 있도록 페이지의 버튼, 텍스트 등에 이벤트를 붙여야 할 때가 있다. 아래 리스트의 각 요소를 클릭하면 경고창이 뜨는 이벤트를 걸어줘야 된다고 가정해보면 아래처럼 구현할 것이다.

<!-- more -->

**html**
```html
<ul id="list">
    <li>list01</li>
    <li>list02</li>
    <li>list03</li>
    <li>list04</li>
    <li>list05</li>
</ul>
```

**javascript**
```javascript
var item = document.getElementById('list').getElementsByTagName('li');
for (var i = 0; i < item.length; i++) {

    // 각 li에 이벤트 리스너를 등록한다.
    item[i].addEventListener('click', function(e) {
        alert(e.target.innerText);
    })
}
```

**결과**
<ul id="list">
    <li>list01</li>
    <li>list02</li>
    <li>list03</li>
    <li>list04</li>
    <li>list05</li>
</ul>
<script>
var item = document.getElementById('list').getElementsByTagName('li');
for (var i = 0; i < item.length; i++) {
    // 각 li에 이벤트 리스너를 등록한다.
    item[i].addEventListener('click', function(e) {
        alert(e.target.innerText);
    })
}
</script>

리스트 요소가 많이 없는 경우 위 코드는 별 문제가 되지 않는다. 하지만 리스트 요소가 천개, 만개라면 일일히 분리된 이벤트 리스너를 생성하고, 그걸 각각 요소에 등록할 것이다. 이는 매우 비효율적인 방법이다. 아이템 갯수마다 이벤트 리스너를 생성, 등록하는 것보다는 감싸고 있는 리스트에 한개의 이벤트를 등록하고, 조건을 달아줘서 리스트의 요소를 클릭했을시에만 경고창을 출력하도록 구현하면 된다.

**javascript**
```javascript
var list = document.getElementById('list');
var item = list.getElementsByTagName('li');

// 리스트에 이벤트를 등록
list.addEventListener('click', function(e) {

    // 리스트 요소일 때 경고창 출력
    if (e.target.nodeName === 'LI') {
        alert(e.target.innerText);
    }
})
```

## References
> [자바스크립트 코딩 면접에서 알고 있어야 할 3가지 질문](https://joshua1988.github.io/web-development/javascript/javascript-interview-3questions/)
