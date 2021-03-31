---
title: "[Linux] Yum 명령어"
date: 2019-10-23 09:46:00
categories: [server, linux]
tags: [linux, yum]
# thumbnail: "/gallery/thumbnail-linux.png"
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

패키지 설치
```
# install [패키지명]
```

<!-- more -->

패키지 삭제
```
# yum remove [패키지명]
```

패키지 업데이트
```
# yum update [패키지명]
```

패키지 정보 확인
```
# yum info [패키지명]
```

패키지 검색
```
# yum search [검색어]
```

패키지 목록 보기
```
# yum list
```

설치된 패키지 목록 보기
```
# yum list installed
```

패키지 설치, 변경, 삭제로 변경된 정보 보기
```
# yum history list
```

저장소 확인하기
```
# yum repolist
```

