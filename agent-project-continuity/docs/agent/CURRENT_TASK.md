# Current Task

> Handoff snapshot for the active task.
> Rewrite this document as the task changes; do not keep a chronological diary.

Last updated: 2026-08-12

## Goal

No task is currently open. The most recently completed body of work
(described below for continuity) was: build a full Korean-hanja reference
feature (한자사전 tab) backed by real data, surface hanzi info in example
sentences, and add a working 간체/번체 (simplified/traditional) display
preference across the whole app. All of it is committed, pushed, and
deployed.

If picking this up fresh with no other instruction, there is nothing
pending — ask the user what to work on next, or run `recover-context` if
unsure the repo matches this snapshot.

## Requested Behavior

- 한자사전 tab shows every hanzi used in the 1,200-word list (not a curated
  subset), each with HSK급수/한자급수, 훈음, pinyin (real if the char is a
  standalone headword, pypinyin-derived fallback otherwise), and
  simplified↔traditional side by side.
- Users can filter the 한자사전 list by HSK 급수 and/or 한자 급수
  (opt-in multi-select: nothing checked = show all; checking narrows).
  Default sort is 가나다순 by 훈음's 음.
- Tapping an example-sentence segment shows a popover with two independent
  sections: word info (or "단어가 없습니다") and hanzi info per character
  (or "한자가 없습니다"), with a ⚠ marker on any hanzi entry whose 급수
  data has no official source.
- Settings screen has a 간체/번체 selector as two side-by-side cards
  (not a toggle) — picking one applies simplified/traditional hanzi
  everywhere hanzi is displayed (word cards, all quiz card kinds, popovers,
  answer feedback, report preview), but never changes grading/comparison
  logic or the payload sent to `/api/report`.

## Completed

- `data/hanzi.csv` built up to ~5,935 rows (급수/훈음/번체/pinyin/flagged)
  sourced from namuwiki's 한국어문회 급수표 pages via direct HTML fetch +
  parsing (not `WebFetch`, which proved unreliable for exact per-character
  data). ~99%+ coverage of the app's 1,064-character word list.
- New D1 `hanzi` table (`migrations/0012`, `0013`) generated from that CSV
  via `scripts/gen_hanzi_migration.py`; `src/lib/db.ts` has `getHanziMap()`.
- `scripts/build_db.py` bakes per-character `hanziInfo` into every word's
  `example_segments` at build time (`migrations/0011`).
- `/api/hanzi/route.ts` rewritten to source from the D1 `hanzi` table
  instead of a hardcoded 8-character list (now-deleted
  `src/lib/curatedHanzi.ts` → `src/lib/hanjaLevels.ts` keeps just
  `HANJA_LEVEL_ORDER`); fixed a bug where non-CJK characters (from
  grammar-pattern headwords like `"不但A，而且B"`) leaked into hanzi cards.
- `HanziTab.tsx` rebuilt: full-table browsing, `CheckboxDropdown.tsx` (new,
  opt-in multi-select, no "select all" action, active-filter chip with ⚠→✕
  clear button), 가나다순 default sort, "없음" fallback text for missing
  급수 (dimmed) so card layout stays aligned.
- `SentenceText.tsx` popover rewritten: two sections (word/hanzi), grid
  layout for multi-hanzi rows, centered within full popover width, ⚠ flag
  column only reserved when at least one hanzi in the list is flagged.
- `src/lib/simplifiedToTraditional.ts` (auto-generated, 1,876 entries) +
  `usePreferences().displayHanzi()` + `charForm` preference (UI: two-card
  selector in `SettingsSheet.tsx`, not a toggle).
- `displayHanzi()` wired into every hanzi-rendering component: `WordDetailList`,
  `FlashcardCard`, `McqCard`, `ListenCard`, `TrueFalseCard`, `SentenceText`,
  `AnswerFeedbackBar`, `ReportSheet` (preview only — submitted payload stays
  simplified), `SentenceBuildCard`/`MatchingCard` (display only — matching/
  correctness logic untouched).
- All of the above committed (3 commits: `3f973b1`, `2bb28ab`, `dea02f2`),
  pushed to `origin/main`, and deployed via `npm run deploy`. Remote D1
  migrated through `0013`.
- This `agent-project-continuity` scaffold wired up: symlinked
  `.claude/skills/checkpoint` and `.claude/skills/recover-context` into the
  main repo's `.claude/skills/`, and populated this file + `STATE.md` as
  the first real checkpoint.

## In Progress

- Nothing in progress.

## Remaining

- Nothing queued. Possible natural follow-ups the user has not yet
  requested (do not start without asking):
  - Verify `data/hanzi.csv` traditional-form coverage for characters
    outside the current 1,200-word list, if vocabulary expands.
  - `agent-project-continuity/` and `resource/` are currently untracked in
    the main HSK2 git repo (by choice — see Working Tree Notes). Confirm
    with the user whether either should ever be committed there, or stay
    separate.

## Relevant Files

