# AI Mail Translate Cost Estimate

**Date:** 2026-05-14
**Status:** Planning / cost-modeling only — NO implementation included.
**Related:** [`feature-translate-japanese-mail-audit.md`](feature-translate-japanese-mail-audit.md) (Phase 0 audit), [`app_features_roadmap_2026.md`](app_features_roadmap_2026.md) (2026 priorities).

---

## 1. Scope

Doc này là **estimate cho tương lai** — không phải kế hoạch ship.

- Chỉ dự tính chi phí AI và mô hình monetization cho tính năng "Dịch Thư Nhật" giả định.
- **Không** kèm code, không kèm route, không kèm API integration.
- Roadmap 2026 ưu tiên: Notifications → Find Nearby → Calculators. AI features (mail-translate, chatbot, document classification) đã được flag là **out of scope** trong `app_features_roadmap_2026.md` section 7.
- AI mail-translate chỉ nên cân nhắc cho release sau khi (a) các feature non-AI đã ổn định, (b) Privacy Policy v2 đã legal-review, (c) cost data thực tế đã có từ beta nhỏ.

Doc này tồn tại để **product / engineering có số tham khảo khi ra quyết định ship/defer/monetization**, không phải kim chỉ nam triển khai.

---

## 2. Assumptions

### 2.1 Per-request behavior

Một request "phân tích thư" giả định gồm:

- 1 thư / tài liệu chính / lần submission.
- 1–3 ảnh / pages tùy độ dài thư.
- Ảnh đã được resize trên client trước khi upload (max ~1600px chiều dài, JPEG quality ~80%).
- Output là **structured JSON** với các trường: `documentType`, `summaryVi`, `requiredActionVi`, `deadline`, `amountYen`, `warnings[]`, `fullTranslationVi`, `relatedGuideId`, `aiConfidenceScore`.
- Có related-guide cross-ref về 110+ admin guide hiện có trong app.
- **KHÔNG** có OCR fallback trong base scenario (chỉ dùng vision model end-to-end).

### 2.2 Token ranges theo độ phức tạp

Token số là **estimate sơ bộ**, dựa trên kinh nghiệm chung với vision LLM trên tài liệu A4 tiếng Nhật. Cần verify với prompt thực tế trước khi quyết định.

| Case | Mô tả | Input tokens (image + prompt) | Output tokens |
|---|---|---|---|
| Light | 1 ảnh / page, thư ngắn (NHK postcard, scam SMS) | 2K – 3K | 500 – 800 |
| Normal | 1–2 ảnh, thư cơ quan tiêu chuẩn (住民税, 国保, 年金) | 3K – 5K | 800 – 1.2K |
| Heavy | 3–5 ảnh, văn bản dài (入管 multi-page, hợp đồng, 督促状 chi tiết) | 6K – 10K | 1.5K – 2.5K |

### 2.3 Lưu ý

- **Chi phí thực tế phụ thuộc model được chọn** (Claude 4.5/4.7 Sonnet, GPT-4o, Gemini 1.5 Pro Vision, v.v.) và **giá vendor hiện hành**.
- Prompt caching (Anthropic) có thể giảm ~50–90% chi phí input nếu prompt + schema dài và ổn định, nhưng **không guarantee** — phụ thuộc cache hit rate.
- JPY conversion là **xấp xỉ** $1 ≈ ¥150 cho planning. Tỷ giá thực tế dao động.

---

## 3. Model pricing placeholder

⚠️ **Không hardcode làm chân lý.** Các con số dưới đây phải verify trên trang giá chính thức của vendor trước khi implementation.

### 3.1 Placeholder pricing (cần verify)

| Variable | Giá trị giả định (planning) | Đơn vị |
|---|---|---|
| `input_price` | $3.00 | / 1M tokens |
| `output_price` | $15.00 | / 1M tokens |
| `image_cost` | đã include trong input token count | — |
| `cache_read_price` | $0.30 (10% input) — nếu dùng prompt caching | / 1M cached tokens |

### 3.2 Công thức

```
cost_per_request_usd =
    (input_tokens  / 1,000,000 * input_price)
  + (output_tokens / 1,000,000 * output_price)
```

Nếu áp prompt caching cho phần prompt system + schema (ổn định giữa các request):

```
cost_per_request_usd_with_cache =
    (uncached_input / 1,000,000 * input_price)
  + (cached_input   / 1,000,000 * cache_read_price)
  + (output_tokens  / 1,000,000 * output_price)
```

### 3.3 Action item trước implementation

