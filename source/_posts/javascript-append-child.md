---
title: "자바스크립트 노드 생성 및 추가"
date: 2017-12-12 20:44:40
categories: "javascript"
tags: [javascript]
---

노드 생성
```javascript
var input = document.createElement('input');
```

생성된 노드 속성 추가
```javascript
input.setAttribute('type', 'text');
```

텍스트 노드 추가
```javascript
var txt = document.createTextNode('hello');
```

부모 노드에 생성된 노드 추가
```javascript
부모노드.appendChild(input);
```

# 테이블 생성 예제
위 노드 추가 방법으로 테이블 추가 예제를 만들어 보자, 버튼을 계속 클릭하면 테이블이 추가된다.

```html
<div class="wrap">
    <button id="btn">click</button>
    <table id="tbl"></table>
</div>
```

```css
.wrap {
    position: relative;
    padding-top: 40px;
}

.wrap * {
    margin: 0;
    padding: 0
}

#tbl td {
    border: 1px solid #ccc;
    padding: 3px 10px;
    text-align: center;
}

#btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 30px;
}
```

```javascript
window.onload = function () {

    // 노드 선언
    var btn = document.getElementById('btn'),
        tbl = document.getElementById('tbl'),
        tblTr = tbl.getElementsByTagName('tr');

    // 버튼 이벤트
    btn.addEventListener('click', function () {
        tblAdd();
    });

    // 테이블 추가
    function tblAdd() {
        var tr = document.createElement('tr');
        for (var i = 0; i < 5; i++) {
            var td = document.createElement('td');
            tr.appendChild(td)
        };
        tbl.appendChild(tr);
        numAdd();
    }

    // 테이블 번호 추가
    function numAdd() {
        var num = 0;
        for (var i = 0; i < tblTr.length; i++) {
            for (var j = 0; j < tblTr[i].getElementsByTagName('td').length; j++) {
                num++;
                tblTr[i].getElementsByTagName('td')[j % 5].innerHTML = num;
            };
        };
    }

}
```
## 구현
<style>
.wrap {
    position: relative;
    padding-top: 40px;
}

.wrap * {
    margin: 0;
    padding: 0
}

#tbl td {
    border: 1px solid #ccc;
    padding: 3px 10px;
    text-align: center;
}

#btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 30px;
}
</style>
<script>
window.onload = function () {

    // 노드 선언
    var btn = document.getElementById('btn'),
        tbl = document.getElementById('tbl'),
        tblTr = tbl.getElementsByTagName('tr');

    // 버튼 이벤트
    btn.addEventListener('click', function () {
        tblAdd();
    });

    // 테이블 추가
    function tblAdd() {
        var tr = document.createElement('tr');
        for (var i = 0; i < 5; i++) {
            var td = document.createElement('td');
            tr.appendChild(td)
        };
        tbl.appendChild(tr);
        numAdd();
    }

    // 테이블 번호 추가
    function numAdd() {
        var num = 0;
        for (var i = 0; i < tblTr.length; i++) {
            for (var j = 0; j < tblTr[i].getElementsByTagName('td').length; j++) {
                num++;
                tblTr[i].getElementsByTagName('td')[j % 5].innerHTML = num;
            };
        };
    }

}
</script>
<div class="wrap">
    <button id="btn">click</button>
    <table id="tbl"></table>
</div>

## References
> [HTML DOM appendChild() Method](https://www.w3schools.com/jsref/met_node_appendchild.asp)
