---
title: "핀터레스트 레이아웃 구현하기"
date: 2019-12-08 10:29:47
categories: "ui"
tags: [ui, vanillaJs]
---

핀터레스트 레이아웃 사용시 자바스크립트만으로 구현이 가능하다. Masonry 플러그인을 활용하면 좀더 다양한 인터렉션을 활용할 수 있지만 성능 및 블록 틀어짐 이슈 때문에 자바스크립트만 활용하였다.

## [예제 확인](https://recordboy.github.io/ui/pinterest-layout)

## 장점
* 현재 화면에 나열된 요소들의 부모를 기준으로 `posirion: absolute; top: y; left: x;` 속성을 활용, 각 위치에 맞게 배치하여 제이쿼리 플러그인 필요 없이 자바스크립트만으로 구현하여 가볍다.
* IE9까지 대응 가능 가능 하며, IE10까지만 대응한다면 `top: y; left: x;` 대신 `transform: translate(x, y)` 속성을 활용하면 성능이 좀 더 좋아진다.

## 단점
* 오직 레이아웃만 구현하여 Masonry 플러그인같은 인터렉션 효과는 없다. 

## 코드
```html
<div class="cntBox">
    <div class="item">
        <div class="inner">
            <img src="img/img01.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img02.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img03.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img04.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of of Lorem Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img03.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img04.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img01.jpg" />
            <p>Lorem Ipsum is simply dummy text of the of Lorem Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img02.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img01.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img02.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img03.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img04.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of of Lorem Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img03.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img04.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img01.jpg" />
            <p>Lorem Ipsum is simply dummy text of the of Lorem Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img02.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img01.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img02.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img03.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img04.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of of Lorem Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img03.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img04.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img01.jpg" />
            <p>Lorem Ipsum is simply dummy text of the of Lorem Ipsum</p>
        </div>
    </div>
    <div class="item">
        <div class="inner">
            <img src="img/img02.jpg" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </div>
</div>
```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.cntBox {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
}

.item {
    display: inline-block;
    position: absolute;
    width: 20%;
    padding: 5px;
}

.item img {
    width: 100%;
}

.item .inner {
    border: 3px solid #ccc;
    border-radius: 5px;
}

.item .inner p {
    padding: 10px;
}
```

```javascript
// 리사이즈 이벤트 한번만 실행
// var timer = null;

window.addEventListener('resize', function () {

    // 리사이즈 이벤트 한번만 실행
    // clearTimeout(timer);
    // timer = setTimeout(boxLayout, 150);
    boxLayout();

}, false);

window.addEventListener("load", function () {
    boxLayout();
});

function boxLayout() {
    var images = document.querySelectorAll(".item");
    var imgStack = [0, 0, 0, 0, 0];
    var boxW = document.querySelectorAll(".cntBox")[0].offsetWidth;
    var colWidth = boxW / imgStack.length;
    for (var i = 0; i < images.length; i++) {
        var minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        var x = colWidth * minIndex;
        var y = imgStack[minIndex];
        imgStack[minIndex] += (images[i].offsetHeight);

        // images[i].style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';
        images[i].style.left = x + 'px';
        images[i].style.top = y + 'px';

        if (i === images.length - 1) {
            document.querySelector(".cntBox").style.height = Math.max.apply(0, imgStack) + 'px';
        }
    }
}
```

## References
> [핀터레스트(Masonry) 스타일 레이아웃을 만드는 세 가지 방법](https://n-log.tistory.com/33)
