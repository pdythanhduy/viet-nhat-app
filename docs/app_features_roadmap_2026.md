# App Features Roadmap 2026 — Cẩm Nang Việt Nhật

**Date:** 2026-05-14
**Scope:** Engineering / product features (NOT content). Doc song song với `docs/content_roadmap_2026.md` (chỉ về guide content).
**Status:** Discussion draft v1 — chờ product / engineering xác nhận trước khi implement.

---

## 0. Bối cảnh

Sau giai đoạn 1.3.x (110+ admin guides), app có vị trí mạnh ở mảng **content/data** nhưng còn thiên về passive reading. 4 nhóm feature dưới đây giúp app chuyển từ "tra cứu" sang "đồng hành chủ động" với người Việt sống ở Nhật.

Ưu tiên sắp xếp theo: **giá trị user × độ phức tạp implementation**.

---

## 1. Feature group A — Smart Notifications (Ưu tiên CAO)

### Vấn đề user
Người Việt thường lỡ deadline thủ tục Nhật (gia hạn visa, đóng thuế, khai báo cư trú, tiêm chủng con) vì:
- Không có hệ thống nhắc tự động bằng tiếng Việt.
- Thư báo từ 役所 chỉ tiếng Nhật → bỏ qua.
- App calendar Nhật / Google không hiểu thuật ngữ Nhật.

### Giải pháp đề xuất
**Local notifications** (không cần backend lúc đầu) cho các deadline cá nhân user nhập:

**Loại nhắc**:
- **Visa renewal**: nhập 在留期間満了日 → nhắc 6 tháng / 3 tháng / 1 tháng / 2 tuần / 1 tuần trước.
- **在留カード expiry**: nhắc riêng (khác visa expiry).
- **Re-entry permit (再入国)**: nhắc trước khi xuất cảnh nếu visa <1 năm.
- **確定申告**: nhắc 1 tháng + 1 tuần trước (15/3 hằng năm).
- **住民税 / 国保 deadline**: nhắc theo lịch nộp (4 đợt/năm).
- **My Number Card hết hạn**: nhắc 6 tháng trước.
- **Drivers license renewal**: nhắc theo sinh nhật + giai đoạn (3 tuần - 5 tuần trước).
- **Trẻ em vaccination**: nhắc trước mỗi mốc tuổi (2/3/4 tháng, 1 tuổi, 1.5 tuổi, 3 tuổi, lớp 1, lớp 6).
- **Maternal/child health checkups**: nhắc 14日健診, 1ヶ月健診, 3ヶ月健診, ...

### Technical approach
- **Phase 1** (low complexity): user nhập deadline thủ công → local notification (Expo Notifications).
- **Phase 2** (medium): import từ 在留カード (OCR via expo-camera + on-device ML) — auto-fill expiry.
- **Phase 3** (cao): backend sync để cross-device (cần Supabase user accounts).

### Estimated effort
- Phase 1: 1–2 tuần (1 dev).
- Phase 2: 2–3 tuần (cần OCR thư viện + test 在留カード thật).
- Phase 3: 1–2 tuần (Supabase đã có infrastructure).

### Risk
- iOS notification permission UX (cần xin khéo, không hỏi 100% lần đầu).
- Khi user đổi điện thoại (Phase 1) — mất reminder nếu không có backend.
- OCR 在留カード (Phase 2) cần test với mẫu thật, đa dạng visa types.

### Success metric
- 70%+ user nhập ít nhất 1 deadline trong 7 ngày đầu.
- 50%+ tap notification dẫn đến mở guide tương ứng.

---

## 2. Feature group B — Community Q&A (Ưu tiên TRUNG)

### Vấn đề user
Sau khi đọc guide, user thường có câu hỏi **specific tới case của mình** mà guide không trả lời được (ví dụ: "tôi có 2 visa cùng lúc thì ưu tiên cái nào?", "tôi đi VN 5 tháng có cần xin 再入国 đặc biệt không?"). User hiện tại đi hỏi:
- Facebook groups VN tại Nhật (chất lượng câu trả lời không kiểm chứng, có info sai).
- Zalo group bạn bè (giới hạn).
- Đoán trên Google Translate.

### Giải pháp đề xuất
**Q&A forum trong app**:
- User đặt câu hỏi (text + ảnh giấy tờ — bôi đen thông tin nhạy cảm tự động).
- Moderator (Việt + Nhật bilingual) duyệt + trả lời chính.
- Community user khác có thể bổ sung kinh nghiệm thật.
- Tag câu hỏi vào category (visa, thuế, y tế, lao động, ...).
- Pinned: câu hỏi phổ biến + câu trả lời chuẩn.

