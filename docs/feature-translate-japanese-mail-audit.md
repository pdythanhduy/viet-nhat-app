# Feature Audit — Dịch Thư Nhật

**Date:** 2026-05-09
**Status:** Audit only — KHÔNG implement trong v1.3.2.
**Recommended target:** v1.4.0 hoặc v1.5.0 (sau Apple Review v1.3.2 + sau khi MVP scope chốt).
**Repo state at audit:** không có file implementation nào — greenfield design.

---

## 1. Product value

### 1.1 Tại sao feature này phù hợp Cẩm Nang Việt Nhật

App hiện tại có 90 guide thủ tục — user biết phải làm gì cho từng tình huống chuẩn. Nhưng khi nhận một lá thư cụ thể tiếng Nhật, user thường:
- Không biết đó là loại thư gì (NHK / 督促状 / 国保 / scam)
- Không biết cần làm gì + deadline
- Sợ vứt nhầm thư quan trọng / sợ phản ứng nhầm với scam
- Phải hỏi đồng nghiệp / đăng Facebook nhờ dịch — slow + lộ thông tin

Feature này biến app từ **"sổ tay sẵn"** sang **"trợ lý đọc thư realtime"** — bridge guide tĩnh + tình huống động.

Cross-sell tốt với 90 guide hiện có: kết quả AI sẽ có "Related guide link" trỏ ngược về guide phù hợp.

### 1.2 User pain points

| Pain | Mức độ |
|---|---|
| Nhận thư đỏ 督促状 không hiểu, sợ kệ → leo thang sang 差押 | High |
| Nhận thư 国保 / 住民税 / 年金 không biết deadline | High |
| Nhận thư NHK không biết là yêu cầu thật hay scam | Medium |
| Nhận SMS / email scam giả mạo cơ quan | High |
| Nhận thư 入管 quan trọng không kịp đọc | High |
| Hóa đơn điện/gas/nước có thông báo tăng giá / thay đổi không hiểu | Medium |
| Thư từ ngân hàng về thẻ / loan / 信用情報 | Medium |

### 1.3 Use cases (chính)

1. **住民税 (thuế cư trú)** — thông báo thuế hàng năm + deadline thanh toán + 分納 nếu có
2. **国民健康保険** — phí + 減免 thông báo + thay đổi
3. **国民年金 / 厚生年金** — yêu cầu đóng / 免除 / 脱退一時金
4. **入国管理局 (ISA)** — thư về visa / residence card / gia hạn
5. **NHK** — yêu cầu ký 受信契約 / hóa đơn
6. **電気/ガス/水道** — hóa đơn + thông báo tăng giá / mất dịch vụ
7. **Ngân hàng** — thẻ / loan / 信用情報
8. **督促状 / 催告書 / 差押予告** — nợ thuế / nợ phí (panic-trigger highest)
9. **Scam / fraud mail** — flag warning, direct user check 国民生活センター 188

---

## 2. Apple Review risk assessment

