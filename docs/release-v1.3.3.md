# Release v1.3.3 — Backlog 45/45 complete + source verification

**Date:** 2026-05-15
**Type:** Content release (no UI rework, no schema changes)
**Tag:** `v1.3.3`
**Previous tag:** `v1.3.2`
**Commits since v1.3.2:** 36 (`ba223ca` → `96c0628`)

---

## Summary

Đóng full content backlog 45/45 + verify 22 source-check items + ship reviewer brief cho 9 HIGHEST-risk guide. ADMIN_GUIDES count: **90 → 127** (+37 guide). Không sửa UI, không đổi schema, không thêm asset mới.

| Field | Before (1.3.2) | After (1.3.3) |
|---|---|---|
| ADMIN_GUIDES | 90 | **127** |
| `app.json` version | 1.3.2 | **1.3.3** |
| Content backlog (`full-content-backlog-45-guides.md`) | 18/45 (40%) | **45/45 (100%)** ✅ |
| Counter phrases | 76 (A1–A3) | **~340** (A1–A12 + post-A12) |
| Source-check items verified | 0/22 | **22/22** ✅ |
| Reviewer brief docs | 0 | **1** (`reviewer-brief-9-highest-risk-guides.md`) |
| Schema changes | — | None |
| UI changes | — | None (Reminders edit flow đã ship trong v1.3.2 cycle) |
| New assets | — | None |

---

## 37 new guides shipped (A4–A12 + post-A12 standalone)

Chi tiết breakdown trong `docs/content-roadmap-a4-...` đến `a12-...md` + `docs/admin-guides-complete-123-checkpoint.md`. Highlight categories:

### A4 — Education / children (3+1)
`japanese-school-system-children`, `japanese-language-support-children`, `child-allowance-jidou-teate`

### A5 — Legal / support (3)
`police-questioning-rights-japan`, `embassy-consulate-vietnam-japan`, `foreign-resident-support-centers`

### A6 — Tax / finance expansion (3)
`ideco-personal-pension`, `tax-on-remittance-to-vietnam`, plus extensions

### A7 — Health expansion (5)
`mental-health-stress-support`, `holiday-night-medical-care`, `pharmacy-prescription-guide`, `medical-interpretation-multilingual-hospitals`, `annual-health-checkup-kensin`

### A8 — Career (2)
`paternity-parental-leave-fathers`, `job-change-notification`

### A9 — Community (5)
`vietnamese-community-japan`, `local-volunteering-chonaikai`, plus expansions

### A10 — P0 finish + bonus (7)
`consumer-rights-cooling-off`, `long-term-care-insurance-kaigo`, `fire-earthquake-insurance-home`, `study-in-japan-student-guide`, `domestic-violence-dv-support`, `houterasu-legal-aid-foreigners`, `child-vaccination-schedule`

### A11 — Inheritance + essentials (3)
`inheritance-will-japan-foreigners`, `essential-apps-japan-life`, `point-cards-coupons-japan`

### A12 — Policy 2026 sensitive (3)
`specific-residence-card-my-number-2026`, `myna-health-insurance-card-2026`, `ikusei-shuro-system-guide`

### Standalone post-A12 (4)
`pet-registration-japan`, `discrimination-human-rights-support`, `visa-fee-increase-2025-2026`, `naturalization-kika-2026-changes`, `jista-entry-system-guide`

---

## Source verification pass (commit `dd6533e`)

4 research agent parallel verify lại 22 `NEEDS_OFFICIAL_SOURCE_CHECK` item từ A1–A12 (cộng audit 2 post-A12 guide). Deep-link apply vào `officialLinks` của 11 guide, exact-match `officialSourceLabels` đã sync.

### 6 content correction trong cùng pass

1. **171 test days**: `ngày 1 và 15 mỗi tháng` + 防災週間 + 防災ボランティア週間 (trước: chỉ ngày 1). NTT East official spec.
2. **Safety tips publisher**: `観光庁監修` (Japan Tourism Agency, MLIT) — KHÔNG phải JNTO. Fix 4 file.
3. **typhoon work-refusal legal basis**: `労働契約法 第5条 安全配慮義務` (employer duty) — KHÔNG phải 労働安全衛生法 (employee right to refuse).
4. **naturalization-2026 FAQ**: rõ "国籍法 văn bản KHÔNG sửa, 審査運用基準 sửa từ 01/04/2026 — 居住要件 5→10 năm + 5 năm thuế + 2 năm 保険". Sửa "20 tuổi → 18 tuổi" (成年年齢 hạ từ 2022-04-01).
5. **JESTA timeline**: 閣議決定 10/03/2026, mục tiêu vận hành **FY2028** (04/2028–03/2029) — KHÔNG phải 2030.
6. **NHK case citation**: `平成26(受)1440・1441` (Grand Bench 2017-12-06) — KHÔNG phải 平成26(オ)1130.

