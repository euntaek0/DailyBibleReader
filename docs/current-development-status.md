# DailyBibleReader 현재 개발 상황 (GPT Sync)

업데이트 시각: 2026-02-14 21:26:18 KST  
저장소: `https://github.com/euntaek0/DailyBibleReader.git`  
작업 경로: `/Users/euntaek/Desktop/chrome_extension/daily-bible/DailyBibleReader`

## 1) Git 스냅샷

- 현재 브랜치: `feat/importing-issue-fix`
- HEAD 커밋: `1c655fb` (refactor: Replace path aliases with relative imports and remove associated configurations.)
- 원격 추적: `origin/feat/importing-issue-fix` (동기화 상태, 로컬 변경 없음)
- 최근 커밋 흐름:
  - `1c655fb`: path alias 제거 + 상대경로 전환
  - `c999627`: 로컬 import에 명시적 확장자 추가
  - `2ed8654`: `vite base`를 `./`로 설정

## 2) 제품 목표와 현재 범위

- 목표: 한국어 성경 구절/장 낭독 시, 브라우저 내 STT 기반으로 읽기 여부를 판정하는 Chrome Extension 기반 UI 제공
- 서버: 미사용(프론트엔드 중심)
- 현재 제공 모드:
  - `Daily Verse` 낭독 판정
  - `Chapter Reader` (책/장 선택 후 연속 읽기)
  - `Year Plan` (날짜별 연간 통독 플랜 + 장별 진입)

## 3) 구현 상태 요약

### 완료된 핵심 기능

- Web Speech API (`ko-KR`, `continuous`, `interimResults`) 연동
- 발화 텍스트와 목표 verse 간 어절 기반 매칭 점수 계산
- 점수 기반 상태 분류(`READ`, `PARTIAL`, `NOT_READ`)
- 읽은 어절 하이라이트 UI
- Chapter 완료 모달 + 다음 장 이동 버튼
- 연간 통독 플랜(365일) 자동 생성 및 날짜 기반 조회
- 성경 장 텍스트 원격 fetch + 메모리 캐시
- Chrome Extension MV3 매니페스트/서비스 워커 구성

### 현재 구조(핵심 파일)

- 앱 엔트리/뷰 라우팅:
  - `src/App.tsx`
  - `src/components/BottomNavigation.tsx`
- 읽기 화면:
  - `src/pages/VerseReader.tsx`
  - `src/pages/ChapterReader.tsx`
  - `src/pages/YearPlanPage.tsx`
  - `src/components/ReaderView.tsx`
- 로직:
  - `src/hooks/useSpeechRecognition.ts`
  - `src/utils/textMatcher.ts`
  - `src/utils/api.ts`
  - `src/constants/bible.ts`
  - `src/constants/yearPlan.ts`
- 익스텐션 설정:
  - `public/manifest.json`
  - `public/background.js`

## 4) 스펙 대비 체크 (spec 폴더 기준)

### 충족

- FR-1/2: 마이크 입력 + 브라우저 STT 변환 구현
- FR-3/4: 일치율 판정 및 결과 표시 구현
- FR-5: 서버 없이 로컬 처리(단, 성경 본문 데이터 fetch는 외부 정적 JSON 사용)
- FR-6: 모바일 중심 레이아웃 및 터치 가능한 주요 버튼 제공

### 부분 충족/갭

- `spec/05_matching_logic.md`의 "부분 일치 허용(예: 하나님 ⊂ 하나님이)"은 현재 코드에서 **엄격한 토큰 동등 비교** 중심으로 동작
- `ChapterReader`에서 마지막 장 다음의 **권(book) 자동 전환 미구현** (`TODO` 존재)
- 엣지케이스 문서의 모바일 인터럽트/백그라운드 전환 대응은 명시적 핸들링 제한적

## 5) 빌드/검증 상태

실행 시점: 2026-02-14

- `npm run build`: 성공
  - 산출물: `dist/index.html`, `dist/manifest.json`, `dist/background.js`, `dist/assets/*`
  - 주의: 현재 Node `18.16.0`에서 Vite가 `20.19+` 권장 경고 출력
- `npm run lint`: 실패 (총 8 errors)
  - `src/components/ReaderView.tsx`: effect 내부 동기 `setState` (`react-hooks/set-state-in-effect`)
  - `src/constants/bible.ts`:
    - `@ts-nocheck` 금지 규칙 위반
    - 미사용 변수(`bookKeys`)
  - `src/hooks/useSpeechRecognition.ts`:
    - `any` 타입 사용 5건 (`no-explicit-any`)

## 6) 현재 기술 부채 / 리스크

- 타입 안정성 저하:
  - 대형 상수 파일에서 `@ts-nocheck` 사용
  - SpeechRecognition 관련 타입이 `any` 기반
- 린트 미통과 상태로 CI 품질 게이트 도입 시 배포 차단 가능
- 외부 원본 텍스트 URL 의존(`raw.githubusercontent.com`)으로 네트워크/가용성 영향 가능
- 매칭 로직이 스펙의 부분 일치 의도와 다를 수 있어 판정 체감 정확도 이슈 가능

## 7) 다음 우선순위 제안 (실행 순서)

1. 린트 8건 우선 해소(타입 정의 + effect 로직 정리)
2. 매칭 로직을 스펙 의도(부분 일치 허용)로 정렬
3. `ChapterReader`의 책 경계 자동 전환 구현
4. Node 버전을 `20.19+`로 업그레이드해 빌드 환경 일치
5. 최소 E2E/회귀 체크 루틴(핵심 플로우) 추가

## 8) 다른 GPT에 바로 전달 가능한 요약

현재 DailyBibleReader는 `feat/importing-issue-fix` 브랜치에서 import 경로 정리를 마쳤고, 기능적으로 Daily/Chapter/YearPlan 읽기 플로우는 동작한다. 빌드는 통과하지만 린트 8건이 남아 있으며(주로 타입/Effect 규칙), 스펙 대비 핵심 갭은 "부분 일치 매칭"과 "챕터 완료 후 book 전환 미구현"이다. 다음 작업은 린트 정상화와 매칭 로직 정렬이 최우선이다.
