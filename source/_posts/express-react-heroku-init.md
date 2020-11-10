---
title: "[Express] Express + React 연동 및 Heroku에 배포하기"
date: 2020-11-05 09:55:22
categories: [server, express]
tags: [express, react, heroku]
# thumbnail: "/gallery/thumbnail-react.png"
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

## 헤로쿠(Heroku)란?

헤로쿠(Heroku)는 서버 호스팅을 지원하는 클라우드 플랫폼이며, 무료로 서비스를 이용할 수 있는 장점이 있다. 단 무료버전의 경우 최대 5개의 어플리케이션만 올릴 수 있으며, 30분동안 요청이 없는 경우 사이트는 잠이 든다. 잠이 든 상태에서 다시 요청이 들어오면 깨어나지만, 10초 ~ 30초 가량의 시간이 걸린다는 단점이 있다. 간단한 토이 프로젝트나 포트폴리오용으로 적합하며, 파일 업로드는 Git을 이용하여 업로드할 수 있다.

이번 포스팅에서는 하나의 디렉토리에 클라이언트와 백앤드로 구성된 프로젝트를 세팅하여 헤로쿠에 배포하는 것까지 진행해 볼 것이다. 클라이언트는 리액트(React)로 구성하고 서버는 익스프레스(Express)로 구성한다.

보통 CRA(Create-React-App)로 리액트 프로젝트를 생성하면 자동으로 서버가 생성되기 때문에 로컬에서 바로 확인이 가능하다. 하지만 익스프레스로 구축한 서버에 리액트를 연동할 경우 두개의 서버(리액트 + 익스프레스)가 존재해 버린다. 로컬에서 작업할 때는 두개의 서버를 돌려 작업할것이며, 실제로 헤로쿠에 배포할 때는 익스프레스 서버에 리액트 빌드 파일을 배포하여 사용할 것이다.

> 리액트를 빌드하면 `build/` 디렉토리에는 웹팩과 바벨 등을 통해 빌드된 번들 등이 담기지만 CRA에서 제공하는 서버는 포함되지 않는다.

<!-- more -->

## 디렉토리 구조

프로젝트 기본 구조는 아래와 같다.

```
my-app/
├── clinet                  // 클라이언트(리액트) 영역
│   ├── build              // 배포 전용 파일
│   ├── node_modules
│   ├── public             // 정적 파일 리소스
│   ├── src                // 개발 전용 소스
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
│
├── node_modules
├── .gitignore
├── index.js               // 백앤드(익스프레스) 영역
├── package-lock.json
├── package.json
└── README.md
```

## 프로젝트 초기화 및 익스프레스 설치
### 프로젝트 초기화
프로젝트 디렉토리 생성 및 npm 초기화한다.

```
$ mkdir my-app
$ cd my-app 
$ npm init -y
```

<!-- more -->

### 익스프레스와 필요 모듈 설치
익스프레스 서버 생성 및 필요 모듈 추가한다.

```
$ npm install express nodemon concurrently
```

> express: 데이터와 통신할 서버로 사용할 것이다.
> nodemon: node.js를 이용하는 파일들은 수정을 해도 반영이 바로 안되고 서버를 재시작해줘야 반영이 되기 때문에 번거롭다. 노드몬은 코드가 수정될 경우 자동으로 서버를 재시작 해주기 때문에 편리하게 사용할 수 있다.
> concurrently: 리액트와 익스프레스를 동시 실행해주는 역할을 한다.

`index.js`파일을 생성하여 아래 내용 입력한다.

```javascript
// express 모듈 불러오기
const express = require('express');

// express 객체 생성
const app = express();

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 5000;
app.listen(port);

// 미들웨어 함수를 특정 경로에 등록
app.use('/api/data', function(req, res) {
    res.json({ greeting: 'Hello World' });
});

console.log(`server running at http ${port}`);
```

노드몬으로 서버 구동해보자.
```
$ nodemon server
```

