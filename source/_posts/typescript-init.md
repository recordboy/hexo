---
title: "타입스크립트(TypeScript) 시작하기"
date: 2020-05-09 16:36:46
categories: "typescript"
tags: [typescript, javascript]
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

## 로컬에서 작업 하기
로컬 환경에서 [Parcel 번들러](https://ko.parceljs.org/getting_started.html)를 이용하면 작업을 빠르게 테스트를 할 수 있다.

### Parcel
Parcel 전역 설치
```
$ npm install -g parcel-bundler
```

프로젝트 파일 생성 및 패키지 파일 생성 후 패키지 및 Parcel를 설치해 준다. 프로젝트 폴더명은 `app`으로 하겠다.
```
$ mkdir app
$ cd app
$ npm init -y
$ npm install -D typescript parcel-bundler
```

`tsconfig.json` 파일을 생성하고 아래 옵션을 추가한다.

```javascript
{
  "compilerOptions": {
    "strict": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

`main.ts` 파일을 생성하고 아래 코드를 입력한다.

```javascript
function add(a: number, b: number) {
  return a + b;
}
const sum: number = add(1, 2);
console.log(sum);
```

`index.html` 파일을 생성하고 `main.ts` 파일을 연결한다. Parcel 번들러가 빌드시에 자동으로 타입스크립트를 컴파일 할 것이다.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>typescript</title>
</head>
<body>
  <script src="main.ts"></script>
</body>
</html>
```

Parcel 번들러로 빌드해 준다. 이제 코드를 수정할 때 마다 타입스크립트가 자동으로 컴파일될 것이다.

```
$ npx parcel index.html
// Server running at http://localhost:1234
```

## References
> [한눈에 보는 타입스크립트(updated)](https://heropy.blog/2020/01/27/typescript/)  
> [TypeScript-Handbook 한글 문서](https://typescript-kr.github.io/)  
> [타입스크립트, 써야할까?](https://hyunseob.github.io/2018/08/12/do-you-need-to-use-ts/)  
