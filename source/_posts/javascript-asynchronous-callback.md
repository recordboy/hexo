---
title: "[JavaScript] 비동기 처리와 콜백 함수"
date: 2020-06-04 14:51:02
categories: [front-end, javascript]
tags: [javascript]
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
  right:
    sticky: true
---

## 비동기 처리
비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고, 순차적으로 다음 코드를 먼저 실행하는 자바스크립트의 특성이다. 비동기의 반대로는 동기 처리가 있다.
* 동기: 요청을 보낸 후 해당 응답을 받아야 다음 동작을 실행(ex: 은행)
* 비동기: 요청을 보낸 후 응답에 관계 없이 다음 동작을 실행(ex: 카페)

<!-- more -->

## 비동기 예제
비동기 처리의 대표적인 사례는 제이쿼리의 `Ajax`와 자바스크립트의 내장 함수인 `setTimeout()`이 있다.

### Ajax
아래 처럼 `Ajax`로 통신을 하고 있다고 가정해 보자

```javascript
function getData() {
  let data;

  $.ajax({
    type: 'post',
    url: 'https://recordboy.github.io/',
    data: {
      // 전송 데이터
    },
    success: function (result) {
      // 통신 성공시 결과값 할당
      data = result;
    },
  });

  return data;
}

console.log(getData()); // undefined

```

`https://recordboy.github.io/`주소로 `data`를 전송하고, 통신 성공시 응답값을 `data`변수에 할당하여 리턴하도록 되어있다. 정상적으로 응답값을 받아 올 것 같지만 리턴값은 `undefined`가 출력된다. 이유는 `Ajax`를 요청하고 응답값을 받기 전에 `return data`를 실행했기 때문이다. 결국 `getData()`의 리턴값은 초기 값을 설정하지 않는 `undefined`가 출력되는 것이다. **이렇게 특정 로직의 실행이 끝날 때까지 대기하지 않고, 나머지 코드를 먼저 실행하는 것이 비동기 처리이다.** 

자바스크립트에서 비동기 처리가 필요한 이유는 화면에서 서버로 데이터를 요청했을 때 서버가 응답값을 언제 줄지도 모르는데 마냥 기다릴 순 없기 때문이다. 만약 어플리케이션이 비동기 처리를 하지 않고 동기적 처리를 한다고 가정해 보자. 위에서는 1번만 요청하였지만, 만약 요청을 100번이상 보낸다면 해당 어플리케이션은 실행하는데 수십분이 걸릴 것이다. 

### setTimeout()
비동기 처리의 두번째 사례이다.

```javascript
function getData() {
  let data;

  setTimeout(function () {
    data = 'result';
  }, 1000);

  return data;
}

console.log(getData()); // undefined

```

위에서의 `setTimeout()`은 1초 뒤에 `data`변수에 `result`값을 할당하도록 되어있다. `Ajax`와 마찬가지로 코드는 `setTimeout()`이 실행되는 것을 기다리지 않고 `return data`를 먼저 실행하기 때문에 리턴값은 `undefined`를 출력한다.

## 비동기 처리 방식의 문제 해결
위와 같은 문제점들은 콜백 패턴으로 처리가 가능하다.

```javascript
function getData(callback) {
  let data;

  setTimeout(function () {
    data = 'result';
    callback(data);
  }, 1000);
}

getData(function (data) {
  console.log(data); // result
});
```

함수를 실행할 때 인자값으로 콜백 함수를 넣는 것이다. `getData()`의 인자값으로 콜백 함수가 들어갔고, `setTimeout()`이 1초뒤 실행되고 결과값을 콜백 함수의 인자값으로 넣어 호출하였다. 이렇게 콜백 패턴을 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행 시킬 수 있다.

## 콜백 지옥
비동기 처리를 위해 콜백 패턴를 사용하면 처리 순서를 보장하기 위해 여러 개의 콜백 함수가 중첩되어 복잡도가 높아지는 콜백 함수가 발생하는 단점이 있다. 아래는 콜백 지옥이 발생하는 전형적인 사례이다.

```javascript
step1(function (value1) {
  step2(function (value2) {
    step3(function (value3) {
      step4(function (value4) {
        step5(function (value5) {
          // 탈출
        });
      });
    });
  });
});
```

step1에서 어떤 처리 (주로 입출력) 이후 그 결과를 받아와, 인자로 전달된 익명 함수의 매개변수로 넘겨준다. 이후 step2에서 또 어떤 처리를 하고, 다음 익명 함수가 실행된다. 이를 반복하다보면 코드가 위에서 아래가 아니라 기묘한 피라미드 모양으로 기술되게 된다. 이러한 콜백 지옥은 가독성을 나쁘게 하며 실수를 유발하는 원인이 된다.

### 콜백 지옥 해결 방법
일반적으로 콜백 지옥을 해결하는 방법에는 Promise나 Async를 사용하는 방법이 있으며, 만약 코딩 패턴으로만 콜백 지옥을 해결하려면 아래와 같이 각 콜백 함수를 분리해 주면 된다.

```javascript
step1(afterStep1);
function afterStep1(value1) {
  step2(afterStep2);
}
function afterStep2(value2) {
  step3(afterStep3);
}
// 생략
```

위와 같은 방법으로 콜백 지옥을 해결할 수 있지만 Promise나 Async를 이용하면 더욱 편리하게 비동기 처리를 구현할 수 있다.

## References
> [자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)  
> [자바스크립트 비동기처리](https://medium.com/@yoohl/자바스크립트-비동기-동기-ac9495e42d0)  
> [동기식 처리 모델 vs 비동기식 처리 모델](https://poiemaweb.com/js-async)  
> [동기와 비동기, 콜백함수](https://pro-self-studier.tistory.com/89)  
> [프로미스](https://poiemaweb.com/es6-promise)  
> [콜백 지옥](https://librewiki.net/wiki/콜백_지옥)
