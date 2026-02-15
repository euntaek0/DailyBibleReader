import { bibleStructure, getRandomVerse } from "../constants/bible.ts";
import { getPlanForDate, type PlanDay } from "../constants/yearPlan.ts";

type VersionCode = "kor" | "niv" | "kjv" | string;

export interface DailyVerse {
  text: string;
  reference: string;
}

interface DailyVerseApiResponse {
  reference: string;
  verse: {
    text: string;
  };
}

interface ChapterApiResponse {
  verses: Array<{
    verse: number;
    text: string;
  }>;
}

interface YearPlanApiResponse {
  day: number;
  chapters: Array<{
    bookAbbrev: string;
    chapter: number;
  }>;
}

interface BibleBook {
  abbrev: string;
  chapters: string[][];
  name: string;
}

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();
const FUNCTIONS_BASE_URL = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1` : "";
const DEFAULT_VERSION_CODE = ((import.meta.env.VITE_BIBLE_VERSION_CODE ?? "kor").trim().toLowerCase() || "kor") as VersionCode;
const READING_PLAN_TEMPLATE_ID = (import.meta.env.VITE_READING_PLAN_TEMPLATE_ID ?? "").trim();
const REMOTE_API_ENABLED = Boolean(FUNCTIONS_BASE_URL && SUPABASE_ANON_KEY);
const BIBLE_JSON_URL = "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/ko_ko.json";

let bibleDataCache: BibleBook[] | null = null;
let bibleDataPromise: Promise<BibleBook[]> | null = null;
let hasShownConfigWarning = false;

function warnMissingConfigOnce(): void {
  if (!REMOTE_API_ENABLED && !hasShownConfigWarning) {
    hasShownConfigWarning = true;
    console.warn("Supabase env is missing. Falling back to local/static Bible data.");
  }
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildQueryString(params: Record<string, string | number | undefined>): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    query.set(key, String(value));
  });
  const queryText = query.toString();
  return queryText ? `?${queryText}` : "";
}

function getFunctionHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };
}

function toErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload !== "object" || !payload) {
    return fallback;
  }
  const maybeError = (payload as { error?: unknown; message?: unknown }).error ??
    (payload as { error?: unknown; message?: unknown }).message;
  return typeof maybeError === "string" && maybeError ? maybeError : fallback;
}

async function callFunction<T>(
  functionName: string,
  params: Record<string, string | number | undefined>,
): Promise<T> {
  if (!REMOTE_API_ENABLED) {
    throw new Error("Supabase function config is not available");
  }

  const response = await fetch(
    `${FUNCTIONS_BASE_URL}/${functionName}${buildQueryString(params)}`,
    {
      method: "GET",
      headers: getFunctionHeaders(),
    },
  );

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(toErrorMessage(payload, `${functionName} failed (${response.status})`));
  }

  return payload as T;
}

async function fetchDailyVerseFallback(): Promise<DailyVerse> {
  const verseData = await getRandomVerse("kor");
  return {
    text: verseData.text,
    reference: `${verseData.bibleFullName} ${verseData.startChapter}:${verseData.startVerse}`,
  };
}

async function fetchChapterFallback(book: string, chapter: number): Promise<string[]> {
  if (!bibleDataCache) {
    if (!bibleDataPromise) {
      bibleDataPromise = fetch(BIBLE_JSON_URL)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch Bible data");
          return res.json();
        })
        .then((data) => {
          bibleDataCache = data;
          return data;
        })
        .catch((error) => {
          bibleDataPromise = null;
          throw error;
        });
    }
    await bibleDataPromise;
  }

  if (!bibleDataCache) {
    throw new Error("Bible data not available");
  }

  const bookKeys = Object.keys(bibleStructure);
  const bookIndex = bookKeys.indexOf(book);
  if (bookIndex === -1) {
    throw new Error(`Invalid book key: ${book}`);
  }
  if (bookIndex >= bibleDataCache.length) {
    throw new Error(`Book data missing for index ${bookIndex}`);
  }

  const bookData = bibleDataCache[bookIndex];
  const chapterIndex = chapter - 1;
  return bookData.chapters?.[chapterIndex] ?? [];
}

export async function fetchDailyVerse(
  date: Date = new Date(),
  versionCode: VersionCode = DEFAULT_VERSION_CODE,
): Promise<DailyVerse> {
  try {
    if (REMOTE_API_ENABLED) {
      const payload = await callFunction<DailyVerseApiResponse>("get-daily-verse", {
        versionCode,
        date: formatLocalDate(date),
      });
      return {
        text: payload.verse.text,
        reference: payload.reference,
      };
    }

    warnMissingConfigOnce();
    return await fetchDailyVerseFallback();
  } catch (error) {
    console.error("Error fetching daily verse from API, using fallback:", error);
    return await fetchDailyVerseFallback();
  }
}

export async function fetchChapter(
  book: string,
  chapter: number,
  versionCode: VersionCode = DEFAULT_VERSION_CODE,
): Promise<string[]> {
  try {
    if (REMOTE_API_ENABLED) {
      const payload = await callFunction<ChapterApiResponse>("get-chapter", {
        versionCode,
        bookAbbrev: book,
        chapter,
      });
      return payload.verses.map((entry) => entry.text);
    }

    warnMissingConfigOnce();
    return await fetchChapterFallback(book, chapter);
  } catch (error) {
    console.error("Error fetching chapter from API, using fallback:", error);
    return await fetchChapterFallback(book, chapter);
  }
}

export async function fetchYearPlanDay(
  date: Date,
  templateId: string = READING_PLAN_TEMPLATE_ID,
): Promise<PlanDay> {
  try {
    if (REMOTE_API_ENABLED) {
      const payload = await callFunction<YearPlanApiResponse>("get-year-plan-day", {
        date: formatLocalDate(date),
        templateId,
      });

      return {
        day: payload.day,
        chapters: payload.chapters.map((item) => ({
          book: item.bookAbbrev.trim().toLowerCase(),
          chapter: item.chapter,
        })),
      };
    }

    warnMissingConfigOnce();
    return getPlanForDate(date);
  } catch (error) {
    console.error("Error fetching year plan from API, using fallback:", error);
    return getPlanForDate(date);
  }
}
