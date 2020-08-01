---
title: "[Crawling] 웹 크롤링(Web Crawling)"
date: 2019-08-20 08:54:33
categories: [node.js]
tags: [web crawling, node.js]
thumbnail: "/gallery/thumbnail-node.png"
toc: true
---

특정 데이터가 필요한 경우 Node.js를 이용하여 웹 크롤링을 하면 쉽게 데이터를 추출할 수 있다.

<!-- more -->

## 설치 환경
* node.js
* npm

## 설치 모듈
* request  
웹 페이지의 HTML문서를 그대로 가져오기 위한 모듈
* cheerio  
HTML 문서를 파싱(parsing)하여 필요한 정보만을 가져올 수 있도록 도와주는 모듈, 제이쿼리 셀렉터를 사용할 수 있다.

## 작업 순서
1. 원하는 디렉토리에 폴더 생성 후 js 파일 생성(crawling.js로 만들었음)
2. 터미널에서 프로젝트 폴더로 진입
3. package 생성(이름만 설정한뒤 모두 예스)
```
& npm init
```

4. 필요 모듈 설치
```
$ npm install cheerio   
$ npm install request
```

5. package.json 파일에 아래처럼 해당 모듈의 버전이 나타난다면 제대로 설치가 된 것이다.
```javascript
"dependencies": {
  "cheerio": "^1.0.0-rc.2",
  "request": "^2.83.0"
}
```

6. 생성한 crawling.js 파일에 설치한 모듈을 불러준다.
```javascript
var cheerio = require('cheerio');
var request = require('request');
```

7. url 변수에 파싱할 주소를 입력하고, request 모듈을 이용하여 웹페이지를 로드한다.
```javascript
var url = 'http://www.naver.com';
request(url, function (error, response, html){
    var $ = cheerio.load(html);
    // 여기서 제이쿼리 셀렉터를 이용하여 원하는 정보를 가져올 수 있다.
});
```

8. 아래는 전체 코드이다.
```javascript
var cheerio = require('cheerio');
var request = require('request');

var url = 'http://www.naver.com';

request(url, function (error, response, html){
    var $ = cheerio.load(html);

    // 여기서 제이쿼리 셀렉터를 이용하여 원하는 정보를 가져올 수 있다.

    console.log($('.naver_logo').text())

});
```

## References
> [Node.js로 멜론 순위 차트 데이터 파싱](http://leechoong.com/posts/2017/nodejs_cheerio)  
> [[Node.js] node.js환경에서 웹 크롤링 하기(cheerio-httpcli)](https://hanswsw.tistory.com/6)  
> [[Node.js] 크롤링 DOM parsing ( request, cheerio, iconv 모듈 )](https://victorydntmd.tistory.com/94)