### Technical approach
- **Backend**: Supabase (đã có) + Row Level Security cho privacy.
- **Moderation queue**: questions trước khi public phải qua review.
- **Image upload**: tự động blur My Number / số thẻ / khuôn mặt (on-device AI).
- **Search**: full-text search tiếng Việt + tiếng Nhật.
- **Notifications**: ai theo dõi câu hỏi → nhận khi có reply.

### Estimated effort
- MVP (text-only, manual moderation): 3–4 tuần.
- Image upload + blur: thêm 2–3 tuần.
- Search + tagging: thêm 1–2 tuần.

### Risk
- **Moderation cost** — cần ít nhất 1 moderator Việt + Nhật, full-time hoặc part-time.
- **Misinformation** — community trả lời sai có thể nguy hiểm (visa, y tế, pháp lý). Cần disclaimer + moderator gắt.
- **Spam / quảng cáo** dịch vụ luật sư / bảo hiểm cò.
- **Privacy** — users post ảnh có info nhạy cảm.
- **Legal risk** — nếu lời khuyên community sai, app có thể bị quy trách nhiệm.

### Success metric
- 40%+ user post / vote / comment trong 30 ngày.
- 90%+ câu hỏi được moderator trả lời trong 48 giờ.
- Zero misinformation incident được report.

### Cảnh báo / phản đề xuất
**Phương án thay thế nhẹ hơn**: thay vì full Q&A, làm "Suggest a guide" — user submit topic → team review → thêm vào content roadmap. Đỡ moderation gánh nặng + tận dụng pipeline content có sẵn.

---

## 3. Feature group C — Find Services Nearby (Ưu tiên TRUNG)

### Vấn đề user
Khi cần dịch vụ cụ thể, user mất thời gian Google + dịch + đối chiếu:
- Bệnh viện có phiên dịch tiếng Việt.
- 役所 / 出入国在留管理局 gần nhất.
- Đại sứ quán / lãnh sự quán Việt Nam (4 địa điểm).
- 法テラス địa phương.
- 国際交流協会 / 多文化共生センター.
- ATM Wise / SBI Remit / 7-11 ATM cho người nước ngoài.

### Giải pháp đề xuất
**Map view + list view** với filter:

**Categories**:
- Y tế (有病院 + 多言語対応 + 救急 24/7).
- Hành chính (役所 + 入管 + 年金事務所).
- Pháp lý (法テラス + 弁護士会 + đại sứ quán).
- Cộng đồng (Vietnamese restaurants, Vietnamese Buddhist temples, Vietnamese hairdressers, Vietnamese grocery).
- Tài chính (ATMs cho người nước ngoài + bank chi nhánh dễ mở account).

**Mỗi địa điểm có**:
- Tên Nhật + romaji + Việt.
- Địa chỉ + map.
- Giờ làm việc.
- Ngôn ngữ hỗ trợ (đặc biệt nếu có tiếng Việt).
- Số điện thoại + website.
- Review từ user (optional).
- Link đến guide tương ứng trong app.

### Technical approach
- **Data source**: cần seed data cho mỗi 都道府県. Một số có sẵn (đại sứ quán = 4, 入管 = 14 chi nhánh chính). Bệnh viện đa ngôn ngữ — list ~500 từ AMDA + 厚生労働省.
- **Map**: react-native-maps (Google Maps free tier hoặc Apple Maps).
- **Geolocation**: expo-location (cần permission).
- **Filter UI**: chip filter theo category + ngôn ngữ.

### Estimated effort
- Data seeding (đại sứ quán + 入管 + 法テラス): 1 tuần content team.
- Map + filter UI: 2 tuần dev.
- Bệnh viện đa ngôn ngữ data: 1–2 tuần content team (lớn nhất, ~500 entries cần xác minh).
- Vietnamese restaurants etc (community contribution): ongoing.

### Risk
- **Map costs** — Google Maps API có quota; cần monitoring.
- **Data freshness** — giờ làm việc / địa chỉ thay đổi, cần re-verify hàng năm.
- **Coverage** — Tokyo / Osaka full data dễ; vùng quê khó.

### Success metric
- 60%+ user mở "Find Nearby" trong 14 ngày đầu.
- 30%+ user tap "Get directions" từ kết quả.

---

## 4. Feature group D — Calculators (Ưu tiên THẤP—TRUNG)

### Vấn đề user
Người Việt khó hiểu các con số Nhật vì hệ thống thuế / bảo hiểm / lương phức tạp:
- Lương gross vs net (sau thuế + bảo hiểm).
- Tiền 年金 sẽ được khi về VN (脱退一時金).
- 確定申告 dự kiến đóng / hoàn bao nhiêu.
- 住民税 dự kiến năm tới.
- Furusato Nozei limit.
- iDeCo lợi ích thuế.

