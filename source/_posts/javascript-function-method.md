---
title: "함수 메소드(call, apply, bind)"
date: 2018-11-08 08:11:18
categories: [front-end, javascript]
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
toc: true
---

함수의 기본 메소드중 call, apply, bind 에 대해 알아보겠다.

자바스크립트에서 상속개념을 자주 쓰다보면 불필요한 메소드에 프로토타입까지 상속받아 오기 때문에 메모리 낭비가 심해진다. 이때 다른 객체의 메소드를 가져와 쓸 수 있는데 그 기능을 가진 메소드가 call과 apply 이다. call 메소드 먼저 살펴보겠다.

<!-- more -->

## call

```
func.call(obj, a, b);
func = 가져올 메소드
call = call 메소드
obj = 메소드를 사용할(현재) 객체
a, b = 메소드에 전달할 인자
```

```javascript
var obj1 = {
    name: "obj1",
    funcThis: function() {
        return this;
    }
};
console.log(obj1.funcThis()); // Object {name: "obj1"}
```

obj1 객체에 funcThis 메소드를 추가했다. funcThis 메소드는 자신을 감싼 obj1객체를 리턴하고 있다.

```javascript
var obj1 = {
    name: "obj1",
    funcThis: function() {
        return this;
    }
};
var obj2 = {
    name: "obj2"
};
console.log(obj1.funcThis.call(obj2)); // Object {name: "obj2"}
```

call 메소드를 이용하여 obj1 의 funcThis 메소드를 obj2 객체에서 실행한다. obj2객체를 리턴하고 있다. 아무 값을 안넣으면(null) window를 반환한다. call 과 형제격인 apply 메소드는 call 메소드와 같지만 한가지 다른점이 있다. call은 인자값을 하나 하나 전달하지만 apply 메소드는 인자값을 배열로 전달한다.

## apply

```
func.apply(obj, [arr]);
func = 가져올 메소드
apply = apply 메소드
obj = 메소드를 사용할(현재) 객체
arr = 메소드에 전달할 인자 목록
```

call 과 apply 는 보통 함수 내 arguments 객체와 같이 사용하는 모습을 많이 볼 수 있다. 처음에는 어려워 보이지만, 단순하게 보면 결국 arguments 객체에 다른 메소드를 빌려와 쓰는것으로 보면 된다. arguments 객체는 배열처럼 보이지만 실제 배열이 아닌 유사배열객체이기 때문에 배열 메소드가 없다(length 제외). 아래 구문은 arguments에 없는 배열의 메소드를 가져와 쓰는 것이다.

```javascript
function func() {
    console.log(Array.prototype.slice.call(arguments, 0, 2));
}
func("눈", "누", "난", "나"); // ["눈", "누"]
```

위 함수를 보면 배열의 프로토타입에 있는 slice 메소드를 arguments 객체에서 사용하는 것을 알 수 있다.

```
slice 메소드 : 문자열의 일정 부분을 반환
obj.slice(start, end);
obj = 필수. 반환할 배열 객체
start = 필수. 지정된 부분의 시작입
start = 선택. 지정된 부분의 끝
```

```javascript
function func() {
    console.log(Array.prototype.join.call(arguments));
}
func("눈", "누", "난", "나"); // 눈-누-난-나
```

join 메소드 : 인자값으로 넘겨진 구문을 모든 배열 요소에 추가한다.

```
obj.join("val");
obj = 필수. 반환할 배열 객체
val = 선택. 추가할 문자열 이다. 아무값도 안넣을 경우 쉼표(,)로 대체된다.
```

## bind

bind 함수는 함수가 가르키는 this만 바꾸고 호출은 하지 않는다.

```javascript
var obj1 = {
    name: "obj1",
    funcThis: function() {
        console.log(this);
    }
};
var obj2 = {
    name: "obj2"
};
var func = obj1.funcThis.bind(obj2);
func(); // Object {name: "obj2"}
```

obj1 의 funcThis 메서드를 obj2 객체로 가져와서 func 변수에 할당했다. func 함수를 실행하면 obj2 객체가 출력된다.
