---
title: "React Props, State"
date: 2020-03-08 19:59:22
categories: "react"
tags: [react]
thumbnail: "/gallery/thumbnail-react.png"
toc: true
---

리액트에서 다루는 데이터는 두개로 나뉜다. 바로 props와 state인데, 요약하여 설명하자면 props는 부모 컴포넌트가 자식 컴포넌트에게 주는 값이다. 자식 컴포넌트에서는 props를 받아오기만 하고, 받아온 props를 직접 수정할 수는 없다. 자식 입장에서 읽기 전용인 데이터이다. 반면에 state는 컴포넌트 내부에서 선언하며, 내부에서 값을 변경할 수 있다. 자신이 들고있는 값이며 props와 비교한다면, 쓰기 전용이라고 볼 수 있다. 

<!-- more -->

## props

예제를 통해 props과 state를 알아보겠다. `src`디렉토리에 `components`디렉토리를 생성한 뒤 컴포넌트를 `MyNmae.js`파일을 만든 후 `MyName`컴포넌트를 추가하도록 하겠다.

```javascript
import React, { Component } from 'react';

class MyName extends Component {
    render() {
        return(
            <span>{this.props.name}</span>
        )
    }
}

export default MyName;
```

자신이 받아온 props의 값은 `this` 키워드를 통해 조회할 수 있다. `App.js`파일을 아래와 같이 수정하겠다.

```javascript
import React, { Component } from 'react';
import MyName from './components/MyName'

class App extends Component {
  render() {
    return (
      <div>
        this is <MyName name="my-app" /> // this is my-app
      </div>
    );
  }
}

export default App;
```

화면에 this is my-app 라고 출력되는 것을 확인할 수 있다. `MyName`컴포넌트는 부모 컴포넌트인 `App`컴포넌트안의 `MyName`에서 선언한 `name`값을 `this.props.name`구문을 이용하여 값을 가져오고 있다.

### defaultProps

가끔 실수로 props를 빠트려먹거나, 특정한 상황에 props를 일부러 비워야 할 때가 있다. 그러한 경우에 props의 기본 값을 설정해 줄 수 있는데, 그것이 defaultProps이다.

```javascript
import React, { Component } from 'react';

class MyName extends Component {
    static defaultProps = {
        name: 'basic-app'
    }
    render() {
        return(
            <span>{this.props.name}</span>
        )
    }
}

export default MyName;
```

`MyName`컴포넌트의 render함수 위에 defaultProps를 이용해 기본값을 선언해 준 뒤 `App`컴포넌트의 `MyName`의 `name`값을 지워주면 결과가 `name`의 기본 값인 `this is basic-app`로 보여진다.

```javascript
import React, { Component } from 'react';
import MyName from './components/MyName'

class App extends Component {
  render() {
    return (
      <div>
        this is <MyName /> // this is basic-app
      </div>
    );
  }
}

export default App;
```

## state

state는 위에서 쓰기 전용이라고 말한 것처럼 동적인 데이터를 다룰 때 사용된다. `Counter`라는 새로운 컴포넌트를 만들어 준다.

```javascript
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0
  }

  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return (
      <div>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```

`App.js`파일도 아래처럼 수정해 준다.

```javascript
import React, { Component } from 'react';
import Counter from './components/Counter';

class App extends Component {
    render() {
        return(
            <Counter />
        )
    }
}

export default App; 
```

이제 `+`, `-`버튼을 클릭해보면 값이 정상적으로 증가, 감소하는 것을 확인할 수 있다. state 정의는 [class fields](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)문법으로 정의되었으며, class fields문법을 사용하지 않는다면 아래와 같이 사용하면 된다. class fields를 사용하는 이유는 편의를 위함이다. 

```javascript
import React, { Component } from 'react';

class Counter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
  }

  // state = {
  //   number: 0
  // }

  ...

}
```

## 메소드 작성
컴포넌트에서 메소드를 작성할 때 아래와 같이 작성된 것을 확인할 수 있다.

```javascript
handleIncrease = () => {
  this.setState({
    number: this.state.number + 1
  });
}
```
위 화살표 함수로 작성된 메서드는 컴포넌트 안에서 아래와 같은 형식으로도 작성할 수 있는데, 이렇게 하면, 이벤트가 발생했을 때, this가 undefined로 나타나서 제대로 처리가 되지 않는다.

```javascript
handleIncrease() {
    this.setState({
        number: this.state.number + 1 // TypeError
    });
    console.log(this) // undefined
}
```

이는 함수가 버튼의 클릭이벤트로 전달이 되는 과정에서 this와의 연결이 끊켜버리기 때문인데, 이를 고쳐주려면 constructor에서 아래처럼 추가해주거나 화살표 함수 형태로 하면 this가 풀리는 것을 해결할 수 있다.

### setState
각 메소드에 들어있는 **this.setState는 state값을 바꾸기 위해서는 무조건 사용**해줘야 하는데, 리액트에서는 이 함수가 호출되면 컴포넌트가 리렌더링 되도록 설계되어 있기 때문이다. setState의 몇가지 특징을 알아보겠다.

#### setState 는, 객체로 전달되는 값만 업데이트를 해준다.
지금은 state에 number값만 있지만 만약 다음과 같은 값이 있다고 가정을 해보자

```javascript
state = {
  number: 0,
  foo: 'bar'
}
```
이벤트에 `this.setState({ number: 1 });`을 전달해주면, foo는 그대로 남고, number값만 업데이트가 된다.

#### setState는 객체의 깊숙한곳 까지 확인하지 못한다.
예를 들어, state가 다음과 같이 설정되어 있다고 판단해보자
```javascript
state = {
  number: 0,
  foo: {
    bar: 0,
    foobar: 1
  }
}
```

아래와 같이 전달한다고 해서 foobar값이 바뀌지 않는다.
```javascript
this.setState({
  foo: {
    foobar: 2
  }
})
```

추후 업데이트 예정

## References
> [누구든지 하는 리액트 4편: props 와 state](https://velopert.com/3629)  
> [React 기억법(4) - React 필수요소 props, state](https://trustyoo86.github.io/react/2017/11/18/props-state-react.html)
