# DailyBibleReader UI/UX Rules v2

## Why this exists
이 문서는 화면별 임의 스타일링을 막고, 동일한 규칙으로 디자인 시스템을 유지하기 위한 기준입니다.

## Source guidelines used
- shadcn/ui Theming: CSS variables + semantic color convention (`background`/`foreground`)  
  https://ui.shadcn.com/docs/theming
- shadcn/ui CLI: `init` with CSS variables and `cn` utility as baseline  
  https://ui.shadcn.com/docs/cli
- Apple UI Design Tips: 44x44 hit target, legible text, alignment/spacing 규칙  
  https://developer.apple.com/design/tips/
- Toss Product Principles: one clear message per page, explain why  
  https://toss.im/tossfeed/article/tossproductprinciples
- WCAG contrast minimum: text 4.5:1, large text 3:1  
  https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum

## Layout rules
1. 기본 가로 여백은 `--content-gutter`(16px), 컴포넌트가 임의 px 여백을 만들지 않는다.
2. 상단 바 최소 높이는 `--topbar-height`(56px), 하단 내비 최소 높이는 `--bottom-nav-height`(76px).
3. 본문 낭독 영역은 `max-w-reader`를 넘지 않는다.
4. 낭독 중(`html[data-listening='true']`)에는 하단 내비를 숨겨 읽기 흐름을 우선한다.

## Typography rules
1. Reader text는 `text-reader`만 사용한다 (`clamp(22px, 5.2vw, 30px)`).
2. line-height는 리더 본문 `--line-height-reader`, UI 텍스트 `--line-height-ui`만 사용.
3. 제목 계층은 `TopBar title > Card title > body > caption` 순서를 유지한다.

## Touch/interaction rules
1. 터치 가능한 모든 컨트롤은 최소 44x44 (`.tap-target`)를 만족한다.
2. 모든 인터랙션 요소는 `focus-visible` ring을 제공한다.
3. 상태 피드백은 색상 단독 전달 금지: 반드시 텍스트 레이블 동반.

## Reader-specific rules
1. 읽은 어절: `.reader-word-read`를 사용하고 차분한 상태색(`status-read`) 적용.
2. 현재 포커스 어절: `.reader-word-focus`로 별도 표시.
3. 미매치 어절: 경고색 난사 금지, 약한 배경 강조만 사용.
4. 상태 안내 문구는 비난형 문장 금지.

## Page intent rules
- VerseReader: “오늘의 말씀 읽기” 단일 액션 중심
- ChapterReader: “책/장 선택 → 즉시 읽기”의 짧은 플로우
- YearPlanPage: “날짜 선택 → 오늘 분량 진입” 중심

## Implementation mapping
- tokens: `src/styles/globals.css`
- shell/layout: `src/components/system/AppShell.tsx`, `TopBar.tsx`, `PageContainer.tsx`
- reader patterns: `src/components/system/ReaderText.tsx`, `MicControl.tsx`, `StatusBadge.tsx`
- page migration: `src/pages/VerseReader.tsx`, `ChapterReader.tsx`, `YearPlanPage.tsx`, `src/components/ReaderView.tsx`
