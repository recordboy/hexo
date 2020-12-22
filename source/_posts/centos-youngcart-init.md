---
title: "[CentOS] CentOS7 영카트 설치 및 초기 세팅"
date: 2019-12-10 10:33:20
categories: [server, centos]
tags: [linux, centos, nginx, youngcart5]
# thumbnail: "/gallery/thumbnail-centos.png"
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

## 초기 설치 환경
* CentOS 7

<!-- more -->

## 사용자 설정

로그인
```
login as: root
password: 최초 세팅된 PW 입력
```

새 PW 입력
```
# passwd
```

webapp 계정 생성 및 새 PW 입력
```
# useradd '새 계정 ID'
# passwd '새 계정 ID'
```

ssh root 접속 제한 위해 sshd_config 실행
```
# vi /etc/ssh/sshd_config
# PermitRootLogin yes 에서 no 로 변경 후 저장
```

ssh 재시작
```
# systemctl restart sshd
```

root ssh 접속 되는지 확인 후 webapp으로 접속 후 root로 변경
```
# su root
```

## Nginx 설치

패키기 업그레이드
```
# rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
# rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

Nginx 설치
```
# yum install nginx.x86_64
```

Nginx 활성화
```
# systemctl start nginx
# systemctl enable nginx
```

본인 ip주소로 들어가 CentOS 화면이 출력되면 성공

## MySQL 설치

wget 설치
```
# yum install wget
```

MySQL 다운로드
```
# wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
```

MySQL 5.7 설치
```
# sudo rpm -ivh mysql57-community-release-el7-11.noarch.rpm
```

MySQL 5.7 서버 설치
```
# sudo yum install mysql-server
```

MySQL 5.7 데몬 시작
```
# sudo systemctl start mysqld
```

## 비밀번호 설정

MySQL 접속
```
# mysql -u root -p
```

패스워드 변경  
**(중요! MySQL 5.7 이후부터 대문자, 숫자, 특수문자 포함된 12자리 이상의 패스워드만 통과한다.)**
```
# UPDATE mysql.user SET authentication_string = PASSWORD('패스워드 입력') WHERE User = 'root' AND Host = 'localhost';
# FLUSH PRIVILEGES;
# exit
```

만약 로그인이 제대로 되지 않는 경우
```
# systemctl stop mysqld
# systemctl set-environment MYSQLD_OPTS="--skip-grant-tables"
# systemctl start mysqld
# mysql -u root // root 계정 비번 없이 접속 가능
# UPDATE mysql.user SET authentication_string = PASSWORD('여기에 새로운 비밀번호 입력') WHERE User = 'root' AND Host = 'localhost';
# FLUSH PRIVILEGES;
# exit
```

아래와 같은 오류가 뜰 경우  
`You must reset your password using ALTER USER statement before executing this statement.`

ALTER USER 문을 사용하여 비밀번호 재설정
```
# ALTER USER 'root'@'localhost' IDENTIFIED BY '여기에 새로운 비밀번호 입력';
```

비밀번호 validation이 까다로우니, 이것을 없애기 위한 설정
```
# mysql -u root -p
# uninstall plugin validate_password;
```

## 데이터베이스 생성

```
# create database DB 이름;
```

데이터베이스 확인
```
# show databases;
```

## 사용자 추가 & 권한 부여(root 로 mysql 접속 후 작업)

localhost 로만 접근 가능한 계정 생성(외부에서 워크벤치 등으로 접근 안됨)
```
# create user '새로 만들 사용자 ID'@'localhost' identified by '새로운 사용자의 비밀번호'; 
```

외부에서 워크벤치 등으로 접근 가능한 계정 생성
```
# create user '새로 만들 사용자 ID'@'%' identified by '새로운 사용자의 비밀번호';
```

해당 계정에 해당 데이터베이스의 모든 권한 부여
```
# grant all privileges on 'DB 이름'.* to '사용자 ID'@'%';
```

해당 계정에 데이터베이스의 모든 권한 부여
```
# grant all privileges on *.* to '사용자 ID'@'%';
```

해당 계정에 데이터베이스의 모든 권한 부여하고 비번 변경
```
# grant all privileges on *.* to '사용자 ID'@'%' identified by '새로운 비밀번호';
```

적용후에는 아래 명령어를 꼭 실행 해줘야 한다.
```
# FLUSH PRIVILEGES;
```

## 외부 접속 설정 (firewall)

```
# yum install firewalld
# systemctl start firewalld
# systemctl enable firewalld
```

서비스 재구동시에는 `# firewall-cmd --reload` 명령 사용
`public`은 `zone` 이름이며, 클라우드 시스템처럼 `zone` 형태로 방화벽 포트들을 관리할수 있음
```
# firewall-cmd  --permanent  --zone=public --add-port=3306/tcp
```

