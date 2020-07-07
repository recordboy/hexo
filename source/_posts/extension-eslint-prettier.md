---
title: "리액트에 ESLint, Prettier 적용하기"
date: 2020-07-06 19:54:44
categories: [front-end, extension]
tags: [extension, eslint, prettier]
# thumbnail: "/gallery/thumbnail-js.png"
toc: true
---

리액트 개발을 하다 보면 문법 요류나 코드 정리로 인해 시간을 많이 소비한다. **ESLint**와 **Prettier**는 이러한 상황을 해결해 주는 도구들이며, VSCode와 연동해 사용이 가능하다. 이번 포스팅에서 설치와 초기 세팅 방법을 알아보도록 하겠다.

## ESLint
ESLint는 ES + Lint의 합성어로 ES는 EcmaScript를 의미하고 Lint는 보푸라기라는 뜻인데 프로그래밍에서는 에러가 있는 코드에 표시를 달아놓는 것을 의미한다. 즉 ESLint는 JavaScript의 스타일 가이드를 따르지 않거나 문제가 있는 안티 패턴들을 찾아주고 일관된 코드 스타일로 작성하도록 도와준다. 코딩 컨벤션 및 안티 패턴을 자동 검출 하므로 옮바른 코딩 습관을 위해 필히 사용할 것을 권장한다.

ESLint는 스타일 가이드를 편리하게 적용하기 위해 사용되기도 하는데, 많은 개발자가 사용중인 [Airbnb Style Guide](https://github.com/airbnb/javascript), [Google Style Guide](https://github.com/google/eslint-config-google)가 대표적인 예이다. 이 포스팅에서는 Airbnb Style Guide를 기본으로 ESLint를 설치하도록 하겠다.

## Prettier
Prettier는 기존의 코드에 적용되어있던 스타일들을 전부 무시하고, 정해진 규칙에 따라 자동으로 코드 스타일을 정리해 주는 도구이다. ESLint와 다른점이라면 ESLint는 문법 에러를 잡아내고, 특정 문법 요소를 쓰도록 만드는 등 코드 퀄리티와 관련된 것을 고치기 위해 사용되지만 Prettier는 코드 한 줄의 최대 길이나, 탭의 길이는 몇으로 할 것인지, 따옴표는 홀따옴표(')나 쌍따옴표(")중 무엇을 사용 할 것인지 등등 코드 퀄리티보단 코딩 스타일을 일괄적으로 통일하는 도구에 가깝다.

<!-- more -->

## ESLint와 Prettier 설치하기
* Node.js모듈 설치
* VSCode에서 ESLint, Prettier 익스텐션 설치

> ESLint, Prettier 익스텐션을 설치하는 이유는 ESLint와 Prettier를 VSCode와 연동하기 위해서 이다.

### ESLint 모듈 설치
작업할 디렉토리로 이동하고 아래 명령어를 입력하여 ESLint 모듈을 설치하도록 한다. 참고로 ESLint는 전역으로 설치할 수 있으나 권장되지는 않는다.

```
$ npm install eslint --save-dev
```

> 참고로 위 npm install 명령어의 --save-dev 옵션은 설치한 패키지 정보를 ./package.json 파일의 devDependencies 항목에 저장이 되며, npm install을 할 때 --production 옵션을 붙이면 해당 패키지를 제외하고 npm이 설치된다. 비슷한 옵션으로 --save가 있는데 이 옵션은 패키지 정보가 /package.json의 dependencies에 추가되며, npm install을 할 때 항상 설치가 된다. 아무 옵션을 넣지 않으면 순수하게 패키지만 설치된다.

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
> [27. 리액트 개발 할 때 사용하면 편리한 도구들 - Prettier, ESLint, Snippet](https://react.vlpt.us/basic/27-useful-tools.html)  
> [ESLint 조금 더 잘 활용하기](https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/)  
> [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)  
> [프론트엔드 개발환경의 이해: 린트](https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html)  
> [ESLint(TSLint)와 Prettier 함께 사용하기](https://pravusid.kr/javascript/2019/03/10/eslint-prettier.html)  
> [리액트 프로젝트에 ESLint 와 Prettier 끼얹기](https://velog.io/@velopert/eslint-and-prettier-in-react)  
> [ESLint](https://poiemaweb.com/eslint)  
> [ESLint](https://www.zerocho.com/category/JavaScript/post/583231719a87ec001834a0f2)  
> [eslint](https://www.npmjs.com/package/eslint)  
