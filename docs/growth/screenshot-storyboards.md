# Growth Asset Pack — Screenshot Storyboards

**Date**: 2026-05-23
**Status**: storyboard spec only. No image generation, no actual screenshot capture in this PR.
**Companion**: [`docs/v1.5.0-app-store-audit.md`](../v1.5.0-app-store-audit.md) §2 (which features to lead with), [`docs/growth/aso-v1.md`](aso-v1.md) §4 (headline sets).

Each storyboard below specifies what a designer / capture-pass would build. The actual asset render is a separate, gated task.

---

## Why screenshots earn their own doc

App Store / Play Store screenshots are the only marketing surface that runs BEFORE the description is read. ~60% of install decisions are made from screenshots alone (industry rule of thumb; not measured for this app yet). The 6-screenshot lineup is therefore worth more than the description copy.

Compliance: every storyboard below uses real app surfaces — no mocked screens, no fake data. Synthetic content in screenshots is grounds for App Review rejection.

---

## Storyboard format

For each screenshot:

| Field | Meaning |
| --- | --- |
| **Headline** | Top-of-screenshot text. Picked from `aso-v1.md` §4. Default = Set A. |
| **Subcopy** | One sub-headline beneath. ≤ 8 words. Optional. |
| **Target emotion** | The single feeling the user should have at 2-second glance. |
| **UI focus** | Which specific surface of the app is captured. |
| **Visual hierarchy** | What the eye lands on first → second → third. |
| **2-second understanding** | The single sentence the user should say if asked "what does this app do?" after 2 seconds. |
| **Anti-pattern** | What this storyboard must NOT do. |

---

## Screenshot 1 — Search (the differentiator)

| Field | Spec |
| --- | --- |
| **Headline** | "Tìm thủ tục bằng tiếng Việt, romaji hoặc tiếng Nhật" |
| **Subcopy** | "Một ô tìm kiếm, ba ngôn ngữ" |
| **Target emotion** | Relief — "tôi không cần biết kanji". |
| **UI focus** | SearchScreen with `quá hạn visa` in the input + 3-4 result cards visible; top result is `overstaying-illegal-stay-procedures`. |
| **Visual hierarchy** | 1) typed query in the search bar; 2) top result card with bilingual title; 3) the language-mode hint chip row beneath the input. |
| **2-second understanding** | "Tôi có thể gõ tiếng Việt mà nó hiểu, và kết quả là một guide đúng việc tôi cần." |
| **Anti-pattern** | Do NOT use a fabricated query that returns a too-perfect result. Use a real, audit-verified query (e.g. `quá hạn visa`, `nenkin`, `mất thẻ`). |

---

## Screenshot 2 — Dead-end safety net

| Field | Spec |
| --- | --- |
| **Headline** | "Khẩn cấp? Trung tâm hỗ trợ một cú chạm" |
| **Subcopy** | "Ngay cả khi tìm không thấy" |
| **Target emotion** | Safety — "có người đỡ tôi". |
| **UI focus** | SearchScreen zero-result state showing fallback featured rail + emergency CTA + the suggestion chips. |
| **Visual hierarchy** | 1) "Cần hỗ trợ gấp?" red emergency card; 2) "Hay được tìm" 6-card featured list; 3) the retry-keyword chips beneath the input. |
| **2-second understanding** | "Tìm không thấy cũng có hướng đi — số khẩn cấp ngay đây." |
| **Anti-pattern** | Do NOT make the emergency card too dominant — must look like a calm safety net, not an alarm. |

---

## Screenshot 3 — Depth (guide detail + related guides)

| Field | Spec |
| --- | --- |
| **Headline** | "Mỗi guide gợi ý các thủ tục liên quan" |
| **Subcopy** | "Không phải tìm lại từ đầu" |
| **Target emotion** | Competence — "tôi đang được dẫn đường". |
| **UI focus** | AdminDetailScreen for `overstaying-illegal-stay-procedures` (or `permanent-residency-eijuu`) scrolled to show the steps + the "Xem thêm liên quan" related-guides section. |
| **Visual hierarchy** | 1) guide title at top edge; 2) a numbered step (visible enough to show structure, not whole); 3) the "Xem thêm liên quan" pill list at the bottom. |
| **2-second understanding** | "Đọc xong guide là biết việc tiếp theo cần làm gì." |
| **Anti-pattern** | Do NOT pick a guide whose body is mostly Japanese characters — frame must remain Vietnamese-first for the screenshot's user-visible portion. |

---

## Screenshot 4 — Newcomer surfacing

