# ASO submission record — 2026-05-23

**Submission target**: App Store metadata refresh, **bundled with v1.5.1 binary** (Path B per [`docs/v1.5.1-release-checklist.md`](../v1.5.1-release-checklist.md) §9).
**Owner**: pdythanhduy.
**Status**: PICKS LOCKED — capture + upload pending (see §6 action list).
**Authoritative menu**: [`docs/growth/aso-v1.md`](../growth/aso-v1.md) — this doc records the picks from that menu, per its §10.

This is the per-submission record file, NOT a strategy doc. Strategy/menu lives in `aso-v1.md`. Screenshot specs live in `screenshot-storyboards.md`. Decisions live here.

---

## 0. Why bundle with v1.5.1 (not standalone metadata-only)

`docs/v1.5.0-app-store-audit.md:158` recommends: "hold action items 3-6 until after v1.5.0 ships and 1-week DAU data is in." That gate is now past (v1.5.0 live since 2026-05-19, ~4 days of data minimum at v1.5.1 ship time). Bundling means:

- One App Review cycle covers both binary + metadata
- Screenshot reflects the v1.5.0 UX users actually see post-install (no install→reality gap)
- No coupling risk: metadata can still ship standalone later if binary slips review

If v1.5.1 takes Path A (binary only) instead, this doc becomes a standalone metadata submission whenever picked up.

---

## 1. Subtitle (App Store, 30 chars)

**Picked**: **S1** — `Visa, thủ tục, đời sống` (23 chars).
**Source**: `docs/growth/aso-v1.md:18`.
**Why**: matches calm utility positioning, aligns with `aso-strategy-v1.md §2 D` recommendation, lowest A/B-test risk for first submission.

**Planned A/B swap**: S5 — `Tra cứu thủ tục bằng tiếng Việt` (30 chars, `aso-v1.md:22`) — only if first-week CTR < 3% after launch + 14 days observation. Swap decision date: **2026-06-06 earliest** (v1.5.1 ship + 14 days minimum).

**Avoided**: S6 (keyword bomb) — `aso-v1.md:27` flags it as "reads like spam in Vietnamese; will hurt brand trust".

---

## 2. Keyword field

### 2.1 Vietnamese locale (`vi`) — 100-char Apple field

**Picked**: PRIMARY from `aso-v1.md:39-42` (98 chars):
```
visa,nhat ban,cam nang,thu tuc,nguoi viet,zairyu,the cu tru,nenkin,bao hiem,my number,thue,vinh tru
```

