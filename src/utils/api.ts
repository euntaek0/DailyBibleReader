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
