---
title: "자바스크립트 모듈 패턴"
date: 2020-02-03 14:57:31
categories: "javascript"
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
toc: true
---

## 모듈 패턴이란?

모듈이란 전제 어플리케이션의 일부를 독립된 코드로 분리하여 만들어 놓은 것이다.

## 모듈화를 했을 때 장점
* 자주 사용되는 코드를 별도의 파일로 만들어서 필요할 때마다 활용할 수 있다.
* 코드를 개선하면 이를 사용하고 있는 모든 애플리케이션의 동작이 개선된다.
* 코드 수정 시에 필요한 로직을 빠르게 찾을 수 있다.
* 필요한 로직만을 로드해서 메모리의 낭비를 줄일 수 있다.
* 한번 다운로드된 모듈은 웹브라우저에 의해서 저장되기 때문에 동일한 로직을 로드할 때 시간과 네트워크 트래픽을 절약할 수 있다.(브라우저에서만 해당)

<!-- more -->

## 객체 리터럴을 사용한 모듈 패턴

자바스크립트에서 모듈을 구현하는 가장 쉬운 방법은 객체 리터럴을 사용하는 방법이다.

```javascript
var module = {
    key: 'data',
    publicMethod: function () {
        return this.key;
    }
}

console.log(module.key) // data
console.log(module.publicMethod()) // data
```

객체 리터럴은 모듈 패턴이기도 하며, 하나의 객체라는 점에서 싱글톤 패턴이라고도 할 수 있다. 동일한 코드를 어떠한 관점에서 보느냐에 따라 다양한 패턴이 될 수 있다. 객체 리터럴은 간단하지만 모든 속성이 공개되어있다는 단점이 있다. 독립된 모듈은 자체적으로 필요한 내부 변수 및 내부 함수를 모두 갖고 있어야 하므로 클로저를 이용해야 한다.

아래는 클로저를 활용한 모듈패턴이다.

## 클로저를 활용한 모듈 패턴

```javascript
var module = (function () {

    /**
        * -----------------------
        * 모듈 패턴을 구현할 클로저 코드
        * -----------------------
        */

    // 은닉될 멤버 정의
    var privateKey = 0;
    function privateMethod() {
        return privateKey++;
    }

    // 공개될 멤버(특권 메소드) 정의
    return {
        publicKey: privateKey,
        publicMethod: function () {
            return privateMethod();
        }
    }

})()

console.log(module.publicMethod()) // 0
console.log(module.publicMethod()) // 1
```

모듈 패턴의 반환값은 함수가 아닌 객체이다. 위의 코드를 순서대로 보면 익명함수가 자동으로 실행되고 반환된 객체를 module 변수에 할당한다. 따라서 module.publicMethod()처럼 메소드를 호출할 수 있다. 자동 호출되는점을 제외하고 클로저와 유사하다.

### 클로저 경우
```javascript
function func() {
    var private = 0;
    return function () {
        private++;
        return private;
    }
}
var val = func();
console.log(val()) // 1
console.log(val()) // 2
```

그리고 인스턴스를 여러개 만들어 낼 수 있는 구조라는 점에서 싱글톤 패턴과 차이가 있다.

### 싱글톤 패턴 경우
```javascript
var singleton = (function () {

    var instance;
    var private = 0;
    function init() {
        return {
            publicKey: private,
            publicMethod: function () {
                return publicKey;
            }
        }
    }
    return function () {

        // 싱글톤 패턴은 아래 조건문에서 처음 인스턴스가 선언되면 다시 인스턴스를 만들지 않고 기존의 인스턴스를 리턴한다.
        if (!instance) {
            instance = init();
        }
        return instance;
    }
})()

var singleton1 = singleton();
var singleton2 = singleton();
console.log(singleton1 === singleton2) // true
```

하나의 인스턴스를 선언하지 않고 여러개의 인스턴스를 생성하려면 익명함수를 사용하지 않고 생성자 함수 방식으로 만들면 된다.

```javascript
var Module = function () {

    var privateKey = 0;
    function privateMethod() {
        return privateKey++;
    }

    return {
        publicKey: privateKey,
        publicMethod: function () {
            return privateMethod();
        }
    }

}

var obj1 = Module();
console.log(obj1.publicMethod()) // 1
console.log(obj1.publicMethod()) // 2

var obj2 = Module();
console.log(obj2.publicMethod()) // 1
console.log(obj2.publicMethod()) // 2
```

위처럼 Module 함수를 정의하여 함수를 호출하면 여러개의 인스턴스를 생성할 수 있다. 클로저 인스턴스와 유사하지만, 한가지 차이점은 내부의 익명함수에서 반환값이 함수가 아니라 객체를 반환한다는 점이다.

모듈 패턴과 네임 스페이스 패턴을 함께 사용하면 더욱 깔끔한 코드가 완성된다.

```javascript
var app = app || {};
app.module = (function () {

    var privateKey = 0;
    function privateMethod() {
        return privateKey++;
    }

    return {
        publicKey: privateKey,
        publicMethod: function () {
            return privateMethod();
        }
    }
})()

console.log(app.module.publicMethod()) // 0
console.log(app.module.publicMethod()) // 1
```

## References
> [module pattern (모듈패턴) #1](https://webclub.tistory.com/5)  
> [[JS_Design Pattern] 2. 모듈 패턴 (Module Pattern)](https://asfirstalways.tistory.com/234)
