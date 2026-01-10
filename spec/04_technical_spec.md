# Technical Specification

## Speech Recognition

- API: Web Speech API
- Recognition Type: SpeechRecognition
- Language: ko-KR
- continuous: true
- interimResults: true

## Execution Environment

- 최신 Chrome / Edge
- iOS Safari / Android Chrome (Mobile Web 필수 지원)

## UI/UX Guidelines

- **Mobile First CSS Implementation**: 기본 스타일은 모바일 기준으로 작성하고, 큰 화면은 미디어 쿼리로 확장을 원칙으로 한다.
- **Touch Targets**: 버튼 등 클릭 가능한 요소는 최소 44x44px 영역을 확보해야 한다.

## Data Handling

- 음성 데이터는 브라우저 외부로 전송되지 않는다.
- 인식된 텍스트는 메모리에서만 유지된다.
