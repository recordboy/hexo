---
title: "[React] 리액트로 전화번호부 만들기"
date: 2020-03-27 20:51:12
categories: [front-end, react]
tags: [react, javascript, jsx]
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

리액트로 간단한 전화번호부를 만들어 보자, 우선 새로운 리액트 프로젝트를 만들고, 로컬 서버를 시작한다. 프로젝트 이름은 `phone-book`으로 하겠다.

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
    return <div>hello</div>;
  }
}
export default App;
```

`http://localhost:3000`에 들어가보면 hello 라고 정상적으로 출력 될 것이다. 이제 본격적으로 하위 컴포넌트를 만들어 App.js에 연결해 보겠다.

## 입력 폼 컴포넌트 추가
src 디렉토리 내부에 components 디렉토리를 만든 뒤 그 안에 PhoneForm.jsx 파일을 만든 뒤 아래 코드를 입력한다.

### 이름 인풋 값 state에 할당
```javascript
import React, { Component } from 'react';
class PhoneForm extends Component {
  state = {
    name: '',
  };
  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  render() {
    return (
      <form>
        <input type="text" onChange={this.handleChange} />
        <div>name: {this.state.name}</div>
      </form>
    );
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
    return (
      <div>
        <PhoneForm />
      </div>
    );
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
    phone: '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <form>
        <input type="text" name="name" onChange={this.handleChange} />
        <input type="text" name="phone" onChange={this.handleChange} />
        <div>name: {this.state.name}</div>
        <div>phone: {this.state.phone}</div>
      </form>
    );
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
    console.log(data);
  };
  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
      </div>
    );
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
    phone: '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    // 이벤트 리로딩 방지
    e.preventDefault();

    // 상태값을 onCreate를 통하여 부모에게 전달
    this.props.onCreate(this.state);

    // 상태 초기화
    this.setState({
      name: '',
      phone: '',
    });
  };
  render() {
    return (
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
    );
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
App 컴포넌트의 state에 information 이라는 배열을 만들고, 그 안에 배열의 기본값인 샘플 데이터 두개를 추가 할 것이다. 객체 형식은 아래와 같은 형식으로 작성한다.

```javascript
{
  id: 0,
  name: '주영',
  phone: '000-0000-0000'
}
```

위에서 id 값은 각 데이터를 식별하기 위함이다. 이 값은 데이터를 추가할 때 마다 숫자를 1씩 더해주겠다. App 컴포넌트는 아래와 같이 작성한다.

```javascript
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: '주영',
        phone: '000-0000-0000',
      },
      {
        id: 1,
        name: '민수',
        phone: '000-0000-0000',
      },
    ],
  };
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data }),
    });
  };
  render() {
    const { information } = this.state;
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        {JSON.stringify(information)}
      </div>
    );
  }
}

export default App;
```

id 값의 경우, 컴포넌트의 일반 클래스 내부 변수로 선언하였다. 컴포넌트 내부에서 필요한 값 중에서 렌더링 되는 것과 상관이 없는 것들은 굳이 state에 넣어줄 필요가 없다. 그리고 handleCreate 함수에서 this.state의 information 배열은 비구조화 할당으로 값을 선언하였다. 그러므로 setState 함수의 구문은 아래와 같다고 볼 수 있다.

```javascript
this.setState({
  information: this.state.information.concat({ id: this.id++, ...data })
});
```

render 함수에서도 위와 같이 비구조와 할당으로 information 값을 선언하였으며, [JSON.stringify()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)를 이용해 문자열로 변환하여 출력하였다. send 버튼을 클릭하면 배열에 전달된 데이터 객체가 제대로 출력되는 것을 확인할 수 있다.

```
[{"id":0,"name":"주영","phone":"000-0000-0000"},{"id":1,"name":"민수","phone":"000-0000-0000"},{"id":2,"name":"인성","phone":"000-0000-0000"}]
```

## 데이터 렌더링
배열의 내장 함수인 [map](/2020/02/17/javascript-array-map/)을 이용하여 information을 컴포넌트로 변환하여 출력하도록 하겠다. 

### 컴포넌트 만들기
두개의 컴포넌트를 만들 것이다.
* PhoneInfo: 각 전화번호 정보를 보여주는 컴포넌트
* PhoneInfoList: 여러개의 PhoneInfo 컴포넌트를 보여줌

#### PhoneInfo 생성
PhoneInfo.jsx 파일을 만들고 아래처럼 작성한다.

```javascript
import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    name: '이름',
    phone: '000-0000-0000',
    id: 0,
  };
  render() {
    const style = {
      margin: '2px',
      border: '1px solid #ccc',
      padding: '2px',
    };
    const { name, phone } = this.props.info;
    return (
      <div style={style}>
        <div>
          <b>{name}</b>
        </div>
        <div>{phone}</div>
      </div>
    );
  }
}

