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
        <input
          type="text"
          onChange={this.handleChange} 
        />
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
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="phone"
          onChange={this.handleChange}
        />
        <div>name: {this.state.name}</div>
        <div>phone: {this.state.phone}</div>
      </form>
    )	
  }
}
export default PhoneForm;
```

phone 인풋태그가 추가되었으니 해당 값을 가져오는 이벤트 핸들러 함수를 하나 더 만들어야 될 것 같지만 [Computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)문법을 사용하면 따로 메소드를 추가 안하고 위처럼 작성이 가능하다. 

우선 인풋 태그에 name 값을 추가 하여 각 인풋을 구분할 수 있게 되었다. setState 함수를 보면 `[e.target.name]`로 이벤트 객체의 name 값을 state의 키값으로 활용하고 있다. 즉 name 인풋을 입력하면 `[e.target.name]`값은 name이기 때문에 state의 name 프로퍼티에 e.target.value 값을 할당, phone 인풋을 입력하면 `[e.target.name]`값은 phone이기 때문에 state의 phone 프로퍼티에 e.target.value 값을 할당 한다고 보면 된다. 두 인풋 값이 하단에 잘 출력되는 것을 확인할 수 있다.

## 부모 컴포넌트에게 정보 전달하기
PhoneForm 컴포넌트에 있는 값을 부모(App)컴포넌트에 값을 전달해줄 차례다. 이런 상황에는, 부모 컴포넌트에서 메소드를 만들고, 이 메소드를 자식에게 전달한 다음에 자식 내부에서 호출하는 방식을 사용한다.

순서를 보면 우선 App에서 handleCreate라는 메소드를 만들고 이를 props를 이용하여 PhoneForm 컴포넌트에 전달을 한다. 그리고 PhoneForm 컴포넌트에 submit 버튼을 추가하여 이벤트가 발생하면 props로 받은 함수를 호출하여 App에서 파라미터로 받은 값을 사용할 수 있도록 하겠다. 우선 App 컴포넌트는 아래와 같이 수정해 준다.

```javascript
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
class App extends Component {
  handleCreate = (data) => {
    console.log(data)
  }
  render() {
    return(
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}
export default App;
```
handleCreate 함수를 추가했다. 이 함수는 자식 컴포넌트에서 전달받아오는 결과값을 콘솔창에 출력할 함수다. PhoneForm 컴포넌트에는 onCreate 라는 속성에 handleCreate 함수를 할당해 주었다.

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
  handleSubmit = (e) => {

    // 이벤트 리로딩 방지
    e.preventDefault()

    // 상태값을 onCreate를 통하여 부모에게 전달
    this.props.onCreate(this.state)

    // 상태 초기화
    this.setState({
      name: '',
      phone: ''
    })
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="phone"
          value={this.state.phone}
          onChange={this.handleChange}
        />
        <button type="submit">send</button>
      </form>
    )	
  }
}
export default PhoneForm;
```

render 함수 안을 먼저 보면, submit 버튼을 추가하고, form태그에는 onSubmit 이벤트를 등록하였다. 인풋의 value 값은 현재 state 값을 참조하도록 하여 실시간으로 변경되는 값으로 할당되도록 하였다. state 값이 실시간으로 바뀌는지 확인하기 위한 인풋 아래 텍스트들은 삭제해준다.

메소드는 handleSubmit 함수를 추가하였는데, 우선 submit 이벤트가 발생하면 페이지가 리로드되기 때문에 함수가 실행될 때 e.preventDefault 함수를 이용하여 리로드를 막는다. 다음에 props으로 받은 onCreate 함수를 실행하여 현재 state 값을 전달해주고, 현재 값은 초기화 해준다. submit 버튼을 클릭하면 콘솔창에 전달받은 인풋값이 정상적으로 출력될 것이다.

## 데이터 추가
PhoneForm 컴포넌트의 데이터를 부모 컴포넌트로 전달했으니 이제 부모 컴포넌트에 데이터를 계속 추가 하도록 하겠다. 

### 리액트에서의 배열 다루기
데이터 객체를 배열에 계속 추가하기 위해선 리액트에서 배열을 어떻게 다루는지 알아야 한다. 기존의 자바스크립트에서는 배열에 값을 추가할 때 push 메서드를 사용했었다. 예를 들어 `arr` 배열이 있다고 치자

```javascript
var arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```

기존 자바스크립트에서 배열에 값을 추가할때는 위처럼 하던것처럼 리액트에서도 `this.state.arr.push('value');` 처럼 해도 된다고 생각할 수 있다. 하지만 리액트에서는 state 내부의 값을 직접적으로 수정하면 절대 안된다. 이를 불변성 유지라고 하는데, push, splice, unshift, pop 같은 내장함수는 배열 자체를 수정하므로 적합하지 않다. 대신 기존 배열에 기반하여 새 배열을 만들어내는 [concat](/2018/05/15/javascript-array-method/), slice, [map](/2020/02/17/javascript-array-map/), [filter](/2020/02/18/javascript-array-filter/) 같은 함수를 사용해야한다. 리액트에서 불변성 유지가 중요한 이유는 불변성을 유지해야, 리액트에서 모든것들이 필요한 상황에 리렌더링 되도록 설계할 수 있고, 그렇게 해야 나중에도 성능도 최적화 할 수 있기 때문이다.

### 배열 추가
App 컴포넌트의 state에 information 이라는 배열을 만들고, 그 안에 배열의 기본값인 샘플 데이터 두개를 추가한다. 객체 형식은 아래와 같은 형식으로 작성한다.

```javascript
{
  id: 0,
  name: '주영',
  phone: '000-0000-0000'
}
```

위에서 id 값은 각 데이터를 식별하기 위함이다. 이 값은 데이터를 추가할 때 마다 숫자를 1씩 더해주겠다. App 컴포넌트는 아래와 같이 작성한다.

```javascript

```

추후 추가 예정

## References
> [누구든지 하는 리액트 6편: input 상태 관리하기](https://velopert.com/3634)  
> [누구든지 하는 리액트 7편: 배열 다루기 (1) 생성과 렌더링](https://velopert.com/3636)
