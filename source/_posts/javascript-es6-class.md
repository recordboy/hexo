---
title: "ES6(ECMASrcipt 6) Class"
date: 2020-03-04 19:53:03
categories: "javascript"
tags: [javascript, es6]
thumbnail: "/gallery/thumbnail-es6.png"
---

ES6에서 `class`라는 문법이 추가되었고, 기존의 prototype 기반으로 클래스를 선언하는 것보다 명료하게 클래스를 선언할 수 있게 되었다. 

<!-- more -->

# 기존(ES5) 클래스(생성자)
함수를 만들 때는 함수 표현식과 선언식이 있으며, 선언식으로 작성한 클래스는 호이스팅이 일어난다. 여기서 호이스팅이란 함수를 선언했을 때 값을이 유효범위 최상단에 선언되는 것을 말한다.

## 함수 표현식
클래스가 선언되기 전에 인스턴스를 생성하여 에러가 뜬다.
```javascript
var obj = new Person('주영');
obj.getName(); // TypeError

var Person = function(name) {
    this.name = name;
    Person.prototype.getName = function() {
        console.log(this.name)
    }
}
```

## 함수 선언식
인스턴스를 함수 선언 전에 생성해도 오류가 나지 않는다. 클래스를 선언식으로 작성하여 호이스팅되었기 때문이다.
```javascript
var obj = new Person('주영');
obj.getName(); // 주영

function Person(name) {
    this.name = name;
    Person.prototype.getName = function() {
        console.log(this.name)
    }
}
```

# 새로운(ES6) 클래스(생성자)

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}

const obj = new Person('민수');
obj.getName(); // 민수
```
위 코드는 새로운 클래스 키워드로 클래스를 선언하고 인스턴스를 만든 것이다. 함수 선언이 표현식과 선언식이 있듯이 클래스 키워드도 선언식과 표현식 두가지 방법으로 정의가 가능하다.

```javascript
const obj = new Person('민수');
obj.getName(); // ReferenceError

class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}
```
위 코드는 에러를 출력하고 있다. 이유는 새로운 클래스는 호이스팅이 일어나지 않는다. 아니 엄밀히 말해 호이스팅이 발생하지 않는 것처럼 동작하는건데 이거는 추후에 알아보도록 하겠다.

## constructor
`constructor`는 인스턴스를 생성하고 *클래스 필드*를 초기화하기 위한 특수한 메소드이다.

> *클래스 필드(class field)*
> 클래스 내부의 캡슐화된 변수를 말하며, 데이터 혹은 멤버 변수라고 부른다. 자바스크립트의 생성자 함수에서 this에 추가한 프로퍼티를 클래스 기반 객체지향 언어에서는 클래스 필드라고 부른다.

```javascript
class Person {
    constructor(name) {
        // 여기서 this는 생성될 인스턴스를 바라보고 있다.
        this.name = name;
    }
}
```

`constructor`는 클래스 내에 한 개만 존재할 수 있으며 이 함수 안에 프로퍼티를 작성하면 되며, 이 안에서 `this`는 생성될 인스턴스를 바라보고 있다.

## 메소드 정의
```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    // 클래스 몸체에는 메소드만 선언할 수 있다.
    getName() {
        console.log(this.name);
    }
}
```
클래스 몸체 안에는 메소드만 선언할 수 있다. 클래스 몸체 안에 프로퍼티를 선언하면 오류를 출력한다.

## extends
ES6 클래스는 `extends`키워드로 상속을 구현한다.

```javascript
class Wrap {
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log(this.name + ' 슈퍼');
    }
}

class Inner extends Wrap {
    getName() {
        super.getName()
        console.log(this.name + ' 상속 받은 클래스');
    }
}

var obj = new Inner('안녕');
obj.getName()

// 결과
// 안녕 슈퍼
// 안녕 상속 받은 클래스
```

위 코드를 보면 `Inner`는 `Wrap`를 상속 받았으며, `new Inner('안녕')`를 실행하면 아래의 과정을 거치게 된다.

1. `Inner`클래스의 `constructor`를 호출
2. `Inner`클래스의 `constructor`를 작성하지 않았기 때문에 `super`클래스(`Wrap`)의 `constructor`가 호출됨(내부적으로 프로토타입 체인으로 인해)
3. `super`클래스의 `constructor`에서 this는 현재의 인스턴스를 참조하므로 인스턴스의 name프로퍼티로 전달받은 값을 설정
4. 생성한 인스턴스를 `Inner`에 할당

## super
위에 코드에서도 잠깐 나왔지만 `super`키워드는 슈퍼 클래스의 메소드를 호출할 수 있다.

```javascript
class Wrap {
    msg() {
        console.log('안녕')
    }
}

class Inner extends Wrap {
    msg() {
        // 슈퍼 클래스의 msg메소드를 실행한다.
        super.msg()
    }
}

var obj = new Inner();
obj.msg()
```

## static

`static`키워드는 클래스를 위한 정적(static) 메소드를 정의한다. 정적 메소드는 prototype에 연결되지 않고 클래스에 직접 연결되기 때문에 클래스의 인스턴스 없이 호출되며, 클래스의 인스턴스에서는 호출할 수 없다.

```javascript
class Inner {

    // 인스턴스 없이 클래스에 바로 메소드를 선언해줌
    static msg() {
        console.log('안녕')
    }
}

Inner.msg() // 안녕

var obj = new Inner();
obj.msg() // TypeError
```

동일한 클래스 내의 다른 정적 메서드 내에서 정적 메서드를 호출하는 경우 키워드 this를 사용할 수 있다.

```javascript
class Inner {
    static msg() {
        console.log('안녕')
    }
    static msg2() {
        this.msg()
    }
}

Inner.msg2() // 안녕
```

정적 메소드는 어플리케이션을 위한 유틸리티 함수를 생성하는데 주로 사용된다.

## References
> [super](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/super)  
> [[JS] javascript - OOP Class, Super](https://velog.io/@hytenic/Javascript-javascript-OOP-Class-Super)  
> [ES6 Class 파헤치기](https://jongmin92.github.io/2017/06/18/JavaScript/class/#index)  
> [클래스](https://poiemaweb.com/es6-class)
