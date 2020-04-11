---
title: "입력 서식 관련 접근성(Information Accessibility Technology Conference)"
date: 2019-12-04 10:24:31
categories: "web"
tags: [web]
---

2019년 11월 22일 정보접근성 기술 컨퍼런스를 다녀온뒤 세미나 내용을 정리 및 입력 서식 관련 접근성 대비에 관련한 내용이다.

<!-- more -->

## 입력 서식 관련 접근성

### 1. 레이블이 시각적으로 노출된 경우

`<label>`에 `for`와 `<input>`의 `id`를 동일하게 맞추어 준다. `<label>`을 클릭하면 해당 폼으로 커서가 이동한다.

**HTML**
```html
<label for="usr_id">아이디</label>
<input type="text" id="usr_id" />
```

**결과**
<div>
    <label for="usr_id">아이디</label>
    <input type="text" id="usr_id" />
</div>

### 2. 레이블이 시각적으로 노출되지 않은 경우

`<input>`태그만 있는 경우는 `title`속성을 꼭 명시하여 스크린 리더기가 인식할 수 있도록 한다.

**HTML**
```html
<input type="text" id="usr_id" title="아이디" />
```
*스크린 리더기 소리: "아이디 편집 창"*

### 3. 읽기 전용 편집 창인 경우

`title`속성을 넣어주지 않으면 해당 편집 창의 제목을 건너 띄고 결과값만 읽는다. 꼭 `title`속성을 써주도록 한다.

**HTML**
```html
<input type="text" readonly="readonly" value="25" />
```
*스크린 리더기 소리: "25 읽기전용 편집 창"*

```html
<input type="text" readonly="readonly" value="25" title="나이" />
```
*스크린 리더기 소리: "**나이** 25 읽기전용 편집 창"*

### 4. placeholder가 있는 경우

`placeholder`는 보조 수단으로 레이블 대체가 불가능하다. 이 역시 `title`속성을 꼭 넣어주도록 한다.

**HTML**
```html
<input type="text" placeholder="user@naver.com" />
```
*스크린 리더기 소리: "user@naver.com 편집 창"*

```html
<input type="text" placeholder="user@naver.com" title="이메일" />
```
*스크린 리더기 소리: "**이메일** 편집 창"*

### 5. 다수의 입력 서식이 존재하는 경우

`title`속성에 입력 내용 및 자리수까지 상세히 명시한다.

**HTML**
```html
<input type="text" placeholder="년(4자)" title="태어난 년도 4자리" />
<input type="text" placeholder="월" title="태어난 월" />
<input type="text" placeholder="일" title="태어난 일" />
```

### 6. id, for가 명시되어 있지 않고 암묵적 레이블로 제공하는 경우

최신 버전의 스크린 리더기는 암묵적 레이블을 읽어 주긴 하지만 역시 많은 스크린 리더기 사용에 문제가 발생하고 있어 꼭 명시적으로 레이블을 사용하기를 권장하고 있다.

#### HTML
```html
<label>
    아이디
    <input type="text">
</label>
```
*스크린 리더기 소리: "아이디 편집 창"*

### 7. 커스터마이징이 되어 있는 경우

커스터마이징이 되어있는 입력서식의 경우 키보드를 이용한 조작이 필수며, 마크업 형태는 기본서식과 동일하도록 권장하고 있다.(예: 라디오 버튼의 경우 키보드 좌, 우 버튼으로 조작 가능)  
복잡한 입력서식의 경우 아리아로 구현이 가능하지만 느리다는 단점이 있다.

## 접근성 교육 및 솔루션

### 부스트코스 웹 접근성 강의
[웹 접근성 이해](https://www.edwith.org/web-accessibility/joinLectures/23540)라는 사이트에서 웹 접근성 강의를 보다 쉽게 배울 수 있다.

## References
> [웹 접근성 이해](https://www.edwith.org/web-accessibility/joinLectures/23540)  
> [레진 웹 접근성 가이드라인](https://github.com/lezhin/accessibility)  
