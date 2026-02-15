# DailyBibleReader (Vite + React + TypeScript)

DailyBibleReader frontend now calls Supabase Edge Functions directly for:
- daily verse (`get-daily-verse`)
- chapter reader (`get-chapter`)
- yearly plan day (`get-year-plan-day`)

## Prerequisites

- Node.js 20.19+ (recommended)
- npm
- Deployed Supabase project with the required Edge Functions

## Local setup

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
cp .env.example .env.local
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`.

3. Start dev server

```bash
npm run dev
```

4. Build

```bash
npm run build
```

## API docs

Detailed FE/API contract is documented in:
- `docs/api-contract.md`

Backend function docs are in:
- `../dailyBibleReaderBackend/supabase/functions/README.md`