export default PhoneInfo;
```

info 객체를 props으로 받아와서 렌더링을 할 것이다. 여기서 만약 info 객체에 값이 전달 안 될 경우 에러가 뜰 것이다. 위 코드에서 info 객체의 값을 비구조화 할당하고 있는데, info가 undefined 경우 내부의 값을 가져오지 못하기 때문이다. 때문에 위 코드에서 defaultProps를 이용하여 info의 기본값을 설정해준다.

#### PhoneInfoList 생성
다음에 PhoneInfoList 컴포넌트를 생성하고, 아래처럼 코드를 입력한다.

```javascript
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
  };
  render() {
    const { data } = this.props;
    const list = data.map((info) => <PhoneInfo key={info.id} info={info} />);
    return <div>{list}</div>;
  }
}

export default PhoneInfoList;
```

이 컴포넌트에서는 data라는 배열을 가져와서 map 함수를 이용하여 JSX로 변환을 해준다. 여기서 컴포넌트에 key라는 값도 설정되었는데, key 값은 리액트에서 배열을 렌더링 할 때 꼭 필요한 값이다. 리액트는 배열을 렌더링 할 때 값을 통하여 업데이트 성능을 최적화 한다. 아래 예시를 통해 살펴보겠다.

```html
<div>A</div>
<div>B</div>
<div>C</div>
<div>D</div>
```

key 값을 설정하지 않으면 배열의 index 값이 자동으로 key 값으로 설정 된다. 때문에 각 요소마다 따로 키값을 설정하지 않으면 아래처럼 각 index 값이 키값으로 들어갈 것이다.

```html
<div key={0}>A</div>
<div key={1}>B</div>
<div key={2}>C</div>
<div key={3}>D</div>
```

위 요소들 중 B와 C사이에 X를 집어넣는다고 가정을 해보자. 

```html
<div key={0}>A</div>
<div key={1}>B</div>
<div key={2}>X</div> C 가 X 로 바뀜
<div key={3}>C</div> D 가 C 로 바뀜
<div key={4}>D</div> D 는 새로 생성됨
```

보면 2 index 값으로 X 요소가 들어가면서 index 값이 밀리고, X 요소 이후 부터 값이 전부 바뀔 것이다. 각 요소를 index 값이 아닌 데이터를 추가 할 때마다 고유 값을 부여하면, 리액트가 변화를 감지하고 업데이트 할때 좀 더 효율적이게 처리를 할 수 있게 된다.

```html
<div key={0}>A</div>
<div key={1}>B</div>
<div key={4}>X</div> 새로 생성됨
<div key={2}>C</div> 유지됨
<div key={3}>D</div> 유지됨
```

새로운 요소 하나만 생성되고 나머지는 그대로 유지된다. key 값은 언제나 고유해야 한다. 실제 데이터베이스에도 데이터를 추가하면 해당 데이터를 가리키는 고유 id가 있다. 여기서는 각 요소의 고유 id를 key 값으로 사용하고 있다.

#### PhoneInfoList 렌더링
이제 PhoneInfoList 컴포넌트를 App 컴포넌트에 렌더링을 하고 data 값을 props으로 전달하면 된다.

```javascript
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: '주영',
        phone: '000-0000-0000',
      },
      {
        id: 1,
        name: '민수',
        phone: '000-0000-0000',
      },
    ],
  };
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data }),
    });
  };
  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList data={this.state.information} />
      </div>
    );
  }
}

