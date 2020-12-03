---
title: "[React] ESLint, Prettier 적용하기"
date: 2020-07-06 19:54:44
categories: [front-end, react]
tags: [eslint, prettier, tools, module, extension]
# thumbnail: "/gallery/thumbnail-react.png"
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

자바스크립트 개발을 하다 보면 문법 오류나 코드 정리로 인해 시간을 많이 소비한다. `ESLint`와 `Prettier`는 이러한 상황을 해결해 주는 도구들이며, VSCode, WebStorm, Atom 등 여러 에디터와 연동해 사용이 가능하다. 이번 포스팅에서는 두가지 도구를 간단히 살펴보고 리액트 프로젝트에 적용하는 방법을 알아보겠다. 에디터는 VSCode를 기준으로 하겠다.

<!-- more -->

## ESLint
ESLint는 ES + Lint의 합성어로 ES는 EcmaScript를 의미하고 Lint는 보푸라기라는 뜻인데, 프로그래밍에서는 에러가 있는 코드에 표시를 달아 놓는 것을 의미한다. 즉 ESLint는 JavaScript의 스타일 가이드를 따르지 않거나 문제가 있는 안티 패턴들을 찾아주고 일관된 코드 스타일로 작성하도록 도와준다. 코딩 컨벤션 및 안티 패턴을 자동 검출 하므로 옮바른 코딩 습관을 위해 필히 사용할 것을 권장한다.

