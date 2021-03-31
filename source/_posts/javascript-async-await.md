---
title: "[JavaScript] Async/Await를 이용한 비동기 처리"
date: 2020-11-20 16:07:51
categories: [front-end, javascript]
tags: [javascript, es8]
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

`Async/Await`는 ECMAScript8에서 새롭게 추가된 자바스크립트 비동기 처리 패턴이다. 코드의 모습과 동작을 좀 더 동기 코드와 유사하게 작성할수 있어 기존의 콜백 패턴이나 프로미스 패턴보다 가독성이 높다는 장점이 있다. 

<!-- more -->

```javascript
async function getData() {

  const result = await new Promise((resolve) => {

    // 1초뒤 data에 값 담음
    setTimeout(() => {

      const data = "my-data";
      resolve(data);

    }, 1000);
  });

  // data 값 출력
  console.log(result);
}

getData();
```

기본적인 형태는 위와 같으며 아래에서 각 키워드를 알아본다.

## async

`async` 키워드를 `function`앞에 붙이면 `AsyncFunction` 함수가 되며 이 함수는 항상 프라미스를 반환한다.

```javascript
async function func() {
  return "my-data";
}
console.log(func()); // Promise { 'my-data' }
```

위 코드를 보면 `func()`는 `my-data` 값을 리턴하고 있지만 실제 리턴값은 프로미스 객체를 리턴하고 있다.

```javascript
async function func() {
  return "my-data";
}

func().then((data) => {
  console.log(data); // my-data
});
```

위 코드는 반환된 프라미스 객체를 `then` 함수를 통해 `data`값을 받아 출력하고 있다.

## await

또 다른 키워드 `await`는 `async` 함수 안에서만 동작한다. `await`는 프로미스 객체를 만나면 처리될 때까지 기다리고 결과는 그 이후에 반환되며 이 키워드로 비동기 패턴을 동기식으로 작성할 수 있다.

```javascript
async function getData() {

  // promise 변수에 프로미스 객체를 담음
  const promise = new Promise((resolve) => {

    // 1초뒤 resolve 함수를 호출하여 프로미스가 이행상태가 됨
    setTimeout(() => {
      resolve("my-data");
    }, 1000);
  });

  const result = await promise; // 프로미스가 이행될 때 까지 기다림
  console.log(result); // my-data
}

getData();
```

> `await`는 `async` 함수 외부에서 사용될 수 없다. 만약 사용된다면 문법 에러가 발생한다.

위 코드를 아래처럼 프로미스를 선언할 때 `await` 키워드를 사용할 수도 있다.

```javascript
async function getData() {

  // 프로미스가 이행되었을 때 결과값을 담음
  const result = await new Promise((resolve) => {

    // 1초뒤 resolve 함수를 호출하여 프로미스가 이행상태가 됨
    setTimeout(() => {
      resolve("my-data");
    }, 1000);
  });

  console.log(result); // my-data
}

getData();
```

## 기존 비동기 처리 방식과 비교

기존의 비동기 방식과 비교해보자, 서버와 통신하여 1초뒤 `my-data` 값을 리턴하는 `getData()` 함수가 있다고 가정한다.(여기서는 비동기 통신을 `setTimeout()`로 대체한다.)

```javascript
function getData() {
  let data = "";
  setTimeout(() => {
    data = "my-data";
  }, 1000);
  return data;
}

console.log(getData()); // 출력 안됨
```

함수를 실행하면 리턴값은 아무것도 안나온다. 비동기 방식으로 통신되기 때문에 응답(1초)을 기다리지 않고 바로 값을 리턴하기 때문이다.

### 콜백함수 방식

```javascript
function getData(callBack) {
  let data = "";
  setTimeout(() => {
    data = "my-data";
    return callBack(data);
  }, 1000);
}

getData(function(result) {
  console.log(result); // my-data
});
```

콜백 방식을 사용하면 위와 같다. `getData()` 함수에 콜백함수를 인자로 넣고 통신이 끝난 후 리턴하여 그 값을 출력하는데, 코드의 가독성이 좋지 않다.

### 프로미스의 then 방식

```javascript
function getData() {
  let data = "";
  return new Promise((resolve) => {
    setTimeout(() => {
      data = "my-data";
      resolve(data);
    }, 1000);
  });
}

getData().then(function(result) {
  console.log(result); // my-data
});
```

반환된 프로미스 객체를 `then()` 함수에 전달받는 방식이다. 콜백 지옥을 해결하고, 예외처리가 가능한 방식이지만, 여전히 가독성이 안좋은건 사실이다.


### Async/Await 방식

```javascript
function getData() {
  let data = "";
  return new Promise((resolve) => {
    setTimeout(() => {
      data = "my-data";
      resolve(data);
    }, 1000);
  });
}

async function getResult() {
  const result = await getData();
  console.log(result); // my-data
}

getResult();
```
`getResult()` 함수에 `async` 키워드를 사용해 `AsyncFunction`으로 만들었다. `getData()`의 리턴값은 프로미스기 때문에 `await` 키워드를 만나 프로미스 실행이 완료되면 결과값이 `result` 변수에 할당된다.

## 예외처리

`Async/Await`의 예외처리는 `try`, `catch`로 한다. 프로미스에서 `catch()`를 사용한 것처럼 `async & await`에서는 `catch{}`를 사용하면 된다.

```javascript
function getData() {
  let data = "";
  return new Promise((resolve) => {
    setTimeout(() => {
      data = "my-data";
      resolve(data);
    }, 1000);
  });
}

async function getResult() {
  
  // 통신 성공
  try {
    const result = await getData();
    console.log(result); // my-data

  // 통신 실패
  } catch (error) {
    console.log(error); // error
  }
}

getResult();
```

`catch`로 통신 오류 및 타입오류 등이 `error` 객체에 담기게 된다. 에러 유형에 맞게 코드를 작성하면 된다.

## References
> [자바스크립트 async와 await](https://joshua1988.github.io/web-development/javascript/js-async-await/)  
> [async와 await](https://ko.javascript.info/async-await#ref-259)  
> [자바스크립트의 Async/Await 가 Promises를 사라지게 만들 수 있는 6가지 이유](https://medium.com/@constell99/자바스크립트의-async-await-가-promises를-사라지게-만들-수-있는-6가지-이유-c5fe0add656c)

