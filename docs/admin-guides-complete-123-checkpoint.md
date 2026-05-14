# Admin Guides Complete Checkpoint

**Date:** 2026-05-14
**Branch:** `feature/admin-guides-complete-123`
**Base:** `v1.3.2` (commit `6e656cb`)
**Branch head at checkpoint:** `4bee9bb` (after parallel session A12 batch report)
**Status:** Pre-merge audit — KHÔNG merge `main` ngay. Cần review trước.

---

## 1. Guide count

| Mốc | ADMIN_GUIDES count |
|---|---:|
| v1.3.2 ship (Apple Review) | 90 |
| Branch tip hiện tại | **125** |
| Net thêm sau v1.3.2 | **+35** |

⚠️ **Branch name vs reality:** Branch tên `feature/admin-guides-complete-123` nhưng actual count là **125** (parallel sessions tiếp tục add 2 guide nữa: `discrimination-human-rights-support` + `visa-fee-increase-2025-2026`). Tên branch giữ nguyên — không rename để tránh lịch sử Git rối.

Phương pháp đo:
- `grep -cE "^  [a-z][a-zA-Z0-9]+," src/constants/content/adminGuides/guides/index.ts` → 125
- Import count khớp array entries (loại trừ `import type`).

---

## 2. New guide groups (35 file mới kể từ v1.3.2)

### Batch A4 — Education + child allowance (4)
- `child-allowance-jidou-teate`
- `japanese-language-support-children`
- `japanese-school-system-children`
- `study-in-japan-student-guide`

### Batch A5 — Legal / support (4)
- `consumer-rights-cooling-off`
- `domestic-violence-dv-support`
- `houterasu-legal-aid-foreigners`
- `police-questioning-rights-japan`

### Batch A6 — Tax / finance expansion (3)
- `furusato-nozei-guide`
- `ideco-personal-pension`
- `tax-on-remittance-to-vietnam`

### Batch A7 — Health expansion (5)
- `holiday-night-medical-care`
- `long-term-care-insurance-kaigo`
- `medical-interpretation-multilingual-hospitals`
- `mental-health-stress-support`
- `pharmacy-prescription-guide`

### Batch A8 — Career (2)
- `japanese-resume-rirekisho`
- `job-interview-japan`

### Batch A9 — Community (5)
- `embassy-consulate-vietnam-japan`
- `foreign-resident-support-centers`
- `free-japanese-classes-local`
- `local-volunteering-chonaikai`
- `vietnamese-community-japan`

### Batch A10 — P0 finish + bonus (7)
- `child-vaccination-schedule`
- `fire-earthquake-insurance-home`
- `paternity-parental-leave-fathers`
- (+ daily-law/health bonus theo A10 report)

### Batch A11 — P1 + P2 mixed (3)
- `essential-apps-japan-life`
- `inheritance-will-japan-foreigners`
- `point-cards-coupons-japan`

### Standalone post-A11 (6)
- `pet-registration-japan` (daily-law)
- `ikusei-shuro-system-guide` (visa, **policy-sensitive 2027**)
- `myna-health-insurance-card-2026` (health, **policy-sensitive 2024–2025**)
- `specific-residence-card-my-number-2026` (immigration, **policy-sensitive 2026**)
- `discrimination-human-rights-support` (legal)
- `visa-fee-increase-2025-2026` (visa, **policy-sensitive 2025–2026**)

Tổng cross-check Git diff: **35 file mới**.

---

## 3. High-risk guides

