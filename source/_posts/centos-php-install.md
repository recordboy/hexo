---
title: "[CentOS] CentOS7 PHP 설치"
date: 2019-10-24 09:47:28
categories: [server, centos]
tags: [linux, centos, php]
thumbnail: "/gallery/thumbnail-centos.png"
toc: true
---

## 설치환경

* CentOS 7.2
* Extra Packages for Enterprise Linux (EPEL) repository

> **CentOS**  
> * CentOS는 리눅스(Linux) 계열의 배포판 버전, 리눅스 계열중에서도 레드햇(RedHat)계열이다.
> * 국내에서 웹 서버로 많이 사용하는 배포판이 센토스(Centos)와 우분투(Ubuntu)이다.

> **Extra Packages for Enterprise Linux (EPEL) repository**  
> * EPEL (Extra Packages for Enterprise Linux) 은 Fedora Project 에서 제공되는 저장소로 각종 패키지의 최신 버전을 제공하는 community 기반의 저장소이다.

<!-- more -->

## wget 설치
인터넷에 있는 PHP압축파일을 설치하기 위해선 wget을 설치해야 한다. wget은 인터넷 파일을 다운받는 명령어로서 리눅스 최소 설치 시에는 wget을 따로 설치해야 한다. 아래 Yum 명령어를 이용하여 설치해 준다.

> **[Yum](https://ko.wikipedia.org/wiki/Yum)**  
> * Yellow dog Updater, Modified의 약자로 RPM 기반의 시스템을 위한 자동 업데이터 겸 패키지 설치/제거 도구이다.
> * 이전에는 rpm으로 설치하였지만 Yum은 의존성을 고려하여 의존성 패키지까지 자동으로 설치된다.

```
# yum install wget
```

wget를 입력하였을 때 아래처럼 출력된다면 제대로 설치가 된 것이다.

```
wget: missing URL
Usage: wget [OPTION]... [URL]...

Try `wget --help' for more options.
```

1. remi repository를 yum 에 추가 한다.

```
# wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
# rpm -Uvh epel-release-latest-7.noarch.rpm
# wget http://rpms.remirepo.net/enterprise/remi-release-7.rpm
# rpm -Uvh remi-release-7.rpm
# yum install -y yum-utils
# yum-config-manager --enable remi-php72
```

2. 기존의 설치된 PHP 패키지를 확인하여 잘못된 패키지가 삭제되지 않도록 한다.

```
# yum list installed | cut -d " " -f 1 | grep php
```

3. 기존 설치된 PHP를 제거한다.

```
# yum remove -y `yum list installed | cut -d " " -f 1  | grep php`
```

4. php 패키지 설치한다. php-common 외의 패키지는 자신의 상황에 맞게 조정해서 설치한다.

```
# yum install -y php-common php-fpm php-cli \
    php-process \
    php-opcache php-pecl-apcu \
    php-mysqlnd php-pdo \
    php-gd \
    php-mbstring php-xml \
    php-pecl-zip \
    php-bcmath
```

> "php-common" 대신 "php72w-common"과 같이 PHP 버전을 지정한 패키지를 사용해도 된다. 항상 최신 버전을 사용할 것이 아니라 특정 버전대를 사용해야 한다면 이 방법을 사용하자. 향후 PHP가 버전업되면 운영중인 프로그램과의 호환에 문제가 발생할 수 있으므로 이 방법이 더 안전하다. 단, 메이저 버전업시 기존 패키지를 지우고 설치하는 방법을 사용해야 하므로 불편하다.

기존에 yum으로 설치된 PHP가 존재하고 해당 패키지의 이름이 "php-"로 시작한다면 기존 패키지를 지우고 재설치하는 것보다 아래처럼 그냥 update 받는 방법도 있다.

```
# yum update php-*
```

5. 설치된 php 버전을 확인해 본다.

```
# php -v

PHP 7.2.24 (cli) (built: Oct 22 2019 11:15:01) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.2.24, Copyright (c) 1999-2018, by Zend Technologies
```

## References
> [PHP 7.2 설치(업그레이드) [CentOS 7 / remi RPM repository]](https://blog.asamaru.net/2018/02/14/install-php-7-2-on-centos-with-remi-rpm-repository)  
> [RHEL/CentOS 5,6,7 에 EPEL 과 Remi/WebTatic Repository 설치하기](https://www.lesstif.com/pages/viewpage.action?pageId=6979743)  
> [YUM 명령어와 epel 저장소 추가하는 방법](https://mainia.tistory.com/5614)
