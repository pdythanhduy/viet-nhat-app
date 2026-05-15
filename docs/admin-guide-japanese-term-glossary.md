# Admin Guide Japanese Term Glossary — first batch

**Date**: 2026-05-15
**Issue**: #17 — "Add Vietnamese glossary explanations for Japanese terms in procedure guides"
**Scope**: small, focused first batch — 5 high-impact guides.

---

## 1. Schema / UI pattern chosen

### Schema

Added a minimal new type `AdminGuideKeyTerm` and an optional `keyTerms?: AdminGuideKeyTerm[]` field to `AdminGuide` in `src/types/content.ts`:

```ts
export interface AdminGuideKeyTerm {
  term: string;        // 転出届
  reading?: string;    // てんしゅつとどけ — optional
  meaningVi: string;   // giấy báo chuyển đi
  noteVi?: string;     // where/when user sees it
}
```

`keyTerms` is optional — every existing guide compiles without changes, and guides that don't have a glossary still render normally (the section is hidden when `keyTerms` is absent or empty).

### UI

New collapsible-style card in `AdminDetailScreen.tsx`, placed **above** the `Câu tiếng Nhật có thể nói` (counterPhrases) card and below the `Tóm tắt nhanh` summary. Rationale: users learn the term first, then see it in spoken phrases.

Visual reuses the existing `counterPhrasesCard` / `phraseCard` styles to avoid adding new UI primitives:

- Section header `book-outline` icon + title **"Từ vựng cần biết"**
- Subtitle **"Các từ tiếng Nhật bạn sẽ thấy trên giấy tờ, biển hiệu, hoặc tại quầy."**
- Each row:
  - Japanese term (large, copy-to-clipboard button on the right)
  - Optional reading in hiragana (small, gray)
  - Vietnamese meaning (medium, primary text)
  - Optional Vietnamese note rendered with `RichInline` (so `**bold**` works if used)

No new dependency. No new style primitive. Card hidden if `keyTerms` is empty.

---

## 2. Guides updated (5 guides)

| Guide | Terms added | Why these terms |
|---|---|---|
| `moving-in-notification` | 5: 転入届, 転出証明書, 住民票, 市役所/区役所, 在留カード | The exact 5 things user faces on day-one at city hall after moving. |
| `lost-residence-card` | 5: 在留カード, 再交付, 紛失届, 受理番号, 出入国在留管理庁 | The keywords that block the process if user doesn't know them (especially 受理番号 — the mã biên nhận from police that's a prerequisite for the reissue application). |
| `health-insurance` | 5: 国民健康保険, 社会保険, 保険証, 資格確認書, 高額療養費 | The two insurance regimes + the two types of card + the trump card 高額療養費 most users don't know they're entitled to. |
| `juminzei-local-tax` | 5: 住民税, 納付書, 特別徴収, 普通徴収, 納税管理人 | Tax-payment mechanic terms that newcomers see on letters from city hall but rarely understand. |
| `emergency-calls-japan` | 5: 救急車, 警察, 消防, 交番, 受理番号 | Words user must recognize on signs / in their own brain when panicking. |

**Total terms: 25** across 5 guides.

---

## 3. Style + scope decisions

### Followed

- ✅ Vietnamese first, Japanese term is the lookup key (not the explanation).
- ✅ Short note explaining where / when user sees the term (not academic dictionary style).
- ✅ Optional reading in hiragana for terms with non-obvious reading.
- ✅ 3–6 terms per guide (matches issue suggestion of "khoảng 3–6 terms là đủ").
- ✅ No new legal numbers / no new deadlines invented — all notes are practical UX, not policy claims.

### Deliberately skipped (for future batches)

- `residence-card-validity`, `bank-account`, `sim-card` (3 of the 8 suggested guides) — these have less acute "user gets stuck on JP term" blocker; can add in a follow-up.
- Audio / romaji for every term — adding only hiragana reading where it actually helps reading; no audio scope.
- Mass-add to all 127 guides — explicitly out of scope per issue.

### Out of scope (per issue)

