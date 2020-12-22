---
title: "[Algorithm] 배수 구하기"
date: 2017-12-14 21:03:09
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
  left:
    sticky: true
---

0부터 100까지 특정 배수를 구하는법이다. 반복문과 조건문, 나머지 연산자가 사용된다.

<!-- more -->

```javascript
for (var i = 0; i <= 100; i++) {
    console.log(i);
}
```

i가 증감되면서 콘솔창에 1부터 100까지 차례로 출력될 것이다. 그렇다면 아래의 코드는 어떻게 출력될까?

```javascript
for (var i = 0; i <= 100; i++) {
    console.log(i % 3);
}
```

```
0  
1  
2  
0  
1  
2  
...
```

0부터 2는 3으로 나눠지지 않기때문에 첫번째 피연산자가 출력되고 3은 나눠지기 때문에 0이 출력된다. 그 이후로는 3으로 나눈 뒤 나머지가 출력되기 때문에 위처럼 0, 1, 2, 0, 1, 2 .. 로 출력된다. i값이 3으로 나머지 없이 나눠지면 0이 출력되는걸 확인할 수 있다. 이걸 통해 조건문으로 3의 배수를 구할 수 있는 것이다.

```javascript
for (var i = 0; i <= 100; i++) {
    if (i % 3 === 0) {
        console.log(i);
    }
}
```

나머지 없이 3으로 나눠 질때만 i값이 출력된다. 하지만 i값이 0일 때도 같이 출력된다. 다중 조건문을 추가해 주자

```javascript
for (var i = 0; i <= 100; i++) {
    if (i % 3 == 0 && i !== 0) {
        console.log(i);
    }
}
```

3의 배수가 출력되는걸 확인할 수 있다.

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
