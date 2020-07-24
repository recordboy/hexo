---
title: "ESLint, Prettier 적용하기"
date: 2020-07-06 19:54:44
categories: [front-end, extension]
tags: [extension, eslint, prettier]
# thumbnail: "/gallery/thumbnail-js.png"
toc: true
---

자바스크립트 개발을 하다 보면 문법 오류나 코드 정리로 인해 시간을 많이 소비한다. `ESLint`와 `Prettier`는 이러한 상황을 해결해 주는 도구들이며, VSCode, WebStorm, Atom 등 여러 에디터와 연동해 사용이 가능하다. 이번 포스팅에서는 두가지 도구를 간단히 살펴보고 리액트 프로젝트에 적용하는 방법을 알아보겠다. 에디터는 VSCode를 기준으로 하겠다.

<!-- more -->

## ESLint
ESLint는 ES + Lint의 합성어로 ES는 EcmaScript를 의미하고 Lint는 보푸라기라는 뜻인데 프로그래밍에서는 에러가 있는 코드에 표시를 달아놓는 것을 의미한다. 즉 ESLint는 JavaScript의 스타일 가이드를 따르지 않거나 문제가 있는 안티 패턴들을 찾아주고 일관된 코드 스타일로 작성하도록 도와준다. 코딩 컨벤션 및 안티 패턴을 자동 검출 하므로 옮바른 코딩 습관을 위해 필히 사용할 것을 권장한다.