| Field | Spec |
| --- | --- |
| **Headline** | "Hỗ trợ từ tuần đầu mới sang Nhật" |
| **Subcopy** | "Lộ trình 7 / 30 / 90 ngày sẵn sàng" |
| **Target emotion** | Calm — "tôi không bị bỏ rơi tuần đầu". |
| **UI focus** | HomeScreen showing the StartHere cards ("Cho người mới sang Nhật") + the featured row + the situational quick-actions below. |
| **Visual hierarchy** | 1) the StartHere chip row title; 2) the 3-card horizontal scroll preview; 3) the featured row beneath. |
| **2-second understanding** | "Tôi mới sang Nhật và app đã chuẩn bị sẵn việc gì cần làm trước." |
| **Anti-pattern** | Do NOT mix cold_start and searcher variants in the screenshot — pick cold_start for newcomer positioning. |

---

## Screenshot 5 — Daily-Ritual (retention surface)

| Field | Spec |
| --- | --- |
| **Headline** | "Học tiếng Nhật mỗi ngày — không spam" |
| **Subcopy** | "5 phút, không thông báo, không gamification ép" |
| **Target emotion** | Trust — "không bị làm phiền". |
| **UI focus** | Daily Ritual screen on a calm day — 1 daily phrase + a small Japanese-vocabulary card. |
| **Visual hierarchy** | 1) the daily-ritual headline; 2) the phrase card with Japanese + romaji + Vietnamese; 3) NO progress bar or streak counter dominating. |
| **2-second understanding** | "Tôi có thể học tiếng Nhật nhẹ nhàng, không bị gọi dậy bằng notification." |
| **Anti-pattern** | Do NOT show a streak counter or gamification element — conflicts with the "no spam" promise. |

---

## Screenshot 6 — Trust signal

| Field | Spec |
| --- | --- |
| **Headline** | "Nguồn chính thức cho mọi thủ tục" |
| **Subcopy** | "出入国在留管理庁 · 厚生労働省 · 法テラス" |
| **Target emotion** | Confidence — "đây không phải app blog". |
| **UI focus** | AdminDetailScreen scrolled to the official-sources block at the bottom of any high-traffic guide (`health-insurance`, `juminzei-local-tax`, or `nenkin-pension`). |
| **Visual hierarchy** | 1) the "Nguồn chính thức" label; 2) the link list with Japanese government agency labels; 3) the `lastVerified` date below. |
| **2-second understanding** | "Mọi thông tin trong app đều có thể kiểm chứng được tại nguồn chính thức Nhật." |
| **Anti-pattern** | Do NOT include logos of government agencies (compliance refusal). Only the agency NAMES as text labels are permitted. |

---

## Capture-pass requirements (when this storyboard is rendered)

For the eventual capture pass, the photographer / dev / designer must:

- Use a real device (iPhone 14 or later) with v1.5.0 build 26 or later installed.
- Status bar: full battery, full signal, time set to `9:41` (Apple convention).
- Use REAL data — real queries, real guides, real Japanese-government labels. No synthetic content.
- Capture in the device's native screenshot tool (no after-the-fact compositing of UI elements).
- The headline text is added in post-production as an overlay; the screenshot itself is unmodified.
- All overlay text must pass `aso-v1.md` §8 anti-clickbait grep.

Output: 6 PNG / JPEG files at App Store / Play Store native resolution, named `screenshot-01.png` through `screenshot-06.png`, sub-folder `assets/store/<store>-<locale>/`. No commit of binary assets in THIS PR — that's a separate capture-pass PR gated by App Review submission timing.

---

## Localization plan

- **Vietnamese locale (vi)**: ship as-is from this storyboard.
- **English locale (en)**: re-headline using `aso-v1.md` §4 Set A translated; keep the same UI captures (the app is Vietnamese-first by design — that's the differentiator).
- **Japanese locale (ja)**: use `aso-v1.md` §3.3 positioning ONLY for headline; UI captures remain Vietnamese (do not switch the app to Japanese for screenshots; that would mislead the install audience).

---

## What this storyboard does NOT specify

- Brand color palette → owned by app branding, not this asset pack.
- Typography for overlay headlines → use a clean sans-serif matching `BeVietnamPro_800ExtraBold` if possible.
- Animated previews / video previews → Apple allows up to 3 app previews (15-30s each). Out of scope here; covered in `docs/growth/short-video-hooks.md` Format E hooks if we ever build a store preview.
- A/B test plan → see `aso-v1.md` §9 hypotheses.

---

## Related docs

- [`docs/growth/aso-v1.md`](aso-v1.md) — headline sets, subtitle options, keyword bank
- [`docs/v1.5.0-app-store-audit.md`](../v1.5.0-app-store-audit.md) — the original screenshot proposal
- [`docs/growth/landing-copy-v1.md`](landing-copy-v1.md) — landing page copy (sister doc)
- [`docs/content-governance.md`](../content-governance.md) — compliance rules apply to overlay text
