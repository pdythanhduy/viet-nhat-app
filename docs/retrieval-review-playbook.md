# Retrieval review playbook (manual, weekly)

**Date**: 2026-05-21
**Audience**: pdythanhduy + any future reviewer with Aptabase dashboard access
**Cadence**: weekly (every Monday) for the 4 weeks following Phase 2C ship; then bi-weekly
**Output**: a 1-page report posted in your own notes / Notion / Linear — one row per finding

This playbook converts the Phase 2C analytics events into action items. No API automation. No data warehouse. A markdown table + dashboard screenshots is enough.

---

## 1. Setup (one-time)

Aptabase dashboards required (configure once per the [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md) doc):

| Dashboard | Filter | Aggregation |
| --- | --- | --- |
| **Top queries** | `search_query` | Count by `q`, top 50, last 7 days |
| **Top failed queries** | `search_zero_results` | Count by `q`, top 50, last 7 days |
| **Top abandoned queries** | `search_abandoned` | Count by `q`, top 50, last 7 days. Cross-filter by `result_count` (0 vs > 0) |
| **Position distribution** | `search_result_opened` | Histogram of `position` (0..29) |
| **Result-type distribution** | `search_result_opened` | Count by `result_type` |
| **Fallback recovery** | `fallback_guide_opened` | Count by `guide_id`, last 7 days |
| **Home layout split** | `home_layout_variant` | Count by `variant`, daily |

If any dashboard is missing, build it before running the review — partial data leads to wrong conclusions.

---

## 2. Weekly review — five questions, in order

Do NOT skip questions. The order matters: early questions filter out noise that would corrupt the analysis of later ones.

### Q1: What are users searching for most?

**Source**: Top queries dashboard.

**What to look for**:
- The top 10 normalized queries. Are they the queries the content roadmap anticipated?
- Any query in the top 20 that has NO matching guide? That's an unfulfilled intent — candidate for content backlog.

**Action**:
- For each unknown / surprising top query: cross-reference with the failed-query dashboard. If it appears in BOTH top-searched AND failed → high-priority content gap.
- Log findings in the report. Do NOT add keywords yet — Q3 handles that.

### Q2: Where does search fail?

**Source**: Top failed queries dashboard.

**Bucket each entry**:
- **Bucket A — clear intent + matching guide exists but ranking misses it**: a single controlled keyword addition fixes it. Example: `kokumin hoken` was in this bucket pre-v1.5.2; added `'kokumin hoken'` to `health-insurance`.
- **Bucket B — clear intent + matching guide does NOT exist**: belongs in content backlog (`full-content-backlog-45-guides.md`). NEVER add a keyword to an unrelated guide just to "have something show up".
- **Bucket C — ambiguous intent**: hard to bucket. Skip for one cycle; if it recurs, treat as Bucket B.
- **Bucket D — generic noise**: queries like "japan", "help", "info". Do NOT pin keywords — pollutes ranking. If volume is high, consider a top-level featured-guides surface change instead.

**Action**:
- For Bucket A: open a single-keyword expansion PR. One phrase, one guide.
- For Bucket B: append to content backlog with the query as the "user signal" column.
- For Bucket C/D: tally counts for the next review.

### Q3: What are users giving up on?

**Source**: Top abandoned queries dashboard.

**Cross-filter by `result_count`**:
- **`result_count > 0` abandons** → ranking failure. The user saw results and rejected them. Check `position` distribution for these queries — if all opens were at position 5+, top-1/top-2 is the wrong guide.
- **`result_count === 0` abandons** → coverage gap, same as Bucket B above.

**Action**:
- For ranking-failure abandons: review the top-1 / top-3 guide IDs. Are they actually the right guide for the query? If not, the ranking algorithm itself may need adjustment (priority weights, keyword scoring). DO NOT fix by adding keywords to a wrong guide.
- For coverage-gap abandons: same as Bucket B — content backlog.

### Q4: Where did successful searches land?

**Source**: Position distribution + Result-type distribution.

