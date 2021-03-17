---
title: "[UI] 커스텀 셀렉트박스(custom selectbox)"
date: 2019-10-02 09:17:59
categories: [front-end, ui]
tags: [ui, jquery]
# thumbnail: "/gallery/thumbnail-jquery.png"
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

기존의 `select` 태그는 CSS 적용이 안되는 부분이 많아 디자인에 제약이 많다.  
디자인을 더욱 다양하게 적용할 수 있는 커스텀 셀렉트 박스는 아래와 같이 만들 수 있다.

## 설명
* 셀렉트가 된 항목은 'selected' 라는 클래스명이 붙음
* 항목이 많아질 경우 스크롤바가 생김
* 생성자 함수방식 및 프로토타입에 메서드를 추가하여 재사용 및 메모리 관리에 용이함

<!-- more -->

## 구현

<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script>
function CustomSelectBox(selector){
    this.$selectBox = null,
    this.$select = null,
    this.$list = null,
    this.$listLi = null;
    CustomSelectBox.prototype.init = function(selector){
        this.$selectBox = $(selector);
        this.$select = this.$selectBox.find('.box .select');
        this.$list = this.$selectBox.find('.box .list');
        this.$listLi = this.$list.children('li');
    }
    CustomSelectBox.prototype.initEvent = function(e){
        var that = this;
        this.$select.on('click', function(e){
            that.listOn();
        });
        this.$listLi.on('click', function(e){
            that.listSelect($(this));
        });
        $(document).on('click', function(e){
            that.listOff($(e.target));
        });
    }
    CustomSelectBox.prototype.listOn = function(){
        this.$selectBox.toggleClass('on');
        if(this.$selectBox.hasClass('on')){
            this.$list.css('display', 'block');
        }else{
            this.$list.css('display', 'none');
        };
    }
    CustomSelectBox.prototype.listSelect = function($target){
        $target.addClass('selected').siblings('li').removeClass('selected');
        this.$selectBox.removeClass('on');
        this.$select.text($target.text());
        this.$list.css('display', 'none');
    }
    CustomSelectBox.prototype.listOff = function($target){
        if(!$target.is(this.$select) && this.$selectBox.hasClass('on')){
            this.$selectBox.removeClass('on');
            this.$list.css('display', 'none');
        };
    }
    this.init(selector);
    this.initEvent();
}
$(function(){
    var select = new CustomSelectBox('.select_box');
});
</script>
<style>
.wrap * {
    margin: 0;
    padding: 0;
}
.wrap ul li,
.wrap ol li {
    list-style: none;
}
.select_box {
    margin: 20px;
}
.select_box .box {
    display: inline-block;
    position: relative;
    width: 150px;
}
.select_box .box .select {
    position: relative;
    border: 2px solid #ccc;
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 40px;
    line-height: 35px;
    font-size: 16px;
    background-color: #fff;
    cursor: pointer;
}
.select_box .box .select:after {
    content: '▼';
    position: absolute;
    top: 7px;
    right: 10px;
    transform: none;
    border: 0;
}
.select_box.on .box .select:after {
    content: '▲';
}
.select_box .box .list {
    display: none;
    overflow-y: auto;
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 10;
    margin: 0;
    border: 2px solid #ccc;
    box-sizing: border-box;
    padding: 10px 0;
    width: 100%;
    max-height: 200px;
    background-color: #fff;
}
.select_box .box .list::-webkit-scrollbar {
    width: 10px;
    height: 0;
}
.select_box .box .list::-webkit-scrollbar-button:start:decrement,
.select_box .box .list::-webkit-scrollbar-button:end:increment {
    display: block;
    height: 0;
}
.select_box .box .list::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, .05);
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
.select_box .box .list::-webkit-scrollbar-thumb {
    height: 50px;
    width: 50px;
    background: rgba(0, 0, 0, .2);
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
.select_box .box .list>li {
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
}
.select_box .box .list>li:hover {
    background-color: #ccc;
}
</style>
<div class="wrap">
    <div class="select_box">
        <div class="box">
            <div class="select">선택</div>
            <ul class="list">
                <li class="selected">선택</li>
                <li>항목01</li>
                <li>항목02</li>
                <li>항목03</li>
                <li>항목04</li>
                <li>항목05</li>
                <li>항목06</li>
                <li>항목07</li>
                <li>항목08</li>
                <li>항목09</li>
                <li>항목10</li>
            </ul>
        </div>
    </div>
</div>

## html

```html
<div class="wrap">
    <div class="select_box">
        <div class="box">
            <div class="select">선택</div>
            <ul class="list">
                <li class="selected">선택</li>
                <li>항목01</li>
                <li>항목02</li>
                <li>항목03</li>
                <li>항목04</li>
                <li>항목05</li>
                <li>항목06</li>
                <li>항목07</li>
                <li>항목08</li>
                <li>항목09</li>
                <li>항목10</li>
            </ul>
        </div>
    </div>
</div>
```

## css

```css
.wrap * {
    margin: 0;
    padding: 0;
}
.wrap ul li,
.wrap ol li {
    list-style: none;
}
.select_box {
    margin: 20px;
}
.select_box .box {
    display: inline-block;
    position: relative;
    width: 150px;
}
.select_box .box .select {
    position: relative;
    border: 2px solid #ccc;
    box-sizing: border-box;
    padding: 0 10px;
    height: 40px;
    line-height: 35px;
    font-size: 16px;
    background-color: #fff;
    cursor: pointer;
}
.select_box .box .select:after {
    content: '▼';
    position: absolute;
    top: 0;
    right: 10px;
}
.select_box.on .box .select:after {
    content: '▲';
}
.select_box .box .list {
    display: none;
    overflow-y: auto;
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 10;
    border: 2px solid #ccc;
    box-sizing: border-box;
    padding: 10px 0;
    width: 100%;
    max-height: 200px;
    background-color: #fff;
}
.select_box .box .list::-webkit-scrollbar {
    width: 10px;
    height: 0;
}
.select_box .box .list::-webkit-scrollbar-button:start:decrement,
.select_box .box .list::-webkit-scrollbar-button:end:increment {
    display: block;
    height: 0;
}
.select_box .box .list::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, .05);
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
.select_box .box .list::-webkit-scrollbar-thumb {
    height: 50px;
    width: 50px;
    background: rgba(0, 0, 0, .2);
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
.select_box .box .list>li {
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
}
.select_box .box .list>li:hover {
    background-color: #ccc;
}
```

## javascript

```javascript
function CustomSelectBox(selector){
    this.$selectBox = null,
    this.$select = null,
    this.$list = null,
    this.$listLi = null;
    CustomSelectBox.prototype.init = function(selector){
        this.$selectBox = $(selector);
        this.$select = this.$selectBox.find('.box .select');
        this.$list = this.$selectBox.find('.box .list');
        this.$listLi = this.$list.children('li');
    }
    CustomSelectBox.prototype.initEvent = function(e){
        var that = this;
        this.$select.on('click', function(e){
            that.listOn();
        });
        this.$listLi.on('click', function(e){
            that.listSelect($(this));
        });
        $(document).on('click', function(e){
            that.listOff($(e.target));
        });
    }
    CustomSelectBox.prototype.listOn = function(){
        this.$selectBox.toggleClass('on');
        if(this.$selectBox.hasClass('on')){
            this.$list.css('display', 'block');
        }else{
            this.$list.css('display', 'none');
        };
    }
    CustomSelectBox.prototype.listSelect = function($target){
        $target.addClass('selected').siblings('li').removeClass('selected');
        this.$selectBox.removeClass('on');
        this.$select.text($target.text());
        this.$list.css('display', 'none');
    }
    CustomSelectBox.prototype.listOff = function($target){
        if(!$target.is(this.$select) && this.$selectBox.hasClass('on')){
            this.$selectBox.removeClass('on');
            this.$list.css('display', 'none');
        };
    }
    this.init(selector);
    this.initEvent();
}
```

## 인스턴스 생성

```javascript
$(function(){
    var select = new CustomSelectBox('.select_box');
});
```

## 셀렉트 박스가 여러개일 경우

셀렉트박스가 여러 개일 경우 태그를 각각 추가해 준 뒤 인스턴스도 각각 생성해 주면 된다. 여러개의 셀렉트 박스 예시는 [여기](https://recordboy.github.io/ui/custom-selectbox/)를 참고하면 되며, 소스는 [여기](https://github.com/recordboy/ui/blob/master/custom-selectbox/index.html)에 있다.


<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
