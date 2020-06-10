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
  return new Promise(function (resolve, reject) {
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
위 코드는 콜백 함수를 인자로 넘기는 대신에 프로미스 객체를 생성하여 리턴을 하고, 리턴받은 프로미스 객체의 `then()`메소드를 호출하여 실행할 로직을 인자값으로 넣어줬다. 실행할 로직은 `resolve` 메소드에 할당되어 `user`객체의 결과값을 콘솔창에 출력하고 있다. `resolve()`와 `then()`가 생소하다. 아래에서 천천히 알아보도록 하겠다.

## 프로미스의 3가지 상태
프로미스는 3가지의 상태(states)를 가지며, 여기서 상태란 프로미스의 처리 과정을 의미한다. `new Promise()`로 프로미스를 생성하고 종료될 때까지 3가지 상태를 가진다.

* Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
* Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
* Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

### Pending(대기)
아래처럼 `new Promise()`생성자를 호출하면 대기 상태가 된다. `new Promise()` 생성자를 호출할 때 인자로 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 `resolve`, `reject`이다.

```javascript
const promise = new Promise(function (resolve, reject) {
  // ...
});
```

실제로는 변수에 할당하기 보단 어떤 함수의 리턴값으로 많이 사용되며, 생성자의 인자로 화살표 함수를 많이 사용한다.

```javascript
function returnPromise() {
  return new Promise((resolve, reject) => {
    // ...
  });
}
```

### Fulfilled(이행)
넘겨 받은 인자에서 `resolve`를 함수로 실행하면 이행(완료) 상태가 된다.

```javascript
function returnPromise() {
  return new Promise((resolve, reject) => {
    resolve();
  });
}
```

이행 상태에서 아래와 같이 `then()`메소드를 이용하면 결과값을 받을 수 있다.

```javascript
function returnPromise() {
  return new Promise((resolve, reject) => {
    const data = 'my name is foo';
    resolve(data);
  });
}

returnPromise().then((data) => {
  console.log(data); // my name is foo
});
```

### Rejected(실패)

넘겨 받은 인자에서 `reject`를 함수로 실행하면 실패 상태가 된다. 실패 상태가 되면 실패 처리의 결과값을 `catch()`메소드를 통해 받을 수 있다.

```javascript
function returnPromise() {
  return new Promise((resolve, reject) => {
    reject(new Error('Request is failed'));
  });
}

returnPromise()
  .then()
  .catch((err) => {
    console.log(err); // Error: Request is failed
  });
```

## 사용 방법

### 기본 코드
아래는 응답값에 따라 결과를 출력하는 예제이다.

```javascript
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout((data) => {
      if (data) {
        resolve(data);
      }
      reject(new Error('Request is failed'));
    }, 1000);
  });
}

getData()
  .then((data) => {
    console.log(data); // 응답 값 출력
  })
  .catch((err) => {
    console.log(err); // Error: Request is failed
  });
```

`setTimeout()`함수로 1초 뒤 `data`값을 받아오며, `data`값이 있을 경우 `then()`메소드를 호출하고, `data`값이 없을 경우 `catch()` 메소드를 호출한다.

### 프로미스 연결(Promise Chaining)
프로미스의 특징으로 여러개의 프로미스를 연결하여 사용할 수 있다. `then()`메소드를 호출하면 새로운 프로미스 객체가 반환된다. 아래처럼 각 프로미스를 연결하여 사용할 수 있다.

```javascript
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout((data) => {
      data = 10; // 응답 값이 10이 왔다고 가정
      if (data) {
        resolve(data);
      }
      reject(new Error('Request is failed'));
    }, 1000);
  });
}

getData()
  .then((data) => {
    console.log(data); // 10
    return data + 10;
  })
  .then((data) => {
    console.log(data); // 20
    return data + 10;
  })
  .then((data) => {
    console.log(data); // 30
  })
  .catch((err) => {
    console.log(err); // Error: Request is failed
  });
```

`setTimeout()`함수에서 `data`값이 10으로 왔다고 가정해 본다. 첫번째 `then()`메소드의 `data`에 10을 더하여 리턴하고 두번째 `then()`에 더한 `data`를 인자로 넣어 호출한다. 이와 같은 방법으로 `then()`함수를 연결하여 사용할 수 있다.

## References
> [[자바스크립트] 비동기 처리 2부 - Promise](https://www.daleseo.com/js-async-promise/)  
> [Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)  
> [자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)  
> [프로미스](https://poiemaweb.com/es6-promise)  
> [JavaScript 비동기 처리를 위한 promise 이해하기](https://velog.io/@cyranocoding/2019-08-02-1808-작성됨-5hjytwqpqj)
