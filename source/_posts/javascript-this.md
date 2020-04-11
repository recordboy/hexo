---
title: "자바스크립트 This"
date: 2018-11-01 22:03:02
categories: "javascript"
tags: [javascript]
---

this는 함수가 호출되면 함수 내부로 암묵적으로 전달된다. this는 메서드를 호출한 객체가 저장되어 있는 속성이다. 메서드 뿐만 아니라 일반 함수를 호출할때도 만들어 지며, 이벤트 리스너가 호출될 때에도 만들어진다. 문제는 this 속성에 저장되는 값이 동일한 값이 아니라 각각 다른점이다.

<!-- more -->

## this가 만들어지는 경우

* 일반 함수에서의 this
* 중첩 함수에서의 this
* 이벤트 리스너에서의 this
* 메서드에서의 this
* 메서드 내부의 중첩 함수의 this

### 일반 함수에서의 this 

```javascript
function func(){
    console.log(this); // window
};
func();
```

일반 함수 내부에서는 this는 전역객체인 window가 된다. 자바스크립트의 모든 전역 변수는 전역객체의 프로퍼티이다.

### 중첩 함수에서의 this

```javascript
function func(){
    function func2(){
        console.log(this); // window
    };
    func2();
};
func();
```

일반 중첩 함수에서의 this 도 window 가 된다.

### 이벤트 리스너에서의 this 

```javascript
window.onload = function(){
    document.getElementById("btn").addEventListener("click", function(){
        console.log(this);
    });
};
```

이벤트 리스너에서의 this는 이벤트를 발생시킨 객체가 된다.

### 메서드에서의 this

```javascript
var obj = {
    func: function(){
        console.log(this); // object{};
    }
};
obj.func();
```

메서드에서의 this는 이벤트를 발생시킨 객체가 된다.

### 메서드 내부의 중첩 함수의 this

```javascript
var obj = {
    func: function(){
        function func2(){
            console.log(this); // window
        };
        func2();
    }
};
obj.func();
```

메서드의 this 와는 다르게 window 를 가리킨다. 이는 내부 함수 호출 패턴을 정의해 놓지 않기 때문이다. 내부함수도 결국 함수이므로 이를 호출할 때는 함수 호출로 취급된다.  
중첩함수가 메서드를 포함한 객체를 참조하려면 부모함수의 this를 내부함수가 접근 가능한 변수에 저장하면 된다.  
보통 관례상 this 값을 저장하는 변수의 이름을 that 이라고 선언한다.

```javascript
var obj = {
    func: function(){
        var that = this;
        function func2(){
            console.log(that); // window
        };
        func2();
    }
};
obj.func();
```

자바스크립트는 위와 같은 바인딩의 한계를 극복하려고 this 바인딩을 명시적으로 할 수 있도록 call과 apply 메서드를 제공한다.  
제이쿼리 등 자바스크립트 라이버리들의 경우 bind 라는 메서드를 통해, 사용자가 원하는 객체를 this에 바인딩 하는 기능을 제공하고 있다.
