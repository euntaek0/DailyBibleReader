# DailyBibleReader FE API Contract

This document defines how the frontend calls Supabase Edge Functions.

## Environment variables

Required:
- `VITE_SUPABASE_URL`: `https://<project-ref>.supabase.co`
- `VITE_SUPABASE_ANON_KEY`: public anon key

Optional:
- `VITE_BIBLE_VERSION_CODE`: default Bible version (`kor`, `niv`, `kjv`), default `kor`
- `VITE_READING_PLAN_TEMPLATE_ID`: explicit yearly-plan template UUID

## Auth headers

Every function call sends:
- `apikey: <VITE_SUPABASE_ANON_KEY>`
- `Authorization: Bearer <VITE_SUPABASE_ANON_KEY>`

## Endpoints used by FE

Base URL:
- `${VITE_SUPABASE_URL}/functions/v1`

### 1) Daily verse

- Function: `get-daily-verse`
- FE wrapper: `fetchDailyVerse(date?, versionCode?)`
- Request (GET query):
  - `versionCode` (default from env or `kor`)
  - `date` (`YYYY-MM-DD`, defaults to today in FE)

Example:
```http
GET /functions/v1/get-daily-verse?versionCode=kor&date=2026-02-14
```

Response shape used by FE:
```json
{
  "reference": "요한복음 3:16",
  "verse": {
    "text": "하나님이 세상을 이처럼 사랑하사..."
  }
}
```

Notes:
- `versionCode` supports `kor | kjv | niv`. Backend may store different internal codes; it returns both `versionCode` (API) and `versionDbCode` (internal) for debugging.
- `verse.bookAbbrev` is returned as the FE book key (e.g. `john`, `1cor`, `ge`) so FE can reuse its existing `bibleBookMap`.

### 2) Chapter reader

- Function: `get-chapter`
- FE wrapper: `fetchChapter(bookAbbrev, chapter, versionCode?)`
- Request (GET query):
  - `versionCode`
  - `bookAbbrev` (FE book key, e.g. `john`, `ge`, `1cor`)
  - `chapter` (positive integer)

Example:
```http
GET /functions/v1/get-chapter?versionCode=kor&bookAbbrev=john&chapter=3
```

Response shape used by FE:
```json
{
  "bookName": "요한복음",
  "chapter": 3,
  "verses": [
    { "verse": 1, "text": "..." },
    { "verse": 2, "text": "..." }
  ]
}
```

Notes:
- Backend accepts both FE book keys (recommended) and internal DB abbrevs, and always returns `bookAbbrev` as FE book key.

### 3) Year plan day

- Function: `get-year-plan-day`
- FE wrapper: `fetchYearPlanDay(date, templateId?)`
- Request (GET query):
  - `date` (`YYYY-MM-DD`)
  - `templateId` (optional)

Example:
```http
GET /functions/v1/get-year-plan-day?date=2026-02-14
```

Response shape used by FE:
```json
{
  "day": 45,
  "chapters": [
    { "bookAbbrev": "exo", "chapter": 12 },
    { "bookAbbrev": "exo", "chapter": 13 }
  ]
}
```

Notes:
- Backend returns `chapters[].bookAbbrev` as FE book key.

## Fallback behavior

If env variables are missing or an API call fails, FE falls back to local/static data:
- Daily verse: local random verse list
- Chapter: cached public JSON source
- Year plan: locally generated 365-day plan

This keeps UI usable during local development, but production should always use Supabase API.

## Chrome extension note

If you ship this as a Chrome Extension (MV3 popup), ensure the target Supabase URL is present in `public/manifest.json` under `host_permissions` (otherwise cross-origin requests can be blocked).
