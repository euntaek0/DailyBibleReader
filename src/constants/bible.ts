// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const bibleVersions = {
  cus: "Chinese Union Simplified 简体和合本",
  cut: "Chinese Union Traditional 繁體和合本",
  asv: "English American Standard Version",
  bbe: "English Bible in Basic English",
  kjv: "English King James Version",
  niv: "English New International Version",
  gmv: "Greek Modern Version νεοελληνική εκδοχή",
  lxx: "Greek Septuagint Version Ἑβδομήκοντα εκδοχή",
  tr: "Greek Textus Receptus Καινή Διαθήκη",
  gwh: "Greek Westcott Hort 1881 NA27/UBS4 με παραλλαγές",
  hmv: "Hebrew Modern Version התורה נביאים כתובים",
  hac: "Hebrew Aleppo Codex נוסח כתיב מלא המסורה",
  bhs: "Hebrew Biblia Hebraica Stuttgartensia ותקן המדוייק",
  hwm: "Hebrew Westminster Leningrad Codex (כתיב המסורה)",
  lvc: "Latin Clementina Vulgatae Clementina",
  lvn: "Latin Nova Vulgata Nova Vulgata",
  fda: "French Darby Bible (Martin)",
  fos: "French Français Courant",
  fmn: "French Français Louis Segond",
  glb: "German Luther Bibel",
  gel: "German Deutsch Luther Elberfelder",
  gsc: "German Deutsch Schlachter",
  jcl: "Japanese Classical 文語訳",
  jco: "Japanese Colloquial 口語訳",
  kor: "Korean 한국어 성경",
};

export const bibleBookMap = {
  ge: { niv: "Genesis", kor: "창세기" },
  exo: { niv: "Exodus", kor: "출애굽기" },
  lev: { niv: "Leviticus", kor: "레위기" },
  num: { niv: "Numbers", kor: "민수기" },
  deu: { niv: "Deuteronomy", kor: "신명기" },
  josh: { niv: "Joshua", kor: "여호수아" },
  jdgs: { niv: "Judges", kor: "사사기" },
  ruth: { niv: "Ruth", kor: "룻기" },
  "1sm": { niv: "1 Samuel", kor: "사무엘상" },
  "2sm": { niv: "2 Samuel", kor: "사무엘하" },
  "1ki": { niv: "1 Kings", kor: "열왕기상" },
  "2ki": { niv: "2 Kings", kor: "열왕기하" },
  "1chr": { niv: "1 Chronicles", kor: "역대상" },
  "2chr": { niv: "2 Chronicles", kor: "역대하" },
  ezra: { niv: "Ezra", kor: "에스라" },
  neh: { niv: "Nehemiah", kor: "느헤미야" },
  est: { niv: "Esther", kor: "에스더" },
  job: { niv: "Job", kor: "욥기" },
  psa: { niv: "Psalms", kor: "시편" },
  prv: { niv: "Proverbs", kor: "잠언" },
  eccl: { niv: "Ecclesiastes", kor: "전도서" },
  ssol: { niv: "Song of Solomon", kor: "아가" },
  isa: { niv: "Isaiah", kor: "이사야" },
  jer: { niv: "Jeremiah", kor: "예레미야" },
  lam: { niv: "Lamentations", kor: "예레미야 애가" },
  eze: { niv: "Ezekiel", kor: "에스겔" },
  dan: { niv: "Daniel", kor: "다니엘" },
  hos: { niv: "Hosea", kor: "호세아" },
  joel: { niv: "Joel", kor: "요엘" },
  amos: { niv: "Amos", kor: "아모스" },
  obad: { niv: "Obadiah", kor: "오바댜" },
  jonah: { niv: "Jonah", kor: "요나" },
  mic: { niv: "Micah", kor: "미가" },
  nahum: { niv: "Nahum", kor: "나훔" },
  hab: { niv: "Habakkuk", kor: "하박국" },
  zep: { niv: "Zephaniah", kor: "스바냐" },
  hag: { niv: "Haggai", kor: "학개" },
  zec: { niv: "Zechariah", kor: "스가랴" },
  mal: { niv: "Malachi", kor: "말라기" },
  mat: { niv: "Matthew", kor: "마태복음" },
  mark: { niv: "Mark", kor: "마가복음" },
  luke: { niv: "Luke", kor: "누가복음" },
  john: { niv: "John", kor: "요한복음" },
  acts: { niv: "Acts", kor: "사도행전" },
  rom: { niv: "Romans", kor: "로마서" },
  "1cor": { niv: "1 Corinthians", kor: "고린도전서" },
  "2cor": { niv: "2 Corinthians", kor: "고린도후서" },
  gal: { niv: "Galatians", kor: "갈라디아서" },
  eph: { niv: "Ephesians", kor: "에베소서" },
  phi: { niv: "Philippians", kor: "빌립보서" },
  col: { niv: "Colossians", kor: "골로새서" },
  "1th": { niv: "1 Thessalonians", kor: "데살로니가전서" },
  "2th": { niv: "2 Thessalonians", kor: "데살로니가후서" },
  "1tim": { niv: "1 Timothy", kor: "디모데전서" },
  "2tim": { niv: "2 Timothy", kor: "디모데후서" },
  titus: { niv: "Titus", kor: "디도서" },
  phmn: { niv: "Philemon", kor: "빌레몬서" },
  heb: { niv: "Hebrews", kor: "히브리서" },
  jas: { niv: "James", kor: "야고보서" },
  "1pet": { niv: "1 Peter", kor: "베드로전서" },
  "2pet": { niv: "2 Peter", kor: "베드로후서" },
  "1jn": { niv: "1 John", kor: "요한일서" },
  "2jn": { niv: "2 John", kor: "요한이서" },
  "3jn": { niv: "3 John", kor: "요한삼서" },
  rev: { niv: "Revelation", kor: "요한계시록" },
  jude: { niv: "Jude", kor: "유다서" },
};