포트를 범위로 지정하기
```
# firewall-cmd --permanent --zone=public --add-port=5000-5100/tcp
```

포트 삭제
```
# firewall-cmd --permanent --zone=public --remove-port=3306/tcp
```

모든 접속을 허용하고 싶을때(방화벽을 내리지 않고, zone을 trusted로 변경)
```
# firewall-cmd --set-default-zone=trusted
```

## PHP 설치

```
# yum install yum-plugin-replace
# yum install mod_php71w php71w-common
# yum install php71w-gd
# yum install php71w-fpm
# yum install php71w-opcache
# yum install php71w-cli
# yum install php71w-mysqlnd
# yum install php71w-xml
# yum install php71w-mbstring

# sed -i 's/;date.timezone =/date.timezone = Asia\/Seoul/g' /etc/php.ini

# yum install -y make automake gcc gcc-c++ kernel-devel openssl-devel php php-devel php-pear bzip2-devel libvpx-devel yum-utils bison re2c libmcrypt-devel libpqxx-devel libxslt-devel pcre-devel libcurl-devel libgsasl-devel openldap-devel libmemcached-devel libjpeg-devel libpng-devel readline-devel
```

PHP 활성화
```
# systemctl start php-fpm
# systemctl enable php-fpm
```

`vi /etc/php-fpm.d/www.conf`로 들어가서 `group = apache`를 `group = webapp`으로 변경, `user = apache`도 `user = webapp` 로 변경 필수  
하드웨어 사양에 따라 pm 관련 세팅

## 환경 설정

nginx conf 파일 세팅
```
# vi /etc/nginx/conf.d/www.domain.co.kr.conf
```

아래와 동일하게 수정한 뒤 `server_name` 을 본인 IP에 맞게 입력 하고 저장
```
server {
    listen      80;
    server_name 00.000.000.000;
    access_log  /var/log/nginx/$host.access.log main;
    error_log   /var/log/nginx/$host.error.log;
    root        /data/web_htdocs;

    index       index.php;
    client_max_body_size    200M;

    sendfile on;
    # Deny dotfiles (**/.*)
    location ~ /\.  {
        deny all;
    }

    # Deny .php (**/*.php)
    location ~ \.php$ {
        rewrite ^.* /index.php;
    }
location / {
                index index.php index.html index.htm;
                try_files $uri $uri/ /index.php?$query_string;

                error_page 404               /404.html;
                error_page 500 502 503 504   /50x.html;
                location = /50x.html {
                    root   /data/web_htdocs;
                }
                location ~ \.php$ {
                        root    /data/web_htdocs;
                        try_files $uri = 404;
                        fastcgi_pass 127.0.0.1:9000;
                        fastcgi_index index.php;
                        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                        fastcgi_param SCRIPT_NAME $fastcgi_script_name;
                        fastcgi_buffer_size 128k;
                        fastcgi_buffers 256 16k;
                        fastcgi_busy_buffers_size 256k;
                        fastcgi_temp_file_write_size 256k;
                        include fastcgi_params;

                }

                location ~ /\.ht {
                    deny all;
                }

        }

}
```

디렉토리 세팅 및 권한 설정을 위해 `data` 및 `web_htdocs` 폴더를 만들어 준다.
```
# mkdir /data
# mkdir /data/web_htdocs
```

`data`폴더의 파일 권한과 소유권을 변경해준다.
```
# chmod -R 777 /data
# chown -R webapp:webapp /data
```

FTP로 youngcart5.tar.gz를 /data/web_htdocs에 업로드 후 압축을 푼다.
```
# cd /data/web_htdocs
# tar xvfz youngcart5.tar.gz
# systemctl restart nginx
```

본인 아이피주소로 들어가 사용자 정보를 입력하면 자동으로 설치가 완료된다.

## References
> [MySQL 5.7 세팅 (CentOS7)](https://mosei.tistory.com/entry/MySQL-57-세팅-CentOS7)

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
