---
title: "[SASS] SASS 설치 및 기본 사용"
date: 2020-02-07 15:05:58
categories: [front-end, sass]
tags: [sass, css]
# thumbnail: "/gallery/thumbnail-sass.png"
toc: true
widgets:
  - type: toc
    position: left
  - type: categories
    position: left
  - type: tags
    position: left
sidebar:
  right:
    sticky: true
---

CSS전처리기(CSS pre-processor)라 불리는 SASS(Syntactically Awesome StyleSheet)는 CSS의 단점을 보완한 CSS의 확장형이다. 전처리기란 자신만의 특별한 구문을 가지고 CSS를 생성하도록 하는 프로그램이다.

<!-- more -->

## CSS 전처리기 종류
* [SASS](https://sass-lang.com/)  
* [LESS](http://lesscss.org/)  
* [Stylus](https://stylus-lang.com/)  
* [PostCSS](https://postcss.org/)

## SASS와 SCSS의 차이 
SCSS는 SASS의 3버전으로 업그레이드 하면서 갖춰진 새로운 문법 체계이다.

### SASS
`{}`(중괄호)와 `;`(세미콜론) 사용 안하기 때문에 코드가 깔끔하고 간결함

```
.list
  float: left
  width: 100px
  li
    color: red
    background: url("./image.jpg")
    &:last-child
      margin-right: -10px
```

### SCSS
인라인 코드(한 줄 작성)를 작성할 수 있고, CSS와 유사한 문법을 가지기 때문에 코드 통합이 훨씬 쉬움

```scss
.list {
  float: left;
  width: 100px;
  li {
    color: red;
    background: url("./image.jpg");
    &:last-child {
      margin-right: -10px;
    }
  }
}
```

### SCSS를 추천
* 공식 문법: 공식 레퍼런스는 SCSS 문법을 기준으로 모든 문법을 설명하고 예시를 보여줌
* 더 넓은 사용자: 다수의 라이브러리, 프레임워크가 SCSS 문법을 활용하는 등 새로운 문법이 더욱 널리 쓰임
* CSS 호환성: 친근한 CSS 문법은 SASS와 CSS 사이의 심리적 틈을 줄여주고, 기능적으로도 확장성을 높임
* 여러 줄 쓰기 지원: SASS 문법은 들여쓰기와 줄 바꿈이 문법의 중요한 요소이기 때문에, 반대로 여러 줄 쓰기를 지원하지 않음

SASS를 더 편리하게 수정한 버전이 SCSS이기 때문에 파일 확장자명은 `.scss`를 사용한다.

## 컴파일 방법
SASS는 웹에서 직접 동작할 수 없다. 최종에는 표준 CSS로 동작해야 하며, 전처리기로 작성 후 CSS로 컴파일해야 한다. 다양한 방법으로 컴파일이 가능하여 여기서는 node-sass를 사용할 것이다. node-sass는 Node.js를 컴파일러인 LibSass에 바인딩한 라이브러리다.

NPM을 사용하여 전역에 설치해준다.

```
$ npm install -g node-sass
```

컴파일이 제대로 되는지 테스트를 해보겠다. 작업할 디렉토리로 가서 아래처럼 구문을 적은뒤 `test.scss`로 저장한다.

```scss
$red: #ff0000;
div{
    color: $red;
}
```

터미널로 들어가 해당 디렉토리로 이동한 뒤 아래를 참고하여 명령어를 입력한다.

```
sass 작성한scss파일명.scss 변환될css파일명.css
```

위 예제 파일을 컴파일 할려면 아래처럼 입력하면 된다.
```
sass test.scss test.css
```

명령어를 실행하면 해당 디렉토리에 test.css 및 test.css.map 파일이 정상적으로 생성된 것을 확인할 수 있다. `.scss` 파일은 컴파일이 진행된 파일이고, `.map` 파일은 scss와 css가 어떻게 연결되어 있는지에 대한 정보 파일이다.

```css
div {
  color: #ff0000;
}

/*# sourceMappingURL=test.css.map */

```

하지만 매번 이렇게 컴파일을 할수 없기에 내가 작성하고 있던 파일을 변경(저장)되면 자동으로 컴파일 하도록 설정할 수 있다.

1. 작성된 scss파일만 변환
```
$ sass --watch 작성된.scss
```

2. 디렉토리의 모든 scss 파일을 변환
```
$ sass --watch .:.
```

위와 같이 해당 명령어를 입력하면 test.scss 변경 시 자동으로 test.css도 변경된다. 해당 명령어를 취소하고자 할 때는 ctrl + c 를 입력하면 취소가 된다.

## References
> [Sass(SCSS) 완전 정복!](https://heropy.blog/2018/01/31/sass/)  
> [Sass 기초와 활용](http://hwangsunsoo.org/lecture/src/sass_article_seminar_2017_2nd_half.html)  
> [[사스(Sass)] 2. Sass 사용법](https://recoveryman.tistory.com/277)  
> [CSS 전처리기](https://developer.mozilla.org/ko/docs/Glossary/CSS_preprocessor)  
> [Sass는 SCSS로 쓰세요](https://designmeme.github.io/ko/blog/write-sass-with-scss/)  
> [[사스(Sass)] Sass 기본 사용법 (컴파일 및 명령어)](https://i-fiction.tistory.com/9)
