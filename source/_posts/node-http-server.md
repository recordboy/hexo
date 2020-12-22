---
title: "[Node.js] http 서버 만들기"
date: 2020-08-04 10:15:25
categories: [node.js]
tags: [node.js]
# thumbnail: "/gallery/thumbnail-node.png"
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

Node.js 환경에서 간단한 http 서버를 만들어 보자.

> Node.js는 Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임(특정 언어로 만든 프로그램들을 실행할 수 있는 환경)이다. 기존의 자바스크립트는 웹 브라우저에서만 실행할 수 있었지만, Node.js를 사용하면 자바스크립트를 서버 환경에서도 사용할 수 았다.

노드 환경에서 서버를 만들려면 노드 기본 모듈인 `http`가 필요하다. 이 모듈은 말그대로 HTTP의 각종 기능을 가지고 있다. 모듈을 불러오고 아래 코드를 입력한다.

<!-- more -->

## HTTP 모듈 생성

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
* `res.writeHead` 메서드는 응답에 대한 정보를 기록하는 메서드이며, 첫번째 인수로 요청이 성공했다는 **상태 코드** `200`을 넣어주고, 두번째 인수로 응답에 대한 정보인 형식(HTML)과 문자셋(utf-8)를 넣어준다. 이 정보가 기록되는 부분을 헤더(header) 라고 한다.

  > ### **상태 코드**
  > `res.writeHead` 메서드의 첫번째 인수로 넣어주는 200이나 500과 같은 숫자는 응답 상태를 나타내는 값으로서 브라우저는 상태 코드를 보고 요청이 성공/실패했는지 판단한다.
  > * **2XX**: 성공을 알리는 상태코드며, 대표적으로 아래가 있다.
  >   * 200(성공)
  >   * 201(작성됨)
  > * **3XX**: 리다이렉션(다른 페이지로 아동)을 알리는 상태코드로 넘겨받은 URL을 브라우저가 열려고 하면 다른 URL로 갈 때 이 코드가 사용된다. 대표적으로 아래가 있다.
  >   * 301(영구 이동)
  >   * 302(임시 이동)
  >   * 302(수정되지 않음, 요청의 응답으로 캐시를 사용했음)
  > * **4XX**: 요청 오류를 알리는 코드로서 요청 자체에 오류가 있을 때 표시된다. 대표적으로 아래가 있다.
  >   * 400(잘못된 요청)
  >   * 401(권한 없음)
  >   * 403(금지됨)
  >   * 404(찾을 수 없음)
  > * **5XX**: 서버 오류를 나타내며, 요청은 제대로 왔지만 서버에 오류가 있을 때 발생한다. 이 오류는 `res.writeHead`에서 직접 보내는 경우는 거의 없고, 예기치 못한 에러가 발생 시 서버가 알아서 5XX대 코드를 보낸다. 대표적으로 아래가 있다.
  >   * 500(내부 서버 오류)
  >   * 502(불량 게이트웨이)
  >   * 503(서비스를 사용할 수 없음)

* `res.write` 메서드는 클라이언트로 보낼 데이터이며, 인수로 지정한 값이 바디 부분의 컨텐츠로 작성된다. 여러번 호출해서 데이터를 여러개 보낼 수 있다.
* `res.end` 메서드는 출력을 완료하는 메서드이며, 인수로 값을 지정하면 해당 인수의 값을 작성한 뒤 내용을 완료한다. 이 메서드로 인해 응답 처리는 종료되고, 그 요청의 처리가 종료된다.  `res.writeHead`, `res.write`, `res.end` 이 3개의 메서드로 클라이언트에 대한 응답 내용을 사용할 수 있다.
* `createServer` 메서드 뒤에 `listen` 메서드에 클라이언트에게 공개할 포트번호를 인수로 넣고 두번째 인자로 포트연결 완료 후 살행될 콜백 함수를 넣었다.

## HTML 불러오기
`res.write`나 `res.end`에 HTML 코드를 일일히 작성하는 것은 비효율적이므로 미리 HTML 파일을 만들고 `fs` 모듈로 파일을 읽어 전송할 수 있다. 간단한 HTML 코드를 작성하고 `index.html` 파일로 루트경로에 저장한다,

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>title</title>
</head>
<body>
    <div>contents</div>
</body>
</html>
```

```javascript
const http = require("http");

// fs 모듈 로드
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {

    // 통신 성공 시
    try {
        
      // fs 모듈로 index.html 로드
      const data = await fs.readFile("./index.html");
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });

      // html 응답
      res.end(data);

    // 에러 발생 시
    } catch (err) {
      console.error(err);
      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8",
      });

      // 에러 메세지 응답
      res.end(err.message);
    }
  })

  .listen(8080, () => {
    console.log("8080포트에서 서버 대기중");
  });
```

요청이 들어오면 `fs` 모듈로 HTML 파일을 읽어 클라이언트의 응답 값으로 보낼 수 있다.

## 라우팅
라우팅이란 특정한 URL에 대해 특정한 화면으로 연결하는 역할이라 정의할 수 있다. 주소가 `http://localhost:8080/index.html`면 `index.html` 화면을 보여주고 `http://localhost:8080/about.html`면 `about.html` 화면을 보여주는 역할이라 보면 된다. 간단히 라우팅을 구현해 보겠다. `index.html` 파일을 아래와 같이 수정해 주고, `about.html` 파일도 새롭게 추가해 준다. 

**index.html**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>title</title>
</head>
<body>
    <nav>
      <a href="/">home</a>
      <a href="/about">about</a>
    </nav>
    <div>메인 페이지</div>
</body>
</html>
```

**about.html**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>title</title>
</head>
<body>
    <nav>
      <a href="/">home</a>
      <a href="/about">about</a>
    </nav>
    <div>소개 페이지</div>
</body>
</html>
```

`server.js` 파일은 아래와 같이 수정해 준다.

```javascript
const http = require("http");

// fs 모듈 로드
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {

    // 통신 성공 시
    try {
      if (req.url === "/") {

        // index.html 로드
        const data = await fs.readFile("./index.html");
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
        });
        res.end(data);
      } else if (req.url === "/about") {

        // about.html 로드
        const data = await fs.readFile("./about.html");
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
        });
        res.end(data);
      }

    // 에러 발생 시
    } catch (err) {
      console.error(err);
      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8",
      });

      // 에러 메세지 응답
      res.end(err.message);
    }
    
  })

  .listen(8080, () => {
    console.log("8080포트에서 서버 대기중");
  });
```

특정 링크를 클릭하면 지정한 화면으로 이동하는 것을 확인할 수 있다.

## References
> [Node.js 교과서](https://www.zerocho.com/books)  
> [[Node.js코드랩] 2.기본 모듈 http](https://jeonghwan-kim.github.io/series/2018/12/02/node-web-2_http.html)  
> [기본 스크립트와 http 객체](https://araikuma.tistory.com/453)

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
