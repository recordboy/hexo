---
title: "React 전화번호부 만들기"
date: 2020-04-27 20:51:12
categories: "react"
tags: [react]
thumbnail: "/gallery/thumbnail-react.png"
toc: true
---

리엑트로 간단한 전화번호부를 만들어 보자, 우선 새로운 리엑트 프로젝트를 만들고, 로컬 서버를 시작한다. 프로젝트 이름은 `phone-book`으로 하겠다.

<!-- more -->

## 프로젝트 초기화

```
$ create-react-app phone-book --use-npm
$ cd phone-book
$ npm server
```

App.js 파일을 열어 필요없는 코드를 전부 지워준 뒤 App 컴포넌트만 추가해 본다.

```javascript
import React, { Component } from 'react';
class App extends Component {
  render() {
    return(
      <div>hello</div>
    )
  }
}
export default App;
```

`http://localhost:3000`에 들어가보면 hello 라고 정상적으로 출력 될 것이다. 이제 본격적으로 하위 컴포넌트를 만들어 App.js에 연결해 보겠다.

## 입력 폼 컴포넌트 추가
src 디렉토리 내부에 components 디렉토리를 만든 뒤 그 안에 PhoneForm.js 파일을 만든 뒤 아래 코드를 입력한다.

### 이름 인풋 값 state에 할당

```javascript
import React, { Component } from 'react';
class PhoneForm extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return(
      <form>
        <input type="text" onChange={this.handleChange} />
        <div>name: {this.state.name}</div>
      </form>
    )	
  }
}
export default PhoneForm;
```

코드를 살펴보면, 우선 인풋태그의 `onChange` 이벤트가 발생하면 `handleChange` 함수를 실행하게 된다. 이벤트 객체를 파라미터로 받은 `handleChange` 함수는 `e.target.value`값을 통해 인풋 요소의 값을 가져와서 `state`의 `name`값을 설정하게 된다. 인풋태그 아래 텍스트가 `state`의 값이 잘 바뀌고 있는지 확인할 수 있게 해준다.

## App컴포넌트에 연결
App.js 파일에 PhoneForm 컴포넌트를 아래와 같이 연결해 준다.

```javascript
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
class App extends Component {
  render() {
    return(
      <div>
        <PhoneForm />
      </div>
    )
  }
}
export default App;
```

인풋 태그에 값을 입력할 때 마다 아래에 입력값이 출력되는 것을 확인할 수 있다.

### 전화번호 인풋 태그 추가
전화번호가 들어갈 phone 인풋태그를 더 추가한다. 아래 코드를 살펴보자

```javascript
import React, { Component } from 'react';
class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return(
      <form>
        <input type="text" name="name" onChange={this.handleChange} />
        <input type="text" name="phone" onChange={this.handleChange} />
        <div>name: {this.state.name}</div>
        <div>phone: {this.state.phone}</div>
      </form>
    )	
  }
}
export default PhoneForm;
```

phone 인풋태그가 추가되었으니 해당 값을 가져오는 이벤트 핸들러 함수를 하나 더 만들어야 될 것 같지만 [Computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)문법을 사용하면 따로 메서드를 추가 안하고 위처럼 작성이 가능하다. 

우선 인풋 태그에 name 값을 추가 하여 각 인풋을 구분할 수 있게 되었다. setState 함수를 보면 `[e.target.name]`로 이벤트 객체의 name 값을 state의 키값으로 활용하고 있다. 즉 name 인풋을 입력하면 `[e.target.name]`값은 name이기 때문에 state의 name 프로퍼티에 e.target.value 값을 할당, phone 인풋을 입력하면 `[e.target.name]`값은 phone이기 때문에 state의 phone 프로퍼티에 e.target.value 값을 할당 한다고 보면 된다. 결과물을 확인하면 두 인풋이 잘 작동되는 것을 확인할 수 있다.

## 부모 컴포넌트에게 정보 전달하기
PhoneForm 컴포넌트에 있는 값을 부모(App)컴포넌트에 값을 전달해줄 차례다. 이런 상황에는, 부모 컴포넌트에서 메소드를 만들고, 이 메소드를 자식에게 전달한 다음에 자식 내부에서 호출하는 방식을 사용한다.

순서를 보면 우선 App에서 handleCreate라는 메소드를 만들고 이를 props를 이용하여 PhoneForm 컴포넌트에 전달을 한다. 그리고 PhoneForm 컴포넌트에 submit 버튼을 추가하여 이벤트가 발생하면 props로 받은 함수를 호출하여 App에서 파라미터로 받은 값을 사용할 수 있도록 하겠다. 우선 App 컴포넌트는 아래와 같이 수정해 준다.

추후 추가 예정

## References
> [누구든지 하는 리액트 6편: input 상태 관리하기](https://velopert.com/3634)
