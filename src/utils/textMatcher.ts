export interface MatchResult {
  score: number;
  matchCount: number;
  totalCount: number;
  isMatch: boolean;
  status: "READ" | "PARTIAL" | "NOT_READ";
  matchedIndices: boolean[];
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
  // IMPORTANT: We must split the ORIGINAL verse by space to preserve order for indices.
  // Then we normalize each token for comparison.
  const originalTokens = targetVerse.split(/\s+/);
  const normalizedInput = normalize(inputTranscript);
  const inputTokens = normalizedInput.split(" ").filter((t) => t.length > 0);

  const matchedIndices: boolean[] = new Array(originalTokens.length).fill(false);

  if (originalTokens.length === 0) {
    return { score: 0, matchCount: 0, totalCount: 0, isMatch: false, status: "NOT_READ", matchedIndices: [] };
  }

  let hitCount = 0;
  let inputCursor = 0; // Track position in input tokens

  originalTokens.forEach((token, index) => {
    const normalizedToken = normalize(token);

    if (normalizedToken.length === 0) {
      // If token is just punctuation/spaces, ignore it for scoring but don't break sequence
      return;
    }

    // Search for this token in the input stream starting from current cursor
    // We look ahead to find the *first* occurrence of this token
    let foundIndex = -1;

    // Look ahead window?
    // Ideally, for "A B A", if we matched first A, cursor is after A. Next if we look for B, we find B.
    // Then look for A, we find second A.
    // If we missed B in speech ("A ... A"), we should probably match the second A to the second A in text?
    // Actually, simple greedy forward search usually works decent enough for reading tracking.
    // Find the first occurrence of normalizedToken in inputTokens[inputCursor...]

    for (let i = inputCursor; i < inputTokens.length; i++) {
      if (inputTokens[i] === normalizedToken) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex !== -1) {
      hitCount++;
      matchedIndices[index] = true;
      // Advance cursor to AFTER the found token so it can't be reused
      inputCursor = foundIndex + 1;
    }
  });

  const score = hitCount / originalTokens.length;
  const status = evaluate(score);

  return {
    score,
    matchCount: hitCount,
    totalCount: originalTokens.length,
    isMatch: status === "READ",
    status,
    matchedIndices,
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