| # | Risk | Rating | Notes |
|---|---|---|---|
| 1 | Camera / photo permission | **Low** | Standard `NSCameraUsageDescription` + `NSPhotoLibraryUsageDescription`. Cần text rõ ràng tiếng Việt + English. |
| 2 | Upload user documents → server | **High** | Apple Privacy Nutrition Label phải khai "Sensitive Info" + "User Content". Cần encryption in transit + at rest. Bắt buộc consent screen. |
| 3 | Third-party AI processing (Claude / OpenAI) | **High** | Tài liệu user gửi lên 3rd-party (Anthropic/OpenAI). Privacy Policy phải kê khai. App Tracking Transparency có thể không cần (không tracking ad), nhưng Privacy Manifest mới của Apple (2024+) yêu cầu khai báo bên thứ 3. |
| 4 | Privacy Policy update | **Medium** | Phải update Privacy Policy hiện tại để thêm: thu thập ảnh thư, gửi 3rd-party AI, retention, deletion right. URL Privacy Policy phải link trong App Store metadata. |
| 5 | Privacy Manifest (Apple 2024+) | **Medium** | iOS 17+ require `PrivacyInfo.xcprivacy` khai SDK + data type. EAS hỗ trợ — cần config. |
| 6 | User consent screen | **Low–Medium** | Phải có lần đầu user vào feature. Phải explicit về AI processing + data retention. |
| 7 | Disclaimer | **Medium** | "Không phải tư vấn pháp lý / y tế / thuế cá nhân". Phải hiện rõ trên Result Screen. Apple Reviewer có thể test feature → disclaimer chưa rõ → reject. |
| 8 | Medical / legal / financial advice risk | **High** | Nếu AI translate sai 督促状 / 入管 thư → user mất tiền / mất visa. Apple sensitive với app advise legal/health. Phải hedge mạnh + direct user về cơ quan. |
| 9 | IAP requirement nếu monetize | **Medium** | Nếu charge để dịch thư → bắt buộc qua Apple IAP, không được external payment. Web subscribe không được link trong app. |
| 10 | Affiliate / marketplace risk | **Low** | Nếu thêm "tìm 行政書士" affiliate — Apple OK miễn không nhận hoa hồng từ user. |
| 11 | Children's data (COPPA) | **Low** | App rated 4+ hay 12+? Cần check. Nếu có thư từ trường con → có thể chứa PII trẻ em. Cần text rõ "không gửi ảnh thư có thông tin trẻ em". |
| 12 | Minimum age cho AI feature | **Medium** | Nhiều nước (EU AI Act, Japan) có quy định AI service. Có thể cần restrict 18+ cho feature này. |

### Tổng risk: **MEDIUM-HIGH**

Có thể qua review nếu:
- Privacy Policy update đầy đủ
- Consent screen rõ ràng + opt-out
- Disclaimer hiện trên mọi result
- AI processing kê khai trong App Store privacy nutrition label
- Privacy Manifest config đúng

**KHÔNG nên ship feature này cùng một release với content patch.** Cần release riêng để Apple Reviewer focus, không trộn với 90 guide content.

---

## 3. MVP scope recommendation

### MVP v1 — INCLUDE

✅ One-image upload mỗi lần (1 ảnh / submission)
✅ AI analysis → trả structured output (document type / summary / action / deadline / amount / warnings / full translation / related guide)
✅ Result screen với disclaimer rõ ràng
✅ Related guide links từ 90 guide hiện có
✅ Basic history nếu user đã consent (local-first, server tùy chọn)
✅ **Free monthly limit** (vd 5 lần/tháng) để control cost AI + user behavior
✅ Consent screen first-time use
✅ Privacy Policy + disclaimer link

### MVP v1 — EXCLUDE (để release sau)

❌ Subscription / Premium tier
❌ Pay-per-use
❌ Affiliate (gắn 行政書士 / luật sư)
❌ Push notification reminder
❌ Export PDF kết quả
❌ Auto-payment cho hóa đơn
❌ Sharing (share thư đã dịch — risky cho privacy)
❌ Form autofill (auto điền thông tin cơ quan)
❌ Multi-image batch upload
❌ Voice / audio reading
❌ OCR offline (chưa cần, dùng cloud AI)
❌ Conversation chat / Q&A theo dõi

**Lý do exclude:** mỗi feature trên thêm Apple Review risk + complexity. MVP focus vào core value (đọc thư → biết phải làm gì) trước.

---

## 4. Backend code review

### 4.1 Critical issues phải fix trước implementation

⚠️ **Đây là review proposal/concept — chưa có code thực tế trong repo.** Các điểm dưới là common pitfalls nên kiểm tra khi implement.