**Healthy signals**:
- Position-0 conversions ≥ 70% of all `search_result_opened` events.
- Top-3 conversions ≥ 90%.
- Result-type distribution skews toward `guide` (≥ 70%) — that's the content the user is here for.

**Warning signals**:
- Long-tail position distribution (significant taps at position 10+) → top results aren't matching intent; ranking has room.
- Result-type skew toward `japanese-*` for non-Japanese queries → search index is bleeding language-content into administrative queries.

**Action**:
- Long-tail position: write down 3 example queries with high-position opens. These become Phase 2C-prep batch candidates.
- Result-type bleed: re-check the JAPANESE_WORDS keyword normalization (covered by existing analytics test).

### Q5: Is the dead-end defense layer rescuing zero-result users?

**Source**: Fallback recovery dashboard.

**Healthy signal**: `fallback_guide_opened` count / `search_zero_results` count ≥ 5% (the user saw zero results AND tapped a fallback guide).

**Warning signal**: Recovery rate < 1% → fallback isn't earning its space. Consider:
- Are the featured guides actually the right safe defaults?
- Is the emergency CTA stealing all the recovery taps? (Cross-check with `emergency_cta_open { source: 'search_no_results' }`.)
- Is the layer too far down the scroll? Surface position matters.

---

## 3. Outputs of the review — the "top 10 missing intents"

End-of-review deliverable is a markdown block in the form:

```markdown
# Retrieval review — week of 2026-XX-XX

## Top 10 missing intents
| Rank | Query (normalized) | Volume | Bucket | Proposed action |
| --- | --- | --- | --- | --- |
| 1 | <q> | <count> | A/B/C/D | <single-keyword expansion> OR <content backlog entry> OR <skip> |
...

## Ranking failures (result_count > 0 abandons)
| Query | Current top-1 | Expected top-1 | Note |
...

## Surface health
- Position-0 conversion rate: X%
- Fallback recovery rate: Y%
- Home layout split: cold_start Z%, searcher (100-Z)%
- Notable shift since last week: ...

## Open content-backlog candidates
- <q> (count: N, week: this)
- ...
```

This goes into the reviewer's notes. NOT a PR. The PR comes only when a Bucket-A keyword expansion is queued.

---

## 4. Anti-patterns — what NOT to do

- ❌ **Do not add keywords to widely-popular guides** to "rescue" generic queries. A keyword on `permanent-residency-eijuu` for "japan" would steal traffic from every legitimate query that should land somewhere else.
- ❌ **Do not measure absolute counts without context** — the same `search_query` count means different things at DAU 50 vs DAU 500. Always compute rates (per `search_query`).
- ❌ **Do not "fix" a Bucket B by adding keywords to an adjacent guide**. Bucket B means CONTENT is missing. Adding keywords to a related guide trades a zero-result failure for a wrong-answer failure — worse for the user.
- ❌ **Do not skip the review** because "data looks fine". Skipping for 4+ weeks while volume climbs means a much bigger backlog when you finally look.
- ❌ **Do not change ranking weights based on a single review**. Wait for 2 consecutive reviews showing the same pattern before tuning `searchIndex.ts`.

---

## 5. When to escalate this playbook into automation

Stay manual as long as:
- ≤ 50 unique top-N queries per week
- ≤ 2 hours per review
- Reviewer can hold the whole picture in their head

Move toward semi-automation when:
- Top-N queries > 100 per week
- The "what changed since last week" question becomes hard to answer manually
- A second reviewer joins and inconsistencies appear

Even then, prefer "Aptabase CSV export + a Python script that classifies into buckets" over a full data-warehouse pipeline. The bottleneck is judgment (which bucket is each query in), not throughput.

---

## 6. Companion files

- `src/utils/searchIndex.ts` — ranking algorithm
- `src/utils/searchIndex.test.ts` — pinned ranking guarantees (regression protection for every keyword expansion)
- `src/constants/content/adminGuideSearchKeywords.ts` — central keyword map
- `docs/search-observability-phase-2c.md` — the event catalog this playbook consumes
- `docs/analytics-decision-map.md` — full product-question mapping
- `docs/full-content-backlog-45-guides.md` — content backlog (target of Bucket B findings)
