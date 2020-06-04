---
title: "비동기 처리와 콜백 함수"
date: 2020-06-04 14:51:02
categories: [front-end, javascript]
tags: [javascript]
thumbnail: "/gallery/thumbnail-js.png"
toc: true
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
        success: function(result) {
            // 통신 성공시 결과값 할당
            data = result;
        }
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
    
    setTimeout(function() {
        data = 'result';
    }, 1000);

    return data;

}

console.log(getData()); // undefined
```

위에서의 `setTimeout()`은 1초 뒤에 `data`변수에 `result`값을 할당하도록 되어있다. `Ajax`와 마찬가지로 코드는 `setTimeout()`이 실행되는 것을 기다리지 않고 `return data`를 먼저 실행하기 때문에 리턴값은 `undefined`를 출력한다.

## 비동기 처리 방식의 문제 해결
위와 같은 문제점들은 콜백 함수로 처리가 가능하다.

```javascript
function getData(callback) {

    let data;

    setTimeout(function() {
        data = 'result';
        callback(data);
    }, 1000);

}

getData(function(data) {
    console.log(data); // result
});
```

함수를 실행할 때 인자값으로 콜백 함수를 넣는 것이다. `getData()`의 인자값으로 콜백함수가 들어갔고, `setTimeout()`이 1초뒤 실행되고 결과값을 콜백함수의 인자값으로 넣어 호출하였다. 이렇게 콜백 함수를 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행 시킬 수 있다.

## References
> [자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)  
> [자바스크립트 비동기처리](https://medium.com/@yoohl/자바스크립트-비동기-동기-ac9495e42d0)  
> [동기식 처리 모델 vs 비동기식 처리 모델](https://poiemaweb.com/js-async)  
> [동기와 비동기, 콜백함수](https://pro-self-studier.tistory.com/89)