| # | Issue | Severity | Fix |
|---|---|---|---|
| 1 | `db` không được import / define rõ trong route handler | **High** | Phải import từ `models/index.js` (Sequelize) + check `await db.sequelize.authenticate()` ở startup |
| 2 | Anonymous `userId` xung đột với UUID user schema | **High** | Nếu User table có `id UUID NOT NULL`, không thể insert anonymous. Hoặc thêm `anonymous_session_id` riêng, hoặc require login trước feature này |
| 3 | JSONB fields dùng `JSON.stringify` | **Medium** | Sequelize JSONB tự serialize. KHÔNG `JSON.stringify` trước khi insert — sẽ thành double-encoded string |
| 4 | Model name verify | **Medium** | Convention: `MailHistory` (Pascal) cho Sequelize model, table `mail_histories` (snake plural) tự động |
| 5 | Anthropic / OpenAI API key security | **Critical** | Phải đặt trong env, KHÔNG commit. EAS Secret. Rotate quarterly |
| 6 | Rate limit dependency (vd `express-rate-limit`) | **Medium** | Cần — không chỉ cho cost AI mà còn chống abuse. Ngưỡng: 5 req/user/day cho free, 30/day cho premium |
| 7 | Cleanup file (temp upload) reliability | **Medium** | `multer` upload to `/tmp` — phải `fs.unlink` trong `finally`, không chỉ `then`. Hoặc dùng `cron` cleanup `/tmp/uploads/*` cũ >1h |
| 8 | Temp file folder tồn tại | **Low** | `mkdir -p /tmp/uploads` ở startup hoặc multer auto-create với option `destination` callback |
| 9 | Error handling → user feedback | **High** | AI fail / network fail → frontend nhận message rõ "Không xử lý được, vui lòng thử lại". KHÔNG expose stack trace / API key |
| 10 | Max file count + size | **High** | `multer` limits: 1 file, max 10MB. JPEG/PNG/HEIC only (không PDF, không zip) |
| 11 | Auth requirement | **High** | MVP recommend require login (Supabase auth) — tránh anonymous abuse. Hoặc rate limit nặng cho anonymous |
| 12 | History deletion right (GDPR-style) | **High** | Bắt buộc có endpoint `DELETE /api/mail-history/:id` + `DELETE /api/mail-history/all` cho user xóa toàn bộ |
| 13 | Image storage backend | **Medium** | KHÔNG store ảnh gốc trên server quá 24h. Encrypt nếu store. Hoặc xóa ngay sau AI processing |
| 14 | AI prompt injection | **Medium** | User upload ảnh có text "ignore previous instructions" → có thể bypass safety. Filter prompt injection patterns hoặc dùng AI provider có guardrails |

### 4.2 Recommended stack

- **Backend:** Node.js + Express + Sequelize (consistent với supabase/serverless option)
- **AI:** Anthropic Claude (Vision) hoặc OpenAI GPT-4o (Vision). Recommend Claude 3.5 Sonnet hoặc Claude 4 Sonnet — output JSON structured tốt + ít hallucinate hơn cho document parsing
- **OCR fallback:** Google Cloud Vision OCR nếu cần text extraction trước
- **Storage:** Supabase Storage (đã có account) cho temp + history images
- **Rate limit:** Redis hoặc in-memory với upstash
- **Auth:** Supabase Auth (đã có)

---

## 5. Database review — `MailHistory` schema

### 5.1 Useful fields

| Field | Type | Useful | Note |
|---|---|---|---|
| `id` | UUID PK | ✓ | Standard |
| `user_id` | UUID FK | ✓ | Required for retention |
| `created_at` | timestamptz | ✓ | Auto |
| `image_thumbnail_url` | text | ✓ | Lưu thumbnail nhỏ (300x300) cho history list, KHÔNG full ảnh |
| `document_type` | text | ✓ | Vd: "shukutsu_zei", "kokuho", "nhk", "scam_warning", "unknown" |
| `summary_vi` | text | ✓ | 1–2 dòng Vietnamese |
| `required_action_vi` | text | ✓ | Action cụ thể |
| `deadline` | date NULL | ✓ | Nếu AI parse được |
| `amount_yen` | integer NULL | ✓ | Nếu thư có số tiền |
| `warnings` | jsonb (array) | ✓ | List warning flags (scam suspicion, urgent, etc.) |
| `related_guide_id` | text NULL | ✓ | FK soft đến `ADMIN_GUIDES.id` |
| `language_detected` | text | ✓ | Default "ja" |
| `ai_confidence_score` | float NULL | ✓ | 0–1 — nếu < 0.5 → flag "uncertain" |

### 5.2 Privacy-sensitive fields — phải cân nhắc

