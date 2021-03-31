---
title: "[Network] REST(Representational State Transfer)"
date: 2020-12-10 16:53:10
categories: [network]
tags: [network, rest, restfull]
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

## REST
REST는 웹에서 데이터를 전송하고 처리하는 방법을 정의한 인터페이스를 말하며, 모든 데이터 구조와 처리 방식은 REST에서 URL을 통해 정의된다. 때문에 매우 직관적이고 이해하기 쉬우며 사용자에게 더 쉽게 서비스를 제공할 수 있다.

<!-- more -->

## RESTfull
RESTfull API라고도 하며, HTTP 프로트콜과 REST의 원칙을 사용하여 구현된 웹 서비스이다. 리소스(Resource)는 모든 인터넷 환경에서 사용이 가능한 표준화 된 형식(일반적으로 XML 또는 JSON)으로 표현된다.

## REST 중심 규칙
### URL는 정보의 자원을 표현해야 한다
URL은 의미를 명확히 전달하기 위해 명사로 구성한다. 예를 들어 요청 URL이 `/user`면 사용자 정보에 관한 요청이며, `/post`라면 게시글에 관한 요청하는 것으로 추측이 가능하다. 

### 자원에 대한 행위는 HTTP Method로 표현한다
REST에선 HTTP Method를 사용하며 주요 메서드는 아래와 같다.

#### HTTP Method

* GET(자원 정보 조회): 서버의 자원을 가져올 때 사용한다. 요청의 본문에 데이터를 넣지 않으며 **쿼리스트링**을 사용하여 서버에 데이터를 보낸다. 또한 GET 메서드는 브라우저에서 캐싱(기억)할 수도 있다.

  > **쿼리스트링**
  > URL에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말한다.
  > * 정해진 주소 이후에 `?`를 쓰는것으로 쿼리스트링 시작을 의미한다.
  > * 형태는 `parameter=value`이며 `=`로 파라미터와 값이 구분되며 파라미터가 여러개의 경우 `&`를 붙여 각 값을 구분한다.
  > * 예시: https://recordboy.github.io/?파라미터=값&파라미터=값

* POST(자원 생성): 서버에 자원을 새로 등록할 때 사용된다. 요청의 본문에 새로 등록할 데이터를 넣어 보낸다.
* PUT(자원 업데이트): 서버의 자원을 요청에 있는 자원으로 치환할 때 보낸다. 요청의 본문에 치환할 데이터를 넣어 보낸다.
* PATCH(자원 일부 업데이트): PUT이 자원 전체를 업데이트한다면 PATCH는 자원 일부를 수정할 때 사용한다. 요청의 본문에 수정할 데이터를 넣어 보낸다.
* DELETE(자원 삭제): 자원을 삭제할 때 사용되며, 요청의 본문에 데이터를 넣지 않는다.
* OPTIONS(옵션 설명): 요청을 하기 전에 통신 옵션을 설명하기 위해 사용된다.

## REST 구성 요소

| 구성 요소 | 내용 | 표현 방법 |
| --- | --- | --- |
| Resource | 자원 | HTTP URI |
| Verb | 자원에 대한 행위	| HTTP Method |
| Representations | 자원에 대한 행위의 내용	| HTTP Message Pay Load |

## REST 특징
### 클라이언트/서버 구조(Client - Server)
자원이 있는 서버와 자원을 요청하는 클라이언트의 구조를 가진다. REST 서버는 클라이언트에게 API만 제공, 클라이언트는 사용자 인증이나 컨텍스트(세션, 로그인 정보)등을 직접 관리하는 구조로 각각의 역할이 확실하게 구분되어 일관적인 인터페이스로 분리되고 작동할 수 있게 한다.

### 무상태성(Stateless)
HTTP는 무상태 프로토콜 이므로 REST 역시 무상태성을 가진다. 다시 말해 작업을 위한 상태 정보를 따로 저장하고 관리하지 않는다. 세션이나 쿠키를 별도로 저장, 관리하지 않기 때문에 API 서버는 들어오는 요청만 단순히 처리하면 된다. 그래서 서비스의 자유도가 높아지며, 불편한 정보를 관리하지 않음으로써 구현이 단순해진다.

### 캐시 처리 가능(Cachealble)
REST에서는 웹 표준 HTTP 프로토콜을 그대로 사용하므로, 웹의 기존의 인프라를 그대로 활용 가능하다. 때문에 REST에서도 캐싱 기능을 사용할 수 있다.

### 계층화(Layered System)
REST 서버는 다중 계층으로 구성될 수 있으며 보안, 로드 밸런싱, 암호화 계층을 추가해 구조를 변경할 수 있다. 또한 Proxy, Gateway와 같은 네트워크 기반의 중간매체를 사용할 수 있다. 하지만 클라이언트는 서버와 직접 통신하는지 중간 서버와 통신하는지 알 수 없다.

### 자체 표현 구조(Self-descriptiveness)
REST는 JSON 메세지 포멧을 이용하여 직관적으로 이해할 수 있고, 그 요청이 어떤 행위를 하는지 쉽게 알수 있는 자체 표현 구조로 되어있다.
> JSON은 하나의 옵션일뿐, 메시지 포맷을 꼭 JSON으로 적용해야할 필요는 없다.

### 유니폼 인터페이스(Uniform Interface)
URL에 대한 요청을 통일되고 한정적으로 수행하는 이키텍쳐 스타일을 의미하며, HTTP 표준에만 따른다면 모든 플랫폼에서 사용이 가능하다.

## REST 장점
### 쉬운 사용
HTTP 프로토콜 인프라를 그대로 사용하므로 REST API 사용을 위한 별도의 인프라를 구축할 필요가 없다.

### 클라이언트와 서버의 명확한 역할 분리
클라이언트는 REST API만을 통해 서버와 정보를 주고받는다. 때문에 REST의 무상태성에 따라 사용자의 컨텍스트를 따로 관리할 필요가 없다.

### 특정 데이터 표현 사용가능
REST는 헤더 부분에 URL 처리 메서드를 명시하고 실제 필요한 데이터는 BODY에 표현할 수 있도록 분리하여 JSON , XML 등 원하는 언어로 사용이 가능하다.

## REST 단점
### 메서드의 한계
REST API는 HTTP 메서드를 이용하여 URI를 표현하기 때문에 쉬운 사용이 가능한 장점이 있지만 반대로 메서드 형태가 제한적이라는 단점이 있다.

### 표준이 없음
REST는 설계 가이드일 뿐 표준이 아니며 명확한 표준이 없다.

## References
> [REST](http://www.incodom.kr/REST)  
> [Node.js 교과서](https://www.zerocho.com/books)  
> [REST란](https://medium.com/@hckcksrl/rest란-c602c3324196)  
> [REST API의 이해와 설계-#1 개념 소개](https://bcho.tistory.com/953)  
> [[Server] Restful API란?](https://mangkyu.tistory.com/46)  
> [REST 아키텍처를 훌륭하게 적용하기 위한 몇 가지 디자인 팁](https://spoqa.github.io/2012/02/27/rest-introduction.html)

