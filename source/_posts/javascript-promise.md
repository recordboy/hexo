---
title: "비동기 처리를 위한 프로미스(Promise)"
date: 2020-06-05 09:07:04
categories: [front-end, javascript]
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
toc: true
---

자바스크립트는 비동기 처리를 위한 하나의 패턴으로 [콜백 함수](/2020/06/04/javascript-asynchronous-callback/)를 사용한다. 하지만 콜백 패턴은 가독성이 나쁘고, 비동기 처리 중 발생한 에러의 예외처리가 곤란하며, 여러개의 비동기 처리 로직을 한꺼번에 처리하는 것도 한계가 있다. ES6에서 비동기 처리를 위한 또 다른 패턴으로 프로미스(Promise)를 도입하였다. **프로미스는 비동기적으로 요청한 결과(성공/실패)를 나타내는 객체**로서, 콜백 패턴이 가진 단점을 보완하며, 비동기 처리 시점을 명확하게 표현한다.

<!-- more -->

## 기존의 콜백 함수 패턴
기존의 비동기 처리 방식은 콜백 패턴을 이용하는 방법이였으며 코드는 아래와 같다.

```javascript
function findUser(id, callback) {
  setTimeout(function () {
    const user = {
      id: id,
      name: 'my name is ' + id
    };
    callback(user);
  }, 1000);
}

findUser('foo', function (user) {
  console.log(user); // { id: 'foo', name: 'my name is foo' }
});
```
`user`객체의 정보를 받아오는 구조다. `getUser()` 함수를 호출할 때 두번째 인자로 콜백 함수가 할당된다. `setTimeout()`함수로 인하여 1초 뒤 `user`객체의 정보를 담는 로직이 실행되며 결과물이 두번째 인자로 들어간 콜백 함수의 인자에 할당되어 콜백 함수가 호출된다.

## 프로미스 패턴
상단의 비동기 처리 방식을 프로미스를 이용하면 아래와 같이 작성할 수 있다.

```javascript
function findUser(id) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      const user = {
        id: id,
        name: 'my name is ' + id,
      };
      resolve(user);
    }, 1000);
  });
}

findUser('foo').then(function (user) {
  console.log(user); // { id: 'foo', name: 'my name is foo' }
});
```
위 코드는 콜백 함수를 인자로 넘기는 대신에 ...

*추후 추가 예정*

## 프로미스 생성
프로미스 객체는 `new` 키워드와 생성자 함수를 통해 생성되며, 이 생성자 함수는 익명 함수를 인자로 받는다. 인자로 들어간 익명 함수는 `resolve`와 `reject`라는 2개의 함수형 파라미터를 가진다. 따라서 아래와 같은 모습으로 프로미스 인스턴스를 생성할 수 있다.

```javascript
const promise = new Promise(function (resolve, reject) {
  // ...
});
```

실제로는 위처럼 변수에 할당하기 보단 어떤 함수의 리턴값으로 많이 사용되며, 생성자의 인자로 화살표 함수를 많이 사용한다.

```javascript
function returnPromise() {
  return new Promise((resolve, reject) => {
    // ...
  });
}
```

*추후 추가 예정*

## References
> [[자바스크립트] 비동기 처리 2부 - Promise](https://www.daleseo.com/js-async-promise/)  
> [자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)  
> [프로미스](https://poiemaweb.com/es6-promise)  
> [JavaScript 비동기 처리를 위한 promise 이해하기](https://velog.io/@cyranocoding/2019-08-02-1808-작성됨-5hjytwqpqj)
