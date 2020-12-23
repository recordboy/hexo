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
  left:
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

<div style="overflow: hidden;">
<a href="https://coupa.ng/bOfEJC" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/70ea7a712597c36c2ccda0e85ccea62a@2x.jpg" alt="Apple 애플워치3, 38mm, GPS, 스페이스 그레이 알루미늄 케이스, 블랙 스포츠 밴드" width="100%" /></a>
<a href="https://coupa.ng/bOfGfF" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/d69a83f91f18a50260d858fa60d16c78@2x.jpg" alt="피컴 목스트레칭기구 목해먹 넥해먹 목견인기 목당기미 목보호대, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFGi" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/399c2e5ea57e8fc6fc0045985f9cf53c@2x.jpg" alt="얼라이브 원스 데일리 포맨 멀티 비타민, 60정, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFCk" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/2e7537ed1bf44257aed8693d97fafddf@2x.jpg" alt="아이소라이프 [아이소넥] 목마사지기 정형용 일자목 운동 의료기기, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFv0" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/66bfeb60f8065217012074be5d62f027@2x.jpg" alt="[한우 판매 인증점][소돼박]결제 후 당일 배송 가능!매일 16시 배송출발!1+등급 이상 프리미엄 한우 선물 세트(꽃갈비살600g 꽃등심600g 총 - 1200g)" width="100%" /></a>
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

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
