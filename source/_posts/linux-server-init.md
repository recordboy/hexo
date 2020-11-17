---
title: "[Linux] 리눅스 서버 세팅"
date: 2019-10-21 09:40:18
categories: [server, linux]
tags: [linux]
# thumbnail: "/gallery/thumbnail-linux.png"
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

## 목적
* 가상 호스팅을 설정하여 자신의 웹서버로 이용
* IWINV 서비스를 이용하여 리눅스 서버를 구매

<!-- more -->

### 리눅스 운영체제의 특징
* 리누스 토발즈가 개발한 컴퓨터 운영체제의 한 종류이며 커널 자체를 의미
* 자유 라이센스와 오픈 소스 개발의 가장 유명한 표본
* 다중 스레드를 지원하는 네트워크 운영 체제(NOS)로, 여러 사람이 하나의 리눅스 시스템에 접속하여 다수의 프로그램을 동시에 실행할 수 있다.
* MS에서 개발된 MSSQL을 제외한 대부분의 DB를 지원

## IWINV 서버 신청
[IWINV 서버 신청 가이드를 참조](https://www.idchowto.com/wp-content/uploads/2017/02/IWINV-리눅스_서버_왕초보_메뉴얼.pdf)

1. [https://www.iwinv.kr](https://www.iwinv.kr)로 접속해 회원가입
2. 관리 콘솔로 들어가 서버 선택
  * 가상서버와 물리서버로 상품이 있으며 가상서버는 [Real Core 서버], [vCore 서버] 나누어 짐
  * 논리적인 머신이냐, 물리적인 머신이냐에 따른 분류 이며 vCore >> Real Core >> RealServer 순으로 사양 이 높아 진다.
3. 스탭 별로 필요한 옵션을 선택(아래는 필자가 선택한 옵션)
4. Step01. ZONE 선택 >> KR1-Lite-Z01
5. Step02. 운영체제 선택 >> CentOS 7.X(64bit)
6. Step03. 하드웨어 선택 >> SINGLE SSD >> vCore.V1-Lite
7. Step04. 블록 스토리지 추가 >> 건너뛰기(데이터 손실을 방지하기 위해 블록 스토리지에 백업하는 서비스라 추정된다)
8. Step05. 이름 설정 >> recordboy
9. Step06. 수량 선택 >> 1개
10. Step07. 확인

## 서버 접속
대부분의 리눅스 웹 서버는 SSH라는 터미널 프로그램에 접속 명령어를 직접 입력하면서 관리를 한다. 이번에 신청한 서버도 리눅스 서버 호스팅 상품이며, SSH접속정보만이 제공 된다.
SSH 접속 프로그램은 [PuTTY](https://putty.ko.softonic.com)라는 프로그램을 쓸 것이다.

> SSH클라이언트: SSH 접속을 지원하는 서버에 접속하기 위한 사용자 프로그램

1. [PuTTY](https://putty.ko.softonic.com) 사이트에 접속해 해당 프로그램 설치
2. 프로그램 실행 후 Host Name(or IP address)란에 IWINV서버의 **IP주소**를 입력하고, **포트(22), 프로토콜(SSH)**를 선택하여 접속한다.
3. 본인의 IWINV 로그인 비밀번호를 이용해, 관리자(root) ID 로 로그인 한다.
4. 비밀번호 인증이 성공하면 쉘 프롬프트가 떨어지며, #기호가 표시된다. root 가 아닌 일반 사용자일 경우에는 #기호 대신 $기호로 표시된다. 
5. SSH 접속 비밀번호는 Console 을 통한 시스템 로그인 비밀번호와 동일하다. **root 계정은 Linux 시스템 내에서 최고 권한의 관리자 계정이므로, 비밀번호 보안에 각별한 주의를
기울여야 한다.**
6. 초기 비밀번호가 복잡하니 아래 명령어로 패스워드를 변경해 준다.
```
$ passwd
```
7. 해당 서버의 이름을 설정해 주자. 처음에는 `root@서버이름: ~]#` 식으로 보여진다.  

## References
> [한번에 끝내는 CentOS 웹서버세팅 (센토스 서버세팅)](https://blog.lael.be/post/1721)
> [IWINV 서버 신청 가이드](https://www.idchowto.com/wp-content/uploads/2017/02/IWINV-리눅스_서버_왕초보_메뉴얼.pdf)
> [Yum - 위키백과](https://ko.wikipedia.org/wiki/Yum)  
> [[리눅스 서버 구축하기] 1. 기초 지식 알아보기](http://library.gabia.com/contents/infrahosting/3448)
