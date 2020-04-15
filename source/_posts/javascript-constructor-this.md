---
title: "생성자 함수에서의 This"
date: 2018-11-02 22:04:56
categories: "javascript"
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
toc: true
---

객체를 생성하는 방법은 크게 객체 리터널 방식과 생성자 함수 방식, Object() 생성자 함수 방식이 있다. 

<!-- more -->

```javascript
var obj = {};
var obj = new Func();
var obj = new Object();
```

이 세가지 중 생성자 함수의 this를 알아보겠다.

생성자 함수는 기존 함수에 new 키워드를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다. 일반 함수에서의 this는 window를 가르키지만 생성자 함수에서는 다르게 동작한다. 이때문에 원치 않은 상황이 나타날 수 있는데, 이를 피하기 위해 생성자 함수 이름의 첫 글자는 대문자로 작성하기를 권장하고 있다. 

## 일반 함수의 this

```javascript
function func(){
    console.log(this);
};
func(); // window
```

## 생성자 함수의 this

```javascript
function Func(name){
    this.name = name;
    console.log(this);
    return this;
};
var obj = new Func("foo");
console.log(obj); // Func {name: "foo"}
```

생성자 함수의 this 는 메서드 함수 호출과의 this 바인딩과 다르게 동한다. 이를 이해하려면 생성자 함수가 어떻게 동작하는지 알아야 한다. 위의 코드를 보면 

1. 생성자 함수가 정의되었고 인자값으로 name 프로퍼티의 값을 받고 있다. 
2. new 키워드를 사용해서 생성자 함수를 호출하면 우선 빈 객체가 생성되고, 이 객체는 생성자 함수의 프로토타입을 참조한다.
3. 생성자 함수가 실행되면서 동적으로 name 프로퍼티를 추가시킨다.
4. this로 바인딩한 객체가 생성자 함수의 리턴값으로 반환되서 obj 변수에 저장된다.