| File | Why it matters |
|---|---|
| `data/hanzi.csv` | Source of truth for all Korean hanja 급수/훈음/번체/pinyin data |
| `scripts/build_db.py` | Rebuilds local `hsk.db`; owns `compute_example_segments`/`hanziInfo` baking |
| `scripts/gen_hanzi_migration.py` | Regenerates the D1 `hanzi` table migration from `hanzi.csv` |
| `scripts/gen_simplified_to_traditional.py` | Regenerates `src/lib/simplifiedToTraditional.ts` from `hanzi.csv` |
| `src/lib/preferences.tsx` | Owns `charForm` state and the `displayHanzi()` transform — the one function every renderer calls |
| `src/components/SentenceText.tsx` | Central popover component; most other cards delegate example-sentence rendering to it |
| `src/components/HanziTab.tsx` + `CheckboxDropdown.tsx` | 한자사전 tab UI and its opt-in filter dropdown |
| `src/app/api/hanzi/route.ts` | Serves the 한자사전 tab's data; has the CJK-only filter fix |
| `migrations/0011`–`0013` | The D1 changes from this session (segments refresh ×2, hanzi table, hanzi refresh w/ pinyin) |

## Verification

### Passed

- `npx tsc --noEmit` — clean, run repeatedly throughout and at the end of
  the session.
- Manual UI verification via headless Chrome (playwright-core) for: hanzi
  popover (word+hanzi sections, flagged badge, centering), 한자사전 tab
  (filters, sort, search, flagged badge), Settings 간체/번체 cards
  (switching, persistence), quiz card + wordbook rendering in traditional
  mode (spot-checked 亲戚→親戚, 起来→起來, 年轻→年輕, etc.).
- Remote D1 migrations `0011`–`0013` applied successfully (`wrangler d1
  migrations apply hsk-quiz-maker-db --remote`).
- `npm run deploy` succeeded twice this session (once mid-session, once at
  the end); both times the running local dev server needed a `.next`
  wipe + restart afterward (see Known Problems in `STATE.md`).

### Failed

- None.

### Not Yet Run

- No automated test suite exists in this repo to run (see `STATE.md`
  Verification Commands).

## Important Discoveries

- `WebFetch` gives inconsistent answers for precise per-character lookups
  on the same namuwiki page across repeated calls (small-model
  summarization artifact) — raw `curl` + own HTML parsing was reliable and
  was used for all `data/hanzi.csv` sourcing this session.
- namuwiki's "준N급" notation and 한국어문회's official "N급Ⅱ" notation are
  the same organization's same sub-levels, just two naming conventions —
  confirmed via a user-pasted page explicitly headed "사단법인 한국어문회
  주관". Not a sign of two different certifying bodies.
- `displayHanzi()` is safe to call on ANY string (Korean meaning text,
  pinyin, punctuation) because `SIMPLIFIED_TO_TRADITIONAL` only has CJK
  keys — non-matching characters pass through unchanged. This is why it
  could be wired into ~10 components without needing to track which
  specific substrings are "hanzi" vs "meaning" at each call site.
- CSS Grid `auto`-sized columns do not leave "extra space" to center when
  a track's own content already sums to the container's forced `width:
  100%` — the earlier "always reserve a flag column" design caused a
  visible left-skew in the hanzi popover for single, unflagged hanzi
  entries; fixed by only adding the flag column when at least one entry in
  the list is actually flagged (see `SentenceText.module.css`
  `.popoverHanziGridFlagged`).
- Running `next build`/`opennextjs-cloudflare build` while `next dev` is
  live corrupts the dev server's `.next` output (stale webpack chunk
  references, e.g. `Cannot find module './331.js'`). No code bug — just an
  operational gotcha for this session's workflow.

## Decisions Made During This Task

- `HanziTab.tsx` intentionally does NOT respect the 간체/번체 preference —
  it always shows both forms side by side, since that comparison is its
  whole purpose.
- Grading/matching/comparison logic (`TypeHanziCard`'s answer check,
  `SentenceBuildCard`/`MatchingCard` correctness checks, `/api/report`'s
  submitted `hanzi` field) intentionally stays on the original simplified
  text regardless of display preference — treated as a data-identity
  concern, not a display concern.
- Migration files are never edited or renumbered after being applied to
  remote D1; before the first remote apply of this session's work, several
  redundant local-only "refresh" migrations were squashed by deleting and
  renumbering (safe only because they hadn't been pushed/applied remotely
  yet — see `git log` for the final numbering `0011`–`0013`).

## Blockers / Risks

- None currently blocking. See Known Problems in `STATE.md` for
  operational gotchas (dev/deploy `.next` collision, transient wrangler
  auth error) that aren't blockers but will resurface.

## Working Tree Notes

- `agent-project-continuity/` (this scaffold, its own nested git repo) and
  `resource/` (pre-existing personal reference PDFs/screenshots) are
  untracked in the main HSK2 repo — left that way deliberately, not an
  oversight. `.claude/skills/checkpoint` and `.claude/skills/recover-context`
  are new symlinks into `agent-project-continuity/.agent-skills/`, also
  currently untracked.
- Everything else is clean: `git status` shows only those three untracked
  paths; `HEAD` matches `origin/main`.

## Next Recommended Action

Nothing queued — wait for the user's next request. If context is
uncertain, run `recover-context` first.
