# Social content engine — playbook v1

**Status**: playbook only. No content has been produced yet. Owner: marketing/content team when one exists; in the meantime, founder + Claude pair.

The app's content moat (127 guides, all source-verified) is too valuable to leave undiscovered. This doc captures the format, emotional triggers, and CTA patterns that should drive organic growth without compromising compliance.

---

## 1. Positioning

**One-line**: Cẩm Nang Việt Nhật — cẩm nang sống ở Nhật cho người Việt.

**Three-word framing**: thủ tục / đời sống / pháp lý.

**Anti-positioning** (what we are NOT):
- ❌ Not a job board
- ❌ Not a dating / community / forum app
- ❌ Not an AI chatbot
- ❌ Not a Japanese language school
- ❌ Not a Vietnamese-restaurant directory

Be ruthlessly clear about scope. Every piece of social content should reinforce the three-word framing.

---

## 2. TikTok / Shorts hook formats

5-second hook → 25-second body → 5-second CTA. Total ≤ 35s.

### Format A — "Bạn biết chưa?" (revelation)

```
Hook 0-5s:    "Bạn biết visa đậu rồi vẫn có thể bị huỷ nếu...?"
Body 5-30s:   3-shot explanation referencing a specific compliance
              point from the guide (e.g., "đổi việc mà không báo
              14 ngày → bị coi là tuyên bố sai → tư cách bị xem
              xét lại").
CTA 30-35s:   "Đọc full ở app — link dưới."
```

Pulls from guides like `job-change-notification`, `status-of-residence-change`, `overstaying-illegal-stay-procedures`.

### Format B — "Lúc đó tôi mới biết..." (regret / story)

```
Hook 0-5s:    "Tôi mất 50,000 yên chỉ vì..."
Body 5-30s:   Personal-format storytelling (fictional avatar
              acceptable IF clearly labeled). Anchor to ONE concrete
              cost / consequence.
CTA 30-35s:   "Check guide [title] trên app trước khi mắc lỗi này."
```

High-share format. Use for `kokuho-reduction`, `juminzei-local-tax`, `nhk-contract-guide`, `kakutei-shinkoku`.

### Format C — "Checklist 30 giây" (practical)

```
Hook 0-5s:    "30 giây checklist khi mới sang Nhật."
Body 5-30s:   Rapid 6-item enumeration on-screen, voice-over
              reading each item, brief pause. Match the actual
              guide's documentsChecklist or whenToDo.
CTA 30-35s:   "Save guide này trên app để khỏi quên."
```

For onboarding-heavy content: `first-7-days-in-japan`, `first-30-days-work-study-japan`, `first-90-days-in-japan`, `moving-in-notification`, `sim-card`.

### Format D — "So sánh 2 cách" (compare-and-decide)

```
Hook 0-5s:    "Visa kỹ năng đặc định vs thực tập sinh — chọn cái nào?"
Body 5-30s:   Split-screen comparison, 4-5 dimensions
              (lương / chuyển việc / gia hạn / gia đình).
CTA 30-35s:   "Decision tree đầy đủ trong guide [...]"
```

For: `ginou-jisshu-to-tokutei-ginou`, `highly-skilled-professional`, `ssw-training-worker-2027`.

### Format E — "Khẩn cấp: làm gì?" (emergency)

```
Hook 0-5s:    "Mất thẻ cư trú ở Nhật — làm gì NGAY?"
Body 5-30s:   3-step action sequence, calm tone, no panic music.
              Phone number on screen.
CTA 30-35s:   "Trung tâm khẩn của app có hotline tiếng Việt."
```

For: `lost-residence-card`, `traffic-accident-response`, `emergency-calls-japan`, `domestic-violence-dv-support`. **HIGHEST share-rate** of all formats because viewers tag friends who might need it.

---

## 3. High-share guide topics (priority for content production)

Ranked by combination of: real demand × compliance-safe to discuss × shareable hook potential.

| # | Guide | Hook | Format |
| --- | --- | --- | --- |
| 1 | `lost-residence-card` | "Mất thẻ cư trú — 3 bước cứu" | E |
| 2 | `permanent-residency-eijuu` | "10 năm là điều kiện cứng, nhưng có 3 cách rút ngắn" | A |
| 3 | `kakutei-shinkoku` | "Bạn có thể đang nộp thừa thuế mà không biết" | B |
| 4 | `overstaying-illegal-stay-procedures` | "Quá hạn visa 1 ngày — không phải hết hi vọng" | A |
| 5 | `first-7-days-in-japan` | "7 ngày đầu — đừng mắc 3 lỗi này" | C |
| 6 | `juminzei-local-tax` | "Vì sao về VN rồi vẫn nhận hoá đơn thuế?" | B |
| 7 | `divorce-custody-name-residence` | "Ly hôn ở Nhật — visa của bạn có giữ được không?" | A |
| 8 | `traffic-accident-response` | "Tai nạn giao thông ở Nhật — gọi số nào trước?" | E |
| 9 | `nhk-contract-guide` | "Ký hợp đồng NHK — biết được gì trước khi ký" | B |
| 10 | `health-insurance` | "Bảo hiểm Nhật — khám 30% chứ không 100%" | C |