| Field | Risk | Recommendation |
|---|---|---|
| `image_full_url` | **High** | KHÔNG lưu sau processing. Hoặc encrypt at rest + auto-delete 7 days |
| `full_translation_vi` | **High** | Có chứa toàn bộ nội dung thư — sender name, address, amount, account number. **MVP recommend: KHÔNG lưu**. Nếu lưu → encrypt + retention 30 days max + delete-on-request |
| `sender_name` / `sender_address` | **High** | PII của bên thứ 3 (cơ quan / công ty / người gửi). Cẩn thận — có thể vi phạm Personal Information Protection Act của Nhật |
| `amount_yen` | **Medium** | Tài chính cá nhân — sensitive. Lưu OK cho convenience, nhưng phải user-deletable |
| `recipient_name` / `recipient_address` | **High** | PII chính user — phải link `user_id` chứ không lưu plaintext lần 2 |
| `bank_account_number` (nếu trong thư) | **Critical** | KHÔNG BAO GIỜ lưu. AI prompt phải redact trước khi return |
| `my_number` (nếu trong thư) | **Critical** | KHÔNG BAO GIỜ lưu. Redact ngay từ AI |

### 5.3 Required functions

- ✅ **Delete history** — endpoint `DELETE /api/mail-history/:id`
- ✅ **Delete all history** — endpoint `DELETE /api/mail-history/all`
- ✅ **Export history** — GDPR-style data export (JSON dump của user history)
- ✅ **Retention policy** — auto-delete after 90 days unless user marks "keep"
- ✅ **User consent** — flag `user_consented_at` timestamp; deny feature nếu null

### 5.4 Recommendation

MVP schema **MINIMAL**:
```sql
CREATE TABLE mail_history (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  document_type TEXT NOT NULL,
  summary_vi TEXT NOT NULL,
  required_action_vi TEXT,
  deadline DATE,
  amount_yen INTEGER,
  warnings JSONB DEFAULT '[]',
  related_guide_id TEXT,
  ai_confidence_score REAL
);

CREATE INDEX idx_mail_history_user_created ON mail_history(user_id, created_at DESC);
```

**KHÔNG lưu** trong MVP: `image_full_url`, `full_translation_vi`, `sender_*`. User cần lại → upload lại ảnh.

---

## 6. Frontend integration plan

### 6.1 Đề xuất screens (full vision)

1. **`MailTranslateIntroConsentScreen`** — landing + consent first-time
2. **`MailCaptureScreen`** — camera + photo library picker
3. **`MailProcessingScreen`** — loading state với progress
4. **`MailResultScreen`** — kết quả AI + disclaimer + related guide CTA
5. **`MailHistoryScreen`** — list lịch sử (tùy chọn)
6. **`MailHistoryDetailScreen`** — xem lại 1 entry

### 6.2 MVP — minimal screens

✅ **Required:**
- `MailTranslateIntroConsentScreen` (lần đầu) — text consent + checkbox
- `MailCaptureScreen` — camera + library
- `MailProcessingScreen` — loading
- `MailResultScreen` — kết quả + disclaimer

⚠️ **Optional cho MVP, recommend defer:**
- `MailHistoryScreen` + `MailHistoryDetailScreen` — privacy risk, complexity. Defer cho Phase 3+ sau khi privacy infra solid

### 6.3 Navigation hook

Trong `RootStackParamList`:
```ts
MailTranslateIntro: undefined;
MailCapture: undefined;
MailProcessing: { uploadId: string };
MailResult: { historyId: string };
```

Entry point từ Home — thêm 1 quick action "Dịch thư Nhật" hoặc tab riêng. KHÔNG ép vào search flow.

---

## 7. Privacy text drafts

### 7.1 In-app consent text (Vietnamese)

