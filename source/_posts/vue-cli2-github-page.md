---
title: "Vue Cli 2.x를 이용한 Github페이지 만들기"
date: 2019-11-02 09:58:43
categories: "vue.js"
tags: [vue.js]
---

Vue Cli 2.x 버전을 이용하여 프로젝트를 생성하고 깃허브 페이지에 적용하는 방법을 알아보도록 한다.

<!-- more -->

## 설치 시작
프로젝트 설치할 디렉토리로 가서 웹팩 설치뒤에 해당 디렉토리로 이동, npm까지 설치해준다.

```
$ vue webpack init 'projact name'
$ cd 'projact name'
$ npm install
```

설치가 완료되면 config 디렉토리의 index.js파일을 열어준 뒤 `build` 값을 아래처럼 수정해준다.

```javascript
build: {
    index: path.resolve(__dirname, '../docs/index.html'),
    assetsRoot: path.resolve(__dirname, '../docs'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
}
```

**수정되는 항목**
* `index` 에서 `dist` > `docs`
* `assetsRoot` 에서 `dist` > `docs`
* `assetsPublicPath` 에서 `'/'` > `''`

수정이 완료되면 빌드해준다.

```
$ npm run build
```

빌드후에 깃허브 원격저장소에 push를 해준뒤 원격저장소 세팅페이지로 들어간다.  
GitHub Pages 항목에서 Source 옵션을 master branch /docs folder로 선택해주면 끝이다.  
페이지 url은 `https://[유저이름].github.io/[저장소이름]/` 로 들어가면 된다. 위에까지의 과정은 [이곳](https://stackoverflow.com/questions/47615863/problems-deploying-to-github-pages-with-vue-project)에 쉽게 잘 정리되어 있다.


## References
> [vue github page 만들기](https://yhmane.tistory.com/72)  
> [Problems deploying to github pages with vue project](https://stackoverflow.com/questions/47615863/problems-deploying-to-github-pages-with-vue-project)