The list is a starting point. Real share-rate data from `guide_share { guide_id, completed }` should re-rank within 2-4 weeks.

---

## 4. Emotional triggers (use sparingly, in fear/help balance)

Strong triggers — use carefully:

- **Loss aversion** ("đừng để mất...") — strongest, also riskiest. Always pair with a concrete action the viewer can take. Never close on the fear.
- **Surprise** ("bạn biết...?") — gentler, sustainable. Default if unsure.
- **Belonging** ("người Việt ở Nhật...") — community signal, low risk.

Off-limits triggers:

- ❌ Outrage / divisive framing (politics, immigration debate)
- ❌ Schadenfreude ("nhìn người này mắc lỗi")
- ❌ Urgency without basis ("phải làm NGAY hôm nay")
- ❌ Promises ("đảm bảo đậu visa")
- ❌ Comparison to other apps / services (free, paid, government)

The compliance rules from `docs/content-governance.md` apply to social content too. Every script gets the same NO-list: no "guaranteed", no "loophole", no "mẹo kháng cáo", no "tăng tỷ lệ đậu".

---

## 5. Fear / help balance

Rule: any post that opens with a fear hook must close with a help CTA pointing to a concrete app surface (guide, hub, search). Never strand the viewer on the fear.

Diagnostic: read the post aloud. If the last sentence sounds like a horror movie tagline, it failed. The viewer should feel "OK, I know what to do now."

---

## 6. CTA examples

- ✅ "Đọc full guide trên app — search 'visa hết hạn'"
- ✅ "Save guide này trên app để dùng khi cần"
- ✅ "Trung tâm khẩn của app có hotline tiếng Việt"
- ✅ "Link app dưới bio — free, no ads"
- ❌ "Đăng ký ngay" / "Mua app" (free + no IAP, don't lie)
- ❌ "Subscribe để xem hết" (we're not a paywall product)
- ❌ "Comment 'YES' để nhận file PDF" (engagement bait)

---

## 7. Publishing cadence (when content production starts)

- **TikTok / Shorts**: 1 post / 3 days. Reuse format A/B/C/D/E in rotation
- **Instagram Reels**: same content, re-published; cropped to 9:16
- **Facebook**: cross-post Reels. Vietnamese-Japanese community groups (e.g., Cộng đồng Việt Nam tại Nhật Bản, GAITAM) are higher-leverage than the FB feed itself
- **YouTube Shorts**: lower priority — long-tail SEO matters less than community-first platforms
- **No Twitter/X**: low Vietnamese diaspora penetration

Cap: **never more than 1 post per day across all channels**. Spam erodes trust.

---

## 8. "Survival in Japan" positioning frame

Position the app as: **"the friend who reads the kanji for you"**.

Sub-positions to test in copy:

- "Không ai dạy bạn cách sống ở Nhật — chúng tôi sẽ"
- "127 cẩm nang đã được kiểm tra với nguồn chính thức"
- "Hỗ trợ tiếng Việt — cập nhật hàng tháng"
- "Khẩn cấp một chạm — đời sống một guide"

Avoid:

- ❌ "AI-powered" (no AI surface today)
- ❌ "Cộng đồng người Việt" (we're not a community feature)
- ❌ "Học tiếng Nhật" (Daily Ritual exists but is not the headline)

---

## 9. Compliance gate

Every script must pass:

1. ✅ No guarantees / no "tăng tỷ lệ"
2. ✅ Sources cited if a specific number / date / law is referenced
3. ✅ Defers to 弁護士 / 行政書士 / 法テラス for ambiguous cases
4. ✅ No comparison to government services (we are NOT a substitute)
5. ✅ No personal data of real users in any frame
6. ✅ No promotional language about paid features (because we have none)

A script failing any of these is rewritten or killed. No exceptions.

---

## 10. Metrics

Once content is published:

- `guide_share { guide_id, completed }` (Phase G1) → which guides earn shares from the app side
- External platform metrics (TikTok / Reels views, saves, follower growth) → which formats earn watches
- Cross-reference: a guide that gets shared often from in-app AND watched often as a Short = top candidate to expand

Re-rank §3 priority list quarterly based on data, not gut.

---

## Related docs

- `docs/aso-strategy-v1.md` — App Store positioning (companion to this doc)
- `docs/content-governance.md` — compliance rules apply to social copy too
- `docs/v1.5.0-app-store-audit.md` — screenshot strategy for the same positioning
