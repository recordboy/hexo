---
title: "자바스크립트 싱글톤 패턴"
date: 2020-02-04 11:42:45
categories: "javascript"
tags: [javascript]
---

전체 시스템에서 하나의 인스턴스만 존재하도록 보장하는 객체 생성패턴을 의미한다. 대표적으로 $를 활용해서 DOM을 조작하고 이벤트도 다루는 jQuery가 있으며, 객체 리터럴도 싱글톤 패턴이라고 할수 있다.(자바스크립트에서 객체 리터럴로 생성한 객체는 다른 객체와 같을 수 없다. 객체 내부의 내용이 같더라도 참조하는 객체가 다르기 때문이다.) 객체 리터널은 한계가 있는데 비공개 프로퍼티 및 함수를 선언할 수 없다.

<!-- more -->

```javascript
var obj = {
    name: 'myName',
    get: function () {
        return this.name;
    }
}
console.log(obj.get()); // myName
```

비공개 프로퍼티 및 함수를 정의하려면 클로저(closure)를 활용해야 한다. 즉 제대로 된 싱글톤 패턴은 객체 리터널 + 클로저의 조합이 필요하다고 할 수 있다. 아래 코드를 확인해보면

```javascript
var singleton = (function () {

    // 비공개 프로퍼티 정의
    var instance;

    // 비공개 메서드 정의
    function init() {

        // singleton 인스턴스 정의
        return {

            // 공개 프로퍼티 정의
            prop: 'value',

            // 공개 메서드 정의
            method: function () {
                return 'hello'
            }

        };

    }

    // 공개 메서드인 getInstance를 정의한 객체, 비공개 프로퍼티 및 메서드에 접근 가능(클로저)
    return {

        getInstance: function () {

            // 인스턴스가 선언이 안되있는경우 인스턴스 생성
            if (!instance) {
                instance = init();
            }

            // 인스턴스가 선언이 되있는 경우 인스턴스 반환
            return instance;

        }
    }
})();

var singleton1 = singleton.getInstance();
console.log(singleton1.method());
var singleton2 = singleton.getInstance();
console.log(singleton1 === singleton2); // true
```

위 코드는 비공개 메서드인 init()의 return문에서 객체 리터럴로 정의되는 인스턴스가 싱글톤 객체이며, 전체 시스템에서 하나만 존재하게 된다. 순서대로 보면 익명함수의 return문에는 싱글톤 객체를 구하는 공개 메서드(getInstance)를 포함한 객체를 반환하며, getInstance메서드는 instance값을 확인해 인스턴스가 선언이 안되있는 경우 비공개 메서드인 init를 호출하여 singleton인스턴스를 생성하여 instance에 할당하게 된다. 이렇게 일반적으로 싱글톤 패턴에서는 이미 객체가 생성되었는지 여부를 알려주는 instance와 같은 내부 변수가 필요하다. 그리고 싱글톤 패턴에서는 내부 변수에 접근할 수 있는 객체를 반환하는 클로저를 이용해야 한다.

정리를 하면 내부의 getInstance메서드에서 비공개 프로퍼티인 instance에 접근할 수 있다는 것과, getInstance메서드의 호출이 끝나더라도 instance의 값은 계속 유지되는 특성(클로저)를 이용해 prop, method()이 포함된 객체를 유일하게 생성하게 된다. 그래서 singleton.getInstance()를 몇번이나 호출하더라도 얻는 객체는 모두 동일한 싱글톤 객체를 가리키게 된다.

## References
> [싱글톤(singleton) 패턴](https://webclub.tistory.com/150)
