---
title: "맥 터미널 쉘 접속"
date: 2020-01-21 10:55:53
categories: "mac"
tags: [mac, terminal]
thumbnail: "/gallery/thumbnail-mac.png"
---

윈도우에서는 Putty라는 프로그램으로 ssh접속을 하였지만 맥에서는 터미널로 바로 접속이 가능하다.

```
$ ssh [ID]@[HOST]
```
예를들어 `webapp`이 아이디이고 `127.0.0.1`가 호스트 번호 라면

```
$ ssh webapp@127.0.0.1
```

라고 입력한 뒤 패스워드를 입력하면 된다.
