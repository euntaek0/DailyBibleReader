export interface MatchResult {
  score: number;
  matchCount: number;
  totalCount: number;
  isMatch: boolean;
  status: "READ" | "PARTIAL" | "NOT_READ";
}

/**
 * Normalizes text by keeping only Korean characters and removing everything else.
 * Single spaces are preserved to separate words during tokenization if needed,
 * but for our strict tokenization rule, we might want to just split by whitespace first and then normalize.
 *
 * Spec:
 * - 한글과 공백을 제외한 모든 문자는 제거한다.
 * - 연속된 공백은 하나로 치환한다.
 * - 앞뒤 공백은 제거한다.
 */
export function normalize(text: string): string {
  if (!text) return "";
  // Keep Korean, spaces. Remove everything else (including punctuation).
  // Korean range: \uAC00-\uD7A3 (Hangul Syllables)
  // We might also want to keep \u3131-\u3163 (Hangul Jamo) just in case, though usually full syllables are used.

  let normalized = text.replace(/[^가-힣\s]/g, "");

  // Replace multiple spaces with single space
  normalized = normalized.replace(/\s+/g, " ");

  // Trim
  return normalized.trim();
}

/**
 * Tokenizes text into words.
 *
 * Spec:
 * - 기준 verse는 공백 기준으로 어절 단위 분리한다.
 * - 인식된 텍스트는 문자열 전체로 유지한다. (This implies we check inclusion of tokens in the full string)
 */
export function tokenize(text: string): string[] {
  const normalized = normalize(text);
  if (!normalized) return [];
  return normalized.split(" ");
}

/**
 * Calculates match score.
 *
 * Spec:
 * - 기준 어절이 인식된 텍스트에 포함되면 hit으로 간주한다.
 * - 부분 일치도 허용한다 (e.g., "하나님" ⊂ "하나님이").
 * - score = hitCount / totalWordCount
 */
export function calculateScore(targetVerse: string, inputTranscript: string): MatchResult {
  const targetTokens = tokenize(targetVerse);
  const normalizedInput = normalize(inputTranscript); // Normalize input too for fair comparison

  if (targetTokens.length === 0) {
    return { score: 0, matchCount: 0, totalCount: 0, isMatch: false, status: "NOT_READ" };
  }

  let hitCount = 0;

  // Checking if each target token exists in the normalized input string
  // Note: This is an asymmetric check. We iterate over TARGET tokens.
  targetTokens.forEach((token) => {
    if (normalizedInput.includes(token)) {
      hitCount++;
    }
  });

  const score = hitCount / targetTokens.length;
  const status = evaluate(score);

  return {
    score,
    matchCount: hitCount,
    totalCount: targetTokens.length,
    isMatch: status === "READ",
    status,
  };
}

/**
 * Evaluates score against thresholds.
 *
 * Spec:
 * - score ≥ 0.6 → 읽음
 * - 0.3 ≤ score < 0.6 → 부분 읽음
 * - score < 0.3 → 읽지 않음
 */
export function evaluate(score: number): "READ" | "PARTIAL" | "NOT_READ" {
  if (score >= 0.6) return "READ";
  if (score >= 0.3) return "PARTIAL";
  return "NOT_READ";
}