| Guide | Risk | Lý do |
|---|---|---|
| `inheritance-will-japan-foreigners` | **HIGHEST** | Cross-border inheritance + tax. Cần 弁護士 + 税理士 cross-border. |
| `ikusei-shuro-system-guide` | **HIGHEST** | Visa 2027 — chính sách đang triển khai dần, sai = visa từ chối. |
| `myna-health-insurance-card-2026` | **HIGH** | Bảo hiểm y tế — sai = đi khám phải tự trả 100%. |
| `specific-residence-card-my-number-2026` | **HIGH** | 在留カード — sai = mất tư cách cư trú. |
| `visa-fee-increase-2025-2026` | **HIGH** | Phí visa — sai số tiền = user mang thiếu/thừa. |
| `domestic-violence-dv-support` | **HIGH** | Bạo lực gia đình — sai info = user trong nguy hiểm. |
| `tax-on-remittance-to-vietnam` | **HIGH** | Tax cross-border — sai = phạt thuế VN/Nhật. |
| `police-questioning-rights-japan` | **HIGH** | Quyền hình sự — sai = user mất quyền hợp pháp. |
| `discrimination-human-rights-support` | **MEDIUM-HIGH** | 法務省 人権擁護局 procedure — cần verify hotline + URL. |
| `consumer-rights-cooling-off` | **MEDIUM-HIGH** | Pháp luật tiêu dùng — vùng tranh cãi (NHK case). |
| `houterasu-legal-aid-foreigners` | **MEDIUM-HIGH** | Eligibility legal aid — phụ thuộc income + visa status. |
| `long-term-care-insurance-kaigo` | **MEDIUM** | Bảo hiểm kaigo — eligibility phức tạp với người nước ngoài. |
| `child-vaccination-schedule` | **MEDIUM** | Y tế trẻ em — lịch tiêm có thể đổi. |

13 guide ở mức MEDIUM trở lên cần human review trước khi merge `main`.

---

## 4. Source-check-needed guides

Guides có **dates / số liệu cụ thể** chưa verify với nguồn chính thức gần đây:

| Guide | Items cần verify | URL chính thức |
|---|---|---|
| `ikusei-shuro-system-guide` | 15/04/2026, 01/09/2026, 01/04/2027 | https://www.moj.go.jp/isa/applications/index_00005.html |
| `myna-health-insurance-card-2026` | 02/12/2024, 01/12/2025 | https://www.mhlw.go.jp/stf/newpage_08277.html |
| `specific-residence-card-my-number-2026` | 14/06/2026 | https://www.moj.go.jp/isa/tokutei.html |
| `visa-fee-increase-2025-2026` | Số tiền + ngày tăng phí | ISA visa fee schedule |
| `inheritance-will-japan-foreigners` | 通則法 đ.36, 民法 968 + 1042, 相続税 基礎控除 3000万+600万×N, 4 thời hạn (3/4/10 tháng) | 国税庁 + 民法 + 法務省 |
| `tax-on-remittance-to-vietnam` | VN-Japan tax treaty, 110万 yên/year gift threshold | 国税庁 + Thông tư VN |
| `furusato-nozei-guide` | Cap limits theo income | furusato-tax.jp + 総務省 |
| `ideco-personal-pension` | Mức đóng max theo nhóm visa + income | 国民年金基金連合会 |

**Tổng items dates/numbers cần verify:** ~30+ items qua 8 guide.

**Action trước merge `main`:**
- WebFetch tất cả 8 URL → confirm 200 OK + ngày tháng khớp.
- Hoặc gửi 行政書士 / 税理士 hợp đồng review.

---

## 5. Native / legal review-needed guides

Tham chiếu `docs/native-legal-review-pending-a1-a11.md` (hoặc a1-a12 nếu parallel session đã rename).

Highlights cho merge gate (HIGHEST priority — gửi external review trước v1.3.3 / v1.4.0):

1. **`inheritance-will-japan-foreigners`** — 弁護士 cross-border + 税理士 cross-border (8 items HIGHEST).
2. **`domestic-violence-dv-support`** — Tổ chức DV / women's shelter Nhật-VN.
3. **`consumer-rights-cooling-off`** — Vùng tranh cãi NHK + 訪問販売 + 特商法 — luật sư consumer.
4. **`houterasu-legal-aid-foreigners`** — Eligibility chi tiết — 法テラス hotline.
5. **`tax-on-remittance-to-vietnam`** — 税理士 hiểu cross-border VN.

Recommended reviewer profile:
- Việt-Nhật bilingual luật sư hoặc 行政書士 (immigration + family law).
- 税理士 cross-border (cho 2 guide tax + 1 inheritance).
- Native VN reviewer cho counter phrases (76+ phrase qua các batch A1-A11).
- Phụ trách content (in-house) cho hedge wording consistency.