export const bibleBestList = [
  { name: "ge", chapter: 1, verse: 1, text: "태초에 하나님이 천지를 창조하시니라" },
  { name: "exo", chapter: 20, verse: 3, text: "너는 나 외에는 다른 신들을 네게 두지 말라" },
  { name: "lev", chapter: 19, verse: 18, text: "네 이웃을 사랑하라" },
  { name: "num", chapter: 6, verse: 24, text: "여호와는 네게 복을 주시고" },
  { name: "deu", chapter: 6, verse: 5, text: "마음을 다하고 뜻을 다하고 힘을 다하여 여호와를 사랑하라" },
  { name: "josh", chapter: 1, verse: 9, text: "강하고 담대하라" },
  { name: "jdgs", chapter: 6, verse: 12, text: "여호와께서 너와 함께 계시도다" },
  { name: "ruth", chapter: 1, verse: 16, text: "어머니의 백성이 나의 백성이 되고" },
  { name: "1sm", chapter: 16, verse: 7, text: "사람은 외모를 보거니와 여호와는 중심을 보시느니라" },
  { name: "2sm", chapter: 22, verse: 31, text: "여호와의 도는 완전하고" },
  { name: "psa", chapter: 23, verse: 1, text: "여호와는 나의 목자시니" },
  { name: "psa", chapter: 119, verse: 105, text: "주의 말씀은 내 발에 등이요" },
  { name: "prv", chapter: 3, verse: 5, text: "너는 마음을 다하여 여호와를 신뢰하고" },
  { name: "eccl", chapter: 3, verse: 1, text: "범사에 기한이 있고" },
  { name: "isa", chapter: 40, verse: 31, text: "여호와를 앙망하는 자는 새 힘을 얻으리니" },
  { name: "jer", chapter: 29, verse: 11, text: "너희를 향한 나의 생각을 내가 아노니" },
  { name: "lam", chapter: 3, verse: 22, text: "여호와의 인자와 긍휼이 무궁하시므로" },
  { name: "dan", chapter: 6, verse: 10, text: "다니엘이 기도하며 감사하였더라" },
  { name: "hos", chapter: 6, verse: 6, text: "나는 인애를 원하고 제사를 원하지 아니하며" },
  { name: "mic", chapter: 6, verse: 8, text: "정의를 행하며 인자를 사랑하며" },
  { name: "mat", chapter: 5, verse: 9, text: "화평하게 하는 자는 복이 있나니" },
  { name: "mat", chapter: 6, verse: 33, text: "너희는 먼저 그의 나라와 의를 구하라" },
  { name: "mark", chapter: 12, verse: 30, text: "마음을 다하고 뜻을 다하고 힘을 다하여 주 너의 하나님을 사랑하라" },
  { name: "luke", chapter: 6, verse: 31, text: "남에게 대접을 받고자 하는 대로 너희도 남을 대접하라" },
  { name: "john", chapter: 3, verse: 16, text: "하나님이 세상을 이처럼 사랑하사" },
  { name: "acts", chapter: 1, verse: 8, text: "오직 성령이 너희에게 임하시면" },
  { name: "rom", chapter: 8, verse: 28, text: "하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는" },
  { name: "1cor", chapter: 13, verse: 13, text: "믿음, 소망, 사랑, 그 중에 제일은 사랑이라" },
  { name: "2cor", chapter: 5, verse: 17, text: "누구든지 그리스도 안에 있으면 새로운 피조물이라" },
  { name: "gal", chapter: 5, verse: 22, text: "성령의 열매는 사랑과 희락과 화평과" },
  { name: "eph", chapter: 2, verse: 8, text: "너희가 그 은혜로 인하여 믿음으로 말미암아 구원을 받았으니" },
  { name: "phi", chapter: 4, verse: 13, text: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라" },
  { name: "col", chapter: 3, verse: 23, text: "무슨 일을 하든지 마음을 다하여 하라" },
  { name: "1th", chapter: 5, verse: 16, text: "항상 기뻐하라" },
  { name: "2th", chapter: 3, verse: 3, text: "주는 미쁘사 너희를 굳건하게 하시고" },
  { name: "1tim", chapter: 6, verse: 12, text: "믿음의 선한 싸움을 싸우라" },
  { name: "2tim", chapter: 1, verse: 7, text: "하나님이 우리에게 주신 것은 두려워하는 마음이 아니요" },
  { name: "heb", chapter: 11, verse: 1, text: "믿음은 바라는 것들의 실상이요" },
  { name: "jas", chapter: 1, verse: 5, text: "누구든지 지혜가 부족하거든" },
  { name: "1pet", chapter: 5, verse: 7, text: "너희 염려를 다 주께 맡기라" },
  { name: "rev", chapter: 22, verse: 21, text: "주 예수의 은혜가 모든 자들에게 있을지어다" },
];

export const bibleStructure = {
  ge: {
    name: "Genesis",
    chapters: 50,
    verses: [
      31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22,
      35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26,
    ],
  },
  exo: {
    name: "Exodus",
    chapters: 40,
    verses: [
      22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43,
      46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38,
    ],
  },
  lev: {
    chapters: 27,
    verses: [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34],
  },
  num: {
    name: "Numbers",
    chapters: 36,
    verses: [
      54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31,
      40, 16, 54, 42, 56, 29, 34, 13,
    ],
  },
  deu: {
    name: "Deuteronomy",
    chapters: 34,
    verses: [
      46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68,
      29, 20, 30, 52, 29, 12,
    ],
  },
  josh: {
    name: "Joshua",
    chapters: 24,
    verses: [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33],
  },
  jdgs: {
    name: "Judges",
    chapters: 21,
    verses: [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25],
  },
  ruth: {
    name: "Ruth",
    chapters: 4,
    verses: [22, 23, 18, 22],
  },
  "1sm": {
    name: "1 Samuel",
    chapters: 31,
    verses: [
      28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 23, 44, 25, 12, 25,
      11, 31, 13,
    ],
  },
  "2sm": {
    name: "2 Samuel",
    chapters: 24,
    verses: [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 18, 22, 22, 25, 19, 13, 27],
  },
  "1ki": {
    name: "1 Kings",
    chapters: 22,
    verses: [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53],
  },
  "2ki": {
    name: "2 Kings",
    chapters: 25,
    verses: [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30],
  },
  "1chr": {
    name: "1 Chronicles",
    chapters: 29,
    verses: [
      54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30,
    ],
  },
  "2chr": {
    name: "2 Chronicles",
    chapters: 36,
    verses: [
      17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36,
      27, 21, 33, 25, 33, 27, 23,
    ],
  },
  ezra: {
    name: "Ezra",
    chapters: 10,
    verses: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44],
  },
  neh: {
    name: "Nehemiah",
    chapters: 13,
    verses: [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31],
  },
  est: {
    name: "Esther",
    chapters: 10,
    verses: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3],
  },
  job: {
    name: "Job",
    chapters: 42,
    verses: [
      22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25,
      31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17,
    ],
  },
  psa: {
    name: "Psalms",
    chapters: 150,
    verses: [
      6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24,
      11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8,
      12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17,
      16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 9,
      8, 4, 8, 5, 6, 5, 8, 8, 3, 18, 7, 8, 29, 15, 15, 27, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21,
    ],
  },
  prv: {
    name: "Proverbs",
    chapters: 31,
    verses: [
      33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28,
      27, 33, 31,
    ],
  },
  eccl: {
    name: "Ecclesiastes",
    chapters: 12,
    verses: [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14],
  },
  ssol: {
    name: "Song of Solomon",
    chapters: 8,
    verses: [17, 17, 11, 16, 16, 13, 13, 14],
  },
  isa: {
    name: "Isaiah",
    chapters: 66,
    verses: [
      31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33,
      9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21,
      22, 11, 12, 19, 12, 25, 24,
    ],
  },
  jer: {
    name: "Jeremiah",
    chapters: 52,
    verses: [
      19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17,
      32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34,
    ],
  },
  lam: {
    name: "Lamentations",
    chapters: 5,
    verses: [22, 22, 66, 22, 22],
  },
  eze: {
    name: "Ezekiel",
    chapters: 48,
    verses: [
      28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21,
      26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35,
    ],
  },
  dan: {
    name: "Daniel",
    chapters: 12,
    verses: [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13],
  },
  hos: {
    name: "Hosea",
    chapters: 14,
    verses: [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9],
  },
  joel: {
    name: "Joel",
    chapters: 3,
    verses: [20, 32, 21],
  },
  amos: {
    name: "Amos",
    chapters: 9,
    verses: [15, 16, 15, 13, 27, 14, 17, 14, 15],
  },
  obad: {
    name: "Obadiah",
    chapters: 1,
    verses: [21],
  },
  jonah: {
    name: "Jonah",
    chapters: 4,
    verses: [17, 10, 10, 11],
  },
  mic: {
    name: "Micah",
    chapters: 7,
    verses: [16, 13, 12, 13, 15, 16, 20],
  },
  nahum: {
    name: "Nahum",
    chapters: 3,
    verses: [15, 13, 19],
  },
  hab: {
    name: "Habakkuk",
    chapters: 3,
    verses: [17, 20, 19],
  },
  zep: {
    name: "Zephaniah",
    chapters: 3,
    verses: [18, 15, 20],
  },
  hag: {
    name: "Haggai",
    chapters: 2,
    verses: [15, 23],
  },
  zec: {
    name: "Zechariah",
    chapters: 14,
    verses: [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21],
  },
  mal: {
    name: "Malachi",
    chapters: 4,
    verses: [14, 17, 18, 6],
  },
  mat: {
    name: "Matthew",
    chapters: 28,
    verses: [
      25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20,
    ],
  },
  mark: {
    name: "Mark",
    chapters: 16,
    verses: [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20],
  },
  luke: {
    name: "Luke",
    chapters: 24,
    verses: [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53],
  },
  john: {
    name: "John",
    chapters: 21,
    verses: [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25],
  },
  acts: {
    name: "Acts",
    chapters: 28,
    verses: [
      26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31,
    ],
  },
  rom: {
    name: "Romans",
    chapters: 16,
    verses: [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27],
  },
  "1cor": {
    name: "1 Corinthians",
    chapters: 16,
    verses: [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24],
  },
  "2cor": {
    name: "2 Corinthians",
    chapters: 13,
    verses: [24, 17, 18, 18, 19, 18, 16, 24, 15, 18, 33, 21, 14],
  },
  gal: {
    name: "Galatians",
    chapters: 6,
    verses: [24, 21, 29, 31, 26, 18],
  },
  eph: {
    name: "Ephesians",
    chapters: 6,
    verses: [23, 22, 21, 32, 33, 24],
  },
  phi: {
    name: "Philippians",
    chapters: 4,
    verses: [30, 30, 21, 23],
  },
  col: {
    name: "Colossians",
    chapters: 4,
    verses: [29, 23, 25, 18],
  },
  "1th": {
    name: "1 Thessalonians",
    chapters: 5,
    verses: [10, 20, 13, 18, 28],
  },
  "2th": {
    name: "2 Thessalonians",
    chapters: 3,
    verses: [12, 17, 18],
  },
  "1tim": {
    name: "1 Timothy",
    chapters: 6,
    verses: [20, 15, 16, 16, 25, 21],
  },
  "2tim": {
    name: "2 Timothy",
    chapters: 4,
    verses: [18, 26, 17, 22],
  },
  titus: {
    name: "Titus",
    chapters: 3,
    verses: [16, 15, 15],
  },
  phmn: {
    name: "Philemon",
    chapters: 1,
    verses: [25],
  },
  heb: {
    name: "Hebrews",
    chapters: 13,
    verses: [14, 18, 19, 16, 14, 20, 28, 13, 39, 40, 29, 25, 13],
  },
  jas: {
    name: "James",
    chapters: 5,
    verses: [27, 26, 18, 17, 20],
  },
  "1pet": {
    name: "1 Peter",
    chapters: 5,
    verses: [25, 25, 22, 19, 14],
  },
  "2pet": {
    name: "2 Peter",
    chapters: 3,
    verses: [21, 22, 18],
  },
  "1jn": {
    name: "1 John",
    chapters: 5,
    verses: [10, 29, 24, 21, 21],
  },
  "2jn": {
    name: "2 John",
    chapters: 1,
    verses: [13],
  },
  "3jn": {
    name: "3 John",
    chapters: 1,
    verses: [14],
  },
  jude: {
    name: "Jude",
    chapters: 1,
    verses: [25],
  },
  rev: {
    name: "Revelation",
    chapters: 22,
    verses: [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21],
  },
};