```
Trước khi dùng "Dịch Thư Nhật"

Tính năng này gửi ảnh thư của bạn lên dịch vụ AI bên thứ 3
(hiện tại: Anthropic Claude) để phân tích và dịch sang tiếng
Việt.

Bằng cách tiếp tục, bạn đồng ý:

• Ảnh thư sẽ được gửi qua kết nối mã hóa lên server của chúng tôi
  và dịch vụ AI.
• Ảnh gốc sẽ bị xóa sau khi xử lý xong (trong 1 giờ).
• Kết quả dịch (loại thư, tóm tắt, hành động cần làm) có thể được
  lưu trong tài khoản của bạn để xem lại sau, nếu bạn chọn lưu.
• Bạn có thể xóa lịch sử bất kỳ lúc nào trong Settings.
• Đây là CÔNG CỤ THAM KHẢO — không thay thế tư vấn pháp lý,
  thuế, y tế, hay cơ quan có thẩm quyền. Trường hợp quan trọng
  luôn nên hỏi 市役所 / luật sư / 行政書士.
• KHÔNG chụp ảnh thư có chứa My Number, số thẻ tín dụng, hoặc
  mật khẩu — AI sẽ cố gắng che nhưng không đảm bảo 100%.

[ ] Tôi đã đọc và đồng ý

  [Hủy]   [Tiếp tục]
```

### 7.2 Disclaimer (Vietnamese, hiện trên mọi Result Screen)

```
⚠️ Đây là kết quả AI tham khảo. KHÔNG phải tư vấn pháp lý / thuế /
y tế cá nhân. AI có thể đọc nhầm chữ Nhật khó hoặc bỏ sót chi tiết.

Cho thư quan trọng (入管, thuế, ngân hàng, 督促状), luôn xác
minh với cơ quan phát hành hoặc luật sư trước khi hành động.
```

### 7.3 Privacy Policy update (Vietnamese — đoạn cần thêm)

```
6. Tính năng "Dịch Thư Nhật"

6.1 Dữ liệu thu thập
Khi bạn dùng tính năng "Dịch Thư Nhật", chúng tôi xử lý:
- Ảnh thư bạn chụp/tải lên
- Kết quả phân tích AI (loại thư, tóm tắt, hành động đề xuất)

6.2 Bên thứ ba
Ảnh thư được gửi đến dịch vụ AI của Anthropic (Claude) để phân
tích. Anthropic có chính sách bảo mật riêng — xem tại
https://www.anthropic.com/privacy. Chúng tôi không gửi dữ liệu
này cho bên thứ ba khác để quảng cáo.

6.3 Lưu trữ
- Ảnh gốc: xóa sau khi xử lý (trong 1 giờ).
- Kết quả phân tích: lưu trong tài khoản bạn cho đến khi bạn xóa.
- Tự động xóa sau 90 ngày nếu bạn không truy cập lại.

6.4 Quyền của bạn
- Xem lịch sử trong Settings → Mail History.
- Xóa từng entry hoặc toàn bộ lịch sử bất kỳ lúc nào.
- Yêu cầu export dữ liệu qua email support@...

6.5 Khuyến cáo
Đây là công cụ tham khảo. Không thay thế tư vấn pháp lý / y tế /
thuế / cơ quan có thẩm quyền.
```

### 7.4 App Store privacy note (English)

Phần Privacy Nutrition Label trong App Store Connect:

```
Data Used to Track You: None.

Data Linked to You:
- User Content: Photos (uploaded mail images, processed and deleted
  within 1 hour)
- Identifiers: User ID
- Usage Data: Feature usage frequency

Data Not Linked to You: None.

Third-party processors:
- Anthropic (Claude AI) — for mail content analysis. Images and
  extracted text are sent over encrypted connections. See Anthropic
  privacy policy at anthropic.com/privacy.
```

---

## 8. Implementation phases

### Phase 0 — Audit (NOW)
- ✅ Audit doc (this file)
- ✅ Privacy Policy draft
- ⬜ Legal review của Privacy Policy update (recommend luật sư consumer Nhật)
- ⬜ Quote API cost (Anthropic) cho 100/1000/10000 user/month

### Phase 1 — Local UI mock (1–2 tuần)
- ⬜ 4 màn hình MVP (Intro/Capture/Processing/Result) với fake sample data
- ⬜ Navigation hook
- ⬜ Consent screen flow
- ⬜ Test trên iOS + Android device
- ⬜ KHÔNG backend, KHÔNG AI — chỉ UI

### Phase 2 — Backend + real AI in staging (2–3 tuần)
- ⬜ Backend endpoint `POST /api/mail/analyze`
- ⬜ Anthropic Claude integration với structured output prompt
- ⬜ Sequelize model `MailHistory` (minimal schema)
- ⬜ Rate limit (5/day/user)
- ⬜ Tmp file cleanup
- ⬜ Test prompt với 20 sample thư thật (anonymized)
- ⬜ Privacy Manifest config