---

## 6. Non-content code on this branch

⚠️ Branch này **KHÔNG phải content-only.** Có 1 non-content code commit kế thừa từ `feature/post-v1.3.2-content`:

```
4d15606 feat(reminders): add edit flow and permission fallback
  - src/screens/ImportantDatesScreen.tsx (+160 / -19)
  - src/utils/notifications.ts (+18 / -0)
```

Đây là Phase 1 Notifications enhancement (per `app_features_roadmap_2026.md` section 1).

→ **Khuyến nghị split branch** (xem section 9).

---

## 7. Device QA checklist (pre-merge)

Smoke test 35 guide mới trên iOS + Android (~45–60 phút mỗi platform).

### 7.1 Existing flows (regression)
- [ ] App mở không crash trên cold start.
- [ ] Home → Admin → Search → Japanese → Saved navigation OK.
- [ ] Search "thuế" / "bảo hiểm" / "visa" → kết quả không bị filter ẩn.
- [ ] Saved tab → bookmark thêm guide mới → persist sau restart.

### 7.2 Render — 35 guide mới
- [ ] Mỗi guide mở từ Admin tab hoặc Search không crash, không màn trắng.
- [ ] Hero image (nếu có) load đúng — fallback đẹp nếu thiếu.
- [ ] CounterPhrases (76+ tổng) tap copy → clipboard có jp.
- [ ] Long jp render đầy đủ (vd `育成就労法 + 技能実習法` không cắt).

### 7.3 Policy-sensitive — 5 guide (special attention)
- [ ] `ikusei-shuro-system-guide`: ngày 01/04/2027 + 15/04/2026 + 01/09/2026 render rõ; disclaimer "tài liệu định hướng" hiện.
- [ ] `myna-health-insurance-card-2026`: ngày 02/12/2024 + 01/12/2025 render rõ; whenToAskExpert list visible.
- [ ] `specific-residence-card-my-number-2026`: ngày 14/06/2026 render rõ; "KHÔNG bắt buộc đổi ngay" wording rõ.
- [ ] `visa-fee-increase-2025-2026`: phí cụ thể có hedge "tham khảo ISA".
- [ ] `inheritance-will-japan-foreigners`: 4 thời hạn (3/4/10 tháng) render rõ; whenToAskExpert hiện 弁護士 + 税理士.

### 7.4 Search keyword cross-check (sample)
- [ ] "ペット" / "nuôi chó" → `pet-registration-japan`.
- [ ] "育成就労" / "ikusei shuro" → `ikusei-shuro-system-guide`.
- [ ] "マイナ保険証" → `myna-health-insurance-card-2026`.
- [ ] "thừa kế" / "遺言" / "相続" → `inheritance-will-japan-foreigners`.
- [ ] "bị phân biệt" / "差別" → `discrimination-human-rights-support`.
- [ ] "phí visa" / "在留資格 手数料" → `visa-fee-increase-2025-2026`.

### 7.5 Bookmark / share
- [ ] Bookmark 5 guide policy-sensitive → Saved tab hiện đầy đủ.
- [ ] Copy disclaimer text → paste vào Notes → wording đúng.

### 7.6 Reminders feature (vì branch có cả phần này)
- [ ] Mở Important Dates → 8 preset hiển thị (có 2 mới: "Lịch tiêm chủng con" + "Thuế / 国保").
- [ ] Tap card → edit modal pre-populate đúng.
- [ ] Permission denied → banner đỏ + nút "Mở Cài đặt" → mở Settings.
- [ ] Safety disclaimer "không thay cơ quan chính thức" hiện trên screen.

---

## 8. Verification results

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ Pass (0 errors) |
| `npm run test:ci` | ✅ Pass (44 suites / 251 tests) |
| `npm run verify:content` | ✅ Pass (0 file issues, 0 BJT warnings) |
| `npm run verify` (full chain) | ✅ Pass |

Verified trên branch `feature/admin-guides-complete-123` tại HEAD `4bee9bb`.

---

## 9. Recommendation before merge

### 9.1 Split branch — recommended

