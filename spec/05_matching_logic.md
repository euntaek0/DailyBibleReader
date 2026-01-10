# Matching Logic

## Normalization

- 한글과 공백을 제외한 모든 문자는 제거한다.
- 연속된 공백은 하나로 치환한다.
- 앞뒤 공백은 제거한다.

## Tokenization

- 기준 verse는 공백 기준으로 어절 단위 분리한다.
- 인식된 텍스트는 문자열 전체로 유지한다.

## Matching Rule

- 기준 어절이 인식된 텍스트에 포함되면 hit으로 간주한다.
- 부분 일치도 허용한다.
  - 예: "하나님" ⊂ "하나님이"

## Score Calculation

- score = hitCount / totalWordCount

## Threshold

- score ≥ 0.6 → 읽음
- 0.3 ≤ score < 0.6 → 부분 읽음
- score < 0.3 → 읽지 않음
