import { bibleStructure } from "./bible.ts";

export interface PlanDay {
  day: number;
  chapters: Array<{
    book: string;
    chapter: number;
  }>;
}

// Total 1189 chapters in the Protestant Bible
// 1189 / 365 ≈ 3.25 chapters per day

const generateYearPlan = (): PlanDay[] => {
  const allChapters: Array<{ book: string; chapter: number }> = [];
  const bookKeys = Object.keys(bibleStructure);

  // Flatten all chapters
  bookKeys.forEach((key) => {
    const structure = bibleStructure[key as keyof typeof bibleStructure];
    const chapterCount = structure.chapters || 0; // Some might be missing in partial types, but our data is full
    for (let c = 1; c <= chapterCount; c++) {
      allChapters.push({ book: key, chapter: c });
    }
  });

  const totalChapters = allChapters.length;
  const days = 365;
  const plan: PlanDay[] = [];

  let currentChapterIndex = 0;

  for (let d = 1; d <= days; d++) {
    // Calculate how many chapters for this day
    // We want to distribute them evenly.
    // Remaining chapters / remaining days
    const remainingChapters = totalChapters - currentChapterIndex;
    const remainingDays = days - d + 1;
    const chaptersTodayCount = Math.ceil(remainingChapters / remainingDays);

    const chaptersToday: Array<{ book: string; chapter: number }> = [];

    for (let i = 0; i < chaptersTodayCount; i++) {
      if (currentChapterIndex < totalChapters) {
        chaptersToday.push(allChapters[currentChapterIndex]);
        currentChapterIndex++;
      }
    }

    plan.push({
      day: d,
      chapters: chaptersToday,
    });
  }

  return plan;
};

// Generate once
export const YEAR_PLAN = generateYearPlan();

export const getPlanForDate = (date: Date): PlanDay => {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay); // 1-365 (or 366)

  // Simple wrap for leap years or if calculation goes > 365
  // For a simple 365 plan, we just mod or clamp.
  // If strict 365 plan:
  let dayIndex = dayOfYear - 1; // 0-based index for array
  if (dayIndex < 0) dayIndex = 0;
  if (dayIndex >= 365) dayIndex = 364;

  return YEAR_PLAN[dayIndex];
};