Branch `feature/admin-guides-complete-123` đang **mixed content + non-content** (1 commit reminders code).

**Option A — Clean split (recommended):**
1. Tạo branch `feature/reminders-phase1-edit-fallback` từ `main`.
2. Cherry-pick commit `4d15606` (feat: reminders edit flow) sang branch reminders.
3. Trên `feature/admin-guides-complete-123`: revert commit `4d15606` để branch chỉ còn content.
4. 2 PR riêng → 2 review track riêng (content reviewer vs engineering reviewer).

**Option B — Keep mixed (faster, but harder review):**
- 1 PR duy nhất. Review trộn content + code.
- Risk: reviewer overload, dễ miss issue, slow approval.

→ **Recommend Option A** vì 35 guide cần content/legal review (slow) trong khi reminders code đã verified cleanly (fast).

### 9.2 Pre-merge gates (ANY merge path)

Trước khi merge `main`:

- [ ] Tất cả 13 high-risk guide (section 3) được 1 reviewer Việt-Nhật bilingual đọc qua.
- [ ] Tất cả 8 source-check-needed guide (section 4) WebFetch verified hoặc human source-check.
- [ ] Top 5 native/legal review-needed guide (section 5) gửi 行政書士 / 税理士 (budget ¥30-100k/guide).
- [ ] Device QA pass cho 35 guide mới + 5 policy-sensitive đặc biệt.
- [ ] Reminders feature đã device-tested (permission flow + edit flow).
- [ ] `app.json` version vẫn `1.3.2` (KHÔNG bump cho đến khi sẵn sàng release tiếp).
- [ ] CHANGELOG.md cập nhật (nếu có) hoặc tạo `docs/release-v1.4.0.md` khi quyết version tiếp.

### 9.3 Suggested release versioning

- **v1.3.2** (đã ship Apple Review): 90 guides — KHÔNG động.
- **v1.3.3** (hotfix, nếu cần): content patch nhẹ, không thêm guide mới.
- **v1.4.0** (next minor): 125 guides + reminders Phase 1 + có thể thêm tính năng khác từ roadmap.

Khuyến nghị: branch này → **v1.4.0**, KHÔNG ship như v1.3.3 vì:
- Quá nhiều guide mới (+35) cho 1 patch release.
- Có thêm UI feature (reminders enhancement).
- Apple Review sẽ chậm hơn vì content nhiều + policy-sensitive.

### 9.4 Decision matrix

| Quyết định | Recommend | Rationale |
|---|---|---|
| Merge as-is vào main | ❌ **Không** | Chưa review high-risk guide; mixed content + code |
| Split branch trước | ✅ **Có** | 2 review track song song nhanh hơn |
| Cần review trước merge | ✅ **Có** | 13 high-risk + 8 source-check + 5 legal-priority |
| Release version target | **v1.4.0** | KHÔNG ship qua v1.3.3 patch |
| EAS build ngay | ❌ **Không** | Chưa qua review + device QA |

---

## 10. Open questions

1. Budget cho external 行政書士 / 税理士 review (¥30-100k/guide cho 5 highest-priority)?
2. Reviewer Việt-Nhật bilingual có sẵn in-house hay outsource?
3. Device QA tester có sẵn cho iOS + Android (~90 phút mỗi platform)?
4. Release v1.4.0 target date — Apple Review thường 24-72h, nhưng nội dung policy-sensitive có thể trigger extra review.
5. Có cần i18n (English) cho 35 guide mới cho App Store metadata không?
6. Tag `v1.3.2` vẫn pointing đúng commit `6e656cb` — không động.

---

## 11. Maintenance

- Cập nhật doc này khi:
  - Reviewer hoàn thành 1 batch.
  - Phát hiện guide mới cần đưa vào high-risk list.
  - ISA / MHLW thay đổi chính sách cho 2026 dates.
- Khi merge xong: tạo `docs/admin-guides-shipped-vN.md` (lock state ship được) thay thế file này.
- Nếu split branch: thêm pointer "phần reminders đã tách sang `feature/reminders-phase1-edit-fallback`" vào section 6.
