---
title: "[JavaScript] 자바스크립트 This"
date: 2018-11-01 22:03:02
categories: [front-end, javascript]
tags: [javascript]
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

this는 함수가 호출되면 함수 내부로 암묵적으로 전달 되며, 함수를 호출한 방식에 의해 this에 바인딩할 객체가 동적으로 결정된다. 다시 말해, 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.

<!-- more -->

## this가 만들어지는 경우
* 일반 함수에서의 this
* 중첩 함수에서의 this
* 이벤트 리스너에서의 this
* 메소드에서의 this
* 메소드 내부의 중첩 함수의 this

### 일반 함수에서의 this 
```javascript
function func() {
  console.log(this); // window
}
func();
```

일반 함수 내부에서는 this는 전역객체인 window가 된다.

### 중첩 함수에서의 this
```javascript
function func() {
    function func2() {
        console.log(this); // window
    }
    func2();
}
func();
```

일반 중첩 함수에서의 this 도 window 가 된다.

### 이벤트 리스너에서의 this 
```javascript
document.addEventListener('click', function() {
    console.log(this); // #document
});
```

이벤트 리스너에서의 this는 이벤트를 발생시킨 객체가 된다.

### 메소드에서의 this
```javascript
var obj = {
    func: function() {
        console.log(this); // {func: ƒ};
    }
}
obj.func();
```

메소드에서의 this는 메소드를 호출한 객체가 된다.

### 메소드 내부의 중첩 함수의 this
```javascript
var obj = {
    func: function() {
        function func2() {
            console.log(this); // window
        }
        func2();
    }
}
obj.func();
```

메소드의 this와는 다르게 window를 가리킨다. 메소드의 내부함수는 결국 중첩함수이기 때문에 window를 바라본다. 이를 방지하기 위해선 아래 방법으로 해결할 수 있다.

```javascript
var obj = {
  func: function() {
      var that = this;
      function func2() {
          console.log(that); // {func: ƒ}
      }
      func2();
  }
}
obj.func();
```

메소드를 포함한 객체를 참조하도록 부모함수의 this를 내부함수가 접근 가능한 변수에 저장하면 된다. 보통 관례상 this 값을 저장하는 변수의 이름을 that 이라고 선언한다.

자바스크립트는 위와 같은 바인딩의 한계를 극복하려고 this 바인딩을 명시적으로 할 수 있도록 call과 apply 메소드를 제공한다. 제이쿼리 등 자바스크립트 라이버리들의 경우 bind 메소드를 통해, 사용자가 원하는 객체를 this에 바인딩 하는 기능을 제공하고 있다.

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