### Giải pháp đề xuất
**Bộ calculator đơn giản trong app**:

1. **Salary net calculator**: lương gross + tuổi + 都道府県 + có 扶養 không → lương net.
2. **Pension refund (脱退一時金)**: số tháng đóng → tiền sẽ nhận về VN.
3. **Tax estimate**: thu nhập + 控除 → 所得税 + 住民税 dự kiến.
4. **Furusato Nozei limit**: thu nhập + gia đình → mức đóng tối đa được full benefit.
5. **iDeCo savings**: thu nhập + đóng/tháng → tiết kiệm thuế dự kiến.
6. **Simple FX**: yên ↔ VND tỷ giá realtime (qua API).

### Technical approach
- **Pure client-side** — không cần backend, chỉ công thức + UI.
- **Tax tables**: hardcode + cập nhật hàng năm (4 thời điểm: tháng 1, tháng 4, tháng 6, tháng 12).
- **FX rate**: free API (exchangerate.host hoặc rates từ Wise public).
- Disclaimer rõ: "ước tính, không thay tư vấn 税理士".

### Estimated effort
- Mỗi calculator: 2–4 ngày dev + 1 ngày test.
- Tổng 6 calculators: 3–4 tuần.

### Risk
- **Tax law thay đổi** — phải maintain công thức hằng năm.
- **Edge cases** (đa con, có bệnh, có 配偶者控除 phức tạp) — calculator simple sẽ sai. Cần disclaimer.
- **User over-trust** — nghĩ calculator đúng 100% → quyết định tài chính sai. Cần wording cẩn thận.

### Success metric
- 50%+ user mở ít nhất 1 calculator trong 30 ngày.
- 40%+ user dùng calculator dẫn đến mở guide tương ứng (cross-pollination).

---

## 5. Feature priority matrix

| Group | User value | Engineering effort | Maintenance cost | Risk | Recommended phase |
|---|---|---|---|---|---|
| A. Notifications | HIGH | Medium | Low | Low | **Phase 1 (next)** |
| B. Community Q&A | HIGH | High | High (moderator) | High | **Phase 3** (cần infra + moderator) |
| C. Find Nearby | MEDIUM-HIGH | Medium | Medium (data refresh) | Medium | **Phase 2** |
| D. Calculators | MEDIUM | Low-Medium | Low (annual update) | Low | **Phase 2** (parallel với C) |

**Đề xuất sequencing**:
- **2026 Q3**: Phase 1 = Notifications (A1: visa + thẻ + thuế + tiêm chủng).
- **2026 Q4**: Phase 2 = Find Nearby (basic categories) + Calculators (top 3: salary net, pension refund, tax estimate).
- **2027 H1**: Phase 3 = Community Q&A (sau khi infra Supabase + moderator hoàn chỉnh).

---

## 6. Cross-cutting concerns

### Privacy
- Notifications local-only đến Phase 3 (không cần upload deadline).
- Community Q&A: user có thể post anonymous + auto-blur giấy tờ nhạy cảm.
- Find Nearby: location chỉ dùng on-device cho nearest sort, KHÔNG upload.

### Accessibility
- Mọi UI phải hỗ trợ font size + screen reader (Vietnamese phonetic).
- Kanji + furigana cho user mới sang Nhật.

### Offline-first
- Notifications: hoạt động offline.
- Find Nearby: data cached, map có offline tiles cơ bản.
- Calculators: pure offline.
- Q&A: cần online (graceful fallback message).

### Internationalization
- App đã có VN + JP. Notifications: VN primary, JP secondary cho thuật ngữ chính.

---

## 7. Out of scope của doc này

- Implementation chi tiết (kiến trúc cụ thể, db schema).
- Cost estimation USD/JPY.
- Marketing / acquisition strategy.
- Gamification / loyalty.
- Premium tier monetization.
- Advanced AI features (chatbot, document classification).

Những phần trên cần doc riêng nếu được chọn implement.

---

## 8. Decision log

| Date | Decision | Decider |
|---|---|---|
| 2026-05-14 | Draft v1 — khởi tạo doc, đề xuất 4 group A/B/C/D | Claude (đề xuất) — chờ product/eng xác nhận |

---

## 9. Open questions

1. **Notification permission UX** — xin lúc nào? Onboarding hay khi user thực sự cần?
2. **Q&A moderation** — in-house hay outsource? Budget bao nhiêu?
3. **Find Nearby data** — community-contributed hay editorial-only?
4. **Calculator wording** — disclaimer mức nào để không bị hiểu nhầm là tư vấn pháp lý?
5. **Backend scaling** — Supabase free tier chịu được Q&A traffic không?
6. **Offline notifications + cloud sync** — conflict resolution khi user dùng nhiều device?
