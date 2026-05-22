# Search quality audit checklist — manual workflow

**Date**: 2026-05-22
**Owner**: pdythanhduy
**Cadence**: once per month, OR before any keyword PR that touches more than one guide, OR when a weekly report flags suspicious rankings.
**Duration**: 30-45 minutes for a full audit; 10-15 for a targeted one.

Dashboards measure what users typed. This audit measures what
users WOULD type if they had the vocabulary the index expects.
Without it, the dashboard's blind spots stay blind.

Companions:
- [`docs/retrieval-metric-failure-modes.md`](retrieval-metric-failure-modes.md) — interpretation traps the audit guards against
- [`docs/dashboard-sanity-checks.md`](dashboard-sanity-checks.md) — pre-trust checks for the data itself
- [`docs/no-data-action-policy.md`](no-data-action-policy.md) — gates this audit feeds
- [`src/constants/content/adminGuideSearchKeywords.ts`](../src/constants/content/adminGuideSearchKeywords.ts) — central keyword map
- [`src/utils/searchIndex.test.ts`](../src/utils/searchIndex.test.ts) — pinned ranking guarantees

---

## 0. Pre-flight (10 minutes)

The audit is only meaningful on a **real device** running a **real
build** with **no debugger attached** and **no metro hot-reload**
in flight. Browser / simulator results lie about touch latency and
keyboard behavior; debugger output skews timing on the abandon
heuristic.

