# Project State

> Current project-level snapshot. Keep this concise and current.
> Do not append session history here; Git is the history.

Last updated: 2026-08-12

## Project

**Name:** HSK2 (HSK Quiz Maker)
**Purpose:**

A Next.js web app for learning HSK 1–4 Chinese vocabulary (1,200 words), built
for a single primary user (the repo owner) studying for the HSK exam. Presents
words via a wordbook and a Duolingo-style quiz flow with many question
formats, plus a Korean-hanja ("한자사전") reference dictionary.

## Current Milestone

No formal milestone tracker. Development proceeds feature-by-feature at the
owner's direction, deployed continuously to production after each change.

## System Overview

- Runtime: Cloudflare Workers (via `@opennextjs/cloudflare`)
- Framework: Next.js (App Router) + TypeScript, React client components
- Package manager: npm
- Database: Cloudflare D1 (SQLite-compatible), binding `env.DB`
- Hosting/deployment: Cloudflare Workers — `npm run deploy`
  (`opennextjs-cloudflare build && opennextjs-cloudflare deploy`)
  - Live at `hskq.umjo.me` (custom domain) and
    `hsk-quiz-maker.thumbjiho.workers.dev`
- Major external services: Google Cloud TTS (Chirp3-HD) for pre-generated
  audio, committed as static files under `public/`

## Architecture

- **Data pipeline (source of truth is CSV, not the DB):**
  `data/words_1200.csv` (+ `data/examples.csv`, `data/lectures.csv`,
  `data/hanzi.csv`) → `scripts/build_db.py` → local `data/hsk.db` (SQLite,
  used only as a build intermediate) → `scripts/gen_segments_migration.py`
  and `scripts/gen_hanzi_migration.py` generate numbered SQL files in
  `migrations/` → `wrangler d1 migrations apply --local` and `--remote`.
  Local and remote D1 must both be migrated or they will diverge silently.
- **`example_segments`** on each word is precomputed at build time by
  `compute_example_segments()` in `scripts/build_db.py` (jieba word
  segmentation against the app's own 1,200-word dictionary) and stored as a
  JSON blob column — the app never segments text at request time. Each
  segment optionally carries `hanziInfo` (per-character 훈음/급수, also
  precomputed) for the hanzi popover in `SentenceText.tsx`.
- **`hanzi` D1 table** (`data/hanzi.csv`, ~5,900 rows) is the source of
  Korean hanja 급수/훈음/번체 data, sourced from namuwiki's
  "전국한자능력검정시험" (한국어문회) pages. `flagged=1` marks entries with
  no official 급수 source (temporary/best-effort data).
  `src/lib/simplifiedToTraditional.ts` is auto-generated from this CSV via
  `scripts/gen_simplified_to_traditional.py`.
- **Preferences** (`src/lib/preferences.tsx`, React context +
  `localStorage`): pinyin visibility, dark mode, enabled question formats,
  and 간체/번체 (simplified/traditional) display. `usePreferences().
  displayHanzi(text)` is the single hook every hanzi-rendering component
  calls at its JSX render point — it is character-level and a no-op for
  non-CJK text, so it is safe to call on any string. It must never be
  applied to grading/comparison logic or to data sent to `/api/report`
  (those must stay on the original simplified text).
- Client components fetch data through `/api/*` route handlers, which call
  `src/lib/db.ts` (all D1 access goes through this file).
- `src/components/HanziTab.tsx` (한자사전 tab) is deliberately NOT wired to
  the 간체/번체 preference — it shows simplified and traditional side by
  side by design, independent of the display setting.

For rationale behind non-obvious decisions, see `docs/decisions/` (currently
empty — no ADRs recorded yet; the notes above cover the decisions made so
far, but none has been split out into a formal ADR).

## Working / Stable

- [x] Wordbook (단어장): lecture list, word detail cards, mastered/known/
      unknown progress tracking, example sentence audio
- [x] Quiz flow (홈 tab): session builder, 12 question formats (MCQ, matching,
      true/false, flashcard, listen, type-hanzi, pinyin-tone, sentence
      formats), answer feedback bar, report/share
- [x] 한자사전 tab: full D1 `hanzi` table browsing, HSK/한자 급수 opt-in
      filters, 가나다순/급수 sort with grouping, word cross-references
- [x] Example-sentence hanzi popover (word info + hanzi info, independent
      "없습니다" fallbacks)
- [x] 간체/번체 display preference, applied across all hanzi rendering
      surfaces (word cards, all quiz card kinds, popovers, feedback/report)
- [x] Dark mode (manual toggle, OS-preference default)
- [x] Audio pipeline (Google Cloud TTS, static files)

## In Progress

- [ ] None currently — the active work described in `CURRENT_TASK.md` was
      just completed and deployed. No open thread at last checkpoint.

## Known Problems

- Running `npm run deploy` (which runs `opennextjs-cloudflare build`) while
  `next dev` is running concurrently corrupts the dev server's `.next`
  build artifacts (observed: `MODULE_NOT_FOUND` on `/icon.svg` and
  similar). Fix: stop the dev server (or accept the errors), run the
  deploy, then `rm -rf .next` and restart `npm run dev`.
- Occasional transient `wrangler` remote API auth errors (`code: 7403`) on
  the first `d1 migrations apply --remote` attempt; retrying the same
  command has always succeeded on the next try.
- `data/hanzi.csv` traditional-form coverage is comprehensive for the
  1,200-word list (~99%+) but not exhaustively verified for every character
  that could appear in future example sentences or new vocabulary.

## Important Constraints

- Must deploy to Cloudflare Workers via OpenNext (`opennextjs-cloudflare`) —
  not a generic Next.js host.
- Local D1 and remote D1 must be migrated together; migrations are
  additive/sequential (never edit an already-applied migration file).
- `scripts/build_db.py`, `scripts/gen_segments_migration.py`,
  `scripts/gen_hanzi_migration.py`, and
  `scripts/gen_simplified_to_traditional.py` are Python and run via the
  project's `.venv` (`.venv/bin/python3`), not system Python — system
  Python lacks `jieba`/`pypinyin`.
- `displayHanzi()` must only be applied at display/render time, never in
  grading, matching, or comparison logic (see Architecture above).

## Verification Commands

```bash
# install:
npm install

# development:
npm run dev
# NOTE: do not run `npm run deploy` while this is running (see Known Problems)

# validation (no dedicated npm script; run directly):
npx tsc --noEmit

# there is no automated test suite (no `npm test`) — verification is
# type-checking plus manual UI verification via a headless Chrome
# (playwright-core) driving the running dev server

# DB/data rebuild after touching data/*.csv:
.venv/bin/python3 scripts/build_db.py
.venv/bin/python3 scripts/gen_segments_migration.py   # if example_segments changed
.venv/bin/python3 scripts/gen_hanzi_migration.py       # if data/hanzi.csv changed
.venv/bin/python3 scripts/gen_simplified_to_traditional.py  # if data/hanzi.csv changed
npx wrangler d1 migrations apply hsk-quiz-maker-db --local
npx wrangler d1 migrations apply hsk-quiz-maker-db --remote

# deploy:
npm run deploy
```

## Current Focus

See [`CURRENT_TASK.md`](./CURRENT_TASK.md).
