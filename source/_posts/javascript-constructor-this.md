---
title: "생성자 함수에서의 This"
date: 2018-11-02 22:04:56
categories: "javascript"
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
toc: true
---

객체를 생성하는 방법은 크게 객체 리터럴 방식과 사용자 정의 생성자 함수 방식, 객체 생성자 함수 방식이 있다. 

<!-- more -->

```javascript
// 리터럴
var obj = {};

// 사용자 정의 생성자 함수
var obj = new Func();

// 객체 생성자 함수
var obj = new Object();
```

이 세가지 중 사용자 정의 생성자 함수 방식에서의 this를 알아보겠다.

## 일반 함수의 this
일반 함수에서의 this는 window를 가리킨다.

```javascript
function func() {
    console.log(this); // window
};
func();
```

## 생성자 함수의 this
생성자 함수는 기존 함수에 new 키워드를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다. 생성자 함수에서의 this는 생성자 함수를 통해 생성되어 반환되는 객체에 바인딩 된다. 때문에 new 키워드를 잘못 사용해 원치 않은 상황이 나타날 수 있는데, 이를 피하기 위해 생성자 함수 이름의 첫 글자는 대문자로 작성하기를 권고하고 있다.

```javascript
function Func(name) {
  this.name = name;
  console.log(this); // Func {name: "foo"}
  console.log(this.name); // foo
};
var obj = new Func("foo");
```

## References
> [자바스크립트에서 사용되는 this에 대한 설명 1](https://github.com/FEDevelopers/tech.description/wiki/자바스크립트에서-사용되는-this에-대한-설명-1#41-생성자-실행에서의-this)  
> [함수 호출과 this](https://valuefactory.tistory.com/674)
