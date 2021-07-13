---
title: "[Algorithm] 프로그래머스 코딩테스트 풀이 - 해시"
date: 2021-07-13 10:30:22
categories: [front-end, javascript]
tags: [algorithm, javascript, hash]
# thumbnail: "/gallery/thumbnail-js.png"
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

코딩테스트 플랫폼인 프로그래머스에서 해시 문제 및 풀이를 포스팅해보았다. 언어는 자바스크립트를 기준으로 작성하였다.

<!-- more -->

**해시**  
해시란 데이터를 다루는 기술중 하나로서 해시함수를 이용하여 임의의 길이를 갖는 데이터를 고정된 길이의 데이터로 매핑하는 것을 말한다.

## 완주하지 못한 선수

### 문제 설명

수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.  
마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

### 제한 사항

- 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
- completion의 길이는 participant의 길이보다 1 작습니다.
- 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
- 참가자 중에는 동명이인이 있을 수 있습니다.

### 입출력 예

| participant                                       | completion                               | return   |
| ------------------------------------------------- | ---------------------------------------- | -------- |
| ["leo", "kiki", "eden"]                           | ["eden", "kiki"]                         | "leo"    |
| ["marina", "josipa", "nikola", "vinko", "filipa"] | ["josipa", "filipa", "marina", "nikola"] | "vinko"  |
| ["mislav", "stanko", "mislav", "ana"]             | ["stanko", "ana", "mislav"]              | "mislav" |

### 입출력 예 설명

**예제 #1**
"leo"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

**예제 #2**
"vinko"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

**예제 #3**
"mislav"는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.

### 풀이

#### 코드

```javascript
const participant = ["mislav", "stanko", "mislav", "ana"];
const completion = ["stanko", "ana", "mislav"];

function solution(participant, completion) {
  let answer = "";

  // 각 배열을 이름순으로 정렬
  participant.sort();
  completion.sort();

  // 루프를 돌며 이름이 일치하지 않을 경우 결과를 담고 리턴
  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) {
      answer = participant[i];
      break;
    }
  }

  return answer;
}

console.log(solution(participant, completion));
```

#### 설명

반복문을 돌며 이름을 비교할 것이며 그 전에 동명이인이 있을 수 있기 때문에, 각 배열에 `sort` 함수를 사용하여 이름순으로 정렬한다. 반복문이 돌면서 이름을 매칭해보고 이름이 다를경우 해당 참여자를 응답값에 담고, 완주하지 못한 선수는 단 한명이기 때문에 값을 리턴하고 로직을 빠져나온다.

## 위장

### 문제 설명

스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.  
예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.

| 종류 | 이름                       |
| ---- | -------------------------- |
| 얼굴 | 동그란 안경, 검정 선글라스 |
| 상의 | 파란색 티셔츠              |
| 하의 | 청바지                     |
| 겉옷 | 긴 코트                    |

스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.

### 제한 사항

- clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
- 스파이가 가진 의상의 수는 1개 이상 30개 이하입니다.
- 같은 이름을 가진 의상은 존재하지 않습니다.
- clothes의 모든 원소는 문자열로 이루어져 있습니다.
- 모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '\_' 로만 이루어져 있습니다.
- 스파이는 하루에 최소 한 개의 의상은 입습니다.

### 입출력 예

| clothes                                                                                  | return |
| ---------------------------------------------------------------------------------------- | ------ |
| [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]] | 5      |
| [["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]]             | 3      |

### 입출력 예 설명

**예제 #1**
headgear에 해당하는 의상이 yellow_hat, green_turban이고 eyewear에 해당하는 의상이 blue_sunglasses이므로 아래와 같이 5개의 조합이 가능합니다.

**예제 #2**
face에 해당하는 의상이 crow_mask, blue_sunglasses, smoky_makeup이므로 아래와 같이 3개의 조합이 가능합니다.

1. crow_mask
2. blue_sunglasses
3. smoky_makeup

### 풀이

#### 코드

```javascript
const clothes = [
  ["yellowhat", "headgear"],
  ["bluesunglasses", "eyewear"],
  ["green_turban", "headgear"],
];

function solution(clothes) {
  let answer = 1; // 리턴값, 마지막에 곱셉을 하기 때문에 0으로 하면 안됨
  let obj = {}; // 의상 종류마다 갯수를 담을 객체

  for (let i = 0; i < clothes.length; i++) {
    // 중복되는 키값이 존재한다면 1 더함
    if (obj[clothes[i][1]] >= 1) {
      obj[clothes[i][1]] += 1;

      // 처음 등장하는 의상이면 1로 초기화
    } else {
      obj[clothes[i][1]] = 1;
    }
  }

  // 경우의 수 곱셈, (2 + 1) X (1 + 1)
  for (let key in obj) {
    answer *= obj[key] + 1;
  }

  // 아무것도 입지 않는 경우는 빼줌
  return answer - 1;
}

console.log(solution(clothes));
```

#### 설명

리턴값은 다른 옷의 조합수로서 이럴땐 경우의 수 공식을 사용하면 된다. 예제 #1로 예를 들면 모자의 경우의수는 2개며 안경의 경우의수는 1개다.

- headgear: yellowhat, green_turban
- eyewear: bluesunglasses

경우의 수 공식에 따라, `2 X 1 = 2`가 되야하지만, 모자나 안경을 안쓰는 경우도 있으니 각 경우의 수에 1씩 더해주서 `(2 + 1) X (1 + 1) = 6`이 된다. 여기서 아무것도 입지 않는 경우는 빼야 되므로 최종 경우의 수에 1을 빼준다. 최종적으로 `(2 + 1) X (1 + 1) - 1 = 5 ` 수식이 된다. 이 방법으로 코드를 위처럼 작성하면 된다.

## 베스트앨범

### 문제 설명

스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다. 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

1. 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
2. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.

노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때, 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

### 제한사항

- genres[i]는 고유번호가 i인 노래의 장르입니다.
- plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
- genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
- 장르 종류는 100개 미만입니다.
- 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
- 모든 장르는 재생된 횟수가 다릅니다.

### 입출력 예

| genres                                          | plays                      | return       |
| ----------------------------------------------- | -------------------------- | ------------ |
| ["classic", "pop", "classic", "classic", "pop"] | [500, 600, 150, 800, 2500] | [4, 1, 3, 0] |

### 입출력 예 설명

classic 장르는 1,450회 재생되었으며, classic 노래는 다음과 같습니다.

- 고유 번호 3: 800회 재생
- 고유 번호 0: 500회 재생
- 고유 번호 2: 150회 재생

pop 장르는 3,100회 재생되었으며, pop 노래는 다음과 같습니다.

- 고유 번호 4: 2,500회 재생
- 고유 번호 1: 600회 재생
  따라서 pop 장르의 [4, 1]번 노래를 먼저, classic 장르의 [3, 0]번 노래를 그다음에 수록합니다.

### 풀이

#### 코드

추가 내용 업로드 예정
