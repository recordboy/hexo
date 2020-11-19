---
title: "[Linux] 리눅스 MySQL 시작, 정지, 재시작, 상태확인"
date: 2019-12-12 10:43:21
categories: [server, mysql]
tags: [linux, mysql]
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

리눅스 MySQL 시작, 정지, 재시작, 상태확인

| 작업 | 우분투 명령어 | CentOS6 명령어 | CentOS7 명령어 |
|:---|:----|:---|:---|
| 시작 | # service mysql start | # service mysqld start | # systemctl start mysqld |
| 정지 | # service mysql stop | # service mysqld stop | # systemctl stop mysqld |
| 재시작 | # service mysql restart | # service mysqld restart | # systemctl restart mysqld |
| 상태확인 | # service mysql status | # service mysqld status | # systemctl status mysqld |

## References
> [리눅스 MySQL 시작, 정지, 재시작, 상태확인](http://blog.naver.com/PostView.nhn?blogId=hailey_jo&logNo=221371629870&parentCategoryNo=&categoryNo=8&viewDate=&isShowPopularPosts=true&from=search)