- [ ] Verify giá Anthropic / OpenAI / Google chính thức (URL official pricing).
- [ ] Cập nhật bảng 3.1 với số thực tế.
- [ ] Verify Anthropic prompt cache pricing & TTL (5 phút TTL có thể không hiệu quả cho user sparse).
- [ ] Re-run section 4–5 estimates sau khi update giá.

---

## 4. Per-request cost estimate

Áp dụng công thức section 3.2 với pricing placeholder và token range section 2.2:

| Case | Input tokens | Output tokens | Cost/req (low) | Cost/req (high) | JPY/req (xấp xỉ) |
|---|---:|---:|---:|---:|---:|
| Light | 2K – 3K | 500 – 800 | **$0.01** | **$0.02** | ¥1.5 – ¥3 |
| Normal | 3K – 5K | 800 – 1.2K | **$0.02** | **$0.04** | ¥3 – ¥6 |
| Heavy | 6K – 10K | 1.5K – 2.5K | **$0.05** | **$0.10** | ¥7.5 – ¥15 |

Median planning numbers dùng cho monthly scenario tính trong section 5:

- **Low** (light + cache hit phần lớn): **$0.015 / req** ≈ ¥2.25
- **Normal** (normal case, no cache assumption): **$0.03 / req** ≈ ¥4.5
- **Heavy** (heavy case, miss cache): **$0.08 / req** ≈ ¥12

> **Note:** Con số trên dùng cho **planning thô**. Real-world cost có thể cao hơn 10–50% sau khi tính retry + abuse + OCR fallback (xem section 7).

---

## 5. Monthly cost scenarios

5 scenarios từ beta nhỏ đến viral. Mỗi scenario nhân số request × cost/request từ section 4.

### Scenario A — Small beta

- **100 users × 3 req/user/month = 300 req/month**

| Kịch bản chi phí | USD / tháng | JPY / tháng (xấp xỉ) |
|---|---:|---:|
| Low ($0.015/req) | $4.5 | ¥675 |
| Normal ($0.03/req) | $9 | ¥1,350 |
| Heavy ($0.08/req) | $24 | ¥3,600 |

### Scenario B — Early growth

- **500 users × 4 req/user/month = 2,000 req/month**

| Kịch bản chi phí | USD / tháng | JPY / tháng (xấp xỉ) |
|---|---:|---:|
| Low | $30 | ¥4,500 |
| Normal | $60 | ¥9,000 |
| Heavy | $160 | ¥24,000 |

### Scenario C — Real traction

- **1,000 users × 5 req/user/month = 5,000 req/month**

| Kịch bản chi phí | USD / tháng | JPY / tháng (xấp xỉ) |
|---|---:|---:|
| Low | $75 | ¥11,250 |
| Normal | $150 | ¥22,500 |
| Heavy | $400 | ¥60,000 |

### Scenario D — Large usage

- **5,000 users × 6 req/user/month = 30,000 req/month**

| Kịch bản chi phí | USD / tháng | JPY / tháng (xấp xỉ) |
|---|---:|---:|
| Low | $450 | ¥67,500 |
| Normal | $900 | ¥135,000 |
| Heavy | $2,400 | ¥360,000 |

### Scenario E — Viral / high usage

- **10,000 users × 5 req/user/month = 50,000 req/month**

| Kịch bản chi phí | USD / tháng | JPY / tháng (xấp xỉ) |
|---|---:|---:|
| Low | $750 | ¥112,500 |
| Normal | $1,500 | ¥225,000 |
| Heavy | $4,000 | ¥600,000 |

### 5.1 Đọc bảng này thế nào

- **A (beta)**: thử nghiệm, AI cost <$25/tháng → có thể bear bằng marketing budget.
- **B–C (1k user)**: AI cost $50–400/tháng → vẫn manageable nếu chấp nhận chi phí retention.
- **D–E (5k–10k user)**: AI cost $1.5–4k/tháng → **bắt buộc** có monetization (subscription / credit pack), không thể free unlimited.

---

## 6. Extra infrastructure cost

AI cost không phải toàn bộ. Các thành phần khác cần budget riêng:

| Thành phần | Estimate sơ bộ (1k–10k user) |
|---|---|
| **Backend hosting** (Node.js + Express trên Cloud Run / Railway / Fly.io) | $20–80 / tháng |
| **Database** (Supabase Postgres — đã có infra) | $0 (free tier) → $25 (Pro) tùy quy mô |
| **Image upload temp storage** (Supabase Storage / S3) — auto-delete <1h | $1–10 / tháng nếu chỉ giữ tạm |
| **Logging / monitoring** (Sentry free, Logflare, hoặc Grafana Cloud) | $0–25 / tháng |
| **Retry overhead** | +10–20% AI cost (xem section 7) |
| **Abuse / rate limiting** (Upstash Redis hoặc in-memory với eviction) | $0–10 / tháng |
| **OCR fallback** (Google Cloud Vision — tùy chọn, không base) | +$1.50 per 1k images nếu thêm |
| **Email / push notification** cho deadline reminder | $0 nếu dùng Expo Notifications local; có cost nếu mở remote push qua APNs/FCM trực tiếp (rare) |

