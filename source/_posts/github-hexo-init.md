---
title: "헥소(HEXO)를 이용한 깃허브 블로그 만들기"
date: 2020-04-20 20:12:05
categories: "github"
tags: [github, hexo]
thumbnail: "/gallery/thumbnail-github.png"
toc: true
---

## 헥소(HEXO)란?

정적 웹 사이트(DB 통신 등을 해서 서버에서 HTML 페이지를 실시간으로 만들던 동적 사이트 방식이 아닌, 완성된 HTML 파일을 바로 전달) 생성기이며, 대표적으로 지킬([Jekyll](https://jekyllrb.com/))과 헥소([Hexo](https://hexo.io/ko/index.html))가 있다. 지킬은 Ruby기반이며, 헥소는 Node.js기반의 도구이다. 나는 기존에 지킬 블로그를 이용하다가 최근에 헥소 블로그로 이전하였다. 이유는 지킬 블로그의 경우 포스팅을 작성한 후 깃허브 페이지에 배포하여 반영되기까지 매번 커밋 및 푸쉬를 해줘야 하는 번거로움과 푸쉬 후 약 1분정도의 시간이 지나야 반영이 되는 딜레이가 불편하였다. 헥소같은 경우 빠른 빌드 및 반영(명령어 단 한줄로 실시간 배포 가능) 및 로컬에서 바로 수정사항을 확인할 수 있다는 점(물론 지킬도 루비 기반의 플러그인을 따로 설치하면 로컬에서 바로 확인이 가능함), Node.js 기반의 도구인 점과 마지막으로 [icarus](https://github.com/ppoffice/hexo-theme-icarus)테마가 가장 마음에 들어서(사실 이 부분이 제일 큼)이다.

헥소 블로그의 경우, 일반적으로 깃허브 저장소가 2개 사용되는데, 하나는 소스가 빌드 및 배포되어 실질적으로 보여지는 저장소(예: ...github.io), 두번째는 실제 소스가 들어있는 저장소(블로그 설정 파일 및 테마 파일)가 있다.

<!-- more -->

## 설치 환경

* Node.js
* Git

## 헥소(HEXO) 설치

`npm`을 이용하여 헥소를 전역으로 설치
```
$ npm install hexo-cli -g
```

원하는 디렉토리로 이동하여 헥소 블로그 초기 설치(여기선 `hexo`라는 이름으로 초기 설치) 후 해당 디렉토리로 이동하여 노드 모듈 설치
```
$ hexo init hexo
$ cd hexo
$ npm install
```

추후 업데이트 예정

## References
> [Github Page와 Hexo를 통해 30분만에 기술 블로그 만들기](https://www.holaxprogramming.com/2017/04/16/github-page-and-hexo/)  
> [Github 블로그 만들기 with Hexo - 초기설정](https://mingpd.github.io/2019/04/14/github-blog-with-hexo-1/)  
> [Jekyll을 이용한 무료 블로그 만들기](https://wepplication.github.io/programming/jekyll/)
