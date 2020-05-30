---
title: "깃허브 블로그(Jekyll) SEO 세팅"
date: 2019-12-01 10:15:25
categories: [Git, Github]
tags: [Github, Jekyll, SEO]
thumbnail: "/gallery/thumbnail-github.png"
toc: true
---

## 검색 엔진 최적화(Search Engine Optimization)
검색엔진이 이해하기 쉽도록 홈페이지 구조를 설정하여 포털 사이트 상위에 노출시키는 작업이다. jekyll으로 제작된 깃허브 블로그에 SEO 작업을 진행하겠다.

<!-- more -->

## Sitemap
* 웹 크롤링 로봇이 이용할 수 있는 웹사이트의 접근 가능한 페이지의 목록
* 사이트맵을 등록하면 구글에서 주기적으로 크롤링을 한 뒤 관련 검색어로 검색 시 해당 사이트가 노출이 된다.
* sitemap.xml 파일을 사용하면 사이트 구조를 구글, 네이버, 다음 등 검색엔진에 손 쉽게 제출할 수 있다.
* 검색엔진에 크롤링해야하는 URL을 알려줌으로써 색인을 생성하는 방법과 색인을 생성하는 방법을 제어한다.

### Sitemap.xml 생성하기
1. 루트 경로에 root 디렉토리를 생성해 준다.
2. 아래 내용으로 sitemap.xml 파일을 만들고 root 디렉토리에 넣어준다.

```
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for post in site.posts %}
    <url>
      <loc>{{ site.url }}{{ post.url }}</loc>
      {% if post.lastmod == null %}
        <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
      {% else %}
        <lastmod>{{ post.lastmod | date_to_xmlschema }}</lastmod>
      {% endif %}

      {% if post.sitemap.changefreq == null %}
        <changefreq>weekly</changefreq>
      {% else %}
        <changefreq>{{ post.sitemap.changefreq }}</changefreq>
      {% endif %}

      {% if post.sitemap.priority == null %}
          <priority>0.5</priority>
      {% else %}
        <priority>{{ post.sitemap.priority }}</priority>
      {% endif %}

    </url>
  {% endfor %}
</urlset>
```

3. 해당 파일을 커밋, 푸쉬 한다.
4. 블로그 주소/sitemap.xml 에 들어가서 제대로 사이트맵이 등록되었는지 확인해 보자
5. 홈페이지의 모든글의 정보를 담고있는 사이트맵이 출력되는 것을 알 수 있다. 추후에 블로그 포스팅을 푸쉬 하면 jekyll이 빌드하면서 사이트맵도 자동으로 갱신된다.
6. 사이트 맵에서 특정글의 정보를 변경하고 싶으면 아래와 같이 특정 글의 설정 값을 변경해 주면 된다. changefreq를 너무 짧게 하면 빈번한 접속으로 안좋은 영향을 미칠수 있다고 한다. 설정이 없을때 default 값은 사이트맵에 정의되어 있다.

```
layout: post
title: "제목"
date: 0000-00-00 12:00:00 
lastmod : 0000-00-00 12:00:00
sitemap :
  changefreq : daily
  priority : 1.0
---
```
7. 참고로 /sitemap.xml을 실행했을 때 제대로 안나오는 경우가 있는데, 주소 링크에 특수문자가 들어간 경우이다. 깃허브 블로그의 경우 포스팅 파일명으로 링크가 생성되므로 포스팅 파일명은 특수문자 및 한글 사용을 안하도록 한다.

## RSS
* RSS(Rich Site Summary)란 뉴스나 블로그 사이트에서 주로 사용하는 콘텐츠 표현 방식이며, 웹 사이트 관리자는 RSS 형식으로 웹 사이트 내용을 보여 준다.
* RSS피드는 정기적으로 업데이트 되는 웹 콘텐츠를 전달해 주는 형태이며, 글의 전체 혹은 요약된 정보와 작성자 등의 정보가 포함되어 있다. 즉 블로그의 글을 작성하면 RSS피드에도 전달이 되고, 구글, 네이버, 다음 등을 통해 글을 검색하면, 검색 엔진은 블로그의 RSS피드로부터 글을 받게 되어 해당 블로그로 들어오게 된다.

### RSS feed.xml 생성하기
1. 사이트맵과 동일하게 아래 코드를 넣어준 뒤 feed.xml 파일을 만들고 root 디렉토리에 넣어준다.