**Format check**: comma-separated, **NO spaces around commas** (`aso-v1.md:33`). All lowercase, no diacritics (`aso-v1.md:86` policy — Apple doesn't fold diacritics in keyword field).

**Char count to verify before paste**: 98 (must stay ≤ 100 with current commas).

### 2.2 English locale (`en`) — 100-char Apple field

**Picked**: PRIMARY from `aso-v1.md:58-60` (96 chars):
```
japan,vietnamese,visa,immigration,residency,nenkin,zairyu,my number,tax japan,life japan,jp
```

### 2.3 Japanese locale (`ja`) — proposed addition

**Picked**: PROPOSED ADD from `aso-v1.md:77-80` (94 chars):
```
ベトナム人,在留,ビザ,年金,確定申告,国民健康保険,生活,日本生活,ハンドブック,マイナンバー
```

**Risk per source**: low (`aso-v1.md:81`) — generic concept terms, no competitor names.

**Note**: First time we ship a `ja` locale keyword field. Verify ASC accepts the locale registration first; if `ja` locale must be added to the app's listing localizations, do that as a prerequisite.

---

## 3. Screenshots (6 total, iPhone 6.7" + iPad 12.9")

### 3.1 Headline set

**Picked**: **Set A — Utility-led** from `aso-v1.md:131-136`.
**Why**: matches calm utility brand voice (`aso-v1.md:170`); zero A/B variance risk for first metadata refresh.

| # | Headline | Source |
| --- | --- | --- |
| 1 | "Tìm thủ tục bằng tiếng Việt, romaji hoặc tiếng Nhật" | `aso-v1.md:131` |
| 2 | "Khẩn cấp? Trung tâm hỗ trợ một cú chạm" | `aso-v1.md:132` |
| 3 | "Mỗi guide gợi ý các thủ tục liên quan" | `aso-v1.md:133` |
| 4 | "Hỗ trợ từ tuần đầu mới sang Nhật" | `aso-v1.md:134` |
| 5 | "Học tiếng Nhật mỗi ngày — không spam" | `aso-v1.md:135` |
| 6 | "Nguồn chính thức cho mọi thủ tục" | `aso-v1.md:136` |

### 3.2 Capture specs (full storyboards in `docs/growth/screenshot-storyboards.md`)

| # | UI focus | Real query / guide / state | Storyboard ref |
| --- | --- | --- | --- |
| 1 | SearchScreen | Query: `quá hạn visa` → top result = `overstaying-illegal-stay-procedures` | `screenshot-storyboards.md:35-45` |
| 2 | SearchScreen zero-result | Query that returns 0 → featured rail + emergency CTA visible | `screenshot-storyboards.md:49-59` |
| 3 | AdminDetailScreen | Guide: `overstaying-illegal-stay-procedures` OR `permanent-residency-eijuu` — scrolled to show steps + "Xem thêm liên quan" | `screenshot-storyboards.md:63-73` |
| 4 | HomeScreen | Scrolled to show "Cho người mới sang Nhật" + "Hay được dùng" featured row | `screenshot-storyboards.md:77+` (see file) |
| 5 | Daily Ritual | Unchanged from v1.4 — leave alone (`v1.5.0-app-store-audit.md:92`) | n/a |
| 6 | Trust signal | Any guide bottom — official sources block (`出入国在留管理庁`, `厚生労働省`) visible | `v1.5.0-app-store-audit.md:96-97` |

**Compliance per `screenshot-storyboards.md:15`**: must use REAL app surfaces — no mocked screens, no fake data. Synthetic content = App Review rejection grounds.

### 3.3 Device + size matrix

iOS App Store requires at minimum 1 set:
- [ ] iPhone 6.7" (1290 × 2796) — required
- [ ] iPhone 6.5" (1242 × 2688) — optional, auto-scales from 6.7"
- [ ] iPad Pro 12.9" 3rd gen (2048 × 2732) — required if `ios.supportsTablet: true` in `app.json:15` (which is the case) ✅

Confirm in App Store Connect → Media → which device sets show "missing screenshots" warning before submitting.

---

## 4. Description copy

**Source**: lifted from [`docs/v1.5.0-changelog.md`](../v1.5.0-changelog.md) §"App Store release notes" with positioning adjustments per `docs/v1.5.0-app-store-audit.md:109-112`.

### 4.1 Subtitle (already in §1 above)
`Visa, thủ tục, đời sống`

### 4.2 Promotional text (170 chars max, can update without re-submit)

From `v1.5.0-changelog.md:67-69`:
```
Tìm kiếm thông minh hơn: kết quả đúng ngay lần đầu. Mỗi guide gợi ý các bài liên quan. Truy cập khẩn cấp dễ hơn từ trang tìm kiếm.
```

(129 chars — verified.)

### 4.3 Description (4000 chars max, Vietnamese)

Lead paragraph (per `v1.5.0-app-store-audit.md:109` newcomer-first framing):
```
Cẩm Nang Việt Nhật — cẩm nang sống ở Nhật cho người Việt. Tra cứu thủ tục, đời sống và tiếng Nhật bằng tiếng Việt, romaji hoặc tiếng Nhật — không cần biết kanji.
```

Body — paste verbatim from `v1.5.0-changelog.md:80-89` Vietnamese block (begins "Phiên bản này tập trung vào việc tìm kiếm…").

What we DON'T do paragraph (per `v1.5.0-app-store-audit.md:111`):
```
Không quảng cáo, không thu thập thông tin tìm kiếm gốc, không tự động gia hạn gói trả phí, không bán dữ liệu. Nội dung hoạt động cả khi không có wifi.
```

Closing (per `v1.5.0-app-store-audit.md:112`):
```
Đóng góp / báo lỗi: pdythanhduy@gmail.com
```

### 4.4 Description (English, fallback if EN locale active)

Body — paste verbatim from `v1.5.0-changelog.md:93-102` English block (begins "This release focuses on search…").

---

## 5. Compliance verification (per `aso-v1.md:281-289`)

Before submitting, run anti-clickbait grep on EVERY field above:

### 5.1 Forbidden phrases (`aso-v1.md:241-250`)

- [ ] Grep all copy for: `đảm bảo`, `100%`, `guaranteed`, `tăng tỷ lệ đậu`, `cứu cánh`, `đường thoát`, `loophole`, `hack`, `Số 1`, `kẻo trễ`, `hoàn toàn`
- [ ] Grep for emoji-heavy headlines (🇯🇵🇻🇳🔥💸) — none in Set A picks
- [ ] Grep for competitor app names — none

Run as one-shot from repo root:
```bash
grep -rni "đảm bảo\|100%\|guaranteed\|tăng tỷ lệ\|cứu cánh\|đường thoát\|loophole\|tỷ lệ đậu\|kẻo trễ\|Số 1" \
  docs/reports/aso-submission-2026-05-23.md
# Expected: zero hits beyond the verbatim quotations in this §5.1 list
```

### 5.2 Borderline phrases (`aso-v1.md:255-259`)

- [x] "Tra cứu offline" — IF used in description, must include "không cần wifi" qualifier (current draft §4.3 uses "cả khi không có wifi" ✅)
- [x] "Mọi nguồn chính thức" — IF used, must include `.go.jp` qualifier (current draft does not use this exact phrase; safe)
- [x] "Cẩm nang sống ở Nhật" — must NOT be followed by superlative ("đầy đủ nhất") — current draft §4.3 has no superlative ✅

### 5.3 Claim-to-feature mapping (`aso-v1.md:287`)

Every benefit must map to a feature shipped in current build (v1.5.0 / v1.5.1):

| Claim in copy | Mapped to shipped feature | Evidence |
| --- | --- | --- |
| "Tìm kiếm thông minh hơn" | Search Phase 2A ranking (JP/romaji/VI layers) | `v1.5.0-changelog.md:12` |
| "Mỗi guide gợi ý các bài liên quan" | RelatedGuidesSection on AdminDetail (Phase 2B) | `v1.5.0-changelog.md:17` |
| "Truy cập khẩn cấp dễ hơn từ trang tìm kiếm" | Emergency CTA on search empty + no-results state | `v1.5.0-changelog.md:27` |
| "Tìm thủ tục bằng tiếng Việt, romaji hoặc tiếng Nhật" | Search ranking layers cover all 3 input modes | `v1.5.0-changelog.md:12` + `aso-strategy-v1.md` §2 |
| "Khẩn cấp? Trung tâm hỗ trợ một cú chạm" | Emergency CTA discoverable from search | `v1.5.0-changelog.md:27` |
| "Hỗ trợ từ tuần đầu mới sang Nhật" | First-7/30/90-days guides + "Hay được dùng" Home row | `v1.5.0-changelog.md:21-23, 32` |
| "Học tiếng Nhật mỗi ngày — không spam" | Daily Ritual surface (unchanged from v1.4) | implicit |
| "Nguồn chính thức cho mọi thủ tục" | Every guide cites at least one `.go.jp` source — 127 guides verified | `v1.5.0-changelog.md:38-39` |

No aspirational claims, no AI mentions, no guarantee language. ✅

### 5.4 Other compliance (`aso-v1.md:288-289`)

- [ ] No `lastVerified` date appears in any marketing copy (`aso-v1.md:288`) — verify §4 description does not include "đã verify 2026-05-XX" or similar
- [ ] No paid review or install incentive currently running (confirm with growth ops before submission)

---

## 6. Action items (sequenced — user-executed)

These steps are NOT automated. Each requires either ASC access or design/capture work.

### 6.1 Pre-capture (today, before screenshot work)

- [ ] **Confirm v1.5.1 ship path** — pick Path A or Path B in `v1.5.1-release-checklist.md` §9. If Path A, defer this entire doc to next submission window.
- [ ] **Verify `ja` locale**: open ASC → check if Japanese is in app's listing locales. If not, add it before §2.3 keyword field can be filled.
- [ ] **Pull current store screenshots** from ASC + Play Store, classify each as OK/Stale/Misleading per `v1.5.0-app-store-audit.md:30`.

### 6.2 Capture (1 person, ~2 hours)

Per `screenshot-storyboards.md` storyboards 1-6:

- [ ] Set device to clean state (no notification overlay, status bar full signal, time = 9:41 per Apple convention)
- [ ] Screenshot #1: SearchScreen, type `quá hạn visa`, capture when top result is `overstaying-illegal-stay-procedures`
- [ ] Screenshot #2: SearchScreen zero-result state — type a query that returns 0, capture featured rail + emergency CTA
- [ ] Screenshot #3: AdminDetailScreen — open `overstaying-illegal-stay-procedures`, scroll to mid-body showing one numbered step + bottom "Xem thêm liên quan" pill list
- [ ] Screenshot #4: HomeScreen — scroll to show "Cho người mới sang Nhật" cards + "Hay được dùng" row directly below
- [ ] Screenshot #5: Daily Ritual — same as v1.4, can reuse existing asset
- [ ] Screenshot #6: Open any guide, scroll to bottom official sources block (`出入国在留管理庁` + `厚生労働省` visible)

### 6.3 Headline overlay

- [ ] Use design tool (Figma/Sketch/etc.) — overlay Set A headlines from §3.1 above on each screenshot
- [ ] Font / brand: keep app brand color `#185FA5` (from `app.json:12, 25`) for accent
- [ ] Generate at iPhone 6.7" (1290 × 2796) — Apple auto-scales to 6.5"
- [ ] Generate at iPad Pro 12.9" (2048 × 2732) — required since `supportsTablet: true`

### 6.4 ASC metadata upload

- [ ] Log into App Store Connect → App ID `6762459919`
- [ ] Version → v1.5.1 (created when EAS submit completes)
- [ ] Update fields:
  - [ ] Subtitle → `Visa, thủ tục, đời sống` (§1)
  - [ ] Keyword (vi locale) → §2.1 string verbatim
  - [ ] Keyword (en locale) → §2.2 string verbatim
  - [ ] Keyword (ja locale) → §2.3 string verbatim (after locale registration)
  - [ ] Promotional text → §4.2 verbatim
  - [ ] Description → §4.3 (vi) / §4.4 (en)
  - [ ] Screenshots — upload 6 new images (iPhone + iPad)
- [ ] Run §5.1 grep before clicking "Save" — confirm zero forbidden phrases
- [ ] App Review Information → Notes — paste from `v1.5.1-release-checklist.md` §8

### 6.5 Post-submission monitoring

- [ ] Record submission date below in §7
- [ ] Watch App Review status daily — most rejections come within 24-72 hours
- [ ] If rejected for metadata-only reason: fix per Resolution Center, do NOT re-build binary
- [ ] After approval: file 7-day CTR baseline in next per-submission report (start tracking conversion rate from impressions)

---

## 7. Submission record (fill after upload)

| Field | Value |
| --- | --- |
| ASC metadata save date | _____________ |
| Bundled with binary build | 27 (v1.5.1) — pending |
| Apple submission ID | _____________ |
| App Review entered | _____________ |
| App Review result | _____________ |
| Live on App Store | _____________ |
| First-week CTR baseline | _____________ |
| First-week installs delta vs v1.4 baseline | _____________ |

---

## 8. Rollback

If App Review rejects on metadata:
- Most common: keyword field has banned term → revert that field via Resolution Center, no re-submit needed
- Subtitle rejected → swap to S2 (`Cho người Việt sống ở Nhật`, `aso-v1.md:19`) as safer fallback
- Screenshot rejected for "synthetic content" → re-capture with REAL app data (no mock screens — `screenshot-storyboards.md:15`)

If post-launch metric tanks (CTR < 1.5% sustained 14 days):
- Swap subtitle to S5 (planned A/B variant) — file new per-submission record
- Do NOT change keyword field same week (one variable at a time per `aso-v1.md:275`)

---

## Related docs

- [`docs/growth/aso-v1.md`](../growth/aso-v1.md) — menu (this doc records picks from it)
- [`docs/growth/screenshot-storyboards.md`](../growth/screenshot-storyboards.md) — per-screenshot spec
- [`docs/v1.5.0-app-store-audit.md`](../v1.5.0-app-store-audit.md) — original screenshot proposal
- [`docs/v1.5.0-changelog.md`](../v1.5.0-changelog.md) — description body source
- [`docs/v1.5.1-release-checklist.md`](../v1.5.1-release-checklist.md) — binary release gate (Path B couples this doc)
- [`docs/aso-strategy-v1.md`](../aso-strategy-v1.md) — ranking strategy parent doc
- [`docs/content-governance.md`](../content-governance.md) — compliance rules applied to copy