export default App;
```

확인해 보면 기존 데이터 렌더링 및 신규 데이터 추가도 확인해 볼 수 있다. 가끔 데이터에 고유 값이 없을 수도 있다. 그럴 경우에는 렌더링은 되지만 콘솔창에 경고창이 뜰 것이다. 꼭 배열을 렌더링 할 때는 고유의 key 값을 사용하도록 한다.

## 데이터 삭제

이제 전화번호부에 등록된 데이터를 삭제할 코드를 작성하겠다. 배열에서 삭제 방법은 [filter](/2020/02/18/javascript-array-filter/) 메소드를 사용할 것이다. App 컴포넌트에 handleRemove 함수를 만들어 준뒤 아래처럼 코드를 수정한다. 삭제할 id 값을 받아와 filter 메소드를 사용하여 id 값이 일치하지 않는 값들을 state에 다시 세팅 할 것이다. 함수를 만들었으면 이것을 하위 컴포넌트인 PhoneInfoList에 전달한다.

```javascript
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: '주영',
        phone: '000-0000-0000',
      },
      {
        id: 1,
        name: '민수',
        phone: '000-0000-0000',
      },
    ],
  };
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data }),
    });
  };
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((info) => info.id !== id),
    });
  };
  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList
          data={this.state.information}
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
```

PhoneInfoList 컴포넌트는 props으로 전달받은 onRemove을 그대로 하위 컴포넌트인 PhoneInfo에 전달한다. 이 함수가 전달되지 않을 경우를 대비하여 defaultProps도 설정해 준다.

```javascript
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
  };
  render() {
    const { data, onRemove } = this.props;
    const list = data.map((info) => (
      <PhoneInfo key={info.id} info={info} onRemove={onRemove} />
    ));
    return <div>{list}</div>;
  }
}

export default PhoneInfoList;
```

삭제 버튼 및 로직은 PhoneInfo 컴포넌트에서 구현하겠다. 우선 버튼을 추가하고 삭제 이벤트를 추가 해 준다. 삭제 버튼을 클릭하면 해당 컴포넌트의 id 값을 onRemove 함수에 인자값으로 넣고 호출한다. 삭제가 정상 작동할 것이다.

```javascript
import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    name: '이름',
    phone: '000-0000-0000',
    id: 0,
  };
  handleRemove = () => {
    // delete 버튼을 킬릭하면 onRemove에 id값을 넣어서 호출
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };
  render() {
    const style = {
      margin: '2px',
      border: '1px solid #ccc',
      padding: '2px',
    };
    const { name, phone } = this.props.info;
    return (
      <div style={style}>
        <div>
          <b>{name}</b>
        </div>
        <div>{phone}</div>
        <button type="button" onClick={this.handleRemove}>
          delete
        </button>
      </div>
    );
  }
}

export default PhoneInfo;
```

## 데이터 수정
수정할 때도 마찬가지로 불변성을 지켜워야 하며, 기존의 배열과 그 내부에 있는 객체를 직접 수정하지 않도록 한다. 예를 들어 아래와 같은 객체로 이루어진 배열이 있다고 가정해 본다.

```javascript
const array = [
  {
    id: 0,
    name: '주영',
    phone: '000-0000-0000',
  },
  {
    id: 1,
    name: '민수',
    phone: '000-0000-0000',
  },
];
```

기존의 값은 건들이지 않고, 객체의 id가 1인 객체의 name 값만 수정을 해보겠다.

```javascript
const modifiedArray = array.map((item) => {
  return item.id === 1 ? { ...item, name: '인성' } : item;
});
console.log(modifiedArray);
// 0: {id: 0, name: "주영", phone: "000-0000-0000"}
// 1: {id: 1, name: "인성", phone: "000-0000-0000"}
```

현재 객체의 id 값이 1인 경우 새로운 객체를 생성하여 기존 값들을 넣은 뒤 name 값만 변경하여 할당 하였다. id 값이 1 아닌 수정이 필요 없는 객체는 기존 값 그대로 할당하였다. 이 원리를 이용하여 전화번호부 정보를 수정하도록 하겠다.

App 컴포넌트에 handleUpdate라는 새로운 함수를 만든다. 이 함수는 id와 data라는 파라미터를 받아와서 필요한 정보를 업데이트 해준다. 이 함수는 PhoneInfoList의 onUpdata로 전달해 준다.

```javascript
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: '주영',
        phone: '000-0000-0000',
      },
      {
        id: 1,
        name: '민수',
        phone: '000-0000-0000',
      },
    ],
  };
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data }),
    });
  };
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((item) => item.id !== id),
    });
  };
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map((info) =>
        info.id === id ? { ...info, ...data } : info
      ),
    });
  };
  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList
          data={this.state.information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
```

이제 하위 컴포넌트 PhoneInfoList를 아래와 같이 수정해 준다.

```javascript
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined'),
  };
  render() {
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map((info) => (
      <PhoneInfo
        key={info.id}
        info={info}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    ));
    return <div>{list}</div>;
  }
}

