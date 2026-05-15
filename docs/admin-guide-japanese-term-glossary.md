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