**Tóm tắt:** Infrastructure base ~$30–125/tháng cho MVP. AI cost chiếm 60–95% tổng cost.

> Base MVP có thể giữ rất gọn nếu **xóa ảnh ngay sau xử lý** (không retain), chỉ lưu metadata (~1KB/result) → DB cost gần như 0.

---

## 7. Risk multipliers

Real-world cost luôn cao hơn estimate base. Các risk làm phình cost:

| Rủi ro | Tác động cost |
|---|---|
| Blurry image → AI confidence thấp → user retry | +10–20% retry overhead |
| Multi-page letter user upload từng trang riêng | +50–100% nếu user submit lại |
| User upload không phải thư (selfie, ảnh ngẫu nhiên) | Token spent vô ích, không monetize được |
| Repeated same image (user submit lại để xem AI có đổi không) | +5–15% |
| Prompt injection trong text trên thư → AI sinh output dài bất thường | +10–30% output tokens, có thể bị abuse |
| API error + automatic retry (transient 429 / 503) | +5–10% |
| Lưu `full_translation_vi` trong DB | +1–5KB/result; với 10k user × 5 req/mo × 12 mo = 600k row × 3KB = ~1.8GB/year (manageable) |
| Free tier abuse (user tạo nhiều account) | +20–100% nếu không có auth + rate limit nghiêm |

**Multipliers đề xuất cho planning conservative:**

- **+10–20%** retry overhead (default).
- **+20–50%** heavy document mix nếu user thực tế gửi nhiều thư dài.
- **+50%** nếu thêm OCR fallback path (Google Vision pre-extract trước khi gửi Claude).
- **+50–100%** nếu không có auth gating → free abuse.

→ Real cost có thể là `base × 1.3 – base × 2.5` tùy mix.

---

## 8. Monetization models

So sánh 4 model. Apple IAP rule: **mọi paid digital feature trên iOS phải qua Apple IAP** (không link external payment). Apple commission 15% (small developer) hoặc 30%.

### Model 1 — Free limited

- 3–5 scan / user / tháng miễn phí.
- Không có IAP, không có paid plan.
- Owner chịu toàn bộ AI cost.

**Ưu:** Đơn giản, validate UX trước, không vướng Apple Review về IAP.
**Nhược:** Không bền vững khi scale lên D–E. Cost burn nhanh nếu viral.
**Khi dùng:** Beta validation hoặc retention feature giá trị cao.

### Model 2 — Freemium subscription

- Free 3–5 scan/tháng.
- Premium ¥480 hoặc ¥680 / tháng → unlimited hoặc quota cao (vd 50/tháng).
- Phải qua Apple IAP trên iOS (15% / 30% cut).

**Ưu:** Doanh thu định kỳ, dễ predict.
**Nhược:** Phức tạp về Privacy Policy, subscription management UX, cancellation flow. Cần auth bắt buộc.
**Khi dùng:** Khi đã có >1k user active và data cho thấy 5–10% sẵn sàng trả.

### Model 3 — Credit pack / pay-per-use

- ¥100 / 3 scan hoặc ¥100 / 5 scan.
- Phải qua Apple IAP non-consumable hoặc consumable.

**Ưu:** Dễ hiểu, control cost dễ (mỗi pack = max usage hữu hạn).
**Nhược:** User friction cao (mỗi lần hết pack phải mua lại). Margin thin sau Apple 30% (xem section 9).
**Khi dùng:** Khi user pattern là **occasional heavy use** (vài lần / năm khi nhận thư phức tạp), không phải monthly.

### Model 4 — No monetization (retention only)

- AI cost coi như chi phí marketing / retention.
- Strict monthly quota (1–3 scan/user/tháng).

**Ưu:** Differentiator vs đối thủ, không cần Apple IAP integration.
**Nhược:** Phải có quota cap nghiêm. Khó scale nếu viral.
**Khi dùng:** Đầu tư retention dài hạn, app có nguồn doanh thu khác (premium content, partnerships).

---

## 9. Break-even rough math

Giả định cost trung bình: **$0.03 / req ≈ ¥4.5 / req** (normal case, không cache).

