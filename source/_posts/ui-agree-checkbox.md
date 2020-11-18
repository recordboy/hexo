---
title: "[UI] 전체동의 체크박스(agree checkbox)"
date: 2019-05-28 08:50:10
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
  right:
    sticky: true
---

vanilla JS로 만들어진 전체동의 체크박스, 보통 이용 약관에 많이 사용되된다.

## 조건

* 전체동의 클릭 시 모든 체크박스 체크
* 전체동의 클릭 해제 시 모든 체크박스 체크 해제
* 전체동의 체크박스 외 체크박스가 모두 체크 될 시 전체동의 체크박스 체크
* 전체동의 체크박스 외 체크박스가 모두 체크 해제 될 시 전체동의 체크박스 체크 해제

<!-- more -->

## 구현

<script>
window.onload = function(){
    var checkWrap = document.getElementById('checkWrap'),
        check = checkWrap.getElementsByTagName('input');
    checkWrap.addEventListener('click', function(e){
        var target = e.target,
            checkNum = 0;
        if(target === check[0]){
            if(target.checked){
                for(var i = 1;i < check.length;i++){
                    check[i].checked = true;
                };
            }else{
                for(var i = 1;i < check.length;i++){
                    check[i].checked = false;
                };
            };
        }else{
            for(var i = 1;i < check.length;i++){
                if(check[i].checked){
                    checkNum++;
                };
            };
            if(checkNum >= check.length - 1){
                check[0].checked = true;
            }else{
                check[0].checked = false;
            };
        };
    });
};
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

#checkWrap {
    width: 120px;
}

#checkWrap label {
    display: block;
    margin: 5px;
    font-size: 14px;
}

#checkWrap label input[type="checkbox"] {
    margin-right: 5px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}

#checkWrap label:first-child input[type="checkbox"] {
    width: 30px;
    height: 30px;
}
</style>
<div class="uiWrap">
    <div id="checkWrap">
        <label for="cheeck01"><input type="checkbox" id="cheeck01" />전체 동의</label>
        <label for="cheeck02"><input type="checkbox" id="cheeck02" />동의</label>
        <label for="cheeck03"><input type="checkbox" id="cheeck03" />동의</label>
        <label for="cheeck04"><input type="checkbox" id="cheeck04" />동의</label>
    </div>
</div>

## html

```html
<div id="checkWrap">
    <label for="cheeck01"><input type="checkbox" id="cheeck01" />전체 동의</label>
    <label for="cheeck02"><input type="checkbox" id="cheeck02" />동의</label>
    <label for="cheeck03"><input type="checkbox" id="cheeck03" />동의</label>
    <label for="cheeck04"><input type="checkbox" id="cheeck04" />동의</label>
</div>
```

## css

```css
#checkWrap {
    width: 120px;
}

#checkWrap label {
    display: block;
    margin: 5px;
    font-size: 14px;
}

#checkWrap label input[type="checkbox"] {
    margin-right: 5px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}

#checkWrap label:first-child input[type="checkbox"] {
    width: 30px;
    height: 30px;
}
```

## javascript

```javascript
window.onload = function(){
    var checkWrap = document.getElementById('checkWrap'),
        check = checkWrap.getElementsByTagName('input');
    checkWrap.addEventListener('click', function(e){
        var target = e.target,
            checkNum = 0;
        if(target === check[0]){
            if(target.checked){
                for(var i = 1;i < check.length;i++){
                    check[i].checked = true;
                };
            }else{
                for(var i = 1;i < check.length;i++){
                    check[i].checked = false;
                };
            };
        }else{
            for(var i = 1;i < check.length;i++){
                if(check[i].checked){
                    checkNum++;
                };
            };
            if(checkNum >= check.length - 1){
                check[0].checked = true;
            }else{
                check[0].checked = false;
            };
        };
    });
};
```