ESLint는 스타일 가이드를 편리하게 적용하기 위해 사용되기도 하는데, 많은 개발자가 사용중인 [Airbnb Style Guide](https://github.com/airbnb/javascript), [Google Style Guide](https://github.com/google/eslint-config-google)가 대표적인 예이다. 이 포스팅에서는 `Airbnb Style Guide`를 사용하도록 하겠다.

### ESLint 살펴보기
ESLint가 어떻게 오류를 잡아주는지 예제를 통해 간단히 알아보자.

```
$ mkdir test
$ cd test
$ touch test.js
```

`test` 디렉토리를 만들고 `test.js` 파일을 생성하였다.

```javascript
var foo = text
```

세미콜론도 안닫혀 있고, 문자열에 따옴표도 없고, 변수에 값이 할당되어도 사용이 안되는 엉망인 코드를 작성하였다. 그냥 js 파일은 문법적 오류를 따로 잡아주지 않을 것이다. 이제 ESLint를 설치하도록 하겠다.

```
$ npm init -y
$ npm i -D eslint
```
NPM 프로젝트를 하나 생성하고 ESLint를 설치하도록 하겠다.

> **여기서 잠깐**
> * `npm init -y` 명령어에 `-y`는 `--yes`의 축약법으로 npm 프로젝트를 초기 세팅할 때 아무 질문 없이 기본값으로 프로젝트가 세팅된다. 비슷한 명령어로` --force(-f)`가 있다.
> * `npm i -D eslint` 명령어의 `-D`는 `--save-dev`의 축약법이다.
> * `--save-dev` 옵션은 설치한 패키지 정보를 `./package.json` 파일의 `devDependencies` 항목에 저장하며, npm install을 할 때 해당 패키지가 같이 설치되며, 설치할 때 `--production` 옵션을 붙이면 해당 패키지를 제외하고 npm이 설치된다. 비슷한 옵션으로 `--save`가 있는데 이 옵션은 설치한 패키지 정보가 `./package.json`의 `dependencies`에 추가되며, npm install을 할 때 해당 패키지는 항상 설치가 된다. 아무 옵션을 넣지 않으면 순수하게 `./node_modules`에 패키지만 설치한다.  

설치가 끝나면 ESLint 실행 파일이 `./node_modules` 디렉토리 안에 생성될 것이다. ESLint 설정 파일을 생성하기 위해 아래 명령어를 실행한다.

```
$ node_modules/.bin/eslint --init
```

실행하면 몇가지 질문들이 나온다. 본인의 프로젝트 상황에 맞게 답변을 하면 된다.

```
? How would you like to use ESLint?
    ❯ To check syntax and find problems
? What type of modules does your project use?
    ❯ None of these
? Which framework does your project use?
    ❯ None of these
? Does your project use TypeScript?
    ❯ No
? Where does your code run?
    ❯ browser
? What format do you want your config file to be in?
    ❯ JavaScript
```

*추후 추가 예정*

## Prettier
Prettier는 기존의 코드에 적용되어있던 스타일들을 전부 무시하고, 정해진 규칙에 따라 자동으로 코드 스타일을 정리해 주는 도구이다. ESLint와 다른점이라면 ESLint는 문법 에러를 잡아내고, 특정 문법 요소를 쓰도록 만드는 등 코드 퀄리티와 관련된 것을 고치기 위해 사용되지만 Prettier는 코드 한 줄의 최대 길이나, 탭의 길이는 몇으로 할 것인지, 따옴표는 홀따옴표(')나 쌍따옴표(")중 무엇을 사용 할 것인지 등등 코드 퀄리티보단 코딩 스타일을 일괄적으로 통일하는 도구에 가깝다.

## ESLint와 Prettier 설치하기
* Node.js모듈 설치
* VSCode에서 ESLint, Prettier 익스텐션 설치

> ESLint, Prettier 익스텐션을 설치하는 이유는 ESLint와 Prettier를 VSCode와 연동하기 위해서 이다.

### ESLint 모듈 설치
작업할 디렉토리로 이동하고 아래 명령어를 입력하여 ESLint 모듈을 설치하도록 한다. 참고로 ESLint는 전역으로 설치할 수 있으나 권장되지는 않는다.

```
$ npm i -D eslint
```


### Prettier 모듈 설치
Prettier 모듈도 같이 설치해 준다.

```
$ npm install prettier --save-dev --save-exact
```

> 위 ESLint 모듈을 설치할때와 다르게 --save-exact 옵션이 추가되었는데, Prettier에서는 이 옵션을 붙이는 것을 권장한다. 버전이 달라지면서 생길 스타일 변화를 막기 위해서라고 한다.

### 필요한 추가 모듈
Prettier와 ESLint를 같이 사용하려면 아래 모듈을 추가로 설치해 줘야 한다.

* **eslint-config-prettier**
ESLint의 formatting 관련 설정 중 Prettier와 충돌하는 부분을 비활성화 한다.
* **eslint-plugin-prettier**
Prettier를 ESLint 플러그인으로 추가한다. 즉, Prettier에서 인식하는 코드상의 포맷 오류를 ESLint 오류로 출력해준다.

아래 명령어를 입력하여 위에서 언급한 모듈을 설치한다.

```
$ npm install eslint-plugin-prettier eslint-config-prettier --save-dev
```

그리고 프로젝트의 루트 경로에 `.eslinrc.json`파일을 만들고 아래 내용을 추가한다.

*추후 추가 예정*

## References
> [VS Code에서 ESlint와 Prettier 함께 사용하기](https://feynubrick.github.io/2019/05/20/eslint-prettier.html)  
> [[자바스크립트] ESLint로 소스 코드의 문제 찾기](https://www.daleseo.com/js-eslint/)  
> [27. 리액트 개발 할 때 사용하면 편리한 도구들 - Prettier, ESLint, Snippet](https://react.vlpt.us/basic/27-useful-tools.html)  
> [ESLint 조금 더 잘 활용하기](https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/)  
> [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)  
> [프론트엔드 개발환경의 이해: 린트](https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html)  
> [ESLint(TSLint)와 Prettier 함께 사용하기](https://pravusid.kr/javascript/2019/03/10/eslint-prettier.html)  
> [리액트 프로젝트에 ESLint 와 Prettier 끼얹기](https://velog.io/@velopert/eslint-and-prettier-in-react)  
> [ESLint](https://poiemaweb.com/eslint)  
