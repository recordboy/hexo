---
title: "[Node.js] http 서버 생성"
date: 2020-08-04 10:15:25
categories: [node.js]
tags: [node.js]
# thumbnail: "/gallery/thumbnail-node.png"
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

Node.js 환경에서 간단한 http 서버를 만들어 보자.

> Node.js는 Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임(특정 언어로 만든 프로그램들을 실행할 수 있는 환경)이다. 기존의 자바스크립트는 웹 브라우저에서만 실행할 수 있었지만, Node.js를 사용하면 자바스크립트를 서버 환경에서도 사용할 수 았다.

노드 환경에서 서버를 만들려면 노드 기본 모듈인 `http`가 필요하다. 이 모듈은 말그대로 HTTP의 각종 기능을 가지고 있다. 모듈을 불러오고 아래 코드를 입력한다.

<!-- more -->

```javascript
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.write("<div>hello world</div>");
    res.end("<div>end</div>");
  })

  .listen(8080, () => {
    console.log("8080포트에서 서버 대기중");
  });
```

아래 명령어를 시용하여 서버를 구동시켜 보자.

```
$ node server
```

`8080포트에서 서버 대기중`이란 문구가 터미널에 출력되면 `http`서버가 정상 작동하는 것이다. [http://localhost:8080](http://localhost:8080/) 주소로 들어가보면 `hello world`를 확인할 수 있다.

* `http` 모듈의 `createServer`메서드로 서버 객체를 생성하였고 요청이 들어올 때 마다 매번 이 콜백함수가 실행된다. 콜백의 인수로 `res(request)`는 요청에 관한 정보들을, `res(respone)`은 응답에 관한 정보들을 담고있다.
* `res.writeHead` 메서드는 응답에 대한 정보를 기록하는 메서드이며, 첫번째 인수로 요청이 성공했다는 `200`을 넣어주고, 두번째 인수로 응답에 대한 정보인 형식(HTML)과 문자셋(utf-8)를 넣어준다. 이 정보가 기록되는 부분을 헤더(header) 라고 한다.
* `res.write` 메서드는 클라이언트로 보낼 데이터이며, 인수로 지정한 값이 바디 부분의 컨텐츠로 작성된다. 여러번 호출해서 데이터를 여러개 보낼 수 있다.
* `res.end` 메서드는 출력을 완료하는 메서드이며, 인수로 값을 지정하면 해당 인수의 값을 작성한 뒤 내용을 완료한다. 이 메서드로 인해 응답 처리는 종료되고, 그 요청의 처리가 종료된다.  `res.writeHead`, `res.write`, `res.end` 이 3개의 메서드로 클라이언트에 대한 응답 내용을 사용할 수 있다.
* `createServer` 메서드 뒤에 `listen` 메서드에 클라이언트에게 공개할 포트번호를 인수로 넣고 두번째 인자로 포트연결 완료 후 살행될 콜백 함수를 넣었다.

## References
> [Node.js 교과서](https://www.zerocho.com/books)  
> [[Node.js코드랩] 2.기본 모듈 http](https://jeonghwan-kim.github.io/series/2018/12/02/node-web-2_http.html)  
> [기본 스크립트와 http 객체](https://araikuma.tistory.com/453)
