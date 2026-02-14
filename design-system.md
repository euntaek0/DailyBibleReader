# DailyBibleReader Design System v1.0

## Table of Contents
1. [Assumptions](#assumptions)  
2. [UX 원칙 (Design Principles)](#1-ux-원칙-design-principles)  
3. [정보구조 (IA) + 핵심 사용자 플로우](#2-정보구조-ia--핵심-사용자-플로우)  
4. [Visual Language](#3-visual-language)  
5. [Design Tokens (Tailwind/shadcn 연계)](#4-design-tokens-tailwindshadcn-연계)  
6. [Component Inventory](#5-component-inventory-shadcn-기준)  
7. [Page Template 가이드](#6-page-template-가이드)  
8. [UI Copy 가이드 (한국어)](#7-ui-copy-가이드-한국어)  
9. [Accessibility 체크리스트](#8-accessibility-체크리스트)

---

## Assumptions
- 기술 스택은 `React + Tailwind + shadcn/ui`를 기준으로 한다.
- 기본 사용자 언어는 한국어(`ko-KR`)이며 음성 인식도 `ko-KR` 중심이다.
- 주요 사용 환경은 모바일 화면과 Chrome Extension popup(좁은 폭)이다.
- 본문 하이라이트는 어절 단위 매칭 결과를 받을 수 있다고 가정한다.
- 고대비 모드는 `설정` 화면 내부에서 토글하는 방식으로 제공한다.

---

## 1) UX 원칙 (Design Principles)

### 1.1 원칙 (10)
1. **한 화면, 한 행동**: 사용자가 1초 안에 해야 할 행동(읽기 시작/계속/다음 장)을 파악할 수 있어야 한다.  
2. **낭독 우선 시야**: 본문은 항상 시각적 중심이며, 부가 정보는 접어서 제공한다.  
3. **마이크 ON = 집중 모드**: 낭독 중에는 탐색 요소를 최소화하고 실시간 피드백만 남긴다.  
4. **즉시 피드백**: 읽음 판정 변화(READ/PARTIAL/NOT_READ)는 300ms 내 시각 반응으로 전달한다.  
5. **비난 없는 언어**: 실패/부분일치 문구는 “교정 안내” 중심으로 작성한다.  
6. **진행 가시성**: 지금 어디까지 읽었는지(어절, 구절, 장 진행률)를 항상 한 눈에 보여준다.  
7. **부드러운 인터랙션**: 모션은 짧고 조용하게, 흐름을 끊지 않게 사용한다.  
8. **접근성 기본 탑재**: 대비, 포커스, 키보드, 스크린리더를 기본 요구사항으로 본다.  
9. **모바일 우선 밀도**: 작은 화면에서도 오동작 없이 탭 가능한 크기와 여백을 유지한다.  
10. **문맥 보존**: 화면 이동 후에도 마지막 읽던 위치와 상태를 잃지 않는다.

### 1.2 모드별 UX 차이 (Mic ON vs Mic OFF)

| 구분 | Mic ON (낭독 중) | Mic OFF (탐색/설정 중) |
|---|---|---|
| 목표 | 읽기 흐름 유지 | 탐색, 선택, 설정 |
| 정보 밀도 | 낮음 (핵심만) | 중간 (탐색 정보 포함) |
| 주요 CTA | `중지` 또는 `계속 읽기` | `읽기 시작`, `장 선택`, `플랜 보기` |
| 하단 영역 | 마이크 컨트롤 고정 | BottomNavigation 우선 |
| 피드백 | 실시간 하이라이트 + 짧은 상태 배지 | 목록/설정 피드백 중심 |
| 모션 | pulse, subtle transition | standard transition |
| 알림 방식 | `aria-live="polite"` + 짧은 토스트 | 일반 토스트/다이얼로그 |
| 방해 요소 | 최소화(광고성/불필요 카드 숨김) | 필요 정보 노출 허용 |

---

## 2) 정보구조 (IA) + 핵심 사용자 플로우

### 2.1 IA (요약)
- `ReaderView` (진입 허브)
- `VerseReader` (오늘 구절 낭독)
- `ChapterReader` (책/장 기반 연속 낭독)
- `YearPlanPage` (날짜별 통독 플랜)
- `BookChapter Sheet/Drawer`
- `Settings Sheet/Drawer`
- `Chapter Complete Dialog`

### 2.2 플로우 1: Daily Verse 낭독
| 단계 | 사용자 행동 | 화면의 1초 이해 포인트 |
|---|---|---|
| 1 | 앱 진입 | 상단에 `오늘의 말씀` + 오늘 날짜 표시 |
| 2 | `읽기 시작` 탭 | 단일 Primary CTA만 강조 |
| 3 | 마이크 권한 허용 | 권한 목적 문구를 1문장으로 명확히 표시 |
| 4 | 낭독 진행 | 현재 읽을 어절 하이라이트 + 상태 배지 실시간 표시 |
| 5 | 구절 완료 | 성공 토스트 + 다음 액션(`다음 구절`) 즉시 노출 |

### 2.3 플로우 2: Chapter Reader 낭독 (책/장 선택 → 연속 읽기)
| 단계 | 사용자 행동 | 화면의 1초 이해 포인트 |
|---|---|---|
| 1 | 책/장 선택 열기 | 상단 우측 `책/장 선택` 버튼 고정 |
| 2 | 장 선택 후 진입 | 헤더에 `창세기 1장`처럼 현재 컨텍스트 명확 표시 |
| 3 | 읽기 시작 | 하단 고정 마이크 버튼 1개 중심 |
| 4 | 연속 낭독 | 장 진행률 바 + 현재 절 인디케이터 |
| 5 | 장 완료 | 완료 다이얼로그에서 `다음 장으로`가 주 CTA |

### 2.4 플로우 3: Year Plan (날짜 선택 → 오늘 분량 → 장 낭독)
| 단계 | 사용자 행동 | 화면의 1초 이해 포인트 |
|---|---|---|
| 1 | 날짜 선택 | 캘린더에서 오늘/선택일 강조 |
| 2 | 오늘 분량 확인 | `오늘 읽을 장` 카드 목록 즉시 노출 |
| 3 | 장 선택 | 각 카드에 완료 상태 배지 표시 |
| 4 | Reader 이동 | 선택한 장이 헤더에 즉시 반영 |
| 5 | 완료 후 복귀 | 플랜 페이지에 완료 체크 즉시 반영 |

---

## 3) Visual Language

### 3.1 Tone & Manner 키워드
- Calm
- Focused
- Reverent
- Clear
- Warm
- Modern
- Trustworthy
- Quietly Encouraging

### 3.2 Typography

### 폰트 전략
- 기본 UI 폰트: `-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", "Noto Sans KR", "Segoe UI", sans-serif`
- Reader Text 폰트: 기본 UI 폰트와 동일 계열 유지(일관성 우선), 설정에서 `Serif 옵션` 선택 가능
- 숫자/진행률: `font-variant-numeric: tabular-nums`

### 타입 스케일
| 스타일 | 크기 | line-height | letter-spacing | 사용처 |
|---|---|---|---|---|
| xs | 12px | 16px | 0 | 보조 레이블 |
| sm | 14px | 20px | 0 | 캡션, 배지 |
| base | 16px | 24px | -0.01em | 기본 본문/UI |
| lg | 18px | 28px | -0.01em | 카드 본문 |
| xl | 20px | 30px | -0.015em | 섹션 타이틀 |
| 2xl | 24px | 34px | -0.015em | 페이지 헤더 |
| reader | 22~30px (가변) | 1.75~1.9 | -0.005em | 성경 본문 낭독 |

### Reader Text 전용 규칙
- 기본: `font-size: clamp(22px, 5.2vw, 30px)`
- 줄 길이: 한 줄 24~34자 권장
- 문단 간격: `0.6em~0.8em`
- 낭독 중에는 본문 외 텍스트 대비를 낮춰 시선 집중

### 3.3 레이아웃 규칙
- 모바일 기본 좌우 여백: `16px`
- 컨텐츠 최대 폭: `720px` (웹), popup은 가용 폭 전체 사용
- Reader 영역 최소 높이: 뷰포트의 `55%` 이상
- 터치 타겟 최소: `44x44px`
- BottomNavigation 높이: `64px + safe-area`
- MicControl 도크 높이: `72~88px + safe-area`
- 낭독 중에는 상단/하단 보조 UI를 축소 또는 반투명 처리

### 3.4 컬러 시스템

### Light Palette
| 의미 | 색상 |
|---|---|
| Background | `#F7F9FC` |
| Surface | `#FFFFFF` |
| Foreground | `#1A2233` |
| Primary | `#2F74ED` |
| Secondary | `#3A9D8C` |
| Muted | `#E9EEF5` |
| Border | `#D4DCE8` |
| Accent | `#F4B740` |
| Destructive (soft) | `#E26D4A` |
| Reader BG | `#FBF8EE` |

### Dark Palette
| 의미 | 색상 |
|---|---|
| Background | `#0F1422` |
| Surface | `#151D31` |
| Foreground | `#E6EDF7` |
| Primary | `#68A9F8` |
| Secondary | `#57B8A7` |
| Muted | `#252D3D` |
| Border | `#36425A` |
| Accent | `#F0C46A` |
| Destructive (soft) | `#EB8C74` |
| Reader BG | `#1A2338` |

### 상태 컬러 의미 (비경고형)
| 상태 | 컬러 톤 | 의미 |
|---|---|---|
| READ | 녹색 계열(차분) | 충분히 읽힘 |
| PARTIAL | 황갈색 계열(중립) | 일부 누락/보완 필요 |
| NOT_READ | 청회색 계열(중립) | 아직 미진행 |

### 본문 하이라이트 규칙
| 상황 | 표현 |
|---|---|
| 읽은 어절 | 배경 하이라이트 + 텍스트 대비 유지 |
| 현재 읽을 어절 | Primary 저채도 배경 + 얇은 아웃라인 |
| 틀린/누락 어절 | 약한 warm 톤 밑줄 또는 배경 (깜빡임 금지) |
| 전체 실패 강조 | 단어 단위만 표시, 문단 전체 경고색 금지 |

### 3.5 모션 가이드
| 이벤트 | 모션 | 시간 |
|---|---|---|
| 마이크 Listening | subtle pulse (`scale 1 -> 1.03`, opacity 0.9~1.0 반복) | 2400ms loop |
| READ 판정 전환 | badge fade/scale-in | 180ms |
| PARTIAL 판정 전환 | color crossfade | 180ms |
| NOT_READ 안내 | helper text fade-in | 140ms |
| 장 완료 | dialog rise + backdrop fade | 220ms |

- `prefers-reduced-motion`에서는 pulse/scale 제거, opacity 전환만 유지.

### 3.6 아이코노그래피
- 아이콘 세트: `lucide-react` 권장
- 스타일: 24px 기준, stroke `1.75~2`, 라운드 캡/조인
- 규칙: 텍스트 없이 아이콘 단독 사용 금지(반드시 `aria-label` 또는 인접 라벨)
- 주요 아이콘 예: `Mic`, `MicOff`, `BookOpen`, `Calendar`, `Settings`, `ChevronRight`, `CheckCircle2`

---

## 4) Design Tokens (Tailwind/shadcn 연계)

### 4.1 매핑 원칙
1. Design Tokens 정의 (`tokens.json` 또는 `tokens.ts`)  
2. CSS Variables로 주입 (`:root`, `.dark`, `[data-contrast="high"]`)  
3. Tailwind 유틸 매핑 (`bg-background`, `text-foreground`, `bg-reader-bg` 등)

### 4.2 Color Tokens
| Token | CSS Variable | Tailwind Utility 예 | 실제 사용 예 |
|---|---|---|---|
| background | `--background` | `bg-background` | 앱 전체 배경 |
| foreground | `--foreground` | `text-foreground` | 기본 텍스트 |
| primary | `--primary` | `bg-primary text-primary-foreground` | 시작 버튼 |
| secondary | `--secondary` | `bg-secondary` | 보조 CTA |
| muted | `--muted` | `bg-muted text-muted-foreground` | 보조 정보 카드 |
| border | `--border` | `border-border` | 카드/입력 경계 |
| accent | `--accent` | `bg-accent` | 강조 칩 |
| destructive | `--destructive` | `text-destructive` | 치명적 오류 안내 |
| readerBg | `--reader-bg` | `bg-reader-bg` | 본문 리더 영역 |
| highlightRead | `--highlight-read` | `bg-highlight-read` | 읽은 어절 |
| highlightFocus | `--highlight-focus` | `bg-highlight-focus` | 현재 어절 |
| highlightMiss | `--highlight-miss` | `bg-highlight-miss` | 누락/오인식 어절 |
| statusRead | `--status-read` | `text-status-read` | READ 배지 |
| statusPartial | `--status-partial` | `text-status-partial` | PARTIAL 배지 |
| statusNotRead | `--status-not-read` | `text-status-not-read` | NOT_READ 배지 |

### 4.3 Typography Tokens
| Token | 값 | Tailwind Utility 예 | 사용 예 |
|---|---|---|---|
| `--font-size-base` | `16px` | `text-base` | 일반 본문 |
| `--font-size-reader-min` | `22px` | `text-reader` (커스텀) | 리더 본문 |
| `--font-size-reader-max` | `30px` | `text-reader` (clamp) | 리더 본문 |
| `--line-height-base` | `1.5` | `leading-6` | 일반 UI |
| `--line-height-reader` | `1.8` | `leading-reader` | 낭독 본문 |

### 4.4 Spacing Tokens (4px 기반)
선택 이유: popup 폭/모바일에서 미세 조정이 쉬워 밀도 제어에 유리함.

| Token | 값 | Tailwind Utility 예 | 사용 예 |
|---|---|---|---|
| space-1 | 4px | `p-1`, `gap-1` | 아이콘 간격 |
| space-2 | 8px | `p-2`, `gap-2` | 배지/칩 내부 |
| space-3 | 12px | `p-3`, `gap-3` | 카드 내부 소형 |
| space-4 | 16px | `p-4`, `gap-4` | 기본 섹션 간격 |
| space-5 | 20px | `p-5`, `gap-5` | 리더 영역 |
| space-6 | 24px | `p-6`, `gap-6` | 페이지 블록 간격 |
| space-8 | 32px | `mt-8` | 큰 섹션 분리 |
| space-12 | 48px | `pb-12` | 하단 도크 여백 |

### 4.5 Radius Tokens
| Token | 값 | Tailwind Utility 예 | 사용 예 |
|---|---|---|---|
| radius-sm | 6px | `rounded-sm` | 배지 |
| radius-md | 10px | `rounded-md` | 버튼 |
| radius-lg | 14px | `rounded-lg` | 카드 |
| radius-xl | 18px | `rounded-xl` | 모달/시트 |

### 4.6 Shadow/Elevation Tokens
| Token | 값 | Tailwind Utility 예 | 사용 예 |
|---|---|---|---|
| shadow-1 | `0 1px 2px rgba(0,0,0,0.06)` | `shadow-sm` | 카드 기본 |
| shadow-2 | `0 6px 16px rgba(0,0,0,0.10)` | `shadow-md` | 시트/팝오버 |
| shadow-3 | `0 12px 32px rgba(0,0,0,0.16)` | `shadow-lg` | 다이얼로그 |

### 4.7 Motion Tokens
| Token | 값 | 사용 예 |
|---|---|---|
| duration-fast | 120ms | hover/focus |
| duration-base | 180ms | 상태 전환 |
| duration-slow | 260ms | 모달/시트 |
| duration-pulse | 2400ms | listening pulse |
| easing-standard | `cubic-bezier(0.2,0,0,1)` | 기본 전환 |
| easing-emphasis | `cubic-bezier(0.2,0.8,0.2,1)` | 강조 진입 |
| easing-exit | `cubic-bezier(0.4,0,1,1)` | 종료 전환 |

### 4.8 예시 스니펫
```css
:root {
  --background: 210 33% 98%;
  --foreground: 222 29% 15%;
  --reader-bg: 42 58% 96%;
  --highlight-read: 145 40% 88%;
  --highlight-focus: 214 92% 86%;
}

.dark {
  --background: 225 36% 11%;
  --foreground: 214 31% 92%;
  --reader-bg: 224 30% 16%;
  --highlight-read: 146 31% 30%;
  --highlight-focus: 214 55% 36%;
}
```

---

## 5) Component Inventory (shadcn 기준)

| 컴포넌트 | 목적 | 주요 props / variants | states | 접근성 포인트 | 사용 예시 |
|---|---|---|---|---|---|
| AppShell / PageContainer | 공통 레이아웃 프레임 | `mode=reading|browse`, `maxWidth`, `withBottomNav` | default, immersive | `main`, `header`, `nav` landmark | 리더 화면 공통 골격 |
| TopBar | 제목/뒤로/우측 액션 | `title`, `onBack`, `rightAction`, `dense` | default, condensed | 뒤로 버튼 `aria-label` 필수 | `창세기 1장` + 장 선택 |
| BottomNavigation | 주요 탭 이동 | `items`, `activeKey` | active, inactive | `nav aria-label="주요 탐색"` | Verse/Chapter/Plan 전환 |
| Button | 핵심 액션 | `variant=primary|secondary|ghost`, `size`, `loading` | idle, pressed, disabled, loading | 로딩 시 `aria-busy` | `읽기 시작`, `다음 장` |
| IconButton | 보조 아이콘 액션 | `icon`, `label`, `variant` | default, disabled | 텍스트 없는 경우 `aria-label` 필수 | 설정 열기 |
| Card / Surface | 정보 묶음 | `elevated`, `interactive`, `padding` | default, hover, selected | 클릭 가능 시 role/button 처리 | 오늘 분량 카드 |
| Badge | 상태 요약 | `variant=READ|PARTIAL|NOT_READ|neutral` | static | 색상 외 텍스트로 의미 전달 | 상태 라벨 |
| Progress | 진행률 표시 | `value`, `max`, `showLabel`, `size` | 0~100, complete | `aria-valuenow/min/max` | 장 읽기 진행률 |
| ReaderText | 본문 + 하이라이트 렌더 | `segments`, `fontScale`, `highlightMode`, `autoScroll` | idle, listening, paused | 현재 구절 `aria-current` 가능 | 어절 단위 읽기 피드백 |
| MicControl | 녹음/중지/권한 대응 | `status=idle|listening|paused|denied`, `onToggle` | idle, listening, denied | 토글 버튼 `aria-pressed` | 하단 고정 마이크 버튼 |
| Toast / Snackbar | 짧은 피드백 | `type=info|success|warning`, `duration` | enter, visible, exit | `aria-live="polite"` | “다음 절로 이동했어요” |
| Dialog (Chapter 완료) | 장 완료 행동 유도 | `open`, `onNext`, `onClose` | open, closing | 포커스 트랩, ESC 닫기 | “다음 장으로” CTA |
| Sheet / Drawer | 보조 선택 UI | `side=bottom|right`, `snapPoints` | closed, open, dragging | 열릴 때 초점 이동 | 책/장 선택, 설정 |
| Tabs | 모드 전환 | `value`, `onChange` | active, inactive | 키보드 방향키 이동 | 구절/장 모드 전환 |
| Select / Combobox | 책/장 빠른 선택 | `options`, `searchable`, `value` | closed, open, selected | label 연결, 검색 입력 지원 | 책 이름 검색 |
| Calendar / DatePicker | 연간 플랜 날짜 선택 | `selectedDate`, `onSelect`, `markedDates` | default, selected, today | 날짜 셀 라벨 완전 제공 | 특정 날짜 분량 열기 |
| SettingsItem | 설정 단위 | `label`, `description`, `controlType` | default, changed | 토글/슬라이더 라벨 연결 | 폰트 크기, 자동 스크롤, 고대비 |

---

## 6) Page Template 가이드

### 6.1 VerseReader
- 화면 구조  
1. TopBar(오늘의 말씀)  
2. 오늘 구절 메타(책/장/절)  
3. ReaderText(최우선 영역)  
4. MicControl Dock(주 CTA)  
5. BottomNavigation(Mic ON 시 축소/숨김)

- 우선순위  
1. 본문 가독성  
2. 읽기 시작/중지  
3. 실시간 상태 피드백

- 주요 CTA 위치  
- 기본: 하단 중앙 고정  
- 완료 후: 본문 하단 인라인 `다음 구절`

- 집중 모드  
- Mic ON에서 상단 보조 텍스트 축소  
- 불필요 카드 숨김  
- ReaderText 대비 강화

- 권한 거부/실패 빈 상태  
- 제목: `마이크 권한이 필요해요`  
- 본문: 목적 1문장 + 해결 방법 1문장  
- 액션: `권한 설정 열기`, `텍스트 모드로 읽기`

### 6.2 ChapterReader
- 화면 구조  
1. TopBar(책/장 + 뒤로)  
2. 장 진행률 바  
3. ReaderText(절 단위 분리)  
4. MicControl Dock  
5. 다음/이전 절 보조 컨트롤

- 우선순위  
1. 현재 절 위치 인지  
2. 장 전체 진행률  
3. 다음 장 이동 흐름

- 주요 CTA 위치  
- 하단 중앙 `읽기 시작/중지`  
- 장 완료 시 Dialog의 `다음 장으로`

- 집중 모드  
- Book/Chapter 선택 버튼만 남기고 나머지 숨김  
- 진행률은 상단 얇은 바 형태로 축약

- 권한 거부/실패 빈 상태  
- 인라인 경고 카드 + 즉시 재시도 버튼  
- 장 이동 기능은 계속 제공(차단하지 않음)

### 6.3 YearPlanPage
- 화면 구조  
1. TopBar(연간 플랜)  
2. Calendar/DatePicker  
3. 선택 날짜의 오늘 분량 카드 목록  
4. 진행률 요약(오늘/누적)  
5. BottomNavigation

- 우선순위  
1. 오늘 읽을 분량 파악  
2. 바로 낭독 진입  
3. 누적 성취 확인

- 주요 CTA 위치  
- 각 장 카드 우측 `읽기` 버튼  
- 상단에 `오늘로 이동` 고정 액션

- 집중 모드  
- YearPlan 자체는 탐색 화면이므로 Mic ON 집중 모드 대상 아님  
- Reader로 진입 시 집중 모드 자동 적용

- 권한 거부/실패 빈 상태  
- 플랜 조회는 정상 동작  
- 읽기 진입 시점에만 권한 안내 모달 표시

---

## 7) UI Copy 가이드 (한국어)

### 7.1 톤 가이드
- 부드럽고 단정한 문장 사용
- 사용자를 평가하지 않고 행동을 안내
- 짧고 즉시 이해 가능한 표현
- 신앙 앱 문맥에 맞는 차분한 어조 유지

### 7.2 문구 예시 (20)
| 상황 | 문구 |
|---|---|
| 시작 버튼 | `읽기 시작` |
| 중지 버튼 | `잠시 멈추기` |
| 재개 버튼 | `다시 읽기` |
| 마이크 권한 요청 | `낭독 인식을 위해 마이크 권한이 필요해요.` |
| 권한 거부 | `마이크가 꺼져 있어요. 설정에서 켜면 바로 시작할 수 있어요.` |
| 권한 설정 이동 | `권한 설정 열기` |
| 듣는 중 상태 | `듣고 있어요… 천천히 읽어주세요.` |
| READ 판정 | `좋아요. 잘 읽혔어요.` |
| PARTIAL 판정 | `일부 어절이 빠졌어요. 해당 부분만 다시 읽어볼까요?` |
| NOT_READ 판정 | `아직 인식된 내용이 적어요. 한 번 더 읽어보세요.` |
| 다음 절 안내 | `다음 절로 넘어갈게요.` |
| 자동 스크롤 안내 | `읽는 위치에 맞춰 자동으로 이동했어요.` |
| 장 진행률 | `이 장의 {percent}%를 읽었어요.` |
| 장 완료 | `이번 장을 모두 읽었어요.` |
| 장 완료 CTA | `다음 장으로` |
| 오늘 분량 완료 | `오늘 분량을 완료했어요. 수고하셨어요.` |
| 네트워크/일시 오류 | `잠시 후 다시 시도해주세요.` |
| 저장 완료 | `읽기 기록이 저장됐어요.` |
| 설정 저장 | `설정이 적용됐어요.` |
| 집중 모드 안내 | `집중 모드로 전환됐어요.` |

---

## 8) Accessibility 체크리스트

### 대비/시각
- 본문/일반 텍스트 대비는 WCAG AA(`4.5:1`) 이상 유지
- 큰 텍스트/아이콘은 `3:1` 이상 유지
- 상태 전달은 색상 + 텍스트(배지 라벨) 동시 제공
- 고대비 모드는 `설정` 화면 내부 토글로 제공

### 포커스
- 모든 인터랙티브 요소에 명확한 포커스 링(최소 2px)
- 키보드 포커스 순서는 시각적 순서와 동일
- 다이얼로그/시트 열림 시 초점 이동, 닫힘 시 원래 트리거로 복귀

### 키보드
- 탭/시프트탭으로 모든 핵심 기능 접근 가능
- Space/Enter로 마이크 토글 가능
- ESC로 Dialog/Sheet 닫기 가능
- 키보드 단축키는 화면에서 안내 가능해야 함

### 스크린리더
- `TopBar`, `main`, `nav` landmark 제공
- 마이크 버튼은 상태 포함 라벨 제공(예: “마이크 켜짐, 탭하여 중지”)
- 진행률은 `aria-valuenow`로 현재 값 제공
- 현재 읽는 절/구절은 `aria-current` 또는 명시 텍스트로 전달

### 낭독 중 방해 없는 알림
- 실시간 판정은 `aria-live="polite"`로 전달
- 동일 메시지 반복 낭독은 rate-limit(예: 2초 이내 중복 억제)
- 치명적 오류(권한 없음 등)만 즉시 알림, 일반 상태는 조용한 업데이트
- `prefers-reduced-motion`에서 pulse/scale 제거
