# Search ranking governance

**Date**: 2026-05-21
**Status**: live policy. Any keyword or pin change must reference this doc.
**Companions**: [`retrieval-review-playbook.md`](retrieval-review-playbook.md) (the weekly process), [`search-observability-phase-2c.md`](search-observability-phase-2c.md) (the analytics layer)

This doc is the brake. Search pins and keyword expansions are the cheapest way to "improve search" — which is exactly why they're the easiest place to silently overfit. Read this before opening any PR that touches:
- `src/utils/searchIndex.test.ts` (a pin)
- `src/constants/content/adminGuideSearchKeywords.ts` (the central map)
- `searchKeywords:` inline arrays in `src/constants/content/adminGuides/guides/*.ts`

---

## 1. What deserves a pin

A `searchIndex.test.ts` pin is a regression guard for the CURRENT ranking. Add a pin when ALL of the following are true:

1. The query is a **real user query** observed in production analytics OR a confidently-anticipated query (e.g., the exact phrase appears in our content backlog as a user-signal example).
2. The expected guide answer is **unambiguous** — there is exactly one canonical guide for the intent, or a tight top-3 of canonical guides.
3. The current ranking already produces the expected result. **Pins do not "force" a result — they freeze the current state.** If you want to change behavior, change the keyword map first, verify the new top-1, THEN pin.
4. A future ranking refactor (priority weight tuning, scoring change, JP-form handling) plausibly threatens this query. The pin earns its place as a regression guard, not as a vanity check.
5. The pin has a **one-sentence rationale** in the test file documenting WHY the position is current and what the failure mode looks like.

If any of the five is missing, do NOT pin. Add the keyword if appropriate; document the query as observed; come back when the missing condition is met.

---

## 2. What deserves keyword expansion

Adding a keyword to `searchKeywords:` or to the central `ADMIN_GUIDE_SEARCH_KEYWORDS` map. Add a keyword when ALL of the following are true:

1. The query appears in `search_zero_results` top-N for the current review cycle (per `retrieval-review-playbook.md` Q2 Bucket A).
2. The query has a **clear single-guide answer** — not "could be any of these 3 guides", not "depends on the user's situation".
3. The keyword is a **specific phrase or canonical alias** (`'taishoku'`, `'kokumin hoken'`, `'mat the ngoai kieu'`), NOT a generic word (`'japan'`, `'help'`, `'thu tuc'`).
4. The keyword does NOT appear as a substring of unrelated common queries. `.includes(q)` would otherwise leak the keyword into other queries' ranking.
5. The expansion is **single-phrase + scoped to one guide** OR a single colloquial alias added next to its canonical form (see `kokumin hoken` next to `kokumin kenkou hoken`).

Any "bulk keyword add to 5 guides at once" PR fails this gate. Add keywords one at a time, with one cycle of analytics between each, so we can attribute the effect.

---

## 3. Signs of overfitting

Watch for these patterns in the search test suite. Each is a yellow flag; multiple together is a red flag.

| Pattern | What it suggests | Action |
| --- | --- | --- |
| > 60 pins in the suite | Suite is regressing into a corpus of "queries we've shipped fixes for" rather than a ranking-quality check | Audit: which pins can be deleted without losing protection? |
| Pins for queries that have NEVER been logged in production analytics | Synthetic intent — testing what we think users SHOULD search, not what they DO | Mark as "anticipated" with a 60-day kill-by date; delete if no production hit |
| Multiple pins on the same expected guide for variant phrasings of the same query | The variants belong as keywords on the guide, NOT as separate pins | Consolidate into one pin + one keyword |
| A pin requires a keyword that contains a generic word (`'thu tuc'`, `'visa'`, `'thue'`) | The keyword will pollute other queries | Remove the keyword; use a more specific phrase or accept the lower ranking |
| Top-1 pins are tightening (started top-5, now top-3, now top-1, soon top-0.5) | Diminishing returns; pin is fighting the ranking algorithm | Step back; consider whether the ranking algorithm itself needs adjustment |
| Two pins contradict each other for related queries | The keyword space has a collision | Audit the keyword map for the shared substring; resolve at the keyword level |
| Pin rationale comments duplicate (copy-paste of "this is what current ranking does") | No real thought went into the pin | Reject the PR; rationale must be specific |

---

## 4. "One real query != roadmap"

A single user typing a query once does NOT justify a keyword expansion. The retrieval review process explicitly waits for top-N frequency before acting because:

1. **Single queries are noise.** A test user, a member of the dev team, a bot scrape, or one curious user can produce any query exactly once.
2. **Keyword maintenance compounds.** Each keyword added to a guide is one more substring that has to NOT collide with future queries. The suite of "things we have to keep working" grows with every add.
3. **Content-coverage problems disguise themselves as keyword problems.** A Bucket-B query (no matching guide) feels like a keyword failure when it's actually a content gap. Adding keywords to the closest-related guide gives the user a wrong answer instead of a missing answer.
4. **PRs are not free.** Every keyword expansion PR consumes review time + CI cycles + Apple-App-Review attention if combined with anything binary-affecting. The cost of fixing one query has to be justified by its frequency.

Threshold heuristic: a query must appear in top-N failed-query lists across **at least 2 consecutive weekly reviews** before earning a keyword expansion. A single hit waits a cycle.

---

## 5. Max keyword expansion philosophy

A single guide should have, in total (inline + central map combined):

- **At most ~30 keywords** for a content-area guide with a wide intent surface (`residence-card`, `health-insurance`, `kakutei-shinkoku`)
- **At most ~15 keywords** for a narrow guide (`bicycle-rules-2026`, `myna-portal-digital`)
- **At most ~10 keywords** for an explicitly emergency or one-shot guide (`overstaying-illegal-stay-procedures`)

Above those numbers, the guide either has too many aliases or is being used as a catch-all for queries that belong elsewhere. Audit the keywords; consider whether some should move to a more specific guide.

Hard rules within those budgets:
- **No keyword shorter than 4 characters** unless it's a canonical JP term (`'国保'`, `'国保'`, `'国保'`). Short keywords match everything.
- **No keyword in English that's also a common Vietnamese word** (avoid coincidental cross-language collisions).
- **No keyword that's a substring of a popular product name** (avoid trademark adjacency).

---

## 6. Rollback strategy

A keyword expansion regressed something. What now?

1. **Revert the keyword commit** — keywords live in source files; `git revert` works cleanly.
2. **Update the affected pin** — if the pin was added in the same PR, it can be deleted with the revert. If the pin pre-existed and now drifts, update with a comment explaining the rollback.
3. **Document in the retrieval review notes** — record what failed and why, so the same query doesn't get the same fix proposed next cycle.
4. **Do NOT add a counter-keyword on a different guide** to "compete" with the regressing keyword. Counter-keywords compound the pollution.

If the regression isn't from a keyword but from a ranking-algorithm change in `searchIndex.ts`:
- Revert the algorithm change first (single-line if the change is tagged correctly)
- Re-run the full search test suite — every pin must pass
- Open a follow-up PR with the algorithm change re-attempted, with new pins covering the queries that broke

---

## 7. What this doc does NOT govern

- **Content authoring** — what goes into a guide's body, sections, FAQ, etc. That's content governance (`docs/content-governance.md`).
- **The ranking algorithm itself** — scoring weights, layered match priority. That's in `searchIndex.ts` and changes should be reviewed against the full pin suite, not against this doc.
- **Featured-guide selection** — `priority: 'high'` in guide files. That's editorial.
- **Daily-life / Japanese / Jobs content** — same ranking rules apply, but content lives in different files. This doc is admin-guide-centric.

---

## 8. The one-sentence test for any proposed change

> "If I shipped this change, what specific failure mode would the pin catch one ranking refactor from now?"

If you can't answer in one sentence, don't ship.

If the answer is "I'm adding it for completeness" or "it might come up", don't ship.

If the answer is "if someone retunes the JP-form weight from +120 to +100, this query stops resolving correctly", ship.

---

## 9. Audit cadence

- **Per PR**: every keyword-touching PR must show evidence it followed §2 (single-phrase + scoped) and §4 (no synthetic intent).
- **Quarterly**: re-read this doc; check the pin suite against §3 patterns; delete pins that no longer earn their place.
- **Yearly**: audit the keyword map total size; if total entries doubled since last audit without a corresponding doubling of pinned queries, the keyword surface is bloating.

---

## 10. Companion files

- `src/utils/searchIndex.ts` — ranking algorithm
- `src/utils/searchIndex.test.ts` — pinned ranking guarantees (read its file-header comment for the per-section pin philosophy)
- `src/constants/content/adminGuideSearchKeywords.ts` — central keyword map (the "things we expanded" list)
- `docs/retrieval-review-playbook.md` — the weekly process
- `docs/search-observability-phase-2c.md` — the analytics layer that supplies the data
- `docs/full-content-backlog-45-guides.md` — content backlog (where Bucket-B queries go)
