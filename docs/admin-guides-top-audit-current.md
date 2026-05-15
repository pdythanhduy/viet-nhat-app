# Admin Guides — Top-10 Audit (Current)

**Audit date:** 2026-05-15
**Auditor:** Claude (autonomous /goal pass)
**Scope:** 10 highest-impact admin guides for người Việt sống ở Nhật
**Baseline:** `main` @ `d711631` (after PR #10 home-ux-polish merge)
**Previous audits:** [`docs/admin-guides-content-audit.md`](admin-guides-content-audit.md) (2026-05-09 read-only) + [`docs/admin-guides-natural-vietnamese-audit.md`](admin-guides-natural-vietnamese-audit.md) (2026-05-09 batch 1)

## 1. Guides audited

Priority list per goal: visa renewal, lost residence card, moving, My Number, kokuho, nenkin, juuminzei, bank, sim, emergency. Picked one canonical guide per topic; mixed with lowest-scoring guides from the 2026-05-09 audit.

| # | Guide id | Topic | 2026-05-09 score | Audit verdict |
|---|---|---|---|---|
| 1 | `residence-card-validity` | Gia hạn hiệu lực thẻ vật lý | 78 | ✅ Clean (action-first pilot already done; well disambiguated from visa renewal) |
| 2 | `lost-residence-card` | Mất thẻ cư trú | ≥85 | ✅ Clean (high-priority, ISA flow + counter phrases complete) |
| 3 | `moving-in-notification` | Chuyển nhà / 転入届 | ≥85 | ✅ Clean (batch 1 already standardized terminology) |
| 4 | `my-number-card` | My Number Card | ≥85 | ✅ Clean (well structured, 4 PIN guidance solid) |
| 5 | `health-insurance` | Bảo hiểm quốc dân (国保) | ≥85 | ✏️ Fixed — step 2 title still had "văn phòng phường/quận" (description already updated in batch 1) |
| 6 | `pension-exemption-refund` | Nenkin / 脱退一時金 | 78 | ✅ Clean (very detailed; smart quotes are intentional/consistent) |
| 7 | `juminzei-local-tax` | Thuế cư trú | 73 (lowest) | ⚠️ **Not fixed** — missing `legalScope` + `quickAction` blocks (structural gap, needs source verification) |
| 8 | `bank-account` | Ngân hàng | ≥85 | ✏️ Fixed — 2 "municipal office" leftovers normalized to 市役所/区役所 |
| 9 | `sim-card` | SIM / eSIM | 76 | ✏️ Fixed — 1 awkward "Từ các biện pháp" wording + 1 missing trailing period |
| 10 | `emergency-calls-japan` | 110 / 119 / 7119 / 9110 | ≥85 | ✏️ Fixed — **English placeholder "father" stuck inside a Japanese example phrase** |

## 2. Files changed

| File | Changes | Type |
|---|---|---|
| `src/constants/content/adminGuides/guides/emergency-calls-japan.ts` | 1 edit (step 3 description) | Real typo |
| `src/constants/content/adminGuides/guides/bank-account.ts` | 2 edits (`legalScope.jurisdictionNote`, `quickAction.office`) | Terminology consistency |
| `src/constants/content/adminGuides/guides/health-insurance.ts` | 1 edit (step 2 title) | Terminology consistency |
| `src/constants/content/adminGuides/guides/sim-card.ts` | 2 edits (step 3 tip, step 4 tip) | Wording + punctuation |
| `docs/admin-guides-top-audit-current.md` | NEW (this file) | Report |

Total: **6 content edits** across **4 guide files**, +1 NEW doc.

## 3. Loại lỗi tìm thấy

### 3.1 Typo / placeholder lọt ra ngoài (1 lỗi)

- **`emergency-calls-japan.ts:219`** — example phrase `"father が倒れた"` had the English word **"father"** left in a Japanese sentence template. The Vietnamese gloss already said "(bố ngã)", so this was clearly a placeholder the original author forgot to replace.
  - Fixed: `"father が倒れた"` → `"父が倒れた"` (chichi ga taoreta).
  - Severity: Medium — appeared in step 3 of the highest-stakes guide (calling 119). User following the example literally would say a non-sensical Japanese phrase.

### 3.2 Terminology inconsistency (3 edits, 2 guides)

The 2026-05-09 batch 1 audit standardized `municipal office` (English) → `市役所/区役所` across 5 guides (moving-in-notification, address-change, my-number-card, health-insurance, juminzei-local-tax). Found leftovers in 2 more guides:

- **`bank-account.ts:15`** — `legalScope.jurisdictionNote` had `municipal office/ISA cấp` → `市役所/区役所/ISA cấp`.
- **`bank-account.ts:29`** — `quickAction.office` had `municipal office và ISA chỉ là nơi` → `市役所/区役所 và ISA chỉ là nơi`.
- **`health-insurance.ts:144`** — step 2 title was `'Đến văn phòng phường/quận'`. The description inside the same step already said `市役所/区役所` (per batch 1 fix), so the title-description mismatch was glaring.

### 3.3 Awkward wording + punctuation (2 edits, 1 guide)

- **`sim-card.ts:91`** — `'Từ các biện pháp chống lừa đảo điện thoại, xác minh online/eSIM có thể thay đổi.'` — "Từ các biện pháp" reads as a translation calque. Changed to `'Do các biện pháp chống lừa đảo qua điện thoại, ...'` (causal "Do" + clarified the phone-fraud context).
- **`sim-card.ts:98`** — step 4 tip missing trailing period. Added.

## 4. Source verification — TODOs for future

These need an external source check; **NOT fixed in this PR** to avoid making up facts:

### 4.1 `juminzei-local-tax` — structural gaps

The guide is missing the **`legalScope`** and **`quickAction`** blocks entirely. Other money-category guides (`bank-account`, `pension-exemption-refund`) have both. This is why it scored 73 in the 2026-05-09 audit.

To fix safely, source verification needed for:
- `legalScope.jurisdiction` ("mixed"? "municipality"? juuminzei is local but the framework is national)
- `legalScope.jurisdictionNote` — which law / which agency
- `legalScope.sourceVerifiedAt` — actual verification date with link
- `quickAction.deadline` — the standard cycle is June notification → 4 installments (June, August, October, January) but the per-installment dates are municipality-specific
- `quickAction.officialSourceLabels` — at least 2 labels matching `officialLinks`

**Recommended next:** dedicated `fix(content): add quickAction + legalScope to juminzei-local-tax` PR after verifying with 財務省 / 総務省 / a sample 市役所 page.

### 4.2 `embassy-consulate-vietnam-japan` — Fukuoka link

The guide mentions **3 cơ quan** throughout (Tokyo Embassy + Osaka Consulate + Fukuoka Consulate) but `officialLinks` only includes 2 (Tokyo + Osaka). User in Kyushu/Okinawa can't reach the right link from the guide.

To fix safely: verify the Fukuoka Consulate's current official URL and add it. Not done here because the URL needs cross-checking with vnembassy-jp.org's listed branch pages.

### 4.3 `pension-exemption-refund` — 2026 figures

The guide cites `2026年度 (令和8年度)` pension premium rates and the `51-employee threshold` for short-time worker enrollment. These should be re-verified each fiscal year against 日本年金機構. Current `lastVerified: '2026-04-11'` is recent (<5 weeks); next review window OK.

## 5. Guides NOT modified — why

| Guide | Reason for skip |
|---|---|
| `residence-card-validity`, `lost-residence-card`, `moving-in-notification`, `my-number-card`, `pension-exemption-refund` | High-quality, no concrete errors found. The remaining gap (counter phrases, quickAction tuning) is either already present or needs source work. |
| `juminzei-local-tax` | Structural gap (missing `legalScope` + `quickAction`); see §4.1. |
| `embassy-consulate-vietnam-japan` | Fukuoka official link gap; see §4.2. |

## 6. Markdown `**` rendering — observed but NOT touched

`Grep` found **360 occurrences of `**` across 30 admin guide files**. They appear inside step `description` strings as intentional bold formatting for sub-headings, e.g.:

```ts
description: '**特別徴収 — trừ qua lương:**\nCông ty trừ thẳng từ lương ...',
```

A parallel session is currently working on the rendering side (branch `fix/render-markdown-bold-content`) to make these render as bold instead of leaking the literal `**` to users. **This audit deliberately does not touch any `**` in content** so it does not race with that fix:

- If the renderer is being patched to **honor `**` as bold**, stripping the asterisks now would lose the intended formatting.
- If the renderer is being patched to **strip `**` from display**, the content is still valid markdown for future renderers.

When the renderer fix lands, a separate sweep can decide whether to keep the markdown convention or convert to plain text.

## 7. Verification commands

- `npm run typecheck` — expect PASS (no logic changes)
- `npm run content:qa-admin-guides` — expect PASS (Jest QA on admin guides)
- `npm run verify:content` — expect PASS (encoding audit + BJT QA gate)

## 8. Recommended next work

In priority order:

1. **`juminzei-local-tax` source check** — verify + add `legalScope` / `quickAction` from official 財務省 / 総務省 / sample 市役所 sources. This single PR would raise the lowest-scoring guide from 73 → 90+.
2. **Add Fukuoka Consulate link** to `embassy-consulate-vietnam-japan` after URL verification.
3. **Per-guide counter-phrase fill-in** — the 2026-05-09 audit's #1 global issue was "thiếu câu tiếng Nhật người dùng sẽ nói tại quầy" across ~79/79 guides. The 10 audited here are mostly OK, but the other ~118 admin guides need a similar phrase pass. Tackle batch-by-batch (10 guides per PR).
4. **Wait for `fix/render-markdown-bold-content` to land**, then run a separate content sweep on `**` if needed.
5. **Source-verification refresh** — guides with `lastVerified > 12 months` (audit doc §"NEEDS_OFFICIAL_SOURCE_CHECK") should be rechecked annually.

## 9. Risks / caveats

- This audit only checked 10/128 guides — the other 118 may have similar typos/inconsistencies.
- The "father" placeholder leak (§3.1) suggests other guides may have similar copy-paste artifacts not caught here. A grep sweep for English nouns inside Japanese phrases (`\"\\w+\\s*が\\s`) could find more.
- Smart quotes (`"..."` U+201C/201D) appear in some guides (e.g. `pension-exemption-refund`). They render fine and are consistent; left untouched in this PR.
- This audit did **NOT** check `officialLinks` URLs for 404s — that's a separate audit pass.
