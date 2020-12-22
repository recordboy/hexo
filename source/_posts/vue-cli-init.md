---
title: "[Vue] Vue Cli 초기 세팅"
date: 2019-11-01 10:05:51
categories: [front-end, vue.js]
tags: [vue.js]
# thumbnail: "/gallery/thumbnail-vue.png"
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

## Vue CLI
Vue CLI는 Vue 프로젝트를 개발할 수 있게 해주는 아주 유용한 도구이며, 여기서 CLI란 Command Line Interface의 약자로서 타이핑으로 명령어를 입력하여 원하는 바를 실행시키는 도구를 말한다. 윈도우에서는 명령 프롬프트(CMD), 맥에서는 터미널을 이용한다고 볼 수 있다. Vue CLI은 내부적으로 Webpack을 활용한다. Vue CLI로 명령을 실행 시키면 CLI가 자동으로 최적화된 Webpack 형태의 결과물을 생성 시켜 준다.

<!-- more -->

## Vue CLI 2.x 와 Vue CLI 3.x 버전 비교

### 프로젝트를 생성

* **CLI2** : eslint, unit test, night watch 등 낯선것들 선택 필요
* **CLI3** : default (babel, eslint) 를 선택하면 가장 기본적인 설정으로 프로젝트가 생성, 나중에 옵션을 추가 가능작성 필요 

### 프로젝트 구성

* **CLI2** : simple, webpack, webpack-simple, pwa 등 [템플릿](https://github.com/vuejs-templates/webpack-simple/tree/master/template) 리스트 중 하나를 선택해서 프로젝트 구성
* **CLI3** : 프로젝트에 플러그인 기반으로 원하는 설정 추가

### 웹팩 설정 파일

* **CLI2** : `webpack.config.js` 파일이 최상단 디렉토리에 있다.
* **CLI3** : 없음, root 경로에 `vue.config.js` 파일을 설정하고 내용 추가

### ES6 이해도

* **CLI2** : 필요 X
* **CLI3** : 필요 O

### node modules

* **CLI2** : 자동설치 안됨. `$ npm install` 필요
* **CLI3** : 자동설치

## 설치 환경
* node.js
* npm

## CLI 설치
```
$ npm i -g @vue/cli // vue-cli 3.x
$ npm i -g vue-cli // vue-cli 2.x
```

### 버전 확인
```
$ vue --version
@vue/cli 4.0.5
```

### 프로젝트 생성
babel과 eslint 기반인 default 옵션을 선택한다.
```
$ vue create 'ProjectName' // vue-cli 3.X
$ vue init webpack 'ProjectName' // vue-cli 2.X
```

### 로컬 서버 실행
```
$ npm run serve // vue-cli 3.x
$ npm run dev // vue-cli 2.x
```

`http://localhost:8080/` 로 들어가면 뷰 로고가 있는 로컬 페이지를 볼 수 있다. 
`$ npm install` 명령어를 통해 NPM패키지를 설치하지 않아도 서버가 작동되는 것을 확인할 수 있는데 vue cli가 이미 `node_modules`디렉터토리 안에 라이브러리들을 다운받았기 때문이다. vue cli의 기본 템플릿은 babel, eslint, unit-mocha 를 포함한다.

> * **Babel:** 자바스크립트 컴파일러다. 최신버전의 자바스크립트 문법은 브라우저가 이해하지 못하기 때문에 Babel은이 브라우저가 이해할 수 있는 문법으로 변환시켜준다. ES6, ES7 등의 최신 문법을 사용해서 코딩을 할 수 있기 때문에 생산성이 향상된다.  
> * **ESLint:** 코딩 스타일 가이드를 따르지 않거나 문제가 있는 코드나 안티 패턴을 찾아 표시를 달아 놓는 도구이다.  
> * **unit-mocha:** javascript 진영에서 테스트 러너를 지원하는 테스트 프레임워크이다.

## References
> [Vue CLI 3.0 사용하기](https://vuejs.kr/vue/vue-cli/2018/01/27/vue-cli-3)
> [Vue CLI 3.X 사용하기](https://velog.io/@skyepodium/Vue-CLI-3.X-사용하기)
> [Vue CLI 3 사용법](https://www.daleseo.com/vue-cli3)
> [[Vue.js] Vue Version 비교 (cli2 vs cli3)](https://soraji.github.io/front/2019/11/04/VueVersion)
> [Vue-CLI 도구 활용방법](https://ux.stories.pe.kr/136)

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
