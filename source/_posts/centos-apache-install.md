---
title: "CentOS7 Apache 설치"
date: 2019-10-25 09:50:30
categories: "centos"
tags: [linux, centos]
---

<!-- more -->

1. yum을 이용하여 apache를 설치한다.

```
# yum -y install httpd
```

<!-- more -->

2. apache 버전을 확인하여 설치가 제대로 되었는지 확인해 본다.  

```
# httpd -v

Server version: Apache/2.4.6 (CentOS)
Server built:   Aug  8 2019 11:41:18
```

3. apache 실행  
CentOS7부터 기존에 사용하단 service 명령이 실행되지 않을 수 있다. systemctl 명령어를 사용해준다.

```
# systemctl start httpd
```

4. 부팅될 때 마다 apache를 실행

```
# chkconfig httpd on
```

자신의 공인아이피로 들어가보면 apache 서버가 실행되어 있는 확인해 볼 수있다. 자신의 공인아이피를 확인하고 싶다면 curl를 확인해 볼 수 있다.

`# curl bot.whatismyipaddress.com`  
`# curl http://ipecho.net/plain`  
`# curl icanhazip.com`  
`# curl ipv4.icanhazip.com`  
`# curl ipv4.ipogre.com`

이제 구동된 서버에 간단한 html 문서를 띄워보자. 아래 경로로 들어간다.(설치된 Apache 버전마다 경로가 다를 수 있다.)

`/var/www/html/`

해당 디렉토리로 가서 index.html 파일을 만들어준다.

```
# touch index.html
```

vi 편집기를 실행하여 "hello world!"를 입력하고 ESC를 누른뒤 아래 명령어를 입력하여 저장하고 나온다.

```
# wq
```

공인아이피로 들어가 보면 "hello world!"가 제대로 출력되는 것을 확인할 수 있다.

apache를 재시작할일이 드물기 때문에 종종 명령어를 잃어버린다. 아래 명령어를 참고하도록 한다.

* Apache 버전 확인  
`# httpd -v`

* Apache 상태 확인  
`# systemctl status httpd`  
`# service httpd status`

* Apache 시작  
`# systemctl start httpd`  
`# service httpd start`  
`# apachectl start`

* Apache 중지  
`# systemctl stop httpd`  
`# service httpd stop`  
`# apachectl stop`

* Apache 재시작  
`# systemctl restart httpd`  
`# service httpd restart`  
`# apachectl restart`

### References
> [CentOS 아파치 설치](https://zetawiki.com/wiki/CentOS_아파치_설치)  
> [CentOS에서 apache 설치](https://toma0912.tistory.com/55)  
> [CentOS 아파치 상태/재시작/시작/중지 명령어](https://web-inf.tistory.com/16)
> [리눅스 공인 IP 확인](https://zetawiki.com/wiki/리눅스_공인_IP_확인)
