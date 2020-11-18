---
title: "[Algorithm] 구구단 출력하기"
date: 2018-02-20 21:32:29
categories: [front-end, javascript]
tags: [algorithm, javascript]
# thumbnail: "/gallery/thumbnail-js.png"
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

자바스크립트로 중첩 반복문을 활용한 구구단 출력하기 예제이다. 예전에 면접볼 때 코딩 테스트에서 해당 문제가 나와 적어본다. 우선 반복문으로 2단의 값을 출력해 보자

<!-- more -->

```javascript
for (var i = 1; i <= 9; i++) {
    console.log(2 * i);
}
```
```
2  
4  
6  
8  
...
```

정상적으로 출력된다. 이제 이 값을 하나의 변수에 넣어 보자

```javascript
var result = '';
for (var i = 1; i <= 9; i++) {
    result += 2 * i + '\n';
}
console.log(result);
```

result에 2단의 값을 차례대로 대입하였더니 정상적으로 출력된다. 이제 답 말고 구구단식도 같이 넣어 보자

```javascript
var result = '';
for (var i = 1; i <= 9; i++) {
    result += '2' + 'x' + i + '=' + 2 * i + '\n';
}
console.log(result);
```
```
2 x 1 = 2  
2 x 2 = 4  
2 x 3 = 6  
2 x 4 = 8  
2 x 5 = 10  
2 x 6 = 12  
2 x 7 = 14  
2 x 8 = 16  
2 x 9 = 18  
```

제대로 출력된다. 이제 중첩 반복문을 활용하여 1단부터 9단까지의 모든 구구단을 출력해 보자

```javascript
var result = '';
for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= 9; j++) {
        result += i + 'x' + j + '=' + i * j + '\n';
    }
}
console.log(result);
```

로직을 살펴보면, result가 선언되고 외부 반복문이 시작된다. i가 1인 상태에서 내부 반복문으로 들어간다. result에 대입되는 값을 해석해 보면 i에 문자열 x을 더하고 j값을 더한뒤 문자열 = 을 더하고 값을 더한뒤 줄바꿈 처리를 했다. 내부 반복문이 다시 실행된다. i값이 1상태에서 j는 2에서 반복문이 실행된다. i는 몇단인지 구분되는 값이 된다. 이런식으로 중첩되어 값을 계산하고 마지막엔 콘솔창에 값을 출력하게 된다.