- Full dictionary feature.
- Search index for terms (terms aren't indexed yet — could be added in a follow-up).
- Linked navigation between guides via shared terms.
- AI Mail / backend / database / IAP / privacy.

---

## 4. Manual QA checklist

After merge, on device (iOS + Android):

1. Open `moving-in-notification` → confirm a card "Từ vựng cần biết" appears between summary and counter-phrases card.
2. Tap copy icon next to 転入届 → confirm clipboard contains `転入届` + toast "Đã copy 転入届".
3. Confirm reading (`てんにゅうとどけ`) shows in smaller gray text below the term.
4. Confirm Vietnamese meaning (`giấy báo chuyển đến`) is clear.
5. Repeat spot check for `lost-residence-card`, `health-insurance`, `juminzei-local-tax`, `emergency-calls-japan`.
6. Open a guide WITHOUT `keyTerms` (e.g., `sim-card`) → confirm the screen renders normally with no glossary card (no visual regression).
7. Confirm bold markers inside `noteVi` (if any are added later) render correctly — `RichInline` is wired.

---

## 5. Follow-up ideas

If product wants more:

1. Batch 2: add glossary to `residence-card-validity`, `bank-account`, `sim-card`, `garbage-sorting-rules`, `kakutei-shinkoku`.
2. Batch 3: gradually cover the 47 legacy guides that have no `counterPhrases` either (likely a 6-week content effort, not a single PR).
3. Cross-guide term linking (e.g., tap on 在留カード in guide A → open `lost-residence-card`). Requires either ID-link convention in noteVi or a new shared-term registry.
4. Term search (typing `転入届` in main search finds all guides that have it as a keyTerm).
5. Add hiragana reading to `counterPhrases` items lacking `romaji` for parity.

None of these are blockers for the current PR.

---

## 6. Verification

- `npm run typecheck` → reported in PR
- `npm run content:qa-admin-guides` → reported in PR (9/9 pass)
- `npm run verify:content` → reported in PR (0 issues)
- `npm run test:ci` → reported in PR (251/251 pass)

---

## 7. Direction after PR #19 merged (2026-05-15)

PR #19 shipped the schema + UI + Batch 1 (5 guides / 25 terms). This section records the agreed long-term direction so future contributors don't have to re-derive it.

### 7.1 Glossary roadmap

**Batch 2** — next focused PR. Same shape as Batch 1: ~5 guides × ~5 terms each. Recommended guides (high traffic, high JP density):

| Guide | Why this batch | Term seeds (subject to author review) |
|---|---|---|
| `residence-card-validity` | Disambiguates 在留期間更新 vs 在留カードの有効期間更新 (frequent newcomer mix-up) | 在留カード, 有効期間, 特定在留カード, 在留期間, 申請書 |
| `bank-account` | Form vocabulary users see at the counter | 口座開設申込書, 通帳, キャッシュカード, 普通預金, 印鑑届 |
| `sim-card` | Plan / carrier vocab on bills + portal | 契約, MNP, 解約, 月額, 名義変更 |
| `garbage-sorting-rules` | Hard-to-skip household reading | 燃えるゴミ, 不燃ゴミ, 資源ゴミ, 粗大ゴミ, 収集日 |
| `kakutei-shinkoku` | Annual tax filing terms repeat for years | 確定申告, 源泉徴収票, 還付申告, 控除, e-Tax |

**Batch 3+** — gradually cover the remaining ~120 guides that don't yet have `keyTerms`. Treat as content work, not engineering — one focused PR per 5 guides, never a mass rewrite. Skip a guide if its existing `counterPhrases` already explain the vocabulary in context.

**Stop conditions** — do NOT add `keyTerms` to:

- Guides where the procedure is fully VN-native (no JP forms / signs / counter terms).
- Guides where `counterPhrases` already cover the same terms with examples (avoid duplication; counterPhrases > keyTerms when both are appropriate).
- Search-only / debug guides.

**Author rule** — every `keyTerm` must answer: "where does the user see this exact string?" If the answer is vague, drop the term.

### 7.2 CounterPhrase direction

`counterPhrases` is the sister field to `keyTerms`: terms with example sentences the user can *say* at the counter. Existing guides have it; coverage is uneven.

**Rule of thumb when authoring:**

| Situation | Use `keyTerms` | Use `counterPhrases` |
|---|---|---|
| Term appears on a form, sign, letter the user reads | ✅ | — |
| User has to **speak** the term to staff | — | ✅ |
| Both reading + speaking | ✅ + ✅ (with note hint) | |

**Example** — `転入届`:

- `keyTerms` entry: `転入届 / てんにゅうとどけ / "giấy báo chuyển đến" / "Trang đầu tiên 市役所 đưa cho bạn khi đến quầy."`
- `counterPhrases` entry: `"転入届を出したいです。" / "Tennyuu todoke o dashitai desu." / "Tôi muốn nộp giấy báo chuyển đến."`

Both are valuable; both are short. The detail screen renders the glossary card and the counter-phrase card stacked above each other — the user gets reading + speaking together.

**Counter-phrase author rule (Vietnamese-first):**

1. The Japanese line is what the user **says verbatim**.
2. The romaji line helps if the user can't read kana.
3. The Vietnamese line is the **meaning**, not a literal translation — make it sound natural Vietnamese.

❌ Bad: `転入届を出したいです。` → `Giấy báo chuyển đến muốn nộp.`
✅ Good: `転入届を出したいです。` → `Tôi muốn nộp giấy báo chuyển đến.`

❌ Bad: `納付書はどこで払えますか？` → `Phiếu nộp ở đâu trả được?`
✅ Good: `納付書はどこで払えますか？` → `Tôi có thể thanh toán phiếu này ở đâu?`

### 7.3 Render-path debt: raw `**` in SearchScreen

Discovered while investigating PR #19 follow-up: `SearchScreen` renders `item.subtitle / item.title / item.snippet` via plain `<Text>`. The `snippet` field sources from `guide.description` which can contain `**bold**` (e.g. PR #14 rewrites). So search result snippets leaked the literal `**` to users.

Fix pattern (in the same PR that added this section):

- Extend `RichInline` to accept optional `numberOfLines` prop (passes through to underlying `<Text>`).
- Swap the three plain `<Text>` nodes in SearchScreen to `<RichInline>`. The snippet keeps its 2-line truncation via the new prop; title / subtitle render full.

No search-index change, no highlight regression (the screen doesn't currently highlight query matches).

**Future-proof rule:** any new screen that renders authored content fields (`description`, `tip`, `note`, `summary`, etc.) MUST use `RichInline` or `RichText`, never plain `<Text>`. The existing audit doc `docs/admin-guide-readability-richtext-audit.md` §5.4 + §8.3 proposes a lint rule as backstop; if added later, this case (SearchScreen) would have been flagged automatically.
