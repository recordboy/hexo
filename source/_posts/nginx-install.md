---
title: "Nginx 기본 세팅"
date: 2019-11-19 10:13:02
categories: [server, nginx]
tags: [nginx, linux]
thumbnail: "/gallery/thumbnail-nginx.png"
---

## Nginx 설치

```
# rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
# rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
# yum install nginx.x86_64
# systemctl start nginx
# systemctl enable nginx
```

<!-- more -->

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

# systemctl start php-fpm
# systemctl enable php-fpm
```

nginx.conf 파일찾기
```
# sudo find / -name nginx.conf
```

nginx.conf 수정하기
```
# vi /etc/nginx/nginx.conf
```

nginx 다시 로드 하기
```
# sudo service nginx reload
```
