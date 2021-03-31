---
title: "[UI] 탭메뉴(tab menu)"
date: 2019-04-08 08:36:59
categories: [front-end, ui]
tags: [ui, vanillajs]
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

vanilla JS로 제작된 기본 탭 메뉴

<!-- more -->

## 구현

<script>
window.addEventListener('load', function(){

    var tab = document.getElementById('tab'),
        btn = tab.getElementsByClassName('btn')[0],
        cnt = tab.getElementsByClassName('cnt')[0],
        index = 0;

    btn.children[0].classList.add('on');
    cnt.children[0].classList.add('on');

    for(var i = 0;i < btn.children.length;i++){
        (function(target){
            btn.children[target].addEventListener('click', function(){
                tabOn(target);
            });
        })(i);
    };

    function tabOn(target){
        for(var i = 0;i < btn.children.length;i++){
            btn.children[i].classList.remove('on');
            cnt.children[i].classList.remove('on');
        };
        btn.children[target].classList.add('on');
        cnt.children[target].classList.add('on');
    }

});
</script>
<style>
.uiWrap * {
    margin: 0;
    padding: 0;
}

.uiWrap ul li:before, 
.uiWrap ol li:before {
    display:none;
}

#tab {
    border: 1px solid #ccc;
    width: 300px;
}

#tab .btn:after {
    content: '';
    display: block;
    clear: both;
}

#tab .btn button {
    float: left;
    border: 0;
    width: 25%;
    height: 30px;
    cursor: pointer;
    outline: none;
    background-color: #ccc;
}

#tab .btn button:hover {
    background-color: #fff;
}

#tab .btn button.on {
    background-color: #fff;
}

#tab .cnt div {
    display: none;
}

#tab .cnt div.on {
    display: block;
}
</style>
<div class="uiWrap">
    <div id="tab">
        <div class="btn">
            <button type="button">01</button>
            <button type="button">02</button>
            <button type="button">03</button>
            <button type="button">04</button>
        </div>
        <div class="cnt">
            <div>content01 content01 content01 content01 content01 content01 content01 content01 content01 content01</div>
            <div>content02 content02 content02 content02 content02 content02 content02 content02 content02 content02</div>
            <div>content03 content03 content03 content03 content03 content03 content03 content03 content03 content03</div>
            <div>content04 content04 content04 content04 content04 content04 content04 content04 content04 content04</div>
        </div>
    </div>
</div>

## html

```html
<div id="tab">
    <div class="btn">
        <button type="button">01</button>
        <button type="button">02</button>
        <button type="button">03</button>
        <button type="button">04</button>
    </div>
    <div class="cnt">
        <div>content01 content01 content01 content01 content01 content01 content01 content01 content01 content01</div>
        <div>content02 content02 content02 content02 content02 content02 content02 content02 content02 content02</div>
        <div>content03 content03 content03 content03 content03 content03 content03 content03 content03 content03</div>
        <div>content04 content04 content04 content04 content04 content04 content04 content04 content04 content04</div>
    </div>
</div>
```

## css

```css
#tab {
    border: 1px solid #ccc;
    width: 300px;
}

#tab .btn:after {
    content: '';
    display: block;
    clear: both;
}

#tab .btn button {
    float: left;
    border: 0;
    width: 25%;
    height: 30px;
    cursor: pointer;
    outline: none;
    background-color: #ccc;
}

#tab .btn button:hover {
    background-color: #fff;
}

#tab .btn button.on {
    background-color: #fff;
}

#tab .cnt div {
    display: none;
}

#tab .cnt div.on {
    display: block;
}
```

## javascript

```javascript
window.addEventListener('load', function(){

    var tab = document.getElementById('tab'),
        btn = tab.getElementsByClassName('btn')[0],
        cnt = tab.getElementsByClassName('cnt')[0],
        index = 0;

    btn.children[0].classList.add('on');
    cnt.children[0].classList.add('on');

    for(var i = 0;i < btn.children.length;i++){
        (function(target){
            btn.children[target].addEventListener('click', function(){
                tabOn(target);
            });
        })(i);
    };

    function tabOn(target){
        for(var i = 0;i < btn.children.length;i++){
            btn.children[i].classList.remove('on');
            cnt.children[i].classList.remove('on');
        };
        btn.children[target].classList.add('on');
        cnt.children[target].classList.add('on');
    }

});
```