### 9.1 Free quota cost

- 5 scan / user / tháng → **~¥22.5 / user / tháng** chi phí AI.
- 1k user free → ¥22,500 / tháng cost.
- 10k user free → ¥225,000 / tháng cost. **Không bền vững.**

### 9.2 Premium ¥480 / tháng (Model 2)

| Apple commission | Net / user / tháng | Break-even scan @ ¥4.5/scan |
|---|---:|---:|
| 30% | ¥336 | ~75 scan/tháng |
| 15% (small developer) | ¥408 | ~91 scan/tháng |

→ Để break-even, user phải dùng **75–91 scan/tháng** trước khi mất tiền. **Set fair-use limit** (vd cap 30 scan/tháng) để không bị abuse.

→ "Unlimited" có thể bán marketing nhưng **must có cap thực tế** (vd "unlimited fair-use ~50/tháng").

### 9.3 Premium ¥680 / tháng

| Apple commission | Net / user / tháng | Break-even scan @ ¥4.5/scan |
|---|---:|---:|
| 30% | ¥476 | ~106 scan/tháng |
| 15% | ¥578 | ~128 scan/tháng |

→ Tier giá này phù hợp nếu thêm feature (vd history vô hạn, ưu tiên xử lý, OCR fallback bật).

### 9.4 Credit pack ¥100 (Model 3)

**¥100 / 10 scan**:
- Revenue / scan: ¥10
- AI cost / scan: ¥4.5
- Apple 30%: net ¥70 → effective ¥7 / scan → margin ¥2.5 / scan
- Apple 15%: net ¥85 → effective ¥8.5 / scan → margin ¥4 / scan

→ Margin thin sau Apple 30%, đặc biệt sau retry / heavy mix.

**¥100 / 5 scan**:
- Revenue / scan: ¥20
- Apple 30%: net ¥70 → effective ¥14 / scan → margin ¥9.5 / scan
- Apple 15%: net ¥85 → effective ¥17 / scan → margin ¥12.5 / scan

→ Margin healthy hơn nhưng user có thể thấy ¥100 cho 5 scan đắt.

**Đề xuất:** Nếu chọn credit pack, **¥100 / 5 scan** an toàn hơn về margin; **¥100 / 10 scan** rủi ro hơn nhưng user-friendly hơn.

---

## 10. Recommended launch model

### 10.1 Phase 1 — Closed beta (sau khi có code Phase 2 audit doc xong)

- **Free 3 scan / user / tháng.**
- **Login bắt buộc** (Supabase Auth — đã có infra).
- Không có paid plan.
- Không có affiliate / push notification.
- **Không lưu ảnh > 1 giờ** (xóa sau processing).
- Không lưu `full_translation_vi` trong MVP (xem audit doc section 5.2).
- Privacy Policy v2 đã legal-review.
- Disclaimer rõ ràng trên mọi Result screen.
- Collect usage / cost data để inform Phase 2.

### 10.2 Phase 2 — Open beta (sau 4–8 tuần Phase 1)

- Mở public với cùng free 3 scan/tháng cap.
- Add **paid plan** (credit pack hoặc subscription) sau khi đã có real cost data.
- Add **IAP integration** đúng theo Apple guideline.
- Add **fair-use cap** dù bán "unlimited".
- Add **abuse detection** (rate limit per IP + per user + per device).

### 10.3 Initial quota recommendation (Phase 1)

| Tham số | Giá trị đề xuất |
|---|---|
| Free scan / user / tháng | **3** |
| Max ảnh / scan | **3** (đủ cho thư 2–3 page) |
| Max size / ảnh sau compress | **5 MB** |
| Auth | **Bắt buộc** (Supabase) — không anonymous |
| Rate limit | 1 scan / phút / user, 3 / ngày / user |
| Abuse signal | flag user >2 retry liên tiếp trên cùng image hash |

---

## 11. Apple Review / compliance cost notes

Nếu monetize (Model 2 hoặc 3), bắt buộc:

- ✅ **IAP integration** trên iOS — không được link external payment trong app.
- ✅ **Privacy Policy update** (đã có draft trong audit doc section 7.3).
- ✅ **Consent screen** lần đầu user vào feature (draft trong audit doc section 7.1).
- ✅ **Disclosure of third-party AI processing** (Anthropic / OpenAI) trong Privacy Policy + App Privacy nutrition label.
- ✅ **Disclaimer trên mọi Result screen**: "Không phải tư vấn pháp lý / y tế / thuế cá nhân" (đã có draft 7.2).
- ✅ **Delete history function** — endpoint `DELETE /api/mail-history/:id` + `DELETE /api/mail-history/all`.
- ✅ **Data retention policy** — auto-delete sau 90 ngày unless user marks keep.
- ✅ **App Privacy details** trong App Store Connect — kê khai đầy đủ data collection.