```
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ site.title | xml_escape }}</title>
    <description>{{ site.description | xml_escape }}</description>
    <link>{{ site.url }}{{ site.baseurl }}/</link>
    <atom:link href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}" rel="self" type="application/rss+xml"/>
    <pubDate>{{ site.time | date_to_rfc822 }}</pubDate>
    <lastBuildDate>{{ site.time | date_to_rfc822 }}</lastBuildDate>
    <generator>Jekyll v{{ jekyll.version }}</generator>
    {% for post in site.posts limit:30 %}
      <item>
        <title>{{ post.title | xml_escape }}</title>
        <description>{{ post.content | xml_escape }}</description>
        <pubDate>{{ post.date | date_to_rfc822 }}</pubDate>
        <link>{{ post.url | prepend: site.baseurl | prepend: site.url }}</link>
        <guid isPermaLink="true">{{ post.url | prepend: site.baseurl | prepend: site.url }}</guid>
        {% for tag in post.tags %}
        <category>{{ tag | xml_escape }}</category>
        {% endfor %}
        {% for cat in post.categories %}
        <category>{{ cat | xml_escape }}</category>
        {% endfor %}
      </item>
    {% endfor %}
  </channel>
</rss>
```

2. 해당 파일을 커밋, 푸쉬 하고 블로그 주소/feed.xml 에 제대로 등록되었는지 확인해 보자.

## robots.txt
robots.txt는 로봇 배제 표준을 따르는 일반 텍스트 파일이다. 쉽게 표현하면 검색 엔진이 해당 사이트의 콘텐츠를 가져가도 허락하는 부분과 가져가면 안된다 라는 설정을 하는 부분이라고 보면 된다. 위와 동일하게 root 디렉토리에 위치한다.

### robots.txt 생성
1. robots.txt 파일을 만들고 아래와 같이 입력한다.

```
User-agent: *
Allow: /

Sitemap: https://recordboy.github.io/sitemap.xml
```

2. User-agent는 허용할 검색엔진 명을 넣게 된다. 따로 설정하지 않으면(*) 모든 검색엔진을 허용하게 된다. Sitemap은 본인 블로그 사이트맵 주소를 넣어 주면 된다.

## 블로그 등록
본인 블로그를 등록 해야 구글 및 네이버에서 검색이 가능하다.

### Google Search Console
1. [Google Search Console](https://www.google.com/webmasters/#?modal_active=none)에 접속한다. SEARCH CONSOLE 버튼을 클릭한다.
2. 속성 유형 선택화면이 나오면 URL 접두어 방식을 선택 후 해당 블로그 주소를 등록한다.
3. 메타 태그를 이용한 사이트 소유권을 확인한 뒤 사이트맵을 등록해주면 된다. ([여기에 설명이 참 잘 되어있다.)](https://imweb.me/faq?mode=view&category=29&category2=35&idx=15573) 구글 애널리틱스에 같은 계정으로 가입이 되어있으면 자동으로 소유 확인이 된다. 

### Naver Webmaster 
1. [네이버 웹마스터 도구에 접속한다.](https://searchadvisor.naver.com/)
2. 로그인하고 블로그 주소를 등록해 사이트를 추가해 준다.
3. 웹마스터 도구에서 제공하는 html 파일을 다운받아 본인 블로그에 업로드하거나 메타태그를 이용하는 방법으로 사이트 소유권을 확인한다.
4. 왼쪽 요청 메뉴로 들어가 사이트맵을 제출해준다.
5. 깃허브에서 공식적으로 지원하는 jekyll블로그는 RSS2.0이 아닌, ATOM이라는 방식으로 feed.xml을 생산해준다. 그리고 ATOM방식으로 제작된 피드는 네이버 웹마스터도구에 등록이 안된다.

## References
> [github blog를 google에서 검색되도록 설정하기](http://jinyongjeong.github.io/2017/01/13/blog_make_searched)  
> [구글(Google) 검색에 내 사이트 등록하기](https://imweb.me/faq?mode=view&category=29&category2=35&idx=15573)  
> [홈페이지 검색 잘 되도록 만들기](http://dveamer.github.io/homepage/SubmitSitemap.html)  
> [RSS피드란?](https://4343282.tistory.com/164)  
> [robots.txt 파일 만들기](https://support.google.com/webmasters/answer/6062596?hl=ko)
