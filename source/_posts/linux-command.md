---
title: "[Linux] 리눅스 명령어"
date: 2019-10-10 09:28:27
categories: [server, linux]
tags: [linux, command]
# thumbnail: "/gallery/thumbnail-linux.png"
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

## 체크

리눅스 버전체크
```
# uname -a
```

CentOS 버전체크
```
# cat /etc/redhat-release
```

하드용량체크
```
# df -h
```

<!-- more -->

## 디렉토리

현재 디렉토리 확인하기
```
# pwd
```

현재 디렉토리 목록 보기
```
# ls
```

현재 디렉토리 목록 자세히 보기
```
# ll
```

## 파일/폴더

파일 생성
```
# touch [파일명]
# cat [파일명]
# vi [파일명]
```

폴더 생성
```
# mkdir [폴더명]
```

vi 편집기 실행
```
# vi [파일명]
```

vi 편집기 저장 후 끝내기(ESC 누른뒤)
```
# wq
```

vi 편집기 저장하지 않고 끝내기(ESC 누른뒤)
```
# q!
```

파일 삭제
```
# rm [파일명]
```

파일 삭제 확인을 거치지 않고 삭제
```
# rm -f [파일명]
```

해당 폴더 삭제
```
# rm -r [폴더명]
```

폴더 삭제 확인을 거치지 않고 삭제
```
# rm -rf [폴더명]
```

## 압축

tar 압축하기
```
# tar -cvf [파일명.tar] [폴더명]

ex) foo라는 폴더를 boo.tar로 압축하고자 한다면
# tar -cvf boo.tar foo
```

tar 압축 풀기
```
# tar -xvf [파일명.tar]

ex) foo.tar라는 tar파일 압축을 풀고자 한다면
# tar -xvf foo.tar
```

tar.gz 압축하기
```
# tar -zcvf [파일명.tar.gz] [폴더명]

ex) foo라는 폴더를 boo.tar.gz로 압축하고자 한다면
# tar -zcvf boo.tar.gz foo
```

tar.gz 압축 풀기
```
# tar -zxvf [파일명.tar.gz]

ex) aaa.tar.gz라는 tar.gz파일 압축을 풀고자 한다면
# tar -zxvf aaa.tar.gz
```

## MySQL

MySQL 설치 유무
```
# rpm -qa | grep mysql
```

MySQL 설치
```
# yum install mariadb
```

MySQL 설치 경로 확인
```
# find / -name mysql
```
