import { getRandomVerse } from "../constants/bible";

export interface DailyVerse {
  text: string;
  reference: string;
}

export const fetchDailyVerse = async (): Promise<DailyVerse> => {
  try {
    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const verseData = await getRandomVerse("kor");

    // Format reference e.g., "창세기 1:1"
    const reference = `${verseData.bibleFullName} ${verseData.startChapter}:${verseData.startVerse}`;

    return {
      text: verseData.text,
      reference,
    };
  } catch (error) {
    console.error("Error fetching daily verse:", error);
    return {
      text: "태초에 하나님이 천지를 창조하시니라",
      reference: "창세기 1:1",
    };
  }
};

import { bibleStructure } from "../constants/bible";

interface BibleBook {
  abbrev: string;
  chapters: string[][];
  name: string;
}

// Cache the Bible data in memory
let bibleDataCache: BibleBook[] | null = null;
let bibleDataPromise: Promise<BibleBook[]> | null = null;

const BIBLE_JSON_URL = "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/ko_ko.json";

export const fetchChapter = async (book: string, chapter: number): Promise<string[]> => {
  // 1. Ensure data is loaded
  if (!bibleDataCache) {
    if (!bibleDataPromise) {
      console.log("Fetching full Bible data...");
      bibleDataPromise = fetch(BIBLE_JSON_URL)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch Bible data");
          return res.json();
        })
        .then((data) => {
          bibleDataCache = data;
          return data;
        })
        .catch((err) => {
          bibleDataPromise = null; // Reset on error
          throw err;
        });
    }
    await bibleDataPromise;
  }

  if (!bibleDataCache) {
    throw new Error("Bible data not available");
  }

  // 2. Find the book
  // We cannot rely on 'abbrev' in the JSON matching our keys exactly.
  // We rely on the standard order of books.
  const bookKeys = Object.keys(bibleStructure);
  const bookIndex = bookKeys.indexOf(book);

  if (bookIndex === -1) {
    throw new Error(`Invalid book key: ${book}`);
  }

  if (bookIndex >= bibleDataCache.length) {
    throw new Error(`Book data missing for index ${bookIndex}`);
  }

  const bookData = bibleDataCache[bookIndex];

  // 3. Find the chapter
  // chapters array is 0-indexed (Chapter 1 is at index 0)
  const chapterIndex = chapter - 1;

  if (!bookData.chapters || !bookData.chapters[chapterIndex]) {
    // Some books might be represented differently?
    // The structure found was "chapters": [ ["v1", "v2"], ... ]
    console.error("Chapter missing", { book, chapter });
    return [];
  }

  const verseArray = bookData.chapters[chapterIndex];
  return verseArray;
};
