---
title: "증가 감소"
date: 2017-12-15 21:04:48
categories: "javascript"
tags: [algorithm, javascript]
thumbnail: "/gallery/thumbnail-js.png"
---

슬라이드에서 이전 슬라이드, 다음 슬라이드 인덱스 값이 필요할 경우 쓰이는 방법이다. 슬라이드 갯수와 다음, 이전 인덱스 값을 초기 설정해준다.

<!-- more -->

```javascript
var slideLength = 4,
    next = 0,
    prev = 0;
```

알고리즘이 들어갈 함수와 이벤트를 실행시킬 이벤트 리스너가 필요할 것이다. slide 함수를 선언하고 setInterval 함수에다가 이벤트 리스너를 등록하자

```javascript
function slide() {
    console.log(0);
}
setInterval(slide, 1000);
```

1초마다 콘솔창에 0이 출력된다. 이제 1초마다 다음 인덱스에 1을 더하며 그 값을 이전 인덱스에 주자

```javascript
function slide() {
    next++;
    console.log(next, prev);
    prev = next;
}
setInterval(slide, 1000);
```

콘솔창이 들어가있는 곳이 추후에 인덱스 다음과 이전 인덱스 값을 받아 처리하는 기능이 들어간다. 콘솔창을 보면 아래와 같이 다음과 이전이 1씩 밀리면서 출력된다.

```
1 0  
2 1  
3 2  
4 3  
5 4  
6 5  
7 6  
...
```

하지만 슬라이드 갯수는 4개다. 다음 인덱스가 4이상이 되면 0으로 초기화되도록 조건문을 입력하면 된다.

```javascript
function slide() {
    next++;
    if (next >= slideLength) {
        next = 0;
    };
    console.log(next, prev);
    prev = next;
}
setInterval(slide, 1000);
```

아래와 같이 순차적으로 1씩 밀려서 출력되며, 4이상이 되면 0으로 초기화가 된다.

```
1 0  
2 1  
3 2  
0 3  
1 0  
2 1  
3 2  
...
```

이제 인덱스가 순차적으로 감소되는 코드를 작성해 보자

```javascript
function slide() {
    next--;
    if (next < 0) {
        next = slideLength - 1;
    }
    console.log(next, prev);
    prev = next;
}
setInterval(slide, 1000);
```

다음 인덱스를 1식 빼고, 다음 인덱스가 0보다 작이질 시 슬라이드 갯수의 1을 뺀 값을 대입하면 된다. 1을 빼는 이유는 프래그래밍에서 수의 시작은 0부터 시작하기 때문이다. 네번째 슬라이드의 인덱스는 3이 될 것이다.
