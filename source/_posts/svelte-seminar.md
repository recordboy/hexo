---
title: "스벨트 요약"
date: 2019-10-20 09:37:50
categories: "svelte.js"
tags: [svelte.js]
---

## REACT/VUE 에서 이젠 SVELTE

W3C HTML5 Conference 2019에서 변규현 강사님의 내용을 간략하게 필기한 것

* [Let's start SVELTE, goodbye React & Vue](https://novemberde.github.io/javascript/2019/10/11/Svelte-revealjs.html)
* [공식 문서](https://svelte.dev/docs)
* [듀토리얼](https://svelte.dev/tutorial/basics)
* [예제](https://svelte.dev/examples#hello-world)

## 스벨트란?

* 코드가 간결하다. 리액트와 뷰와 스벨트를 비교했을 때 코드의 양이 차이가 많이난다.
    - React : 442 Characters
    - Vue : 263 Characters
    - Svelte : 145 Charaters

* 가상돔을 사용하지 않는다.
* 반응성이다. 이는 변경된 값이 DOM에 자동으로 반영된다는 것
* 리액트나 뷰는 하나의 컴포넌트 및 템플릿으로 HTML을 감싸야 하지만 스벨트는 각 태그별로 사용이 가능하다.
* 스벨트는 에러를 빌드 타임에서 잡는다.
* 컴포넌트명을 예약어로도 사용 가능
* 컴포넌트간의 통신 가능
* 문법이 뷰보다 쉬움, 문법이라고 할게 없음, 상당히 쉽다.
* 가볍게 코드를 짤 경우 스벨트를 강력 추천
* 리액트의 경우 렌더링된 DOM 트리가 전의 것과 비교해서 다른 타입의 요소일때, 전 요소는 없어지고, 새로운 것을 완전히 새롭게 렌더링하는데 이를 diff 라고 한다. 리액트는 이로 인해 버벅거리는 현상이 있다. 이로 인해 스벨트와 어느 한 예제를 비교하였을때 성능차이가 거의 5배 차이가 남

## References
> [SvelteJS(스벨트) - 새로운 개념의 프론트엔드 프레임워크(updated)](https://heropy.blog/2019/09/29/svelte)
> [웹 프레임워크 Svelte를 소개합니다.](https://velog.io/@ashnamuh/hello-svelte)
