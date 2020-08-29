---
title: "[React] 리액트 초기 세팅 및 컴포넌트"
date: 2020-03-06 19:55:52
categories: [front-end, react]
tags: [react, javascript]
thumbnail: "/gallery/thumbnail-react.png"
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

리액트는 제이쿼리처럼 단순히 `<script src="..."><script>`의 형태로 사용했던 것처럼 사용하지 않는다. 이렇게 하려면 가능은 하지만 굉장히 제한적이다. 리액트를 제대로 작업하려면 로컬에 Node, Npm, Webpack, Babel 등의 도구를 설치하여 프로젝트를 설정해주어야 한다. 리액트 프로젝트를 바닥부터 설정하는 것은 꽤나 복잡하지만, 페이스북에서 제공해주는 [create-react-app](https://github.com/facebook/create-react-app)도구 를 통하여 간단히 리액트 프로젝트를 준비할 수 있다.

<!-- more -->

## 프로젝트 시작하기

### 설치 환경
* node.js
* npm


### 전역에 create-react-app 설치
```
$ npm install -g create-react-app
```

### 프로젝트 생성
```
// 자바스크립트를 사용
$ create-react-app 프로젝트명 --use-npm
```
```
// 타입스크립트 사용
$ create-react-app 프로젝트명 --use-npm --template typescript
```

### 프로젝트 실행
해당 디렉토리로 이송해서 명령어를 실행하면 리액트 앱이 `localhost:3000`에 실행된다.

```
$ cd 프로젝트명
$ npm start
```

## 디렉토리 구조
기본적인 디렉토리 구조는 아래와 같다. 프로젝트마다 디렉토리 구조는 약간씩 다르기 때문에 정확히 어느 구조가 맞다고 정의하긴 힘들다.

```
└── project
    ├── build // npm run build 커맨드를 통해 생성된 react 배포 폴더
    │   └── static
    │       ├── css
    │       ├── js
    │       └── media
    ├── node_modules // npm install 을 통해 설치된 모듈들이 위치하는 폴더
    ├── public // 서버 root
    ├── src // components / containers / pages / store 등이 위치하는 폴더
    │   ├── components // 컴포넌트 파일들이 위치하는 폴더
    │   ├── containers // 컨테이너 파일들이 위치하는 폴더
    │   ├── pages // routing을 위한 페이지 파일들이 위치하는 폴더
    │   ├── store // redux 작업을 위한 폴더, 내부에 actions, reducers 폴더 존재
    │   └── ..
    └── package .. // version, dependencies, proxy 등의 정보가 들어있는 파일
```

## 컴포넌트 파일 살펴보기
`src` 폴더의 `App.js`파일을 열어본다.

```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;
```

`App.js`파일의 코드가 무엇을 의미하는지 위에서부터 알아보겠다.

```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';
```

`import`는 파일을 불러오겠다는 것이다. 첫번째 코드는 리액트와 그 내부의 `Component`를 불러온다. 파일에서 `JSX`를 사용하려면, 꼭 `React`를 `import`해주어야 한다. 그 아래에는 같은 디렉토리의 `logo.svg`와 `App.css`를 불러온다는 것이다.

### 함수를 이용한 컴포넌트 생성
```javascript
function App() {
  return (

    // 여기서부터 JSX
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    // 여기서까지 JSX

  );
}
```

`App`함수를 생성하여 컴포넌트를 만들었다. 리액트에서 컴포넌트를 만드는 방법은 두가지가 있으며 위처럼 함수를 이용하여 만드는 방법과, 클래스를 이용하여 만드는 방법이 있다. 함수형 컴포넌트와 클래스형 컴포넌트의 주요 차이점은 함수형 클래스는 state와 life cycle이 빠져있다는 점이다. 그래서 컴포넌트 초기 마운트가 아주 미세하게 빠르고, 메모리 자원을 덜 사용하지만 컴포넌트를 무수히 많이 랜더링하는게 아니라면 성능에 큰 차이는 없다. state와 life cycle는 추후에 알아보도록 하고, 지금부터는 클래스형 컴포넌트로 작성하도록 하겠다. 

### 클래스를 이용한 컴포넌트 생성
```javascript
class App extends Component {
  render() {
    return(

      // 여기서부터 JSX
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      // 여기서까지 JSX

    )
  }
}
```

클래스 형태로 만들어진 컴포넌트에는 꼭, `render`함수가 있어야 하며, 그 내부에서는 JSX를 리턴해줘야 한다. 위에 보이는 HTML같은 코드가 JSX이다. 또 하나, 클래스형 컴포넌트를 작성하기위해선 `import`에 아래처럼 `{ Component }`를 추가하여 작성해야 한다.

```javascript
import React, { Component } from 'react';
```

`App.js`의 마지막줄은 생성된 컴포넌트를 내보내고 있으며, 다른곳에서 사용할 수 있도록 해준다. 아래처럼 작성하면 된다.

```javascript
export default App;
```

이제 컴포넌트를 생성하고 내보냈으니, 이 컴포넌트를 불러오는 `index.js`파일을 열어보겠다.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

우리가 만든 컴포넌트를 아래처럼 `import`로 불러오고 있다.

```javascript
import App from './App';
```

받은 컴포넌트를 브라우저상에 보여주려면 `ReactDOM.render`함수를 사용한다. 첫번째 파라미터는 렌더링 할 결과물이고, 두번째 파라미터는 컴포넌트를 어떤 DOM에 그릴지 정해준다.

```javascript
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

위처럼 첫번째 파라미터로 랜더링할 컴포넌트를 받고 있으며(`<React.StrictMode>`는 리액트의 엄격한 모드이다.), 두번째 파라미터로 `document.getElementById('root')`를 받고있다. `id`가 `root`인 돔을 찾아 그리도록 설정이 되어있으며, 해당 DOM은 `public/index.html`파일 안의 `<div id="root"></div>`를 찾아서 랜더링을 하게 된다.

## References
> [누구든지 하는 리액트 2편: 리액트 프로젝트 시작하기](https://velopert.com/3621)  
> [[React] 프로젝트 디렉토리 구조 파악하기](https://uhou.tistory.com/168)
