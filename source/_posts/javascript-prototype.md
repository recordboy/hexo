---
title: "[JavaScript] 프로토타입(Prototype)"
date: 2018-12-17 08:16:45
categories: [front-end, javascript]
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
toc: true
---

자바스크립트는 클래스라는 개념이 없다. 클래스는 자바, 파이썬, 루바 등 객체지향 언어에서 빠질수 없는 개념이다. 하지만 자바스크립트도 객체지향언어인데, 클래스 대신 프로토타입(Prototype)을 기반으로 클래스의 상속 기능을 흉내내도록 구현하여 사용한다. 그래서 자바스크립트는 프로토타입 기반의 객체 지향 언어라고 한다.

자바스크립트의 모든 객체는 자신의 부모역할을 담당하는 객체와 연결되어 있다. 이것은 마치 객체 지향의 상속 개념과 같이 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 한다. 이러한 부모 객체를 프로토타입 이라 한다.

<!-- more -->

## 프로토타입은 언제 쓰는가

```javascript
function Person() {
    this.eyes = 2;
    this.nose = 1;
}

var kang = new Person();
var park = new Person();

console.log(kang.eyes); // 2
console.log(kang.nose); // 1
console.log(park.eyes); // 2
console.log(park.nose); // 1
```

`kang`과 `park`은 `eyes`와 `nose`를 공통적으로 가지고 있는데, 메모리는 `eyes`와 `nose`가 두개씩 총 4개에 할당된다. 객체를 100개를 만들면 200개의 변수가 메모리에 할당된다. 이런 메모리 낭비 문제를 프로토타입으로 해결할 수 있다.

```javascript
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

var kang  = new Person();
var park = new Person();

console.log(kang.eyes); // 2
console.log(park.nose); // 1
```

간략히 설명하면 `Person.prototype`라는 빈 객체가 어딘가에 존재하고 `Person`함수로부터 생성된 객체(`kang`, `park`)은 어딘가에 존재하는 객체의 값을 모두 갖다쓸 수 있다. 즉, `eyes`와 `nose`를 어딘가에 있는 빈 객체(`Person.prototype`)에 넣어두고, `kim`과 `park`이 공유해서 사용하는 것이다.

## 프로토타입 객체와 프로토타입 링크

자바스크립트에서는 프로토타입 객체(prototype object)와 프로토타입 링크(prototype link)라는 것이 존재한다. 그리고 이 둘을 통틀어 프로토타입이라고 부른다.

### 객체는 언제나 함수로 생성된다.

```javascript
function Person() {} // 함수
var obj = new Person(); // new 키워드와 함수로 객체를 생성
```

obj 객체는 `Person`이라는 함수로 생성된 객체이다. 일반적인 객체 리터럴 방식도 예외는 아니다.

```javascript
var obj = {};
```

객체 리터럴 방식으로 객체를 생성하였는데 이 방식은 아래 방식과 같다.

```javascript
var obj = new Object();
```
`Object`도 객체를 만드는 생성자 함수이다. `Object`와 마찬가지로 `Function, Array`도 모두 생성자 함수이다. 이 사실은 프로토타입과 밀접하게 관련이 있는데 함수가 정의될 때는 2가지 일이 동시에 일어나기 때문이다.

## 함수가 정의될 때

### 해당 함수에 constructor(생성자) 자격 부여
constructor 자격이 부여되면 new 키워드를 통해 객체를 만들수 있다. 오직 함수만 new 키워드를 사용할 수 있다.

```javascript
var obj = {}; // 객체 선언
var a = new obj();
// Uncaught TypeError: obj is not a constructor
```
`obj`는 생성자 자격이 없다고 나온다. 오직 함수만이 constructor 자격을 가질 수 있다.

### 해당 함수의 프로토타입 객체 생성 및 연결

함수를 정의하면 함수만 생성되는 것이 아니라 프로토타입 객체도 같이 생성이 된다. 생성된 함수는 `prototype`라는 속성을 통해 프로토타입 객체에 접근할 수 있다. 프로토타입 객체는 일반적인 객체와 같으며, 기본적인 속성으로 `constructor`와 `__proto__`를 가지고 있다.

```javascript
function Person() {}
console.log(Person.prototype);
// {constructor: ƒ}
// > constructor: ƒ Person()
// > __proto__: Object
```

`constructor`는 프로토타입 객체와 같이 생성되었던 함수를 가르키고 있다. `__proto__`은 프로토타입 링크다. 프로토타입 링크는 아래에서 다시 알아보도록 하고 위에서 언급된 `eyes, nose`예제를 다시 살펴보겠다.

```javascript
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

var kang  = new Person();
var park = new Person();

console.log(Person.prototype);
// {eyes: 2, nose: 1, constructor: ƒ}
// > eyes: 2
// > nose: 1
// > constructor: ƒ Person()
// > __proto__: Object
```

`Person.prototype`라는 빈 객체가 어딘가에 존재하고, 그 객체에 `eyes, nose`값을 할당한 것을 확인할 수 있다. 프로토타입 객체는 일반적인 객체이므로 속성을 마음대로 추가, 삭제할 수 있으며 `kang`과 `park`은 `Person`함수를 통해 생성되었으니 `Person.prototype`를 참조할 수 있게 된다.

## 프로토타입 링크

```javascript
function Person() {}
Person.prototype.eyes = 2;
var kang  = new Person();

console.log(kang);
// Person {}
console.log(kang.eyes);
// 2
```

`kang`객체에 따로 `eyes`속성을 선언하지 않았지만 `kang.eyes`를 실행하면 `2`라는 값을 참조한다. 위에서 설명했듯이 프로토타입 객체의 `eyes`속성을 참조한 것인데, 이것이 가능한 이유는 `kang`이 가지고 있는 `__proto__`속성이 프로토타입 객체를 가르키고 있기 때문이다.

```javascript
console.log(kang.__proto__);
// {eyes: 2, nose: 1, constructor: ƒ}
```

`kang.__proto__` 속성을 확인해보니 프로토타입 객체를 가르키고 있다. `kang`객체는 직접 `eyes`속성을 가지고 있지 않아 `eyes`속성을 찾을 때 까지 상위 프로토타입을 탐색한다. 최상위인 `Object`의 프로토타입 객체까지 도달했는데도 못찾을 경우 `undefined`를 리턴한다. 이렇게 `__proto__`속성을 통해 상위 프로토타입과 연결되어있는 형태를 프로토타입 체인이라고 한다. 이런 프로토타입 체인 구조 때문에 모든 객체는 `Object`의 자식이라고 하며, `Object`에 있는 모드 속성을 사용할 수 있다.

## References
> [[Javascript ] 프로토타입 이해하기](https://medium.com/@bluesh55/javascript-prototype-이해하기-f8e67c286b67)  
> [Javascript 기초 - Object prototype 이해하기](http://insanehong.kr/post/javascript-prototype)  
> [JavaScript : 프로토타입(prototype) 이해](http://www.nextree.co.kr/p7323)
