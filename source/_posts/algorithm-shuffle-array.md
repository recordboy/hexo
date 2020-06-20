---
title: "랜덤 배열(Shuffle)"
date: 2020-06-04 13:18:39
categories: [front-end, javascript]
tags: [javascript]
# thumbnail: "/gallery/thumbnail-js.png"
---

아래는 배열을 무작위로 섞는 알고리즘이다.

<!-- more -->

`arr`배열을 선언한 뒤 각 요소를 랜덤으로 추출하여 `newArr`라는 새로운 배열에 할당하도록 작성되었다.

```javascript
let arr = [1, 2, 3, 4, 5],
  newArr = [],
  len = arr.length,
  ranIdx = 0,
  ran = 0,
  target = 0;

console.log(arr);
// [ 1, 2, 3, 4, 5 ]

for (let i = 0; i < len; i++) {
  ranIdx = Math.floor(Math.random() * arr.length);
  ran = arr[ranIdx];
  if (arr.indexOf(ran) !== -1) {
    target = arr.indexOf(ran);
    arr.splice(target, 1);
    newArr.push(ran);
  }
}
console.log(newArr);
// 무작위로 배열 출력
```

구글링을 하다 더욱 간결한 코드를 발견하였다. 코드는 아래와 같다.

```javascript
function shuffle(a) {
  let j, x, i;
  for (let i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  console.log(a);
  // 무작위로 배열 출력
}
shuffle([1, 2, 3, 4, 5]);
```

 `shuffle()`에 배열을 인자로 넘겨 호출한다. 함수안 반복문의 인덱스 값은 내림차순으로 할당된다. `Math.random()`로 배열 요소의 난수를 구한 뒤 `x`에 배열의 마지막 요소를 할당하고, 마지막 요소 자리에 난수를 인덱스로 가지는 요소를 대입한다. 난수를 인덱스 값으로 가지는 요소 자리에는 아까 할당해둔 `x`값을 대입한다. 이 로직을 반복하여 랜덤 배열을 얻게 된다.
