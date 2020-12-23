---
title: "[Svelte] 스벨트 요약"
date: 2019-10-20 09:37:50
categories: [front-end, svelte.js]
tags: [svelte.js, javascript]
# thumbnail: "/gallery/thumbnail-svelte.png"
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

## REACT/VUE에서 이젠 SVELTE

W3C HTML5 Conference 2019에서 변규현 강사님의 내용을 간략하게 필기한 것

* [Let's start SVELTE, goodbye React & Vue](https://novemberde.github.io/javascript/2019/10/11/Svelte-revealjs.html)
* [공식 문서](https://svelte.dev/docs)
* [듀토리얼](https://svelte.dev/tutorial/basics)
* [예제](https://svelte.dev/examples#hello-world)

<!-- more -->

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

<div style="overflow: hidden;">
<a href="https://coupa.ng/bOfEJC" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/70ea7a712597c36c2ccda0e85ccea62a@2x.jpg" alt="Apple 애플워치3, 38mm, GPS, 스페이스 그레이 알루미늄 케이스, 블랙 스포츠 밴드" width="100%" /></a>
<a href="https://coupa.ng/bOfGfF" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/d69a83f91f18a50260d858fa60d16c78@2x.jpg" alt="피컴 목스트레칭기구 목해먹 넥해먹 목견인기 목당기미 목보호대, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFGi" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/399c2e5ea57e8fc6fc0045985f9cf53c@2x.jpg" alt="얼라이브 원스 데일리 포맨 멀티 비타민, 60정, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFCk" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/2e7537ed1bf44257aed8693d97fafddf@2x.jpg" alt="아이소라이프 [아이소넥] 목마사지기 정형용 일자목 운동 의료기기, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFv0" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/66bfeb60f8065217012074be5d62f027@2x.jpg" alt="[한우 판매 인증점][소돼박]결제 후 당일 배송 가능!매일 16시 배송출발!1+등급 이상 프리미엄 한우 선물 세트(꽃갈비살600g 꽃등심600g 총 - 1200g)" width="100%" /></a>
</div>

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
