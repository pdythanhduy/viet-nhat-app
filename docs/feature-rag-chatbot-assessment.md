# "Hỏi Cẩm Nang" — RAG Chatbot Feature Assessment

**Date:** 2026-05-15
**Status:** Assessment / design only — **no implementation, no AI API calls in this PR**
**Working name:** "Hỏi Cẩm Nang" (primary) / "Trợ lý Cẩm Nang" (alternate)
**Related:** [`source-overview-current.md`](source-overview-current.md), [`feature-ai-mail-translate-decision-log.md`](feature-ai-mail-translate-decision-log.md) (parallel AI feature — different scope), [`app_features_roadmap_2026.md`](app_features_roadmap_2026.md)

This doc is a **design + phased plan** for a Q&A assistant grounded in the existing app content. It exists to give product / engineering a base to decide *whether* to ship, *which phase first*, and *what to defer*. It is not a build spec.

---

## 1. Feature naming

| Option | Tone | Recommended for |
|---|---|---|
| **"Hỏi Cẩm Nang"** | Conversational, action-oriented, direct VN | Default UI label and entry point |
| "Trợ lý Cẩm Nang" | Assistant framing, slightly more formal | Alternate label for Settings / about screen |
| "AI Tư vấn" | Generic, less branded | **Avoid** — overlaps mental model with "AI Mail" and triggers higher-trust expectations |

Use **"Hỏi Cẩm Nang"** as the surface label; mention "Trợ lý Cẩm Nang" only when describing the feature inside Settings or onboarding.

---

## 2. User pain points

Concrete moments where a Vietnamese user in Japan currently gets stuck even with the app open:

1. **"Tôi cần làm gì trước?"** — User opens the app already mid-problem (visa expiring in 2 weeks, just lost residence card, got a thick envelope from 市役所). Search returns a list; they have to click multiple guides to assemble the answer.
2. **Cross-guide questions** — *"Tôi đi sinh thì làm 出生届 trước hay xin 児童手当 trước?"* spans 2–3 guides; current Search doesn't synthesize.
3. **Japanese term lookup mid-flow** — User reads a guide, hits a 漢字 not in `keyTerms`, has to swipe out to Google Translate.
4. **Counter-phrase in context** — User at the bank counter needs the exact opening line, but they're inside `bank-account` guide which already has it — they don't realize it's there.
5. **"Có áp dụng cho tôi không?"** — User has a specific situation (student visa + part-time job + sending money home). The general guide is too generic; they want a "what *I* should do" answer.
6. **Confused about Vietnamese vs Japanese term** — App is partly bilingual; users sometimes ask the search using a Japanese word they half-remember (`住民税` typed as `juuminzei` from memory).

The chatbot's value is **synthesis over retrieval** — picking the right 2–4 guides, summarizing the key step in Vietnamese, and naming the Japanese term to look for. Not replacing the guide; it's a frontdoor.

---

## 3. Existing content assets (corpus inventory)

**No new content is needed for Phase 0/1.** The corpus is already in `src/constants/content/`.

