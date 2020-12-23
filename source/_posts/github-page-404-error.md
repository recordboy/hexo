---
title: "[Github] 깃허브 호스팅 페이지에서 404 오류 나올 경우"
date: 2020-03-03 19:50:48
categories: [git, github]
tags: [github, git]
# thumbnail: "/gallery/thumbnail-github.png"
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

깃허브 호스팅 페이지가 404에러가 뜰 경우 아래 명령어를 실행하자, 설명은 아래 레퍼런스 참조

<!-- more -->

```
$ git commit --allow-empty -m 'Trigger rebuild'
$ git push origin
```

## References
> [How to fix HTTP 404 on Github Pages?](https://stackoverflow.com/questions/11577147/how-to-fix-http-404-on-github-pages/45907768#45907768)

<div style="overflow: hidden;">
<a href="https://coupa.ng/bOfEJC" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/70ea7a712597c36c2ccda0e85ccea62a@2x.jpg" alt="Apple 애플워치3, 38mm, GPS, 스페이스 그레이 알루미늄 케이스, 블랙 스포츠 밴드" width="100%" /></a>
<a href="https://coupa.ng/bOfGfF" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/d69a83f91f18a50260d858fa60d16c78@2x.jpg" alt="피컴 목스트레칭기구 목해먹 넥해먹 목견인기 목당기미 목보호대, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFGi" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/399c2e5ea57e8fc6fc0045985f9cf53c@2x.jpg" alt="얼라이브 원스 데일리 포맨 멀티 비타민, 60정, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFCk" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/2e7537ed1bf44257aed8693d97fafddf@2x.jpg" alt="아이소라이프 [아이소넥] 목마사지기 정형용 일자목 운동 의료기기, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFv0" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/66bfeb60f8065217012074be5d62f027@2x.jpg" alt="[한우 판매 인증점][소돼박]결제 후 당일 배송 가능!매일 16시 배송출발!1+등급 이상 프리미엄 한우 선물 세트(꽃갈비살600g 꽃등심600g 총 - 1200g)" width="100%" /></a>
</div>

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
