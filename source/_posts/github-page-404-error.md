---
title: "깃허브 페이지에서 404 오류 나올 경우"
date: 2020-03-03 19:50:48
categories: "github"
tags: [github]
thumbnail: "/gallery/thumbnail-github.png"
---

깃허브 호스팅 페이지가 404에러가 뜰 경우 아래 명령어를 실행하자, 설명은 아래 레퍼런스 참조

<!-- more -->

```
$ git commit --allow-empty -m 'Trigger rebuild'
$ git push origin
```

## References
> [How to fix HTTP 404 on Github Pages?](https://stackoverflow.com/questions/11577147/how-to-fix-http-404-on-github-pages/45907768#45907768)