[http://localhost:5000/api/data](http://localhost:5000/api/data)경로에 들어가 보면 `{"greeting":"Hello World"}`를 확인해 볼 수 있다.

### 헤로쿠 실행 스크립트 추가
헤로쿠 앱을 시작하려면 아래 명령어가 필요하다. `package.json`파일의 `script`에 하단 명령어를 추가해 준다.

```json
"scripts": {
  "start": "node index.js"
}
```

## 헤로쿠에 배포해보기

### 계정 생성 및 CLI 설치

[헤로쿠 홈페이지](https://heroku.com)로 들어가 회원가입을 하고 [이곳에서](https://devcenter.heroku.com/articles/heroku-cli) 헤로쿠 CLI를 설치한다. 설치가 완료되면 버전을 확인하여 헤로쿠 CLI가 제대로 설치되어 있는지 확인한다.

```
$ heroku -v
```

### Git 초기화
헤로쿠는 Git을 이용하여 업로드한다. 깃을 초기화 하고, 업로드 할 때 `node_modules`파일들을 무시하도록 `.gitignore` 파일을 추가한다. 다음에 첫번째 커밋을 해주자.

```
$ echo node_modules > .gitignore
$ git add .
$ git commit -m 'init commit'
```

### 헤로쿠 프로젝트 생성

아래 명령어를 사용하여 내가 만든 계정에 로그인을 해주자. 명령어 입력 후 아무키나 입력하면 새 브라우저 창이 열리며 내 헤로쿠 계정에 로그인할 수 있다.

```
$ heroku login
```

만약 새 브라우저 창에서 `IP address mismatch`라는 오류가 뜰 경우 아래 명령어를 이용하여 터미널에서 직접 로그인해준다.

```
$ heroku login -i
```

아래 명령어를 사용하여 내 헤로쿠 계정에 프로젝트를 생성한다. 프로젝트 이름은 url로 사용되기 때문에 다른 헤로쿠 사용자와 중복되면 안되며, `heroku create` 명령어만 사용할 경우 임의의 이름으로 설정된다. 이후 로컬과 헤로쿠 저장소가 제대로 연결이 되었는지 확인해 본다.

```
$ heroku create 프로젝트이름
$ git remote -v
```

헤로쿠에 배포해보자.

```
$ git push heroku master
```

시간이 약간 소요되며 `https://프로젝트이름.herokuapp.com/api/data`으로 들어가면 `{"greeting":"Hello World"}`를 확인해 볼 수 있다.

## 리액트 설치

익스프레스를 설치하였으니 이제 클라이언트 영역인 리액트를 생성하겠다. 이 포스팅에서는 `TypeScript`를 사용하겠다. `client`이란 폴더명으로 CRA를 실행한다.

```
$ npx create-react-app client --template typescript
```

조금 기다리면 리액트 앱이 생성될 것이다. `/client/src/` 경로의 `App.tsx`파일을 아래처럼 수정해준다.

```javascript
import React from 'react';

function App() {
  return (
    <div className="App">
      <button type="button" onClick={() => {
        fetch('http://localhost:5000/api/data')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
      }}>get data</button>
    </div>
  );
}

export default App;
```

수정하고 `client`디렉토리로 가서 리액트를 실행한다.

```
$ npm start
```

그럼 브라우저가 열리면서 [http://localhost:3000](http://localhost:3000)페이지가 나타난다. `get data`버튼을 누르면 브라우저의 콘솔창에 `http://localhost:5000/api/data`에서 가져온 JSON 데이터를 출력해야 되는데 아래와 같은 오류가 난다.

```
Access to fetch at 'http://localhost:5000/api/data' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

CORS(Cross-Origin Resource Sharing) 오류로써, 클라이언트와 서버의 포트가 다른 상태에서 클라이언트 측에서 서버 측으로 무언가를 요청했을 때 브라우저가 보안상의 이유로 요청을 차단하는 문제다. 여기서 설정한 리액트`(http://localhost:3000)`와 익스프레스`(http://localhost:5000)`는 각 다른 포트를 사용하고 있다. 이럴 경우 프록시 설정을 해줘야 한다.

## 프록시(Proxy) 설정
프록시란 사전적으로 대리, 대리인이라는 의미를 가지고 있으며, 프로토콜에 대한 대리 응답이라는 개념으로 보면 된다. 유저가 요청을 하는 경우 IP 주소가 전달되는데, 이를 프록시 서버가 임의로 IP 주소를 변경할 수 있다. 즉, 유저의 실제 IP를 알 수 없도록 하는 것이 프록시 서버의 역할이다. `http-proxy-middleware` 모듈을 설치하여 프록시를 설정할 수 있다. 

`client` 디렉토리에서 아래 명령어로 설치해 준다.

```
$ npm install http-proxy-middleware
```

다음에 `/client/src/` 디렉토리로 가서 `setupProxy.js` 파일을 생성하고 아래 코드를 입력해준다.

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/data",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
```

`http-proxy-middleware`모듈은 앱이 실행될 때 `src` 디렉토리에서 `setupProxy.js`파일을 찾은 뒤 이 파일의 설정을 참고하여 프록시를 설정해 준다. `/api/data`라는 경로로 요청이 들어올 경우 `localhost:5000`서버를 이용하도록 설정했다. 다시 `App.tsx`파일을 아래처럼 수정해준다.

```javascript
import React from 'react';

function App() {
  return (
    <div className="App">
      <button type="button" onClick={() => {
        fetch('/api/data')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
      }}>get data</button>
    </div>
  );
}

export default App;
```

리액트를 재시작 하여 `get data`버튼을 클릭하면 콘솔창에 `{"greeting":"Hello World"}` 데이터가 정상적으로 출력되는 것을 확인할 수 있다.

## 서버 동시 시작

익스프레스와 리액트, 프록시 설정까지 마쳤다. 이제 이 두개의 서버를 동시에 시작해야하는데, 처음에 설치했던 `concurrently`모듈을 이용하면 된다. 루트 디렉토리의 `package.json`파일의 `script`에 아래 부분을 추가한다.

```json
"scripts": {
  "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
  "dev:server": "npm start",
  "dev:client": "cd client && npm start"
}
```

기존의 실행되있던 서버를 모두 종료 후 아래 명령어를 실행해보면 두개의 서버가 동시에 실행된다.

```
$ npm run dev
```

## 빌드 빛 배포하기

`client` 디렉토리로 가서 빌드를 해보자

```
$ npm run build
```

빌드가 완료되면 `build` 디렉토리가 생성되며 안에는 배포용 파일들이 들어있다. 이 정적 파일들이 헤로쿠에서 클라이언트 영역으로 사용되며, 서버는 익스프레스만 구동된다. 따라서 정적 파일에 접근할 수 있도록 Route 설정이 필요하다. `index.js` 파일을 아래 코드처럼 수정한다.

```javascript
// express 모듈 불러오기
const express = require('express');

// express 객체 생성
const app = express();

// path 모듈 불러오기
const path = require('path');

// 미들웨어 함수를 특정 경로에 등록
app.use('/api/data', function(req, res) {
    res.json({ greeting: 'Hello World' });
});

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 5000;
app.listen(port);

// 리액트 정적 파일 제공
app.use(express.static(path.join(__dirname, 'client/build')));

// 라우트 설정
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

console.log(`server running at http ${port}`);
```

코드를 수정했으면 다시 루트 디렉토리의 `package.json`파일의 `script`에 아래 부분을 추가한다.

```json
"scripts": {
  "heroku-postbuild": "cd client && npm install && npm run build"
}
```

이제 헤로쿠에 푸쉬해주자.

```
$ git add .
$ git commit -m 'build'
$ git push heroku master
```

배포가 완료되고 해당 주소로 들어가 배포가 잘 되었는지 확인해 본다.

## References
> [Deploy React and Express to Heroku) 배포](https://daveceddia.com/deploy-react-express-app-heroku/)  
> [Express 서버와 React: Proxy 활용과 빌드 및 헤로쿠(Heroku) 배포](https://chaewonkong.github.io/posts/express-with-react.html)  
> [[React.js] 프록시(Proxy) 설정을 통해 CORS 이슈를 해결해보자!](https://cbw1030.tistory.com/267)