---

## Reviewer brief shipped (commit `96c0628`)

`docs/reviewer-brief-9-highest-risk-guides.md` (397 dòng) — Per-guide table of 96 specific claims-to-verify cho 9 HIGHEST-risk guide. Group theo 6 specialist track:

- 弁護士 consumer (cooling-off + NHK): 4–6h
- 弁護士 + 行政書士 入管 (DV): 3–4h
- 弁護士 + 税理士 cross-border (inheritance): 4–6h
- 行政書士 入管 (specific-residence-card, visa-fee, ikusei-shuro): 5–7h
- 税理士 cross-border (tax-on-remittance): 2–3h
- 弁護士 hình sự (police-questioning): 2–3h

**Total**: 20–29 reviewer hour, suggested compensation ¥30k–60k/guide.

**Pre-flagged for revision** (đã chắc chắn sai/conflict, không cần luật sư xác nhận):
- DV guide: Hague Convention claim về VN (likely WRONG — VN không phải contracting state)
- DV guide: 保護命令 2024 expansion to psychological DV chưa reflect
- visa-fee vs specific-residence-card: 4,000円 vs 6,000円 conflict
- inheritance: 制限納税義務者 scope post 2017+2021 reform

---

## Reminders feature (Phase 1 Notifications)

Ship trên main trong commit `4d15606`:
- `src/screens/ImportantDatesScreen.tsx` (+160/-19) — edit flow + permission fallback
- `src/utils/notifications.ts` (+18/-0) — permission helper

Đây là Phase 1 của `app_features_roadmap_2026.md` section 1.

---

## Known risks / pending (sau v1.3.3)

⚠️ **External review cần thiết trước scale**:

1. **9 HIGHEST-risk guide** — gửi reviewer brief cho lawyers / 税理士 / 行政書士 (xem `docs/reviewer-brief-9-highest-risk-guides.md`).
2. **Native JP review** — 340+ counter phrases (76 từ A1–A3 cộng phần mới A4–A12) cần native confirm.
3. **Native VN review** — Hán-Việt cứng + direct-translate flags trong `native-legal-review-pending-a1-a12.md`.
4. **Device QA** — 46 guide mới chưa test trên iOS + Android (xem `docs/device-qa-checklist-v1.3.3.md` — TBD).

⚠️ **Policy moving targets** (re-verify trước nextReviewAt):

- `naturalization-kika-2026-changes`: 法務省 国籍Q&A page chưa cập nhật reflect 01/04/2026 運用基準. Re-fetch sau ngày này.
- `jista-entry-system-guide`: chưa có application portal — chỉ có PDF + announcement. URL có thể đổi khi system go-live (FY2028).
- `specific-residence-card-my-number-2026`: rollout 14/06/2026 — re-verify ISA Q&A sau ngày đó.
- `ikusei-shuro-system-guide`: pre-application 2026-04-15 + 2026-09-01; full operation 2027-04-01.
- `myna-health-insurance-card-2026`: rollout trễ — verify lại 2026-12.

---

## Verification

- `npm run typecheck`: ✅
- `npm run test:ci`: ✅ 251/251 (44 suites)
- `npm run verify:content`: ✅ 0 issues, 0 suspicious lines
- Pre-commit hook auto runs verify trên mọi commit.

---

## EAS submission notes

**Trước khi build EAS for v1.3.3**:

1. Đợi Apple Review xong v1.3.1 (đang trong queue từ 2026-05-09).
2. Build v1.3.2 (đã có app.json 1.3.2 từ trước) → submit Apple.
3. Sau khi 1.3.2 live: build v1.3.3 (đã có app.json 1.3.3 từ tag này).
4. Đính kèm release notes (VN + EN) ngắn cho App Store / Play Store — xem `docs/release-v1.3.2-marketing-copy.md` làm template.

**Alternative**: Nếu muốn skip 1.3.2 build entirely (vì content giữa 1.3.2 và 1.3.3 ngắn 1 tuần), Apple Review có thể accept "jump from 1.3.1 to 1.3.3" — cần update App Store version số.

---

## Changelog reference

Đầy đủ trong `CHANGELOG.md` entry `## v1.3.3 - 2026-05-15`.
