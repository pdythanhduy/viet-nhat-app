# Changelog

All notable changes to **Viet Nhat / Cẩm Nang Việt Nhật** are recorded here.
The latest entry is at the top.

> Note on version history: app.json reached `1.4.0` internally during dev
> but no `1.4.0` build was ever shipped to the App Store / Play Store
> (current live store version is `1.2.0`). To keep store release history
> clean, everything cut between `1.2.0` and now is consolidated under the
> single `1.3.0` entry below. The internal `1.4.0` label was reverted
> at that time; the current `v1.4.0` release below is the first real
> 1.4.0 build with a new user-visible feature.

## v1.4.0 - 2026-05-15

Feature release adding **Hỏi Cẩm Nang BETA** — a local retrieval
assistant that lets users ask procedure questions in natural Vietnamese
and get back the right guide(s) plus actionable bullets, glossary,
and counter phrases. No AI API, no backend, no network call — fully
on-device retrieval over the existing 128 admin guides + 28 daily-life
topics + glossary + counter phrases.

### Release notes (Vietnamese)

- ✨ Thêm **Hỏi Cẩm Nang BETA**: hỏi thủ tục bằng tiếng Việt, app gợi ý bài liên quan.
- 📚 Thêm giải thích từ Nhật trong nhiều thủ tục.
- 💬 Thêm câu tiếng Nhật có thể nói tại quầy.
- 🔍 Cải thiện tìm kiếm và hiển thị nội dung.
- 🛠️ Sửa lỗi hiển thị ký tự markdown (`**`) ở thẻ tóm tắt, kết quả tìm kiếm và phần phạm vi pháp lý.
- ⚡ Cải thiện ổn định và kiểm thử.

### リリースノート (日本語)

- ✨ 「Hỏi Cẩm Nang BETA」を追加しました。ベトナム語で質問すると、関連する手続きガイドを探せます。
- 📚 手続き内の日本語用語の説明を追加しました。
- 💬 窓口で使える日本語フレーズを追加しました。
- 🔍 検索結果と表示を改善しました。
- 🛠️ Markdown 記号(`**`)が画面に表示される問題を修正しました。
- ⚡ 安定性とテストを改善しました。

### Added