Risk Apple Review level: **MEDIUM-HIGH** (per audit doc section 2).

**Cost compliance ước tính:**

- Legal review Privacy Policy (luật sư consumer Nhật): ¥30,000 – ¥100,000 một lần.
- Apple Privacy Manifest setup: 1–2 ngày dev time, không direct cost.
- IAP integration (subscription / consumable): 1–2 tuần dev time.

---

## 12. Final recommendation

### Tóm tắt

- ✅ AI mail-translate là feature **giá trị cao** cho user Việt ở Nhật (đọc thư là pain point thực).
- ✅ Có khả năng monetize qua subscription hoặc credit pack.
- ⚠️ **Không** implement trước khi:
  1. v1.3.2 đã ship + stable >2 tuần.
  2. Notifications Phase 1 từ roadmap mới đã ship + có data adoption.
  3. Privacy Policy v2 đã legal-review.
  4. Real cost data từ tiny beta đã có (≥30 day usage trên 20–50 user).
- ❌ **Không** launch "unlimited" mà không có fair-use cap.
- ❌ **Không** bán paid plan trước khi có ≥4 tuần usage data từ free beta.

### Best path

1. **Now:** Ship v1.3.2 (đã review-pending) + Notifications Phase 1 (đã commit `4d15606`).
2. **+1 month:** Privacy Policy v2 legal review + UI mock 4 màn Phase 1 (không backend).
3. **+2 months:** Closed beta 20–50 user, 3 free scan/tháng, real AI integration ở backend.
4. **+3 months:** Đo real cost / scan (light/normal/heavy mix), tổng cost / user / tháng.
5. **+4 months:** Decide paid model based on actual usage curve.

### Số nên giữ trong đầu

- **Beta cost expectation:** $5–25 / tháng cho 50 user (Scenario A).
- **Cost guardrail trước paid launch:** không vượt $100 / tháng từ free tier.
- **Break-even subscription:** cần ~75 scan/user/tháng @ ¥480/tháng Apple 30% — set fair-use ~30/tháng để có biên an toàn.
- **Credit pack tier khuyến nghị:** ¥100 / 5 scan (margin healthy) hơn ¥100 / 10 scan (margin thin).

---

## 13. Open decisions

Các quyết định còn chờ trước khi implement:

| # | Decision | Owner đề xuất |
|---|---|---|
| 1 | Chọn AI model nào (Claude 4.5 Sonnet / 4.7 Sonnet / GPT-4o Vision / Gemini 1.5 Pro Vision) | Engineering + cost re-quote |
| 2 | Chỉ dùng vision model end-to-end hay thêm OCR fallback (Google Cloud Vision) | Engineering — phụ thuộc accuracy thực tế |
| 3 | Có lưu `full_translation_vi` không? (Audit doc khuyên không cho MVP) | Product + legal |
| 4 | Retention policy lịch sử (90 ngày? 30 ngày? do user chọn?) | Product + legal |
| 5 | Free quota cuối cùng (3 / 5 / 10 scan/tháng) | Product — phụ thuộc cost real |
| 6 | Paid model cuối cùng (Subscription / Credit pack / Hybrid) | Product — phụ thuộc usage curve |
| 7 | Auth bắt buộc cho free tier hay cho phép anonymous với rate limit nặng | Product + security |
| 8 | Wording consent cho thư có thông tin trẻ em (giấy trường, tiêm chủng con) | Product + legal — có thể cần 18+ gating |
| 9 | Có cho phép user submit thư của người khác (vd dịch hộ cha mẹ)? | Product + legal — privacy của bên thứ ba |
| 10 | Cap tối đa per request (3 ảnh? 5 ảnh? bao MB?) | Engineering |
| 11 | Cap tối đa per device / IP / user / ngày | Engineering + security |
| 12 | Có dùng prompt caching không (Anthropic) — phụ thuộc kiến trúc prompt | Engineering |

---

## Document maintenance

- Cập nhật bảng 3.1 ngay sau khi verify giá vendor chính thức.
- Re-run section 4–5 estimates với token thực tế đo trên ≥20 sample thư.
- Sau khi Phase 1 beta xong, thêm section "Real cost data" với số thực.
- Khi vendor đổi giá hoặc đổi model, đánh dấu version + ghi rõ pricing date.

**Pricing date của doc này:** 2026-05-14 — chưa verify với official vendor pricing page.
