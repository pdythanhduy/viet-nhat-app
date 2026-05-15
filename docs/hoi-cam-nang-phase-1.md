# Hỏi Cẩm Nang — Phase 1 implementation notes

**Status:** First user-facing release of the chatbot. Pure retrieval, no AI, no network.
**Design source:** [`feature-rag-chatbot-assessment.md`](feature-rag-chatbot-assessment.md) · [Issue #28](https://github.com/pdythanhduy/viet-nhat-app/issues/28)

---

## 1. What shipped

A new screen `HoiCamNangScreen` reachable from a small "BETA" card under the Home search CTA. The user types a free-text Vietnamese question, the screen runs a local retrieval pass over the existing `searchIndex`, and renders:

- a one-line lead from the assistant (template, **not** generated text)
- up to 3 short bullets pulled verbatim from cited guides' `quickAction.doNow` / `quickAction.deadline` / `faq.answer` / `description`
- "Từ cần biết" panel with matched `keyTerms` from cited guides
- "Câu có thể nói tại quầy" panel with `counterPhrases` from cited guides (with copy-to-clipboard)
- "Bài liên quan" cards — tap to open the source guide

Each assistant turn ends with a disclaimer pinned at the scroll bottom. Conversation is local-only React state and resets on screen unmount.

## 2. Architecture

```
src/utils/chatRetrieval.ts   — pure helper, no React, no IO
  retrieveChatAnswer(query)  — returns { answer, bullets, sources, glossary,
                                counterPhrases, confidence }
  aggregateHits(query, n)    — tokenizes the query, runs searchAppContent per
                                token, merges scores
  SUGGESTED_QUESTIONS[]      — 5 chips for the empty state

src/screens/HoiCamNangScreen.tsx — chat UI, KeyboardAvoidingView, ScrollView
src/navigation/AppNavigator.tsx  — `HoiCamNang: undefined` route, headerless
src/screens/HomeScreen.tsx       — small "Hỏi Cẩm Nang BETA" CTA below the
                                    main Search card

src/utils/chatRetrieval.test.ts  — 7 unit tests (suggested-question
                                    smoke tests + glossary + counter
                                    phrase + low-confidence + markdown
                                    sanitation)
```

No new dependency added to `package.json`.

## 3. Retrieval strategy (Phase 1)

`searchIndex.searchAppContent` matches a query against title/subtitle/snippet/searchText via case-and-accent-normalized `includes`. That works great for short keyword queries (the existing Search screen sends 1–3 words) but fails on full sentences like *"Mất thẻ cư trú phải làm gì?"* because no single field contains the whole sentence as a contiguous substring.

Phase 1 wraps `searchAppContent` in `aggregateHits` which:

1. Normalizes the query (NFD + đ→d + lowercase) — same routine as `searchIndex`.
2. Splits on non-letter/digit boundaries.
3. Drops short tokens and a small Vietnamese stopword list (`la`, `gi`, `co`, `khong`, `phai`, `lam`, …).
4. Runs `searchAppContent` once with the full query (a verbatim title match still wins) and once per remaining token.
5. Aggregates per-guide scores so guides matching multiple tokens rank above guides matching one.

This is local, cheap, and reuses every existing scoring rule. **It is not an LLM. There is no embedding or vector store.** If a future Phase 2 wants real synthesis, it can replace `aggregateHits` + `buildAnswerBullets` without touching the screen.

### Confidence

- `high` — top result's normalized title equals / startsWith / includes the normalized query (a direct topic match).
- `medium` — at least 2 results returned but no title match.
- `low` — 0 or 1 weak result. Triggers the *"Mình chưa chắc"* framing.

### Synthesis

Per cited guide, one bullet only — pulled verbatim from `quickAction.doNow[0]` if present, else `quickAction.deadline`, else `faq[0].answer`, else `description`. Bullets are trimmed to ~140 chars at the first sentence boundary so the chat answer stays glance-able.

`**bold**` markers are stripped from bullets via a regex so the chat bubble reads as plain text. Bold rendering is preserved on the source-card snippets (via `RichInline`) because tapping a source card opens the full guide where rendering already works.

## 4. UX flow

### Empty state
- 5 suggested-question chips covering the most-likely intents:
  - *"Mất thẻ cư trú phải làm gì?"*
  - *"Mới chuyển nhà cần làm những gì?"*
  - *"住民税 là gì?"*
  - *"Mở tài khoản ngân hàng cần gì?"*
  - *"Khám bệnh ở Nhật như thế nào?"*

### Mid-conversation
- User bubbles right-aligned, primary blue.
- Assistant card left-aligned with a small ✨ avatar.
- Confidence pill (warning chip) shows "Mình chưa chắc" only when retrieval is weak.
- Bullets, glossary panel, counter-phrase panel, source cards — all hidden when empty.

### Source cards
- Reuse `SearchScreen`'s exact icon + color logic (`getResultIcon` + `getResultColor`) so guide/daily-life/job results look identical to the user across the two screens.
- Tap → open `AdminDetail` (or `DailyLifeDetail` / `LaborGuide` / `LaborHelp` / `Jobs` tab / `Japanese` tab) using the same dispatch the Search screen uses.

### Reset
- A small refresh button in the header clears the conversation when one exists.

## 5. Safety rules respected

All 10 rules from the assessment doc §6 are followed:

| Rule | How |
|---|---|
| 1. Answer only from app content | All bullets are verbatim slices from authored guides; no model call |
| 2. Always show source guides | Every non-empty turn has at least one source card |
| 3. "Xem bài gốc" | Every source card is a tappable navigation row |
| 4. No legal/medical/tax advice | Pinned disclaimer per turn |
| 5. No image / file upload | Input is `TextInput` only |
| 6. No personal data | Stateless retrieval; no profile read; no persistence |
| 7. Fallback when unsure | `confidence='low'` path shows "Mình chưa chắc" + related guides, never a fabricated answer |
| 8. No live-internet retrieval | Uses bundled corpus only |
| 9. No long-term user model | Conversation in React state, cleared on unmount or reset |
| 10. Rate limit | Not needed in Phase 1 (no cost). Added when Phase 2 ships. |

## 6. Glossary integration

`findGlossaryHits` scans the cited guides' `keyTerms` arrays. A term hits when its kanji form, hiragana reading, or Vietnamese gloss is a substring of the normalized query (or vice versa). At most 4 unique terms surface per answer. The panel shows term + reading (gray) + meaningVi + noteVi (via `RichInline` so any `**bold**` in `noteVi` renders correctly).

This means *"住民税 là gì?"* surfaces the `juminzei-local-tax` glossary block directly inside the chat — no extra navigation needed.

## 7. Counter-phrase integration

`pickCounterPhrases` takes the first `counterPhrases[0]` from each cited guide (up to 2 total). They render in a blue card with a copy-to-clipboard button that mirrors the AdminDetail behavior (same `Clipboard.setStringAsync(jp)` + Alert).

This means *"Mới chuyển nhà cần làm những gì?"* surfaces `転入届を出したいです。` inline with the chat answer.

## 8. Home entry

A new "Hỏi Cẩm Nang BETA" card sits between the main Search CTA and the situation chips on `HomeScreen`. Deliberately smaller than the Search CTA so it doesn't compete for the primary action. The BETA pill signals expectations.

## 9. What this Phase does NOT do

- ❌ No AI / LLM / embedding / vector DB
- ❌ No backend or API call
- ❌ No new dependency (`expo-clipboard` was already in use)
- ❌ No follow-up turn tracking ("based on what you asked before…")
- ❌ No personalization (user profile / visa type / location)
- ❌ No conversation persistence beyond the screen instance
- ❌ No analytics beyond what already exists (no per-question logging)
- ❌ Does not touch AI Mail screens or `MailTranslate*` routes
- ❌ No rate limiting (not needed — local)

## 10. Known limitations

1. **Synthesis is template-based.** The lead sentence is fixed ("Theo các bài trong app, đây là việc bạn nên làm:"). Phase 2 with an LLM could write a tailored opener.
2. **Bullets are one-per-guide.** A guide with 5 well-ordered `doNow` steps still only contributes one bullet. This keeps each turn under ~3 bullets total so the chat stays scannable.
3. **No cross-question memory.** Each user turn is independent. Asking a follow-up like *"và sau đó thì sao?"* will re-retrieve from scratch and likely return the same guides.
4. **Glossary match is substring-based.** A user typing *"住民"* matches *"住民税"* and *"住民票"* — the panel shows both, which can feel busy. Acceptable for v1.
5. **Stopword list is conservative.** Some Vietnamese filler words (`này`, `kia`, …) still pass through. They rarely break ranking because every guide has them too.

## 11. Test coverage

`src/utils/chatRetrieval.test.ts` — 7 cases:

1. Empty query → empty result, low confidence
2. Clear admin-guide question returns the right guide + ≥1 bullet
3. No `**` markers in synthesized bullets (regression for the search markdown sprint)
4. `keyTerms` surface when query matches a Japanese term
5. `counterPhrases` surface when cited guide has one
6. Nonsense query returns `low` confidence
7. **All 5 suggested-question chips guarantee ≥1 source** — the demo path always works

## 12. Manual QA suggested

Spot checks for human tester before public launch:

1. Open Hỏi Cẩm Nang from Home → empty state shows 5 chips.
2. Tap "Mất thẻ cư trú phải làm gì?" → assistant card shows ≥1 bullet + at least `lost-residence-card` in sources. Tap source → opens AdminDetail. Back. Conversation preserved.
3. Tap "住民税 là gì?" → glossary panel shows 住民税 with reading + meaning.
4. Tap "Mở tài khoản ngân hàng cần gì?" → counter-phrase panel shows `口座を開きたいです。`. Tap copy → toast confirms clipboard.
5. Type free text: `mất thẻ cư trú` → same result as chip #2 (proves the tokenizer works).
6. Type free text: `qwerty xyz 123` → "Mình chưa chắc" pill + low-confidence framing + related-guides fallback.
7. Type a question, then refresh → conversation cleared.
8. Confirm AI Mail screens have **not** become reachable from Home / Settings.

## 13. Next-phase pre-requisites (Phase 2)

When the product decides to move to backend RAG with an LLM:

- Build server-side embedding pipeline over the same content corpus.
- Replace `aggregateHits` + `buildAnswerBullets` with an API call to `POST /api/ask`.
- Keep the screen UI exactly the same — the `ChatRetrievalResult` shape was designed for both phases.
- Pass the Privacy Policy v2 review gate (parallel to AI Mail decision log §25).
- Add per-device rate limiting before exposing.