### Phase 3 — Limited beta (4 tuần)
- ⬜ Internal TestFlight beta — 10–20 user trust
- ⬜ Free 5 use/month
- ⬜ Collect feedback + accuracy stats
- ⬜ Privacy Policy update live
- ⬜ Iterate prompt + UI

### Phase 4 — Public release + monetization (sau khi validate)
- ⬜ Apple Review submission (riêng cho version có feature)
- ⬜ App Store Privacy Nutrition update
- ⬜ IAP setup nếu charge premium (Apple bắt buộc)
- ⬜ Marketing campaign (TikTok script template từ marketing copy doc)

**Tổng timeline ước tính: 2–3 tháng** từ Phase 0 đến public release.

---

## 9. Recommendation

### 9.1 Should we add this feature?

✅ **Yes** — phù hợp positioning của app, fill được pain point lớn của user, cross-sell tốt với 90 guide hiện có.

### 9.2 Should it be in v1.3.2?

❌ **NO.** v1.3.2 đã submit Apple Review (build #22, 審査待ち). KHÔNG thêm vào release đang chờ.

Lý do:
- Apple Reviewer đang review content (10 guide mới). Thêm AI feature lớn → reset review từ đầu, có thể delay 5–10 ngày.
- Privacy Policy chưa update — Apple Privacy Nutrition Label phải khai trước khi ship.
- Backend infra chưa có cho AI processing.
- MVP scope chưa chốt với product owner.

### 9.3 Recommended target

🎯 **v1.4.0** — minor version bump phù hợp cho feature mới lớn.

Earliest realistic: **v1.4.0 (~2026-08 hoặc 2026-09)** sau khi:
- v1.3.2 đã shipped + stable >2 tuần
- Phase 0 → Phase 3 đã hoàn thành
- Beta feedback đã iterated 2 vòng

### 9.4 Required blockers TRƯỚC khi implementation

| Blocker | Owner | Status |
|---|---|---|
| Legal review Privacy Policy update (luật sư Nhật) | Product owner | ⬜ Not started |
| Anthropic API cost estimation cho scale | Engineering | ⬜ |
| Sequelize/backend infra ready | Engineering | ⬜ |
| Auth gating decided (require login? anonymous?) | Product | ⬜ |
| Privacy Manifest setup verified với EAS | Engineering | ⬜ |
| Sample 20 thư thật (anonymized) cho prompt testing | Content | ⬜ |
| Quyết định monetization model (free / freemium / paid) | Product | ⬜ |
| Decision: store image after processing? Yes/No | Product + legal | ⬜ |
| Decision: store full_translation_vi? Yes/No | Product + legal | ⬜ |

**KHÔNG implement bất kỳ phase nào cho đến khi all 9 blockers ✅.**

---

## 10. Out of scope / risks parking lot

Các điểm cần re-visit khi product matures:

- **Multi-language input** (Korean / Chinese mail) — không trong v1
- **Conversation chat** với AI sau khi đọc thư
- **Auto-fill form** từ thư → hữu ích nhưng risk cao (sai field → mất tiền)
- **Voice reading** kết quả (cho user khiếm thị / bận tay)
- **Push reminder** trước deadline 3 ngày — hữu ích nhưng phức tạp
- **Auto-payment** từ thư hóa đơn — KHÔNG bao giờ recommend (legal risk + Apple IAP conflict)
- **Affiliate** với 行政書士 / luật sư — sau khi product validated
- **Offline OCR** — chậm và tốn pin, không cần thiết khi cloud AI nhanh

---

## Document maintenance

- Update doc này sau mỗi blocker resolved.
- Khi bắt đầu Phase 1, tạo doc `docs/feature-translate-japanese-mail-phase1.md` cho UI design + screens.
- Khi finalize Privacy Policy → tạo `docs/privacy-policy-v2.md`.
- Re-verify rủi ro Apple Review mỗi khi Apple update guidelines (theo dõi App Store Review Guidelines changes).