- **Hỏi Cẩm Nang BETA** (PR #30 / commit `bcd6750`):
  - `src/screens/HoiCamNangScreen.tsx` — chat-style screen with question input, 5 suggested chips, source cards, glossary panel, counter-phrase panel, low-confidence pill, always-on disclaimer
  - `src/utils/chatRetrieval.ts` — token-aggregated retrieval over the existing `searchIndex` `NORMALIZED_INDEX`. No LLM, no embeddings, no network. Bullets are verbatim from `quickAction.doNow[0]` → `quickAction.deadline` → `faq[0].answer` → `description`.
  - `src/utils/chatRetrieval.test.ts` — 7 unit tests covering empty query, retrieval cite, no `**` leak, glossary surfacing, counter phrase surfacing, low-confidence fallback, suggested-question demo-path guarantee
  - Home entry card with BETA pill, below Search CTA, navigates to `HoiCamNang` route
  - `docs/hoi-cam-nang-phase-1.md` — implementation design doc
- **Japanese term glossary** (PR #19 + PR #24):
  - Schema: `AdminGuideKeyTerm` interface + `keyTerms?: AdminGuideKeyTerm[]` on `AdminGuide`
  - "Từ cần biết" card in `AdminDetailScreen`, hidden when `keyTerms` is absent
  - Batch 1 (PR #19): `moving-in-notification`, `lost-residence-card`, `health-insurance`, `juminzei-local-tax`, `emergency-calls-japan` — 25 terms total
  - Batch 2 (PR #24): 5 additional guides with 25 more terms
- **Counter phrases** (PR #25): added to `bank-account` (6 phrases) + `sim-card` (6 phrases)
- **RAG chatbot assessment doc** (PR #29): `docs/feature-rag-chatbot-assessment.md` — full design + phased plan with Phase 2 blockers explicitly gated
- **Project README + source overview** (PR #9): `README.md` + `docs/source-overview-current.md`
- **AI Mail decision log** (PR #8): `docs/feature-ai-mail-translate-decision-log.md` — internal-only product rule with 6 exposure conditions

### Improved

- **Home UX hierarchy polish** (PR #10): 8 wording edits across section titles + CTAs (e.g. "Đi nhanh vào đúng chỗ" → "Duyệt theo chủ đề", "Mới sang Nhật" section → "Cho người mới sang Nhật" to disambiguate from quick-action chip)
- **Markdown bold rendering** (PR #11 + #14 + #16 + #18 + #22): `RichText` / `RichInline` now used wherever authored content can contain `**bold**`. Fixed the four `Tóm tắt nhanh` summary rows, `legalScope.jurisdictionNote`, and SearchScreen result subtitle/title/snippet (extended `RichInline` with optional `numberOfLines` prop)
- **Search result readability** (PR #22): subtitle/title/snippet rendered via RichInline, snippet still truncates at 2 lines
- **Admin guide audit** (PR #13): typo fixes across 4 guides — "father が倒れた" → "父が倒れた", "municipal office" → "市役所/区役所" in `bank-account.ts`, step 2 title disambiguation in `health-insurance.ts`, wording calque fix in `sim-card.ts`
- **English leftover cleanup** (PR #16 + #18 + #27): "recording" → "ghi âm", "valid" → "còn hạn / hợp lệ / còn hiệu lực", "Recording cuộc gọi" label → "Ghi âm cuộc gọi", lifestyle/CBT/event/Online/Download cleanup in `mental-health-stress-support`, `furusato-nozei-guide`, `pet-registration-japan`, `essential-apps-japan-life`
- **`RichText` bold style** (PR #14): removed forced `color: Colors.textPrimary` so bold inherits parent text color (fixes invisible bold on colored guide hero + tip box)

### Fixed

- **`dateUtils.test.ts` timezone-stable** (PR #21 + PR #26): test fed in `2026-04-10T08:00:00+09:00` which serializes to `2026-04-09T23:00Z` in UTC, causing `setHours(0,0,0,0)` to snap to a different calendar day. Test now uses afternoon JST (`18:00+09:00`) so the moment is unambiguously April 10 in any TZ. Production code unchanged. CI `Verify` workflow back to green.

### Schema / UI

- New type: `AdminGuideKeyTerm` in `src/types/content.ts`
- New optional field on `AdminGuide`: `keyTerms?: AdminGuideKeyTerm[]`
- `RichInline` component now accepts optional `numberOfLines?: number` prop (backward-compatible)
- New route in `RootStackParamList`: `HoiCamNang: undefined`
- New screen: `src/screens/HoiCamNangScreen.tsx`

### Build

- iOS bundleId: `com.thanhduy.camnangvietnhat` (unchanged)
- Android package: `com.thanhduy.camnangvietnhat` (unchanged)
- `appVersionSource: "remote"` + `autoIncrement: true` in `eas.json` — iOS `buildNumber` and Android `versionCode` are auto-incremented by EAS at build time; not set manually in `app.json`. After this release, EAS will assign the next sequential numbers above whatever was used for the last `1.3.3` build.
- No new native dependency, no new permission, no new env var.

### Not included (intentionally deferred)

- ❌ AI Mail / Dịch Thư Nhật user-facing entry — remains internal-only per `docs/feature-ai-mail-translate-decision-log.md`. The 4 `MailTranslate*` screens stay registered in `AppNavigator` but with zero entry point from Home/Settings. 6 exposure conditions still pending.
- ❌ Phase 2 RAG (backend LLM + citations) — explicitly gated; same 6-condition discipline as AI Mail.
- ❌ OCR / vision LLM — Phase 2 of AI Mail; not in this release.
- ❌ New API key / env var / dependency.
- ❌ IAP / monetization.
- ❌ Privacy Policy change.

### Known non-blocking follow-ups

- **Issue #31** — non-blocking. Will be addressed in a patch release.
- `Alert.alert` for "Đã copy" confirmation in `HoiCamNangScreen` could be a lighter toast (Phase 1.5 polish).
- Android multi-line TextInput Enter-key behaviour — send button works regardless; minor inconsistency.
- Stop-word list in `chatRetrieval.ts` has 3 unreachable single-character entries (`a`, `o`, `u`) — dead code, harmless.
- `juminzei-local-tax` still missing `legalScope` + `quickAction` (audit score 73) — needs source verification PR.
- `embassy-consulate-vietnam-japan` missing Fukuoka Consulate official URL.

### Verification

- `npm run typecheck`: ✅
- `npm run test:ci`: ✅ (44 suites, 258/258 tests after Hỏi Cẩm Nang's 7 added)
- `npm run content:qa-admin-guides`: ✅ (9/9 in 2 suites)
- `npm run verify:content`: ✅ (0 issues, 0 suspicious lines)
- CI `Verify` workflow: ✅ green (post dateUtils fix)
- Device QA: ✅ on phone per maintainer's confirmation

## v1.3.3 - 2026-05-15

Content release đóng full backlog 45/45 + verify 22 source-check items
+ ship reviewer brief cho 9 HIGHEST-risk guide. ADMIN_GUIDES count:
90 → **127** (+37 guide). Không sửa UI, không đổi schema.

### Added
- **37 new guide** across A4–A12 batches + 4 standalone post-A12:
  - A4 (3): `japanese-school-system-children`, `japanese-language-support-children`, `child-allowance-jidou-teate`
  - A5 (3): `police-questioning-rights-japan`, `embassy-consulate-vietnam-japan`, `foreign-resident-support-centers`
  - A6 (2): `ideco-personal-pension`, `tax-on-remittance-to-vietnam`
  - A7 (5): `mental-health-stress-support`, `holiday-night-medical-care`, `pharmacy-prescription-guide`, `medical-interpretation-multilingual-hospitals`, `annual-health-checkup-kensin`
  - A8 (2): `paternity-parental-leave-fathers`, `job-change-notification`
  - A9 (5): `vietnamese-community-japan`, `local-volunteering-chonaikai`, + 3 expansion
  - A10 (7): `consumer-rights-cooling-off`, `long-term-care-insurance-kaigo`, `fire-earthquake-insurance-home`, `study-in-japan-student-guide`, `domestic-violence-dv-support`, `houterasu-legal-aid-foreigners`, `child-vaccination-schedule`
  - A11 (3): `inheritance-will-japan-foreigners`, `essential-apps-japan-life`, `point-cards-coupons-japan`
  - A12 (3): `specific-residence-card-my-number-2026`, `myna-health-insurance-card-2026`, `ikusei-shuro-system-guide`
  - Standalone: `pet-registration-japan`, `discrimination-human-rights-support`, `visa-fee-increase-2025-2026`, `naturalization-kika-2026-changes`, `jista-entry-system-guide`
- **Reminders edit flow** + permission fallback trong `ImportantDatesScreen.tsx` (commit `4d15606`) — Phase 1 Notifications của roadmap.
- **`docs/reviewer-brief-9-highest-risk-guides.md`** — Per-guide table of 96 specific claims-to-verify cho 9 HIGHEST-risk guide; estimated 20–29 reviewer hour.
- **`docs/release-v1.3.3.md`** — full release notes này.
- Per-batch content roadmap docs `content-roadmap-a4-` đến `a12-...md` + `admin-guides-complete-123-checkpoint.md`.

### Improved
- **Verified 22/22 `NEEDS_OFFICIAL_SOURCE_CHECK` items** từ A1–A12 (commit `dd6533e`). Deep-link applied vào `officialLinks` của 11 guide, exact-match `officialSourceLabels` sync.
- **Content correction**: 171 test days (ngày 1 + 15, không chỉ 1); Safety tips publisher (観光庁監修, không phải JNTO); typhoon work-refusal (労働契約法 第5条 安全配慮義務, không phải 労働安全衛生法); naturalization-2026 (運用基準 sửa, văn bản 国籍法 không sửa); JESTA timeline (FY2028, không phải 2030); NHK case citation (平成26(受)1440・1441).
- **340+ counter phrase tổng cộng** (jp + romaji + vn + note) trong tất cả admin guide.
- Audit pre-merge WebFetch verified 8 fact (相続税 10 tháng, マイナ保険証 2024-12, 法務省人権擁護局 0570-090-911, visa fee 2025-04-01 …).

### Risks / pending external review (NOT a blocker for ship — content is correct, just needs human confirmation)

1. **9 HIGHEST-risk guide** chờ luật sư / 税理士 / 行政書士 review (xem reviewer brief).
2. **Native JP review** 340+ counter phrase.
3. **Native VN review** Hán-Việt cứng + direct-translate flags.
4. **Device QA** trên iOS + Android cho 46 guide mới chưa thực hiện (xem checklist trong `docs/device-qa-checklist-v1.3.3.md`).
5. **Pre-flagged WRONG content** trong reviewer brief: Hague Convention claim trong DV guide (VN không phải contracting state); 4,000円 vs 6,000円 conflict giữa visa-fee và specific-residence-card guide; 保護命令 2024 expansion to psychological DV.

### Schema / UI
- Không có thay đổi schema.
- Không có thay đổi UI mới (Reminders edit flow đã ship trong cycle).
- Không có asset mới.

### Verification
- `npm run typecheck`: ✅
- `npm run test:ci`: ✅ 251/251 (44 suites)
- `npm run verify:content`: ✅ 0 issues, 0 suspicious lines
- Pre-commit hook auto runs verify.

### EAS / store submission
- App.json bumped to 1.3.3. Trước khi build EAS, đợi v1.3.1 + v1.3.2 lên store. Có thể skip 1.3.2 → 1.3.3 nếu Apple chấp nhận (cần coordinator).

---

## v1.3.2 - 2026-05-09

Content patch on top of v1.3.1. Adds 10 practical life guides
across medical access, disaster preparedness, and daily utility
setup. No UI rework, no schema changes for AdminGuide. ADMIN_GUIDES
count: 80 → 90.

### Added
- Added 10 new practical life guides:
  - **Cách đi khám bệnh ở Nhật** (`clinic-hospital-visit-guide`)
  - **Gọi cấp cứu, cảnh sát ở Nhật** (`emergency-calls-japan`)
  - **Đi nha khoa ở Nhật** (`dentist-visit-japan`)
  - **Hướng dẫn khi động đất ở Nhật** (`earthquake-preparedness-japan`)
  - **Hướng dẫn khi bão / 警戒レベル ở Nhật** (`typhoon-evacuation-alerts`)
  - **Bản đồ phòng tai (ハザードマップ) — lũ / sóng thần / núi lửa** (`hazard-map-flood-tsunami-volcano`)
  - **Hợp đồng điện, gas, nước ở Nhật** (`electricity-gas-water-contracts`)
  - **Internet, Wi-Fi nhà ở Nhật** (`home-internet-wifi-contracts`)
  - **NHK đến nhà thì xử lý thế nào?** (`nhk-contract-guide`)
  - **Bưu điện, chuyển tiếp thư và gửi hàng ở Nhật** (`post-office-mail-forwarding`)
- Added `docs/full-content-backlog-45-guides.md` as master content
  roadmap (replaces private GitHub Issue #5).
- Added per-batch report docs under `docs/content-roadmap-a1-...md`,
  `a2-...md`, `a3-...md` documenting source status, counter phrases,
  and pending items.
- Added `docs/native-legal-review-pending-a1-a3.md` consolidating
  ~120 review questions for native Japanese, Vietnamese content,
  and legal/consumer reviewers.
- Added `docs/release-checkpoint-90-guides.md` snapshot of the
  90-guide release-readiness state.

### Improved
- Expanded search keywords for panic-search behavior across the 10
  new guides (~94 new VN + JP keywords including "mất điện", "rò
  gas", "internet bị cắt", "không nhận được hàng", "震度", "防災バッグ",
  "罹災証明書", etc.).
- Added 76 Japanese counter phrases for medical, disaster, and
  daily utility situations (jp + romaji + vn + note).
- Improved safety wording for disaster guides: lead earthquake
  Step 2 with 内閣府 / 消防庁 official phrasing (姿勢を低く・頭を守る・
  じっとする), hedged 緊急地震速報 lead time as "vài giây – vài
  chục giây tùy khoảng cách từ tâm chấn", removed unsourced "≥10m"
  evacuation distance number, clarified "active 火山" classification
  ≠ imminent eruption.
- Improved cautious / legal-safe wording for NHK and consumer
  contracts: hedged NHK cooling-off applicability for 受信契約 in
  5 places (vùng tranh cãi pháp lý — direct user to 国民生活
  センター 188 first), softened 不退去罪 threshold language,
  swapped search keywords "từ chối NHK" / "không ký NHK" → neutral
  "xem xét NHK" / "không ký vội", refined work-refusal claim under
  労働安全衛生法 from "không vi phạm hợp đồng" → "có lý do chính đáng".
- Tightened post-office customs wording: dropped overclaim "Khai
  dưới 50,000円 thường không bị truy thu thuế VN" → "khai trung
  thực, không khai sai để né thuế".
- Synchronized `app.json` version with `package.json` (both at
  `1.3.2`).

### Notes
- Some legal / consumer items remain pending human review,
  especially **NHK cooling-off applicability** for 受信契約 (vùng
  án lệ tranh cãi tại Nhật).
- Some official deep links remain marked
  **NEEDS_OFFICIAL_SOURCE_CHECK** (~22 items: #7119, #9110, 救急車
  fee policy, 警戒レベル, 緊急地震速報, 171 NTT, customs VN, etc.).
  Homepage-level links are in place; deep-link verification pending.
- **Device QA on iOS / Android is required before production
  submission.** Smoke-test checklist available in
  `docs/release-checkpoint-90-guides.md` and per-batch reports.

## v1.3.1 - 2026-05-09

Patch release on top of v1.3.0 covering content / link / typo audit
fixes plus the action-first content rewrite pilot. No new features,
no schema changes for AdminGuide, no UI rework.

### Changed
- Standardized real-estate terminology: replaced stiff "lễ kim" calque
  with "tiền lễ (礼金 / reikin)" across daily-life apartment topic.
- Sharpened the workplace heatstroke alert wording: title now reads
  "Phòng tránh sốc nhiệt (熱中症) tại nơi làm việc" (was "Nghĩa vụ
  chống say nắng tại nơi làm việc bị siết chặt"); summary updated to
  match.
- Action-first content rewrite pilot for 5 high-frequency admin
  guides: moving-in-notification, address-change,
  residence-card-validity, my-number-card, juminzei-local-tax.
  Description, whoIsThisFor, whenToDo, whereToDo, quickAction, steps,
  commonMistakes and faq fields rewritten for clarity. Schema, ids,
  officialLinks, images, counterPhrases unchanged.

### Fixed
- Removed broken MHLW URL `mhlw.go.jp/stf/newpage_47683.html` from
  the heatstroke labor update — user-verified the page no longer
  matches the workplace 熱中症 content. Item still ships with title /
  date / summary / impact; it just isn't tappable until a verified
  replacement URL is found. `LaborUpdate.url` is now optional in the
  type and the JobsScreen card render guards against missing URLs.

### Docs added
- `docs/content-rewrite-pilot-v1.md` — engineering report on the
  5-guide rewrite pilot.
- `docs/content-rewrite-pilot-readable-review.md` — non-coder-friendly
  review artifact pulling user-visible text from the same 5 guides
  with a 10-item reviewer checklist per guide.
- `docs/content-link-typo-audit.md` — search results, before/after
  diffs, and the URL_REMOVED_TEMPORARILY status for the heatstroke
  URL.

### Known limitations carried over from v1.3.0
- 12/79 admin guides have counterPhrases; the remaining 67 do not.
- 13 admin guides still flagged for official-source re-check.
- The heatstroke alert needs a verified MHLW URL added back; tracked
  in `docs/content-link-typo-audit.md`.

## v1.3.0 - 2026-05-09

First store release after `1.2.0`. Bundles all dev work since `1.2.0`,
including the lazy-load / Supabase rollout that was internally tagged
`1.4.0` and never shipped, plus the new Home / Admin / Search UX,
`counterPhrases`, and the regression fix.

### Added
- Phase 1A: direct content imports + FlatList virtualization for faster cold start.
- Phase 1B: `contentLoader` + per-category Japanese split + content hooks.
- Phase 2: dark scaffold + live Supabase remote-content fetch behind feature flag.
- Added Home search CTA for faster procedure lookup.
- Added Home quick actions by real-life situations.
- Added Search `initialQuery` support so quick actions open relevant results directly.
- Added Admin situation chips.
- Added AdminDetail "Tóm tắt nhanh" quick summary.
- Added `counterPhrases` schema and AdminDetail section "Câu tiếng Nhật có thể nói".
- Added Japanese counter phrases for 12 high-frequency admin guides.
- Added admin guide content audit report for 79 guides.
- Added counter phrases QA report.

### Changed
- Reworked Home copy to focus on procedures in Japan.
- Moved Saved to bottom tab, Settings to Home header.
- Demoted Admin export panel so it no longer dominates the top of the screen.
- Improved Admin search placeholder.

### Fixed
- Fixed Home/Admin quick-action queries that previously returned empty search results.

### Known limitations
- Only 12/79 admin guides currently have counterPhrases.
- 13 admin guides still need official source re-check.
- Native speaker review is still recommended for Japanese phrase naturalness.
- Store metadata / screenshots / data disclosure still need completion before production release.

## v1.2.0 and earlier

Pre-CHANGELOG history. See `git log` for details.
