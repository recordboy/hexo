---
title: "[Vue] Vue Cli 3.x를 이용한 Github페이지 만들기"
date: 2019-11-05 10:03:22
categories: [front-end, vue.js]
tags: [vue.js]
# thumbnail: "/gallery/thumbnail-vue.png"
widgets:
  - type: toc
    position: right
  - type: categories
    position: right
  - type: tags
    position: right
sidebar:
  right:
    sticky: true
---

Vue Cli 2.x 버전을 이용하여 프로젝트를 생성하면 웹펙 설정파일이 자동으로 생성되지만 3.x 버전부터는 직접 만들어줘야 한다. 때문에 2.x 버전하고 방법이 약간 다르다.

<!-- more -->

설치할 디렉터리로 가서 프로젝트를 생성해 준다.

```
$ vue create 'ProjectName'
```

프로젝트 폴더로 이동하여 원격 저장소에 연결시켜 준 뒤 푸쉬해준다.

```
cd 'ProjectName'
git remote add origin 'url'
git push origin master
```

코드를 빌드하면 `dist` 디렉토리에 출력되어도록 되어있기 때문에 `vue.config.js` 파일을 만들어서 설정을 변경해둔다. 우선 최상단 디렉터리에 `vue.config.js`파일을 생성해 준 뒤 아래 코드를 입력해준다. 원격 저장소의 프로젝트명과 동일하게 `publicPath`를 수정해준다.

```javascript
// vue.config.js 
module.exports = {
    publicPath: '/ProjectName/',
    outputDir: 'docs'
}
```
빌드를 하면 `/docs` 디렉토리가 생성된다. 후에 최상단 디렉터리의 `.gitignore` 파일에 `/dist` 를 주석처리 해준다. 이제 깃에 푸쉬해준다.

```
git add ./
git commit -m "commit message"
git push origin
```
이제 깃허브로 들어가서 저장소 설정으로 간 뒤 `GitHub Pages` 항목에서 `master branch /docs folder` 를 셀렉해준다. 이제 `https://[유저이름].github.io/[저장소이름]` 으로 들어가면 뷰 페이지를 확인할 수 있다. (반영에 시간이 조금 걸린다. 당분간은 404가 표시되어있다.)

## References
> [vue-cli で作ったサイトを GitHub Pages にデプロイする](http://blog.snowcait.info/2019/03/23/vue-js-on-github-pages)  
> [Deploy vue-cli 3 project to github pages](https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd)
