---
title: "[CentOS] CentOS7 깃 설치 및 로컬 세팅"
date: 2019-12-11 10:39:26
categories: [server, centos]
tags: [linux, centos, git, youngcart5]
# thumbnail: "/gallery/thumbnail-centos.png"
toc: true
widgets:
  - type: toc
    position: right
  - type: categories
    position: right
  - type: tags
    position: right
sidebar:
  right:
    sticky: true
---

## 초기 설치 환경

서버
* Centos7
* Nginx
* MySQL5.7
* PHP7.1

로컬
* Homestead

<!-- more -->

## Git 설치

원격 저장소 만들고 ssh 접속하여 `root`권한으로 변경

```
# su root
```

yum을 이용해서 git 설치
```
# yum install git-core
```

yum을 이용해서 git 설치
```
# yum install git-core
```

설치된 영카트 디렉토리로 이동
```
# cd /data/web_htdocs/
```

깃 초기화
```
# git init
```

파일 상태를 확인해 깃이 잘 설치되어 있는지 확인
```
# git status
```

전역 사용자 등록(원격 저장소에 있는 아이디와 메일이 일치하도록 설정)
```
# git config --global user.name "사용자 이름"
# git config --global user.email "사용자 메일"
```

원격 저장소 url을 복사하여 git에 연동
```
# git remote add origin `원격 저장소 url`
```

## 로컬 소스트리 클론

원격 저장소 url 복사
```
# git remote add origin `원격 저장소 url`
```

설치할 디렉토리 경로 맞춘 뒤 클론
```
# git remote add origin `원격 저장소 url`
```

## 로컬 세팅

Homestead.ymal 파일 열고 `site` 부분에
```
map: 로컬 도메인 주소
to: vagrant 경로 추가
```

```
$ vagrant reload --provision
$ sudo service nginx restart
// (nginx 백업 필수 설정 다시 해줄것!)
```

host 파일에 로컬주소 추가(관리자권한으로 실행)  
`C:\windows\system32\drivers\etc`

## 실서버 디비 백업

```
$ mysqldump -p db명 > 저장할 파일이름.sql
```

해당 파일 찾아서 local DB인 Homestead에 넣어주기  
`symlink(): Protocol error` 에러 뜰경우

Git Bash 를 관리자 권한으로 실행 후
```
$ php artisan storage:link
```

또는 관리자 권한으로 실행 후
```
$ vagrant up
```
한 다음 새로고침 해볼것

## 배포 해보기

로컬에서 소스 수정 후 commit, push 하고 쉘 접속하여 수정 부분 받기
```
$ cd /data/web_htdocs/
$ git pull
```

`error cannot open .git/fetch_head permission denied` 에러 날경우 .git 파일의 권한이 root 여서 오류남, 일반 계정으로 변경 해야함, 루트 계정으로 접속

```
$ su root
Password: 패스워드 입력
chown -R webapp:webapp /data/web_htdocs/.git
ls -al 해당 파일 변경해준 권한인지 확인
exit
```

다시 git pull, 그래도 안된다면

```
$ git pull origin master
```

또는

```
$ git branch --set-upstream-to=origin/master master
$ git pull
```