export default PhoneInfoList;
```

PhoneInfo 컴포넌트가 렌더링 하는 과정에 onUpdate를 그대로 전달하여 주고, onRemove과 마찬가지로 defaultProps도 설정해 준다.

이제 PhoneInfo 컴포넌트를 수정해 준다. 이번에 수정될 코드의 양은 꽤 많다.

```javascript
import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    name: '이름',
    phone: '000-0000-0000',
    id: 0,
  };
  state = {
    // modify 버튼을 클릭했을 때 editing 값은 true로 변경 된다. 이 값이 true 일 때에는, 기존의 텍스트 형태의 값이 input 형태로 변환 되어 수정 할 수 있게 된다.
    editing: false,

    // input 값은 동적이기 때문에 input 값을 담아야 할 값도 설정 한다.
    name: '',
    phone: '',
  };
  handleRemove = () => {
    // delete 버튼을 킬릭하면 onRemove에 id값을 넣어서 호출
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  // 수정 버튼이 클릭 될 때 마다 editing 값이 반전된다.
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing,
    });
  };

  // input 값이 변경될 때 마다 state 값을 현재 값으로 변경해 준다.
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // editing 값이 바뀔 때 처리 할 로직이 있는 함수, 수정을 눌렀을 때는 기존 값이 input에 나타나고, apply 버튼을 누르면 input 값들이 부모한테 전달 된다.
  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      // editing 값이 true로 전활 될 때 info의 값을 state에 넣어준다.
      this.setState({
        name: info.name,
        phone: info.phone,
      });
    }

    if (prevState.editing && !this.state.editing) {
      // editing 값이 false로 전환 될 때 현재 수정하고 있는 객체의 변경된 값을 onUpdate 함수에 태워 보낸다.
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone,
      });
    }
  }

  render() {
    const style = {
      margin: '2px',
      border: '1px solid #ccc',
      padding: '2px',
    };

    const { editing } = this.state;

    // 수정모드
    if (editing) {
      return (
        <div style={style}>
          <div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleRemove}>delete</button>
          <button onClick={this.handleToggleEdit}>apply</button>
        </div>
      );
    }

    // 일반모드
    const { name, phone } = this.props.info;
    return (
      <div style={style}>
        <div>
          <b>{name}</b>
        </div>
        <div>{phone}</div>
        <button type="button" onClick={this.handleRemove}>
          delete
        </button>
        <button type="button" onClick={this.handleToggleEdit}>
          modify
        </button>
      </div>
    );
  }
}

export default PhoneInfo;
```

결과물을 확인해 보면 수정이 잘 되는 것을 확인해 볼 수 있다. 

## References
> [누구든지 하는 리액트 6편: input 상태 관리하기](https://velopert.com/3634)  
> [누구든지 하는 리액트 7편: 배열 다루기 (1) 생성과 렌더링](https://velopert.com/3636)  
> [누구든지 하는 리액트 8편: 배열 다루기 (2) 제거와 수정](https://velopert.com/3638)

<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({ id:390604 });</script>