export async function getRandomVerse(language) {
  // 50% 확률로 bibleBestList 또는 userSelectedVerses 중 하나를 사용
  const rand = Math.random() < 0.5 ? 0 : 1;
  let randomBibleBest;

  // const chrome = (window as any).chrome;
  // chrome.storage.local.clear(() => {
  //   console.log("Chrome local storage가 모두 비워졌습니다.");
  // });

  if (rand === 0) {
    // bibleBestList에서 랜덤 선택
    randomBibleBest = bibleBestList[Math.floor(Math.random() * bibleBestList.length)];
  } else {
    if (chrome?.storage?.local?.get) {
      try {
        // chrome.storage.local.get를 Promise로 래핑하여 비동기 처리합니다.
        randomBibleBest = await new Promise((resolve, reject) => {
          chrome.storage.local.get("userSelectedVerses", (result) => {
            if (chrome.runtime?.lastError) {
              return reject(chrome.runtime.lastError);
            }
            if (result.userSelectedVerses && result.userSelectedVerses.length > 0) {
              resolve(result.userSelectedVerses[Math.floor(Math.random() * result.userSelectedVerses.length)]);
            } else {
              resolve(bibleBestList[Math.floor(Math.random() * bibleBestList.length)]);
            }
          });
        });
      } catch (error) {
        console.error("chrome.storage 접근 중 오류 발생:", error);
        // 오류 발생 시 fallback 처리
        randomBibleBest = bibleBestList[Math.floor(Math.random() * bibleBestList.length)];
      }
    } else {
      // chrome.storage 사용 불가능한 경우 fallback 처리
      randomBibleBest = bibleBestList[Math.floor(Math.random() * bibleBestList.length)];
    }
  }

  const randomBookKey = randomBibleBest.name;
  const randomChapter = randomBibleBest.chapter;
  const randomVerse = randomBibleBest.verse;
  const bibleFullName = bibleBookMap[randomBookKey][language] || randomBookKey;

  return {
    language,
    bibleName: randomBookKey,
    bibleFullName,
    startChapter: randomChapter,
    startVerse: randomVerse,
    text: randomBibleBest.text,
  };
}
