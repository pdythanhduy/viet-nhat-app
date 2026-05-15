# Admin Guide Readability + RichText Audit

**Date**: 2026-05-15
**Context**: Follow-up to PR #11 (`fix: render markdown bold (**) in admin guide content`). Issue #12: polish readability + content style after the technical render fix.
**Scope**: small, focused changes — not a mass rewrite of all 127 guides.

---

## 1. Style fix — `src/components/RichText.tsx`

### Bug found

`styles.bold` (used by both `RichText` block renderer and `RichInline` inline parser) was forcing `color: Colors.textPrimary` on every bold span. That breaks contrast in two real cases:

1. **Guide header description** — `styles.guideDesc` uses `color: 'rgba(255,255,255,0.85)'` (white on colored hero). Bold parts of `guide.description` were rendered in `Colors.textPrimary` (dark text) → invisible on the colored header.
2. **Step tip box** — `styles.tipText` uses `color: guide.color === Colors.primary ? Colors.primaryDark : guide.color` (matches the guide's accent color). Bold parts inside the tip were rendered in dark `textPrimary` → visual mismatch.

### Fix

Removed the forced `color` from `styles.bold`. Bold spans now inherit the parent's color while keeping `fontWeight: '700'` and `fontFamily: 'BeVietnamPro_700Bold'` — emphasis comes from weight + font, not from a forced color override.

### Cases verified

- Guide header (white parent): bold now stays white ✓
- Tip box (accent-colored parent): bold matches the accent color ✓
- Quick action subtitle / office text / ifLate / InfoList items / mistake / FAQ question (parent `textSecondary` or `textPrimary`): weight + font are still enough to read as bold; the color contrast was nice-to-have, not load-bearing.

No changes to font size, line height, or spacing — those are owned by consumer styles, and PR #11 already wired the right components. A broader typography pass is out of scope for this PR.

---

## 2. Raw `**` verification

### Sweep

Looked for `**` in source code:

| Location | Status |
|---|---|
| `src/constants/content/adminGuides/guides/**` (80 of 127 guides) | rendered through `RichInline` / `RichText` after PR #11 + this PR — bold renders correctly, no raw `**` visible |
| `src/constants/content/dailyLife/**`, `japanese/**`, `stories/**` | zero `**` markers — N/A |
| `src/screens/**` | no literal `**` string |
| `src/components/RichText.tsx` | `**` only inside the parser regex (`/(\*\*[^*]+\*\*)/g`) — not user-visible |
| `docs/*.md`, `README.md`, `CHANGELOG.md` | normal markdown, **out of scope** per Issue #12 |

### Render path map (admin guide fields)

| Field | Render | Bold parsed? |
|---|---|---|
| `guide.description` | `RichInline` (AdminDetail L364) | ✓ |
| `quickAction.deadline` | `RichInline` (L546) | ✓ |
| `quickAction.office` | `RichInline` (L552) | ✓ |
| `quickAction.ifLate` | `RichInline` (L560) | ✓ |
| `quickAction.doNow[]`, `bring[]` | `InfoList` → `RichInline` | ✓ |
| `whoIsThisFor[]`, `whenToDo[]`, `whereToDo[]`, `fees[]` | `InfoList` → `RichInline` | ✓ |
| `estimatedTime` | `InfoText` → `RichInline` | ✓ |
| `commonMistakes[]` | `RichInline` (L883) | ✓ |
| `step.title` | plain `<Text>` | rare bold; deferred |
| `step.description` | `RichText` (block parser) | ✓ |
| `step.tip` | `RichInline` (L852) | ✓ |
| `faq[].question` | `RichInline` (L902) | ✓ |
| `faq[].answer` | `RichText` (block parser) | ✓ |
| `documentsChecklist[].label`, `.note` | plain `<Text>` | no `**` content currently |
| `counterPhrases[].note` | plain `<Text>` | no `**` content currently |

### Conclusion

No user-visible raw `**` should remain in admin guide detail flow after PR #11 + this PR's color fix. `step.title` and a handful of metadata fields still use plain `<Text>`, but the underlying content for those fields does not currently contain `**` markers — flagged as low-risk follow-up if future content adds emphasis.

---

## 3. Japanese-overload audit

### Method

Counted lines with 3+ Japanese term clusters (kanji + kana) per non-counterPhrase line in 8 high-risk guides flagged by Issue #12. Looked specifically for the "stacking" anti-pattern: multiple Japanese-only terms back-to-back with no Vietnamese gloss between them, e.g. `**訪問販売 / 電話勧誘 / マルチ商法 / 内職商法**`.

### Verdict per guide

| Guide | JP overload | Action |
|---|---|---|
| `consumer-rights-cooling-off` | **HIGH** — 4 transaction types stacked back-to-back in description | **rewritten** (description) — each term now has a short Vietnamese gloss; pattern: "bán hàng tại nhà (訪問販売)" instead of bare 訪問販売 |
| `visa-fee-increase-2025-2026` | **MEDIUM** — `**オンライン申請** qua 在留申請オンラインシステム` (redundant JP) | **rewritten** (description) — collapsed to a single VN-led sentence; also expanded `出入国在留管理庁 (ISA)` → "Cục Quản lý Xuất nhập cảnh (出入国在留管理庁 / ISA)" the first time |
| `specific-residence-card-my-number-2026` | LOW–MEDIUM — JP terms are mostly the legal name of the new card itself (`特定在留カード`, `在留カード`, `市役所`). Each VN-led already. | no rewrite — terms are document names the user will read on the card itself |
| `ikusei-shuro-system-guide` | LOW — Japanese terms (`育成就労`, `技能実習`, `特定技能`, `転籍`, `監理支援機関`, `育成就労計画`) are all proper system names; each already has Vietnamese context | no rewrite |
| `houterasu-legal-aid-foreigners` | LOW — `民事法律扶助`, `国選弁護人`, `当番弁護士` are the exact terms users ask for at police / courthouse. Description leads with `法テラス (Japan Legal Support Center / 日本司法支援センター)` already. | no rewrite |
| `embassy-consulate-vietnam-japan` | LOW — most JP is the embassy / consulate names which users see on signage | no rewrite |
| `inheritance-will-japan-foreigners` | MEDIUM — heavy on `通則法`, `民法`, `相続税法` article numbers. These are correct-as-cited and useful for users searching legal text. | no rewrite — readability is fine, terminology is necessary |
| `essential-apps-japan-life` | LOW — most JP terms are app/service names (`マイナポータル`, `健康保険証`, `Yahoo天気`) which the user will literally tap on App Store | no rewrite |

### Rewrite samples

**Before** (`consumer-rights-cooling-off.ts:13`):

```
Cooling-off (クーリング・オフ) là quyền hủy hợp đồng vô điều kiện trong 8–20 ngày
khi mua qua **訪問販売 / 電話勧誘 / マルチ商法 / 内職商法** (luật 特定商取引法).
```

**After**:

```
Cooling-off (クーリング・オフ) là quyền hủy hợp đồng vô điều kiện trong 8–20 ngày
khi mua qua các kiểu giao dịch dễ bị ép: **bán hàng tại nhà** (訪問販売),
**gọi điện chào hàng** (電話勧誘), **bán hàng đa cấp** (マルチ商法),
**việc làm tại nhà có ký quỹ** (内職商法) — quy định bởi luật 特定商取引法.
```

**Before** (`visa-fee-increase-2025-2026.ts:13`):

```
Từ **2025-04-01**, phí làm thủ tục cư trú tại 出入国在留管理庁 (ISA) **TĂNG đáng kể**.
... **Tip tiết kiệm**: dùng **オンライン申請** qua 在留申請オンラインシステム — giảm 500 yên.
```

**After**:

```
Từ **2025-04-01**, phí làm thủ tục cư trú tại Cục Quản lý Xuất nhập cảnh
(出入国在留管理庁 / ISA) **TĂNG đáng kể**.
... **Tip tiết kiệm**: nộp online qua hệ thống 在留申請オンラインシステム — giảm 500 yên.
```

No legal numbers, no procedure meanings, no statute citations were changed. Only the framing was adjusted to lead with Vietnamese.

---

## 4. Out of scope (intentionally)

- AI Mail entry point or Phase 2 — not touched.
- Backend / API / database / IAP / privacy work — not touched.
- Mass rewrite of all 127 guides — explicitly avoided per Issue #12.
- Counter phrases (`jp` / `romaji` lines) — Japanese is the point of those lines; not changed.
- Search keywords — Japanese terms are intentional for search.
- `legalScope.jurisdictionNote` rewrites — these are dense by nature; deferred until/unless a separate readability pass is requested.
- Re-tagging `v1.3.3` — not needed.

---

## 5. Follow-ups (if appetite)

Light follow-up ideas, none required for this PR:

1. Tune `RichText` `defaultText` line-height from 20 to 22 (subtle breathing room) — defer until a typography pass is requested by product.
2. Sweep `step.title` and `documentsChecklist[].label/.note` for `**` if future content authors add emphasis there; right now neither contains markers.
3. Two-pass content audit per category (visa, daily-law, health) — would take 2–3 sessions; current state is acceptable.
4. Add a lightweight ESLint rule or pre-commit hook to flag new admin-guide strings containing `**` that aren't routed through `RichText` / `RichInline`. Would prevent regression but not strictly necessary now.

---

## 6. Manual QA recommendation

Spot-check these guides on device (iOS + Android if possible) after merge:

**Heavy-bold cases** (verify color cascade fix):
- `essential-apps-japan-life` — guide header `**` parts now white instead of dark
- `consumer-rights-cooling-off` — colored chips on parens, bold gloss labels visible
- `inheritance-will-japan-foreigners` — tax table bold figures still readable

**Tip box color cascade**:
- Any guide with `step.tip` containing `**bold**` — bold should match the guide's accent color (not jump to dark text).

**Zero-bold guides** (regression check):
- `sim-card` — render unchanged
- `garbage-sorting-rules` — render unchanged

---

## 7. Verification

- `npm run typecheck` → reported in PR
- `npm run test:ci` → reported in PR
- `npm run verify:content` → reported in PR
- No new dependency, no new file added except this audit doc.