Setup:
- [ ] iPhone (or Android once built) with current production app version installed
- [ ] App freshly opened ("cold start" — kill from app switcher first)
- [ ] No Metro server running on the dev machine (or use a Release build)
- [ ] No screen recorder running (it ate touch input on iOS in earlier tests)
- [ ] Connected to typical network (NOT dev Wi-Fi if it's faster than user 4G)
- [ ] AsyncStorage in default state (uninstall + reinstall if you want to test cold_start layout) — note: this resets searcher signal and recent guides
- [ ] Test logger ready (notes app or paper). Do NOT trust memory — there are 30+ queries to run

If any pre-flight is skipped, mark the audit "partial" in §5 and
note WHICH steps used a non-clean setup.

---

## 1. Test matrix — 6 input modes × 5 query types = 30 cases

Run each cell. For each, record: **top-1 result**, **first
relevant result position** (could be 0 if top-1 is relevant), and
pass/fail.

### Input modes

| Mode | Example | Why test |
| --- | --- | --- |
| **Vietnamese with diacritics** | `bảo hiểm sức khỏe` | The default user input style |
| **Vietnamese without diacritics** | `bao hiem suc khoe` | Many users disable Vietnamese keyboards on Japanese phones |
| **Romaji (Japanese in Latin script)** | `kokumin hoken` | Users who can romaji but not kana |
| **Kana (hiragana/katakana)** | `こくみんほけん` | Users who can read Japanese phonetics |
| **Kanji (full Japanese)** | `国民健康保険` | Users with full Japanese literacy |
| **Mixed JP/VI** | `nenkin Việt Nam` | Common in real chat — Japanese term + Vietnamese context |

### Query types

| Type | Examples (replace with real audit choices each run) |
| --- | --- |
| **Common admin task** | health insurance, residence card, visa renewal |
| **Crisis / emergency** | lost wallet, traffic accident, no money for hospital |
| **Old / alternative terminology** | `bao hiem suc khoe` (vs current `kokumin hoken`); `the cu tru` (vs `zairyu`) |
| **Realistic typo** | `koumin hoken` (`koumin` instead of `kokumin`); `re entry` with space; `eijuken` missing the long vowel |
| **Underspecified / ambiguous** | `thue` (could be tax — many kinds), `bao hiem` (which insurance?) |

### Recording template (copy per cell)

```
Mode: <vietnamese-with-diacritics|...|mixed-jp-vi>
Query: <exact string typed>
Result count: <N>
Top-1: <guide title / "no results">
First relevant position: <0..29, or "none">
Pass / Fail: <P/F>
Notes: <one line>
```

A cell **passes** when:
- A relevant result appears within the top 3 positions, OR
- The result count is 0 AND the intent has no matching guide in the
  index AND the fallback layer rendered with 6 guides + emergency
  CTA, OR
- The result count is 0 AND the intent IS a Bucket-B content gap
  (no matching guide exists — failure is correct)

A cell **fails** when:
- Top-1 is clearly wrong (no overlap with intent), OR
- The relevant guide exists but is at position 5+, OR
- Result count is 0 BUT a matching guide is in the index (ranking
  miss — Bucket A)

---

## 2. Add-ons — anti-anecdote guardrails

The audit is NOT a license to act on individual fail cells. It is
an inventory.

### 2.1 Do NOT keyword-expand from one anecdote

If a single audit query fails:
- File it in §4 (audit findings) with mode + query + observed result
- Do NOT open a keyword PR
- Cross-reference against the weekly retrieval report's §3 / §4
  (zero-results / abandons). The audit finding becomes ACTIONABLE
  only when:
  1. It correlates with a real user signal (same query showed up
     in production), OR
  2. The same audit-found failure recurs in next month's audit AND
     impacts an obvious user vocabulary (e.g., the romaji form of
     a core admin task).

Single audit anecdote = MEDIUM signal at best. Two audits + a
matching weekly report = STRONG.

### 2.2 Do NOT pad the keyword list to "rescue" rare modes

If the kanji form returns nothing for a query, the right fix is
USUALLY to add the kanji to `searchKeywords` of the correct guide.
The WRONG fix is to add every plausible kanji variant. The
overfitting risk grows with each kanji added — common kanji words
match too many queries and bias results.

Rule: ONE phrase per audit finding. ONE guide. If a single phrase
won't fix the whole row, the row needs investigation, not a quick
keyword.

### 2.3 Test on real device

iOS simulator / Android emulator differ from real devices in:
- Touch latency (affects whether the user gives up before 10s)
- Keyboard layout (Vietnamese Telex behaves differently)
- Network conditions (simulators use Wi-Fi; users may be on 4G)
- AsyncStorage timing (simulators are usually faster)

Real-device-only assertions:
- Tap latency on a result card
- Abandon timer fires after the configured window (10s)
- Empty state appears before typing
- Featured rail renders below the fold (scroll behavior)

If you must audit on simulator (e.g. emergency PR), mark the cells
"simulator-only" and require a real-device re-run before any
action.

### 2.4 Test without debugger attached

A debugger attached to JS context:
- Slows down search execution (heuristically 2-5×)
- Suppresses or delays AsyncStorage timing
- Can mask race conditions in the abandon timer
- Logs from `__DEV__` analytics double-emit make event counting
  pointless

Use a Release build (or Production-mode dev build) and confirm
`__DEV__` is `false` in the analytics logger before recording any
abandon-timer observations.

### 2.5 Test with cold app start

A cold start (force-quit + relaunch) is different from a warm
start (background → foreground) because:
- `home_layout_variant` is computed fresh on Home focus, but the
  underlying `searcherSignal` is read from AsyncStorage
- Recent-views cache initialization may not have run yet
- The first `app_open` event of the day fires only on cold start

For the layout-variant cells specifically, do BOTH a cold start
test AND a warm-start test. They should agree, but warm-start has
caused subtle drift in past releases.

---

## 3. Specific high-leverage cells (do these first if short on time)

If you can only run 10 cells, run these. They cover the highest-
impact user vocabulary across all input modes:

1. `bao hiem` — Vietnamese no-diacritics, ambiguous (which insurance?)
2. `bảo hiểm sức khỏe` — Vietnamese with diacritics, common
3. `kokumin hoken` — Romaji, common Japanese term
4. `kenko hoken` — Romaji variant of the same concept
5. `zairyu` — Residence card, romaji
6. `the cu tru` — Vietnamese no-diacritics for residence card
7. `nenkin` — Pension, romaji
8. `年金` — Pension, kanji
9. `juminzei` — Local tax, romaji
10. `permanent residency eijuken` — Mixed (English + romaji), real-world Twitter/chat usage

A failure on any of these 10 is more concerning than failures on
edge cells. Note them prominently in §4.

---

## 4. Audit findings template

For each audit, append to `docs/reports/` as
`search-quality-audit-YYYY-MM-DD.md`:

```markdown
# Search quality audit — YYYY-MM-DD

## Setup
- Device: <model + iOS/Android version>
- App version: <e.g. v1.5.0 build 26>
- Build mode: <Release | Dev no-debugger | Simulator>
- Audit type: <full 30-cell | targeted 10-cell | spot-check>
- Cells executed: <N>
- Cells passed: <N>
- Cells failed: <N>

## Failed cells

| Mode | Query | Top-1 | First relevant pos | Note |
| --- | --- | --- | --- | --- |
| ... |

## Passed-but-suspicious cells

(Cells that passed but ranked the relevant guide at position 2-3 —
not failures, but worth watching.)

| Mode | Query | Top-1 | First relevant pos | Note |
| --- | --- | --- | --- | --- |
| ... |

## Findings (qualitative)

1. <one sentence per finding>
2.
3.

## Actions proposed

| # | Source row | Proposed action | Type | Evidence band |
| --- | --- | --- | --- | --- |
| 1 | ... | ... | keyword pin / content fix / refuse / observe | STRONG / MEDIUM / WEAK |

## Refusals (cells that failed but should NOT be acted on)

| Cell | Reason refused |
| --- | --- |
| ... | ... |
```

The audit goes into the same `docs/reports/` directory as weekly
retrieval reports. They cross-reference: weekly report cites audit
findings; audit cites weekly report rows.

---

## 5. When the audit is "partial"

Mark the audit as partial when any of the following:

- Pre-flight (§0) had unchecked rows
- Fewer than the 10 high-leverage cells (§3) were executed
- Cells were run on simulator and not re-run on device
- Cells were run with debugger attached
- The reviewer was rushed and didn't record full notes

A partial audit feeds **only** into the carry-forward queue in §17
of the weekly report — it cannot, by itself, justify a keyword PR.

---

## 6. Audit cadence and combine rules

| Trigger | Cadence | Type |
| --- | --- | --- |
| Monthly baseline | once per calendar month | full 30-cell |
| Weekly report flagged "suspicious rankings" §12 | within 1 week of the report | targeted 10-cell on the flagged queries |
| Pre-PR for a keyword affecting > 1 guide | before the PR opens | targeted on the affected queries |
| Post-PR for any keyword PR | within 7 days after merge | targeted on the affected query AND its neighbors (anti-regression) |
| App version bump | within 14 days of the bump | full 30-cell (catches index regressions) |

Combine rules:
- A monthly baseline that overlaps a triggered targeted audit can
  be considered fulfilled if the targeted audit covered ≥ 20 of the
  30 baseline cells.
- A pre-PR audit can be combined with the post-PR audit's
  "before" snapshot when reviewing the PR's effect.

---

## 7. What NOT to do

- ❌ Do NOT audit by typing into the simulator while editing
  `searchIndex.ts` in another window. The cycle is too tight; you
  end up tuning to your own audit, not to user behavior.
- ❌ Do NOT use the audit as evidence for ranking weight changes.
  Audit informs KEYWORD decisions (per-query) and content
  decisions (per-guide). It does NOT inform per-app ranking math.
- ❌ Do NOT skip recording — memory is unreliable across 30 cells.
- ❌ Do NOT extrapolate a single failure to a class. "Romaji broke
  on `kokumin hoken`" is NOT "all romaji is broken".
- ❌ Do NOT batch fixes — one keyword PR per finding, even if 3
  findings clustered around the same guide. Three small PRs are
  easier to revert than one big PR.
- ❌ Do NOT skip the cold-start test for layout-variant cells. The
  warm-start cache hides cold-start bugs.

---

## 8. Quick reference card (carry into every audit)

```
SETUP:
  Real device. Release build. No debugger. Cold start. Clean storage.
  Otherwise: mark partial.

EXECUTE:
  10 high-leverage cells (§3) minimum. 30-cell baseline monthly.
  Record per cell: query, top-1, first relevant pos, P/F, note.

INTERPRET:
  Pass = relevant in top 3 (or correct zero-result with fallback).
  Fail = wrong top-1, OR pos 5+, OR ranking misses an existing guide.

CONCLUDE:
  Single failure → MEDIUM. Carry forward.
  Failure + weekly report match → STRONG. One-phrase PR.
  Don't extrapolate. Don't batch.

REFUSE:
  Padding keyword list to rescue rare modes.
  Acting from simulator-only data.
  Ranking math changes from audit data alone.
```

---

## 9. Revisit this doc

- After every 4 monthly audits → tune the high-leverage cells (§3)
  based on which 10 cells produced the most actionable findings.
- After any post-PR audit caught a regression → strengthen §7 (what
  NOT to do) with the specific mistake that produced the regression.
- When new content categories are added → expand the query types
  (§1) to include the new vocabulary.