ESLint는 스타일 가이드를 편리하게 적용하기 위해 사용되기도 하는데, 많은 개발자가 사용중인 [Airbnb Style Guide](https://github.com/airbnb/javascript), [Google Style Guide](https://github.com/google/eslint-config-google)가 대표적인 예이다.

ESLint가 어떻게 오류를 잡아주는지 예제를 통해 간단히 알아보자.

```
$ mkdir test
$ cd test
$ touch test.js
```

프로젝트를 생성할 디렉토리로 이동하여 `test` 폴더를 만들고 `test.js` 파일을 생성하였다.

```javascript
let foo = text;;
```

문자열에 따옴표도 없고, 세미콜론도 두개고, 변수에 값이 할당되어도 사용이 안되는 엉망인 코드를 작성하였다. 그냥 js 파일은 문법적 오류를 따로 잡아주지 않을 것이다.

### ESLint 설치
npm 프로젝트를 하나 생성하고 ESLint를 설치하도록 하겠다.

```
$ npm init -y
$ npm i -D eslint
```

> **축약법 간단 설명**
> * `npm init -y` 명령어에 `-y`는 `--yes`의 축약법으로 npm 프로젝트를 초기 세팅할 때 아무 질문 없이 기본값으로 프로젝트가 세팅된다. 비슷한 명령어로` --force(-f)`가 있다.
> * `npm i -D eslint` 명령어의 `-D`는 `--save-dev`의 축약법이며, 비슷한 옵션으로 `--save`가 있다. 차이는 아래를 참고한다.
>   * `--save-dev`는 설치한 패키지 정보를 `./package.json` 파일의 `devDependencies` 항목에 저장하며, npm install을 할 때 해당 패키지가 같이 설치된다. 설치할 때 `--production` 옵션을 붙이면 해당 패키지를 제외하고 npm이 설치된다.
>   * `--save`는 설치한 패키지 정보가 `./package.json`의 `dependencies`에 추가되며, npm install을 할 때 해당 패키지는 항상 설치가 된다.
>   * 아무 옵션을 넣지 않으면 순수하게 `./node_modules`에 패키지만 설치한다.

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

답변을 전부 마치면 루트 경로에 `.eslintrc.js` 파일이 생성되며, 여기에서 ESLint를 설정할 수 있다.

```javascript
module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
    }
};
```

* 환경(env): 프로젝트의 사용 환경을 설정한다.
* 확장(extends): 다른 ESLint 설정을 확장해서 사용할때 설정한다. 위 파일에서는 ESLint가 추천하는 규칙을 적용하라는 설정이며, 실제 프로젝트에서는 위에서 언급한 `airbnb`나 `prettier` 등을 확장해서 사용한다.
* 파서 옵션(parserOptions): ESLint 사용을 위해 지원하려는 Javascript 언어 옵션을 설정할 수 있다.
* 규칙(rules): 프로젝트에서 자체적으로 덮어쓰고 싶은 규칙을 정의할 때 사용한다.

설정 규칙 및 리스트는 상당히 방대하며, [ESLint 공식 레퍼런스](https://eslint.org/docs/rules/)에서 참고 가능하다.

### ESLint 검사
이제 위에서 엉망으로 작성한 test.js 파일을 아래 명령어를 사용하여 검사해 보자.

```
$ node_modules/.bin/eslint test.js
```

터미널에서 오류를 세가지를 아래처럼 알려준다.

```
C:\code\test\test.js
  1:5   error  'foo' is assigned a value but never used  no-unused-vars
  1:11  error  'text' is not defined                     no-undef
  1:16  error  Unnecessary semicolon                     no-extra-semi

✖ 3 problems (3 errors, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

1. `foo`에 값이 할당되었지만 사용되지 않음
2. `text`가 정의되지 않았음
3. 불필요한 세미콜론이 있음

위에서 3번째 항목에는 오른쪽에 [no-extra-semi](https://eslint.org/docs/rules/no-extra-semi)라고 나와있다. 이는 ESLint가 의도된 것이 아닌 실수라고 판단한 것이며, 자동으로 코드를 수정할 수 있다. 검사 명령어에 `--fix`를 붙이면 `no-extra-semi`항목을 자동으로 고쳐준다.

```
$ node_modules/.bin/eslint test.js --fix
```

명령어를 실행하면 세미콜론이 두개에서 한개로 바뀐것을 확인할 수 있다.

실제 프로젝트에서는 검사할 파일이 많은데 위와 같이 일일히 터미널에서 ESLint를 실행하는것은 비효율적이다. 그래서 일반적으로 ESLint를 사용할때는 `package.json` 파일에 따로 설정해준다. 전체 파일을 상대로 ESLint를 실행되도록 설정해 보자.

```javascript
  "scripts": {
    "lint": "eslint ."
  },
```

이제 터미널에 아래 명령어를 실행하면 전체 파일을 상대로 ESLint가 실행될 것이다.

```
$ npm run lint
```

## Prettier
Prettier는 기존의 코드에 적용되어있던 스타일들을 전부 무시하고, 정해진 규칙에 따라 자동으로 코드 스타일을 정리해 주는 코드 포멧터이다.

> 코드 포멧터(Code Formatter)란 개발자가 작성한 코드를 정해진 코딩 스타일을 따르도록 변환해주는 도구를 말한다.

ESLint와 다른점이라면 ESLint는 문법 에러를 잡아내고, 특정 문법 요소를 쓰도록 만드는 등 코드 퀄리티와 관련된 것을 고치기 위해 사용되지만 Prettier는 코드 한 줄의 최대 길이나, 탭의 길이는 몇으로 할 것인지, 따옴표는 홀따옴표(')나 쌍따옴표(")중 무엇을 사용 할 것인지 등등 코드 퀄리티보단 코딩 스타일을 일괄적으로 통일하는 도구에 가깝다.

다시 테스트를 위해 `test.js`에 엉망인 코드를 작성하였다.

```javascript
let func=function 
( )
    {
  let 
foo  
='text'
return     foo}
```

### Prettier 설치
Prettier을 아래 명령어로 설치해 준다.

```
$ npm i prettier -D -E
```

> 위 명령어중 `-E`는 `--save-exac`의 축약법이다. 위 ESLint 모듈을 설치할때와 다르게 Prettier에서는 이 옵션을 붙이는 것을 권장하는데, 버전이 달라지면서 생길 스타일 변화를 막기 위해서라고 한다.

### Prettier 실행

```
$ npx prettier test.js
```

위 명령어를 사용하면 엉망인 코드가 아래처럼 올바른 코드로 포멧팅되어 터미널창에 출력이 된다.

```javascript
let func = function () {
  let foo = "text";
  return foo;
};
```

코드 자체를 수정하고 싶다면 명령어에 `--write` 옵션을 추가하면 된다. 

```
$ npx prettier --write test.js
```

에디터에 아래처럼 코드가 수정된다.

```javascript
let func = function () {
  let foo = "text";
  return foo;
};
```

이제 리액트 프로젝트에 ESLint와 Prettier를 적용하는 방법을 알아보겠다.

## 리액트에 ESLint와 Prettier 적용하기
이 포스팅에서는 CRA(Create React App)을 이용하여 생성한 리액트 프로젝트를 기준으로 한다. 아래 명령어를 사용하여 리액트 프로젝트를 생성한다.

### 리액트 프로젝트 생성

**자바스크립트 사용 경우**
```
$ create-react-app 프로젝트이름 --use-npm
```

**타입스크립트 사용 경우**
```
$ create-react-app 프로젝트이름 --use-npm --template typescript
```

CRA로 생성된 프로젝트는 안에 ESLint가 따로 탑재되어 있기 때문에 위처럼 따로 설치할 필요가 없다. 만약 CRA로 생성한 프로젝트에 수동으로 ESLint를 설치한다면, 프로젝트는 실행이 안되고, 터미널에 아래 경고가 출력될 것이다.

```
There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "eslint": "^6.6.0"

Don't try to install it manually: your package manager does it automatically.
However, a different version of eslint was detected higher up in the tree:

  /Users/kongseongjoo/Documents/app/node_modules/eslint (version: 7.5.0) 

Manually installing incompatible versions is known to cause hard-to-debug issues.

If you would prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That will permanently disable this message but you might encounter other issues.
.
.
.
```

이는 기본 탑재되는 node_module과 수동설치한 node_module의 버전 호환성 문제이며 터미널 경고 아래에 해결 방법이 나온다. CRA로 생성된 프로젝트는 ESLint를 따로 설치를 하지 않도록 한다.

### Prettier 설치
```
$ npm i prettier -D -E
```

### 필요한 추가 모듈
Prettier와 ESLint를 같이 사용하려면 아래 모듈을 추가로 설치해야 한다.

* **eslint-config-prettier**
ESLint의 formatting 관련 설정 중 Prettier와 충돌하는 부분을 비활성화 한다.
* **eslint-plugin-prettier**
Prettier를 ESLint 플러그인으로 추가한다. 즉, Prettier에서 인식하는 코드상의 포맷 오류를 ESLint 오류로 출력해준다.

아래 명령어를 입력하여 위에서 언급한 모듈을 설치한다.

```
$ npm i eslint-plugin-prettier eslint-config-prettier -D
```

그리고 프로젝트의 루트 경로에 `.eslintrc.json`파일을 만들고 아래 내용을 추가한다.

```javascript
{
  "plugins": ["prettier"],
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### ESLint, Prettier 익스텐션 설치
Node 모듈을 설치했으니, 이제 VSCode와 같이 사용할 때 필요한 익스텐션을 설치하고 설정을 바꿔주자. VSCode의 Extensions: Marketplace로 들어가서 ESLint와 Prettier를 검색하여 설치한다.

### VSCode 설정
VSCode에서 파일을 저장할 때마다 자동으로 코드가 수정되도록 설정해보자. VSCode 설정(윈도우, 리눅스에서는 Ctrl + , 맥에서는 Cmd + ,)으로 들어간다. 설정으로 들어가면 Search settings 입력창 아래에 User와 Workspace 항목이 있다. User는 VSCode 자체 설정으로 모든 프로젝트에 적용이 되고, Workspace는 현재 프로젝트에서만 설정이 적용되며, `.vscode/settings.json`에 설정 항목이 저장된다. ESLint와 Prettier의 경우 프로젝트별로 설정이 다른경우가 많이 때문에 작업공간마다 설정파일을 따로 관리하는 것을 선호한다. 설정은 json파일에 직접 입력이 가능하며, 우측 상단에 종이 모양의 Open Setting(JSON)아이콘을 클릭하면 `settings.json`파일이 열린다. 아래처럼 설정한다.

```javascript
{
  // Set the default
  "editor.formatOnSave": false,
  // Enable per-language
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "editor.codeActionsOnSave": {
    // For ESLint
    "source.fixAll.eslint": true
  }
}
```

### ESLint 설정
[ESLint 규칙](https://eslint.org/docs/rules/)은 상당히 방대하며, 모든것을 다 바꾸기 어렵기 때문에 여러가지 규칙을 정해준 모음이 있는데 위에서 언급한 Airbnb Style Guide나 Google Style Guide가 있다. 여기선 Airbnb를 적용해 보겠다.

#### Airbnb Style Guide 적용
아래 명령어를 사용하여 Airbnb를 설치해준다.

```
$ npm i -D eslint-config-airbnb
```

> eslint-config-airbnb 말고도 eslint-config-airbnb-base가 있는데, 차이는 base에는 리액트 관련 규칙이 들어있지 않다는 점이다.

그리고 `.eslintrc.json`파일의 `"extends"`속성에 `"airbnb"`를 추가 해준다.

```javascript
{
  "plugins": ["prettier"],
  "extends": ["eslint:recommended", "plugin:prettier/recommended", "airbnb"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

`App.js`파일을 열어보면 빨간줄이 엄청 그어져 있을 것이다. Airbnb의 규칙이 상당히 까다롭기 때문이다. 꼭 Airbnb 규칙을 따를 필요는 없다. [ESLint 문서](https://eslint.org/docs/user-guide/configuring)에서 본인 스타일에 맞는 스타일을 찾거나 수정하여 사용하면 된다.

### Prettier 설정
ESLint 설정 파일과 마찬가지로 루트 경로에 `.prettierrc.json`을 만들어 준다. [Prettier의 옵션 문서](https://prettier.io/docs/en/options.html)에서 필요한 옵션을 골라 설정해 주면 된다. 아래는 간단한 예시이다.

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

## References
> [[자바스크립트] ESLint로 소스 코드의 문제 찾기](https://www.daleseo.com/js-eslint/)  
> [[자바스크립트] Prettier로 코딩 스타일 통일하기](https://www.daleseo.com/js-prettier/)  
> [VS Code에서 ESlint와 Prettier 함께 사용하기](https://feynubrick.github.io/2019/05/20/eslint-prettier.html)  
> [ESLint 설정 살펴보기](https://velog.io/@kyusung/eslint-config-2)  
> [27. 리액트 개발 할 때 사용하면 편리한 도구들 - Prettier, ESLint, Snippet](https://react.vlpt.us/basic/27-useful-tools.html)  
> [ESLint 조금 더 잘 활용하기](https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/)  
> [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)  
> [프론트엔드 개발환경의 이해: 린트](https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html)  
> [ESLint(TSLint)와 Prettier 함께 사용하기](https://pravusid.kr/javascript/2019/03/10/eslint-prettier.html)  
> [리액트 프로젝트에 ESLint 와 Prettier 끼얹기](https://velog.io/@velopert/eslint-and-prettier-in-react)  
> [ESLint](https://poiemaweb.com/eslint)  
