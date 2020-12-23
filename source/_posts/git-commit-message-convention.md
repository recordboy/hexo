---
title: "[Git] 깃 커밋 메시지 컨벤션(Git Commit Message Convention)"
date: 2019-11-01 09:54:06
categories: [git, git]
tags: [git]
# thumbnail: "/gallery/thumbnail-git.png"
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

커밋 메시지는 타입, 제목, 본문(선택), 꼬리말(선택) 세 부분으로 작성한다.

* [타입(Type)] 제목(Title)
* 본문(Body)
* 꼬리말(Footer)

<!-- more -->

## 제목

* 커밋 메세지 제목의 맨 앞에 타입(Type)을 붙여준다. 각 타입의 종류는 아래와 같다.
    * 기능(feat): 새로운 기능을 추가
    * 버그(fix): 버그 수정
    * 리팩토링(refactor): 코드 리팩토링
    * 형식(style): 코드 형식, 정렬, 주석 등의 변경(동작에 영향을 주는 코드 변경 없음)
    * 테스트(test): 테스트 추가, 테스트 리팩토링(제품 코드 수정 없음, 테스트 코드에 관련된 모든 변경에 해당)
    * 문서(docs): 문서 수정(제품 코드 수정 없음)
    * 기타(chore): 빌드 업무 수정, 패키지 매니저 설정 등 위에 해당되지 않는 모든 변경(제품 코드 수정 없음)

* 총 글자 수는 50자 이내며 마지막에 마침표(.)를 붙이지 않는다.
* 커밋 유형들이 복합적인 경우 최대한 분리하여 커밋한다.

## 본문

* 본문은 한 줄당 72자 이하로 작성한다.
* 깃은 자동 줄바꿈을 지원하지 않으므로, 직접 줄바꿈을 해야 한다.
* 내용은 어떻게 변경하였는지 보다 무엇을, 왜 변경하였는지 설명한다.

## 꼬리말

* 바닥 글은 선택 사항이며 이슈 트래커 ID를 참조하는데 사용된다.

## References
> [Git 사용 규칙 - Git commit 메시지](https://tttsss77.tistory.com/58)  
> [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide)  
> [깃허브(GitHub)로 취업하기](https://sujinlee.me/professional-github)  
> [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit)  
> [좋은 git 커밋 메시지를 작성하기 위한 7가지 약속](https://meetup.toast.com/posts/106)  

<div style="overflow: hidden;">
<a href="https://coupa.ng/bOfEJC" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/70ea7a712597c36c2ccda0e85ccea62a@2x.jpg" alt="Apple 애플워치3, 38mm, GPS, 스페이스 그레이 알루미늄 케이스, 블랙 스포츠 밴드" width="100%" /></a>
<a href="https://coupa.ng/bOfGfF" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/d69a83f91f18a50260d858fa60d16c78@2x.jpg" alt="피컴 목스트레칭기구 목해먹 넥해먹 목견인기 목당기미 목보호대, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFGi" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/399c2e5ea57e8fc6fc0045985f9cf53c@2x.jpg" alt="얼라이브 원스 데일리 포맨 멀티 비타민, 60정, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFCk" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/2e7537ed1bf44257aed8693d97fafddf@2x.jpg" alt="아이소라이프 [아이소넥] 목마사지기 정형용 일자목 운동 의료기기, 1개" width="100%" /></a>
<a href="https://coupa.ng/bOfFv0" target="_blank" style="display: block; float: left; width: 20%;"><img src="https://static.coupangcdn.com/image/affiliate/banner/66bfeb60f8065217012074be5d62f027@2x.jpg" alt="[한우 판매 인증점][소돼박]결제 후 당일 배송 가능!매일 16시 배송출발!1+등급 이상 프리미엄 한우 선물 세트(꽃갈비살600g 꽃등심600g 총 - 1200g)" width="100%" /></a>
</div>

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
