---
title: "타입스크립트(TypeScript) 시작하기"
date: 2020-05-09 16:36:46
categories: "typeScript"
tags: [typeScript, javascript]
thumbnail: "/gallery/thumbnail-ts.png"
toc: true
---

## 정의

타입스크립트(TypeScript)는 마이크로소프트에서 개발, 유지하고 있으며 엄격한 문법을 지원한다. 자바스크립트 엔진을 사용하며, 자바스크립트의 상위 집합으로 ECMA의 최신 표준을 지원한다.

<!-- more -->

## 장점
### 정적 타입 언어(static type language)
C#과 Java같은 정적 타입 언어들에서 사용하는 타입 시스템은 높은 가독성과 코드 품질 등을 제공할 수 있고, 런타임이 아닌 컴파일 환경에서 에러가 발생해 치명적인 오류들을 더욱 쉽게 잡아낼 수 있다.

기존의 자바스크립트는 타입 시스템이 없는 동적 프로그래밍 언어로, 변수에 문자열, 숫자, 불리언 등 여러 타입의 값을 가질 수 있다. 이는 약한 타입의 언어라고 하며, 비교적 유연하게 개발할 수 있는 환경을 제공하지만, 타입 안정성이 보장되지 않아 런타임 환경에서 쉽게 에러가 발생할 수 있는 단점을 가진다. 

타입스크립트는 자바스크립트에 타입 시스템을 적용하여 대부분의 에러를 컴파일 환경에서 체크할 수 있다.

## 설치하기
타입스크립트를 설치하는 방법에는 크게 두가지가 있다.

* npm을 이용한 설치
* TypeScript의 Visual Studio 플러그인 설치

여기서는 npm을 이용하여 설치하겠다. 우선 전역에 타입스크립트를 설치해 준다.

```
$ npm install -g typescript
```

기존의 자바스크립트의 확장자가 `.js`이였다면 타입스크립트는 `.ts`라는 확장자를 가진다. 타입스크립트 작성 후 컴파일러를 통해 자바스크립트 파일로 변환되어 사용하게 된다.

### 파일 생성하기
원하는 디렉토리로 이동하여 타입스크립트 파일을 하나 만들어준다. 여기서는 `app.ts`로 만들겠다. 만든 뒤 아래 처럼 코드를 입력한다.

```javascript
function func(msg) {
    return 'hello' + msg;
}
let txt = 'world';
```

### 컴파일 하기
이제 터미널로 가서 아래 명령어를 실행 한다.

```
$ tsc app.ts
```

`app.ts` 파일을 컴파일 하여 아래처럼 `app.js` 파일이 생성되었을 것이다.

```javascript
function func(msg) {
    return 'hello' + msg;
}
var txt = 'world';
```

## 타입 기본
### 타입 지정
타입스크립트는 일반 변수, 매개변수, 객체 속성 등에 `: TYPE`과 같은 형태로 타입을 지정할 수 있다.

*추후 추가 예정*

## References
> [한눈에 보는 타입스크립트(updated)](https://heropy.blog/2020/01/27/typescript/)  
> [TypeScript-Handbook 한글 문서](https://typescript-kr.github.io/)  
> [타입스크립트, 써야할까?](https://hyunseob.github.io/2018/08/12/do-you-need-to-use-ts/)