| Asset | Source | Size | RAG fit |
|---|---|---|---|
| Admin guides | `adminGuides/guides/*.ts` × 128 files | ~100–400 LOC each, full Vietnamese explanation + Japanese terms | **Primary corpus** |
| Glossary (`keyTerms`) | 10 guides × ~5 terms = 50 entries (PR #19 + #24) | term + reading + meaningVi + noteVi | **High-quality structured snippets** — direct answers for "X là gì?" |
| Counter phrases | ~90 admin guides have them | jp + romaji + vn + note | **Suggested action** — "câu nên nói tại quầy" |
| Daily Life topics | `dailyLife/topics/*.ts` × 30+ | section content + tips | Lifestyle / culture / general "how do I…" |
| Search index | `src/utils/searchIndex.ts` | Pre-normalized title/subtitle/snippet/searchText for all guides + topics + phrases + words + jobs | **Already does Phase 1 retrieval** — reuse |
| Japanese phrases | `japanese/phrases/*.ts` | jp + romaji + vn per category | Counter-phrase fallback |
| Labor + jobs | `jobs.ts` + `WORKER_RIGHTS` | Labor rights, hiring tips | Specialized topic answers |
| Stories | `stories/seeds.ts` | Story content | Low RAG priority — narrative not procedural |
| BJT | `bjt.ts` + `docs/bjt/...json` | Exam content | **Exclude** from corpus — wrong audience |

**Estimated effective corpus**: 128 guides × ~200 LOC average ≈ **25K–35K lines** of authored content, roughly **50K–80K words** in Vietnamese + Japanese mixed. Comfortably fits 5–10 MB of embeddings or full-text index.

---

## 4. Retrieval strategy

Three approaches, ordered by complexity:

### 4.1 Approach A — Text retrieval only (Phase 1)

- **Reuse `searchIndex.ts`** — already normalizes accents (NFD + đ→d), already scores `title > subtitle > snippet > searchText`, already strips `**` markdown via `RichInline`/`stripMarkdownBold`.
- Treat user question as a query, return top 3–5 hits.
- **No LLM**, no embeddings, no backend.
- Render hits as "source cards" with a one-line snippet + "Xem bài gốc" CTA.
- **Limitation**: can't synthesize across hits — just lists relevant guides.
- **Strength**: zero cost, fully offline, App-Store-safe, ships in 1–2 weeks.

### 4.2 Approach B — Backend RAG with embeddings + LLM (Phase 2)

- Bundle a **chunked corpus** of admin guide steps / FAQ entries / daily-life sections — each chunk gets an embedding (offline, build-time).
- Ship the embedding index in the app bundle (5–10 MB) OR serve from a small backend.
- At query time:
  - embed user question (small embedding model, can be backend or on-device);
  - top-k cosine similarity → 5–10 candidate chunks;
  - re-rank with `searchIndex.ts` scoring (boost guides matching user's profile / category);
  - pass top 3–5 chunks + a strict system prompt to an LLM that **only answers from the provided chunks**, in Vietnamese, with citations back to the source guide IDs.
- **Strength**: real synthesis. Can say *"Theo guide moving-in-notification + bank-account, bạn nên làm 転入届 trước, sau đó mở tài khoản với 住民票 vừa nhận."*
- **Cost**: per-request cost (input tokens for prompt + chunks + question; output tokens for answer). Order-of-magnitude similar to AI Mail per-request (see [`feature-mail-translate-cost-estimate.md`](feature-mail-translate-cost-estimate.md)), but answer-only is shorter than full document analysis, so likely cheaper per request.

### 4.3 Approach C — On-device LLM (defer)

- Local small model (1–3B parameters quantized) runs entirely on the user's phone.
- Pros: zero per-request cost, full privacy, no backend.
- Cons: 1.5–4 GB model download, slow on older Android, quality far below Claude/GPT-4 class.
- **Recommendation: defer.** Not viable for production in 2026 on the mid-range Android phones this app targets.

### 4.4 Decision

**Start Approach A (Phase 1). Move to Approach B only after Phase 1 ships and we have data on what users actually ask.**

Phase 1 alone is a real product win because (a) the corpus is good, (b) the synthesis-from-search bottleneck is already partly solved by `searchIndex.ts` scoring, and (c) it's fully offline.

---

## 5. UX flow

### 5.1 Entry points

- **Home screen**: a card titled `Hỏi Cẩm Nang` with subtitle "Hỏi nhanh bằng tiếng Việt — trợ lý dẫn bạn đến guide phù hợp." Position **below** the priority cards, above category browsing.
- **Search screen**: when search returns 0 results or very low-confidence results, show a button "Hỏi Cẩm Nang câu này" that opens the chat with the query pre-filled.
- **Admin detail screen**: a small "Hỏi tiếp về bài này" pill at the bottom (Phase 2, when chatbot can answer per-guide). Not in Phase 1.

### 5.2 Chat screen layout

```
┌──────────────────────────────────────────────────┐
│  ←  Hỏi Cẩm Nang                              ⋯  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Câu hỏi gợi ý:                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │ Tôi mới chuyển nhà, cần làm gì?             │ │  ← quick chip
│  └─────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────┐ │
│  │ Visa sắp hết hạn, tôi xử lý ra sao?         │ │  ← quick chip
│  └─────────────────────────────────────────────┘ │
│                                                  │
│  ─────────────────────────────────────────────── │
│                                                  │
│  Bạn:                                            │
│  "Tôi mất thẻ cư trú trên tàu, làm gì?"         │
│                                                  │
│  Cẩm Nang:                                       │
│  Bạn cần làm 2 việc, theo thứ tự:                │
│                                                  │
│  1. Báo cảnh sát ở 交番 gần nhất → nhận           │
│     受理番号 (mã biên nhận).                      │
│  2. Trong 14 ngày, đem 受理番号 đến 入管 xin      │
│     再交付 (cấp lại).                             │
│                                                  │
│  Bài liên quan:                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ 📄 Mất thẻ cư trú                        │    │  ← source card
│  │ Xem bài gốc →                            │    │
│  └──────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────┐    │
│  │ 📄 Gọi cấp cứu, cảnh sát ở Nhật          │    │
│  │ Xem bài gốc →                            │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  Câu cần nói tại 交番:                            │
│  ┌──────────────────────────────────────────┐    │
│  │ 在留カードを紛失しました。                 │ 📋│    │  ← copy-Japanese
│  │ Tôi đã làm mất thẻ cư trú.                │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ⚠ Đây là tóm tắt từ bài có sẵn trong app.       │
│  Không thay tư vấn pháp lý/y tế chuyên môn.      │
│                                                  │
├──────────────────────────────────────────────────┤
│  Gõ câu hỏi…                              [ → ]  │
└──────────────────────────────────────────────────┘
```

### 5.3 Suggested questions (initial chip set, ~6 items)

Pre-authored questions covering the most-likely entry intent:

1. *"Tôi mới chuyển nhà, cần làm gì?"* → moving-in-notification + bank-account
2. *"Visa sắp hết hạn, tôi xử lý ra sao?"* → residence-card-validity + visa-fee-increase
3. *"Tôi mất thẻ cư trú, phải làm gì?"* → lost-residence-card + emergency-calls
4. *"Tôi muốn mở tài khoản ngân hàng — cần gì?"* → bank-account
5. *"Lương net của tôi sẽ là bao nhiêu?"* → juminzei-local-tax + payslip-reading
6. *"Tôi cảm thấy bất an, gọi ai?"* → mental-health + houterasu + emergency-calls

These chips DO double-duty: they teach users what kinds of questions work AND they provide a guaranteed-good-result fallback when free-text is risky.

### 5.4 Source cards

Every answer must end with **1–3 source cards** — a colored chip per cited guide:

- Guide icon + title + 1-line snippet (already in `searchIndex.ts`)
- **"Xem bài gốc"** button → push `AdminDetail` for that guide
- If multiple guides cited, ordered by relevance

This makes the chatbot a **frontdoor to existing content**, not a replacement. It's also the safety mechanism: every claim is grounded.

### 5.5 Glossary-aware answers

When an answer contains a Japanese term that exists in any guide's `keyTerms`, render it as a tappable chip:

- Tap → bottom-sheet showing the glossary entry (term + reading + meaningVi + noteVi)
- Or inline parenthetical: `転入届 (giấy báo chuyển đến)` — first occurrence per answer

Phase 1: inline parenthetical only (simpler). Phase 2: bottom-sheet on tap.

### 5.6 Counter-phrase suggestions

When the answer involves an action at a counter, surface the matching `counterPhrases` entry from the cited guide as a copy-Japanese card (same UI as in `AdminDetailScreen`):

- 日本語 line + romaji + Vietnamese gloss
- Copy icon → clipboard
- Use the existing `RichInline` styling — no new component

---

## 6. Safety / disclaimer rules

These are **hard rules**, not preferences. Every implementation phase must honor them.

1. **Answer only from app content.** Phase 1 picks from `searchIndex`; Phase 2 conditions the LLM on retrieved chunks with a system prompt: *"You can only answer from the provided guides. If none answer the question, say so and recommend the user contact the appropriate office."*
2. **Always show source guides.** No source = no answer. If the retriever returns nothing high-confidence, show a fallback message + suggested questions, not a made-up answer.
3. **"Xem bài gốc"** button on every answer, every source card.
4. **No legal / medical / tax official advice.** Each answer ends with the disclaimer: *"Đây là tóm tắt từ bài có sẵn trong app. Không thay tư vấn pháp lý / y tế / thuế chuyên môn."*
5. **No image / file upload in MVP.** Different feature with different privacy implications — that's the AI Mail flow, governed by [`feature-ai-mail-translate-decision-log.md`](feature-ai-mail-translate-decision-log.md). Do not merge the two product surfaces.
6. **No personal data in MVP.** No "tell me about my visa" personalization. Phase 1 is stateless; Phase 2 may use the existing user profile (visa type, city) but only as additional retrieval signals, never persisted to the backend.
7. **If unsure → show related guides instead of hallucinating.** Low-confidence retrieval = "Tôi chưa chắc hiểu câu hỏi. Bạn xem các bài liên quan dưới đây nhé." + top-3 search hits.
8. **No live-internet retrieval.** The bot must not browse / fetch external pages at query time. Sources are the bundled corpus only.
9. **No model-of-the-user.** No collection of long-term user history beyond the current chat session in Phase 1/2. Conversations are device-local.
10. **Rate limit even free use.** Hard cap per device per day (e.g. 30 questions) once Phase 2 ships to avoid abuse / runaway cost.

---

## 7. Privacy / App Store considerations

| Concern | Phase 1 (text retrieval) | Phase 2 (backend RAG + LLM) |
|---|---|---|
| Data leaves the device? | No — fully offline | Yes — user question goes to backend, then to LLM vendor |
| User content (PII) collected? | No | Only if user types it. Disclaimer + no persistence beyond rate-limit counter |
| Privacy Policy update? | Mention as a local feature | **Required** — disclose vendor (Claude/GPT/Gemini), retention period, no training opt-in |
| Apple Review risk | **Low** | **Medium** — same level as AI Mail Phase 2 |
| `PrivacyInfo.xcprivacy` | No new entries | Required tracking declarations for any analytics + AI vendor |
| GDPR / personal data | No PII flow | Plan deletion endpoint, document retention |

Phase 1 ships **without** any privacy/policy changes. Phase 2 ships **with** the same legal review gate as AI Mail (Privacy Policy v2 + Apple App Store reviewer notes update).

---

## 8. Cost analysis

### 8.1 Phase 1 (retrieval-only)

**Cost: $0 per query.** All processing is local. Bundle size impact: 0 (reuses `searchIndex.ts` + existing content). Engineering: ~1–2 weeks for one dev.

### 8.2 Phase 2 (backend RAG + LLM)

Following the same cost model as [`feature-mail-translate-cost-estimate.md`](feature-mail-translate-cost-estimate.md), but for chat answers instead of document analysis:

**Per-query token estimate (planning placeholder — verify before ship):**

| Component | Tokens |
|---|---|
| System prompt (rules + format) | ~800 (cacheable) |
| Retrieved chunks (3–5 admin guide step/FAQ blocks) | ~2,000 |
| User question | ~50 |
| **Total input** | **~2,850** |
| Answer output | ~300–500 |

With Claude Sonnet 4.7 placeholder pricing ($3/1M input + $15/1M output) and 80% cache hit on system prompt:

```
cost_per_query ≈ (2050 / 1M × $3) + (800 / 1M × $0.30) + (400 / 1M × $15)
              ≈ $0.0062 + $0.00024 + $0.006
              ≈ $0.012 USD per question
              ≈ ¥1.8 per question @ ¥150/USD
```

**At scale**: 1000 active users × 5 questions/day × 30 days ≈ 150K queries/month ≈ **$1,800 USD/month** ≈ **¥270,000/month**.

That's planning math. Real numbers depend on actual prompt design + cache hit rate + vendor pricing on the day you measure. Verify with a 100-query pilot before committing.

### 8.3 Monetization options for Phase 2

- **Free** with daily rate limit (e.g. 10/day). Subsidized as user-acquisition feature. Risk: cost outpaces value if app doesn't monetize elsewhere.
- **Free for low usage + credit pack IAP** for power users (e.g. ¥150 for 50 extra questions/month).
- **Premium tier** bundling chatbot + AI Mail + Find Nearby. Defer until at least two AI features ship.

Don't decide monetization in this assessment. Decide after Phase 1 ships and you have engagement data.

---

## 9. Technical options summary

| Layer | Phase 0 | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|---|
| **UI** | Mock chat screen, hard-coded Q&A pairs | Real chat UI, suggested chips, source cards | Same UI + glossary chips + per-guide entry | Same + voice input, share answer, follow-up turns |
| **Retrieval** | None (hard-coded) | `searchIndex.ts` + simple intent ranking | Backend: embeddings + re-rank | Hybrid: on-device cache + backend |
| **LLM** | None | None | Backend Claude/GPT/Gemini call | Same + tier-based rate limit |
| **Backend** | None | None | Minimal Node/Cloudflare Worker proxy | + caching layer + analytics |
| **Storage** | None | None | Session-only on device | + opt-in conversation history (cloud) |
| **Cost/query** | $0 | $0 | ~$0.012 USD | depends on caching |
| **Privacy review** | None | None | Full Privacy Policy v2 review (legal) | Same |
| **Apple review risk** | None — feature hidden | Low | Medium | Same |

---

## 10. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Hallucinated answers (Phase 2)** — LLM invents a deadline or fee | Medium | High — user trust damage, legal exposure | System prompt strict grounding; refuse to answer if no good chunks; mandatory source cards; disclaimer; visible "Xem bài gốc" |
| **Cost runaway from abuse** | Medium | Medium — burn rate, possibly thousands USD/month | Hard rate limit per device + per IP at backend; suspicious-pattern detector; rolling daily cap |
| **Privacy mis-step** | Low–medium | High — app removal risk | Phase 1 = local only, no risk. Phase 2 = same legal-review gate as AI Mail (see decision log) |
| **Apple "deceptive functionality" flag if Phase 0 ships to users** | High if exposed | Medium — app review delay | Treat Phase 0 the same as AI Mail Phase 1: build screens, do **NOT** expose via Home/Settings until Phase 1 retrieval is wired. |
| **Multilingual confusion** — user types Japanese, bot answers in English | Medium | Low–medium | System prompt: "Always answer in Vietnamese unless user requested otherwise." Quote Japanese terms in parentheses. |
| **Over-trust on legal/medical** | Medium | High | Mandatory disclaimer per answer; specifically refuse to give specific tax / immigration / medical decisions; route to `houterasu` / `embassy` / emergency guide |
| **Search index out of date when content updates** | Low | Low | `searchIndex.ts` rebuilds at app launch from current content — already auto-fresh |
| **Glossary chip race condition** when keyTerm shows up but corresponding guide isn't open | Low | Low | Inline parenthetical in Phase 1 sidesteps this entirely |
| **iOS / Android performance** — embedding search on-device for Phase 2 | Medium | Medium | Use server-side embeddings; on-device only the query embedding + a small index if needed |
| **Cross-pollination with AI Mail decision log** — someone exposes the AI feature via the wrong path | Medium | Medium | Both features must remain hidden from Home/Settings until their respective gates are passed |

---

## 11. Phase plan

### Phase 0 — UI mock + fake Q&A pairs

**Goal**: validate the visual design with a clickable mock. **Not exposed to users.**

- Build `HoiCamNangScreen` (chat layout, suggested chips, source cards) using **hard-coded** Q&A pairs.
- Reuse existing `RichText`/`RichInline` components.
- Reuse `searchIndex` types for source-card shape.
- Register the route in `AppNavigator` but **do not link from Home/Settings**. Same pattern as `MailTranslate*`.
- Output: ~1 PR, 3–5 days.
- Allowed: 4–6 hand-authored Q&A pairs as fixture data.
- Forbidden: any AI API call; any feature flag exposing to users; any backend.

### Phase 1 — Retrieval-only over `searchIndex`

**Goal**: ship a real, useful chatbot using only local text retrieval. **First user-facing release.**

- Build a `useChatRetrieval` hook that:
  - Tokenizes user question (reuse `normalizeText`);
  - Runs `searchAppContent(query)` to get top-N candidates;
  - Picks the 1–3 best by score + a small heuristic (boost matching category if user has a profile);
  - Returns an answer template: *"Theo bài X + Y, bạn cần [first step of guide X] rồi [first step of guide Y]. Xem chi tiết bên dưới."*
- Pull the first 1–2 `doNow` items from each cited guide as the "synthesized answer."
- Surface `counterPhrases[0]` from a cited guide if one exists.
- Surface 1–3 source cards.
- Suggested-chips bar with 6 pre-authored questions.
- Disclaimer + "Xem bài gốc" buttons.
- Output: ~1 PR (or split 2: retrieval + UI), 1–2 weeks one dev.
- Allowed: a tiny intent-keyword map for the 6 suggested questions to guarantee good results.
- Forbidden: LLM calls; backend; new dependencies; embedding generation; cross-device sync.
- **This is the recommended ship target.** Real product value, zero AI-vendor risk, zero new privacy review.

### Phase 2 — Backend RAG with embeddings + LLM

**Goal**: real synthesis for arbitrary questions.

- Backend (minimal worker / proxy):
  - One endpoint `POST /api/ask` → takes `{question, profileHints?}`;
  - Retrieves top-k chunks (server-side embeddings stored in a small SQLite or DuckDB);
  - Calls Claude / GPT / Gemini with strict system prompt + chunks;
  - Returns `{answerVi, citations: [guideId...], counterPhraseHint?, glossaryHints?}`.
- Bundle: corpus chunking + embedding generation runs at app **build time** (script in `scripts/`), pushed as part of backend deploy. No runtime embedding work in the app.
- App: same chat UI from Phase 1, swap the local retriever for an API call when online; fall back to Phase 1 retrieval when offline (graceful degradation).
- Output: ~3–5 PRs over 4–6 weeks. Requires backend deployment + Privacy Policy v2 + Apple App Store reviewer notes update.
- Forbidden until **all** gates are passed: live user exposure. Same gate pattern as AI Mail decision log.

### Phase 3 — Beta + rate limit + monetization

- Open Phase 2 to a small beta (~100 users) via TestFlight / Play internal track.
- Monitor cost per active user, abuse signals.
- Decide free / freemium / paid based on Q&A volume.
- Add follow-up turns ("Còn câu hỏi khác về visa không?") only if Phase 2 quality is high enough.
- Optional: voice input, share-answer-image.
- **Do not start Phase 3 work until Phase 2 has measured 4 weeks of usage data.**

---

## 12. Recommendation

**Start with Phase 1.**

- Phase 0 (clickable mock) is mostly redundant if Phase 1 is already small (1–2 weeks). Skip Phase 0 unless visual design needs a stakeholder review first.
- Phase 1 produces a real, shippable feature with zero AI risk. It uses the existing corpus + the existing search index. It costs nothing per query. It does not need a Privacy Policy update.
- The decision to ship Phase 2 should be **conditional on Phase 1 metrics**: how many users tap the entry, how many ask follow-up questions, how many tap "Xem bài gốc" (i.e. find the suggestion useful). If those metrics are weak, the LLM upgrade is wasted spend.
- Phase 2 is a separate, larger commitment — same gating discipline as AI Mail.

**Recommended next concrete steps:**

1. Open a follow-up issue: *"Build Hỏi Cẩm Nang Phase 1 (retrieval-only, no backend)"* — scope it to a single sprint.
2. Sketch the `HoiCamNangScreen` wireframe in Figma or directly in JSX as a non-exposed route, just to confirm the source-card + suggested-chip layout.
3. Decide where on the Home screen the entry card sits (below priority cards is current proposal).
4. Defer Phase 2 backend work until Phase 1 is in production for at least 2 weeks.

---

## 13. What this PR is NOT

To match the user's explicit constraints for this assessment:

- ❌ **No** implementation code in this PR.
- ❌ **No** AI SDK / API integration.
- ❌ **No** new env vars / API keys.
- ❌ **No** new dependency added to `package.json`.
- ❌ **No** changes to AI Mail screens or routing.
- ❌ **No** IAP plumbing.
- ❌ **No** backend.
- ❌ **No** privacy policy edits in this PR (Phase 2 will need them).
- ✅ **Only** this doc + the related GitHub issue.

---

## 14. Open questions for product

These need a product/eng decision before Phase 1 can start:

1. **Where exactly does the entry card sit on Home?** Below priority cards (proposed), inside the situation chips row, or as a floating action button?
2. **6 suggested chips** — final wording? Translate the proposed 6 into final marketing-tone Vietnamese.
3. **Disclaimer text** — keep terse ("Đây là tóm tắt từ bài có sẵn") or expand for legal coverage?
4. **What happens when a guide is bookmarked and the chatbot cites it** — should it show a "✓ Đã đánh dấu" badge on the source card?
5. **Source attribution depth** — show just the guide title, or also the specific step number cited?
6. **Phase 2 backend hosting** — Cloudflare Worker, Vercel, Supabase Edge, or self-hosted? (Defer; only relevant when Phase 2 starts.)

---

## 15. References

- [`source-overview-current.md`](source-overview-current.md) — current app architecture
- [`feature-ai-mail-translate-decision-log.md`](feature-ai-mail-translate-decision-log.md) — parallel AI feature, same gating discipline
- [`feature-mail-translate-cost-estimate.md`](feature-mail-translate-cost-estimate.md) — cost model reused as Phase 2 baseline
- [`app_features_roadmap_2026.md`](app_features_roadmap_2026.md) — 2026 priorities (AI features listed as out-of-scope until non-AI features stable)
- [`admin-guide-japanese-term-glossary.md`](admin-guide-japanese-term-glossary.md) — glossary schema this chatbot will leverage
- `src/utils/searchIndex.ts` — the Phase 1 retriever
- `src/screens/SearchScreen.tsx` — UI pattern for source cards (already uses RichInline for snippets)
