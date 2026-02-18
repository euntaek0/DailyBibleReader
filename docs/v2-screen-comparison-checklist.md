# V2 Screen Comparison Checklist

기준 diff: `codex/v2-design-system-primitives..codex/v2-ios-modern-polish`

## 1) Branch Diff Scope (파일 기준)
- Global/System: `src/styles/globals.css`, `src/components/system/AppShell.tsx`, `src/components/system/PageContainer.tsx`, `src/components/system/TopBar.tsx`, `src/App.tsx`
- Navigation: `src/components/BottomNavigation.tsx`
- Core UI: `src/components/ui/button.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/board-row.tsx`, `src/components/ui/card.tsx`, `src/components/ui/switch.tsx`
- Page/Feature: `src/pages/VerseReader.tsx`, `src/components/ReaderView.tsx`, `src/pages/ChapterReader.tsx`, `src/pages/YearPlanPage.tsx`, `src/pages/SettingsPage.tsx`, `src/pages/LoginPage.tsx`
- Storybook: `.storybook/preview.tsx`, `src/stories/ui/Button.stories.tsx`, `src/stories/ui/Badge.stories.tsx`, `src/stories/ui/BoardRow.stories.tsx`, `src/stories/components/ReaderView.stories.tsx`

## 2) 화면별 비교 체크리스트

### Global / Shell
- [ ] `src/styles/globals.css`: light/dark semantic token(`bg/surface/text/border`) 계층 동일성
- [ ] `src/components/system/AppShell.tsx`: safe-area + 상하 구조 일관성
- [ ] `src/components/system/PageContainer.tsx`: `withBottomInset` + `withMicDockInset` 충돌 여부
- [ ] `src/components/system/TopBar.tsx`: `appearance="translucent"` 기본값에서 타이틀/액션 정렬

### Today (VerseReader)
- [ ] `src/pages/VerseReader.tsx`: 카드 중첩 제거 + 말씀 중심 레이아웃 유지
- [ ] `src/pages/VerseReader.tsx`: 정확도 텍스트 제거 유지
- [ ] `src/components/system/MicControl.tsx`: BNB 상단 도킹/정렬 및 상태별 톤

### Reader (ChapterReader + ReaderView)
- [ ] `src/components/ReaderView.tsx`: 진행률/본문/상태 계층 대비(제목-본문-메타)
- [ ] `src/components/ReaderView.tsx`: loading/error에서 과도한 카드 레이어 없는지
- [ ] `src/components/ReaderView.tsx`: MicControl 하단 도킹과 스크롤 콘텐츠 충돌
- [ ] `src/pages/ChapterReader.tsx`: 책/장 선택 화면과 본문 화면 여백 리듬

### YearPlan
- [ ] `src/pages/YearPlanPage.tsx`: 리스트 밀도와 카드 깊이 규칙 일관성
- [ ] `src/pages/YearPlanPage.tsx`: 버튼/배지 토큰 체계 일관성

### Settings
- [ ] `src/pages/SettingsPage.tsx`: 토글/선택 리스트의 `BoardRow` 패턴 통일
- [ ] `src/components/ui/board-row.tsx`: `control ?? trailing` 우선 렌더 실사용 확인

### Login
- [ ] `src/pages/LoginPage.tsx`: 입력 폼 간격(8px grid) + 버튼 계층(Primary/Secondary)
- [ ] `src/pages/LoginPage.tsx`: line-height/텍스트 대비 과도한 느슨함 제거

### Bottom Navigation
- [ ] `src/components/BottomNavigation.tsx`: 활성 상태가 `아이콘+텍스트 색+dot`만 변경
- [ ] `src/components/BottomNavigation.tsx`: 아이콘 크기/라벨 균형

## 3) Storybook Focus Pass (우선 확인 완료)
- [x] `UI/Button` (`src/stories/ui/Button.stories.tsx`): matrix 겹침 없음, 섹션 간 간격 정상
- [x] `UI/Badge` (`src/stories/ui/Badge.stories.tsx`): 6 color x 2 tone x 4 size 매트릭스 정상
- [x] `UI/Board Row` (`src/stories/ui/BoardRow.stories.tsx`): collapsed/expanded/child 패턴 정상
- [x] `Components/ReaderView` (`src/stories/components/ReaderView.stories.tsx`): default/loading/error 상태 렌더 정상

## 4) 이번 미세 튜닝 반영
- [x] `src/components/ui/button.tsx`: 로딩 점(ellipsis) 크기/애니메이션 대비 강화
- [x] `src/components/ui/badge.tsx`: soft neutral/signal/notread 텍스트 대비 강화
- [x] `src/components/ReaderView.tsx`: loading/error 밀도, 카드 계층, Mic 폭 미세 조정
- [x] `.storybook/preview.tsx`: `wide/full` 프레임 내부 스크롤 해제(가시성 개선), `mobile`만 컨테이너 스크롤 유지

## 5) 최종 확인 순서
1. Storybook 우선 확인: `UI/Button` → `UI/Badge` → `UI/Board Row` → `Components/ReaderView`
2. 앱 수동 확인: Today → Reader → YearPlan → Settings → Login
3. 라이트/다크 교차 확인 후 잔여 이슈만 추가 튜닝
