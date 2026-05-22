# Growth Asset Pack — Share-Card Concepts

**Date**: 2026-05-23
**Status**: concept pack only. No actual design rendered in this PR. 20 card ideas ready to hand to a designer / capture pass.
**Companion**: [`docs/growth/short-video-hooks.md`](short-video-hooks.md), [`docs/growth/content-opportunity-map.md`](content-opportunity-map.md).

A "share-card" is a single static image (vertical 1080x1920 or square 1080x1080) sized for Instagram / Zalo / Facebook / Telegram / Twitter share. The user sees one card, screenshots it, sends it to someone who needs it. Distribution moat: someone you trust sent you this BEFORE the app was suggested.

---

## Constraints applied to every card below

- **Bilingual** by default: Vietnamese primary, Japanese term in subtitle. NO English unless the topic is English-source (very rare).
- **Source label** on every card, footer line: `Nguồn: 出入国在留管理庁 / 厚生労働省 / 法テラス / etc.`. Without source = not a share-card.
- **App attribution** in corner: small `Cẩm Nang Việt Nhật` watermark + `vietnhat.app` (or relevant URL/QR placeholder).
- **No emoji clutter**. At most ONE small icon (e.g. 📞 for hotline, ⚠️ for caution). Never 3+.
- **No fear-monger imagery**. Calm typography on flat background.
- **No fake testimonial / fake user faces**. Stock or illustrated abstract figures only.
- **No prices** unless from an official fee schedule cited.
- **Compliance**: `docs/content-governance.md` §1 anti-clickbait rules apply word-for-word.

---

## Card template

```
[Title]                          ← ≤ 8 Vietnamese words, large
[Subtitle]                       ← Japanese term + romaji, smaller
[Anchor fact / number / hotline] ← ONE concrete fact, mid-card
[CTA line]                       ← "Đọc full ở app — Cẩm Nang Việt Nhật"
[Source footer]                  ← "Nguồn: <agency>" + small URL/QR
```

---

## The 20 cards

### Card 01 — Mất 在留カード trong 24 giờ
**User pain**: Vừa nhận ra mất thẻ, không biết bắt đầu từ đâu, sợ visa bị ảnh hưởng.
**Visual structure**:
- Top: title "Mất 在留カード — 3 bước trong 14 ngày"
- Mid: 3-step list (1. 警察 — 紛失届 trong 24h, 2. 入管 — 再交付 trong 14 ngày, 3. phí 1,300円)
- Bottom: hotline 出入国在留管理庁 0570-013904
**Share motivation**: Anyone who has just had a wallet stolen / phone with card lost. Time-urgent.
**Where it spreads best**: Zalo direct message, Facebook private groups for Vietnamese in Japan, Twitter/X (low share for Vietnamese audience but high search reach).
**Source**: `lost-residence-card`. Anchor: "出入国管理及び難民認定法 §19-7."

---

### Card 02 — 確定申告: 5 trường hợp người Việt nên làm
**User pain**: Người Việt hay nghĩ 確定申告 là cho tự doanh, bỏ qua các khoản trả thừa.
**Visual structure**:
- Top: title "5 lý do người Việt nên 確定申告"
- Mid: 5-row checklist (1. 副業 thu nhập > 20万円, 2. Y tế > 10万円, 3. 寄附 / ふるさと納税, 4. 住宅ローン năm đầu, 5. 扶養控除 gửi tiền gia đình ≥ 38万円)
- Bottom: thời hạn Feb 16 - Mar 15
**Share motivation**: Annual tax-season helpfulness. People send this to friends to look smart.
**Where it spreads best**: Zalo, Facebook groups, especially Jan-Feb.
**Source**: `kakutei-shinkoku`, `tax-on-remittance-to-vietnam`. Anchor: "国税庁 確定申告書作成コーナー."

---

### Card 03 — Hotline tiếng Việt cho người Việt ở Nhật
**User pain**: Khẩn cấp nhưng không biết tiếng Nhật, không biết gọi đâu.
**Visual structure**:
- Top: title "Số hotline tiếng Việt — lưu trong điện thoại"
- Mid: 5-7 hotlines (法テラス 0570-078374, FRESC 0570-011000, Đại sứ quán VN số chính, 国民生活センター 188, AMDA 03-6233-9266 medical, 警察 #9110 non-emergency, 救急 119)
- Bottom: "Lưu vào danh bạ ngay"
**Share motivation**: Universal — everyone needs this list. Highest predicted save-rate.
**Where it spreads best**: Every channel. **Best evergreen card**.
**Source**: `foreign-resident-support-centers`, `emergency-calls-japan`. Source label: multiple.

---

### Card 04 — NHK đến gõ cửa: bạn không bắt buộc mở
**User pain**: Sợ NHK + không biết quyền + hợp đồng có thực sự bắt buộc?
**Visual structure**:
- Top: title "NHK gõ cửa — 4 điều bạn cần biết"
- Mid: 4-row list (1. Không bắt buộc mở cửa, 2. Đã ký = phải trả, 3. Không có máy thu sóng = không ký, 4. Hợp đồng có thể huỷ qua thư bảo đảm)
- Bottom: "放送法 §64"
**Share motivation**: Cultural confusion + practical safety. High share among newcomers.
**Where it spreads best**: Vietnamese groups for newcomers; YouTube comment dropouts.
**Source**: `nhk-contract-guide`. Anchor: "放送法 §64."

---

### Card 05 — Lương baito chậm: 3 đường đi mà không cần nghỉ việc
**User pain**: Lương chậm, sợ kiện sẽ bị đuổi.
**Visual structure**:
- Top: title "Lương chậm — 3 cách giải quyết"
- Mid: 3 steps (1. 労働基準監督署 free, ẩn danh, 2. 内容証明 letter, 3. FRESC 0570-011000)
- Bottom: "労働基準法 §24 — Lương phải trả đầy đủ + đúng hạn"
**Share motivation**: Practical labor knowledge; high empathy.
**Where it spreads best**: Baito group chats, Vietnamese-restaurant-staff networks.
**Source**: `labor-rights-dispute`. Anchor: "労働基準法 §24."

---

### Card 06 — Sinh viên: 28 giờ baito là tối đa cứng
**User pain**: Vượt giờ không cố ý, sợ visa ảnh hưởng.
**Visual structure**:
- Top: title "Sinh viên Việt — 28h/tuần baito là tuyệt đối"
- Mid: 3 points (1. 28h cộng dồn các job, 2. Kỳ nghỉ dài: 40h, 3. Vượt → có thể ảnh hưởng gia hạn)
- Bottom: "資格外活動許可 — Nyukan kiểm tra qua thuế"
**Share motivation**: Pre-emptive warning for student friends.
**Where it spreads best**: Vietnamese student Facebook groups, Zalo university chats.
**Source**: `permission-activity-outside-status`, `study-in-japan-student-guide`. Anchor: "出入国管理及び難民認定法 §19."

---

### Card 07 — Mua bảo hiểm xe đạp ở Tokyo / Osaka
**User pain**: Mới sang Nhật, không biết tỉnh nào bắt buộc.
**Visual structure**:
- Top: title "Bảo hiểm xe đạp — gần như BẮT BUỘC ở Tokyo / Osaka"
- Mid: 3 rows (1. Tokyo 2020, 2. Osaka 2016, 3. Phí 3,000-5,000円/năm)
- Bottom: "Bán ở konbini / 自転車屋 / online"
**Share motivation**: Practical newcomer awareness; counter to "ai cũng đi xe đạp, ai cũng OK".
**Where it spreads best**: Tokyo / Osaka newcomer groups.
**Source**: `bicycle-insurance`, `bicycle-rules-2026`. Anchor: "東京都 自転車条例 + 大阪府 自転車条例."

---

### Card 08 — Tai nạn giao thông: 4 việc trước khi gọi bảo hiểm
**User pain**: Vừa va chạm, lóng ngóng, sợ nói sai.
**Visual structure**:
- Top: title "Tai nạn giao thông — 4 việc TẠI HIỆN TRƯỜNG"
- Mid: 4 steps (1. Gọi 110, 2. Chụp ảnh xe + hiện trường, 3. Lấy thông tin người kia 免許+連絡先, 4. Đi viện ngay → 診断書)
- Bottom: "道路交通法 §72 — Bắt buộc báo cảnh sát"
**Share motivation**: Universal life-skill card; high save-rate.
**Where it spreads best**: All channels. Evergreen.
**Source**: `traffic-accident-response`. Anchor: "道路交通法 §72."

---

### Card 09 — Phòng cảnh sát hỏi: 3 quyền bạn được hưởng
**User pain**: Bị police pull aside, không biết quyền, sợ.
**Visual structure**:
- Top: title "Bị cảnh sát hỏi — 3 quyền theo luật"
- Mid: 3 rights (1. Xem 警察手帳, 2. 黙秘権 (im lặng), 3. Gọi 当番弁護士 nếu bị mời về đồn)
- Bottom: "刑事訴訟法 §198 §39"
**Share motivation**: Calm legal knowledge; share to friends in newcomer state.
**Where it spreads best**: Vietnamese newcomer + student groups.
**Source**: `police-questioning-rights-japan`. Anchor: "刑事訴訟法 §39, §198."

---

### Card 10 — Bão / Động đất: 30 giây đầu làm gì
**User pain**: Thông báo bão / động đất sắp đến, lóng ngóng.
**Visual structure**:
- Top: title "30 giây đầu khi động đất — đừng chạy"
- Mid: 3 actions (1. Chui xuống bàn / đỡ đầu, 2. Tắt bếp gas nếu có thể, 3. Chờ rung tắt rồi đi sơ tán)
- Bottom: hazard-map URL guidance + 気象庁 link
**Share motivation**: Seasonal high-share (June + Sept).
**Where it spreads best**: All channels. Best as June + Sept seasonal push.
**Source**: `earthquake-preparedness-japan`, `hazard-map-flood-tsunami-volcano`. Anchor: "気象庁 緊急地震速報."

---

### Card 11 — Bão đang đến: 3 mức cảnh báo, mỗi mức 1 hành động
**User pain**: 警戒レベル 1-5 nghe khó hiểu, không biết khi nào sơ tán.
**Visual structure**:
- Top: title "Cảnh báo bão — 3 mức quan trọng"
- Mid: 3 levels (Level 3: 高齢者 sơ tán, Level 4: TẤT CẢ sơ tán, Level 5: đã muộn để di chuyển)
- Bottom: "気象庁 警戒レベル 5段階制 (2019-)"
**Share motivation**: Seasonal helpfulness (Aug-Oct).
**Where it spreads best**: Twitter (where Japanese warnings break first).
**Source**: `typhoon-evacuation-alerts`. Anchor: "気象庁 警戒レベル運用指針."

---

### Card 12 — Đêm khuya bệnh: gọi #7119 trước viện
**User pain**: Bệnh đêm, không biết có cần救急 hay đợi sáng.
**Visual structure**:
- Top: title "Bệnh đêm — gọi #7119 trước"
- Mid: 3 facts (1. Y tá tư vấn 24/7, 2. Nói tiếng Nhật chậm + AMDA backup, 3. Miễn phí ở đa số tỉnh)
- Bottom: "総務省消防庁 救急安心センター事業"
**Share motivation**: Practical health-care navigation.
**Where it spreads best**: Vietnamese newcomer groups, mom groups (children's fevers).
**Source**: `holiday-night-medical-care`, `emergency-calls-japan`. Anchor: "総務省消防庁 #7119."

---

### Card 13 — Đại sứ quán KHÔNG bao giờ đòi tiền qua chuyển khoản
**User pain**: Sợ scam mạo danh đại sứ quán/cảnh sát.
**Visual structure**:
- Top: title "Cảnh báo — Đại sứ quán KHÔNG đòi tiền qua chuyển khoản"
- Mid: 3 scam patterns (1. "Phí điều tra", 2. "Phí thông quan bưu kiện", 3. "Phí xử lý visa khẩn"). All = SCAM.
- Bottom: "Gọi 警察 #9110 ngay khi nhận cuộc gọi như vậy"
**Share motivation**: Protect-your-elder-relative card; high virality among Vietnamese family chats.
**Where it spreads best**: Family Zalo chats. **Highest predicted share-rate of all 20.**
**Source**: `special-fraud-tokushu-sagi`. Anchor: "警察庁 特殊詐欺手口集."

---

### Card 14 — Chuyển nhà 14 ngày: 4 việc không thể quên
**User pain**: Vừa chuyển, không biết hết những đâu phải báo.
**Visual structure**:
- Top: title "Chuyển nhà — 4 việc trong 14 ngày"
- Mid: 4-row checklist (1. 転入届 ward mới, 2. 転出届 ward cũ trước khi đi, 3. Báo địa chỉ trên 在留カード, 4. Báo nenkin + hoken + bank + my number)
- Bottom: "住民基本台帳法 §23 §24"
**Share motivation**: Practical, friend-just-moved scenario.
**Where it spreads best**: Vietnamese tenant + neighbor groups.
**Source**: `moving-in-notification`, `address-change`. Anchor: "住民基本台帳法 §23."

---

### Card 15 — 5 câu tiếng Nhật ở 市役所 — copy là dùng
**User pain**: Vào ward office lần đầu, không biết mở đầu thế nào.
**Visual structure**:
- Top: title "5 câu ở 市役所 — copy là dùng được"
- Mid: 5 phrase rows (JP + romaji + VN) — "Sumimasen, tetsuduki o oshiete kudasai", "Yukkuri hanashite kudasai", "Kakimasu", "Eigo dekimasu ka", "Mou ichido onegaishimasu"
- Bottom: "App có 76+ câu cho 市役所 + bệnh viện + ngân hàng"
**Share motivation**: Practical phrase card; high save-rate.
**Where it spreads best**: Vietnamese language-learner groups.
**Source**: `cityHall` japanese phrases. Anchor: app phrase library v1.5.0.

---

### Card 16 — Trả nhà thuê: 敷金 bị giữ — 3 lý do KHÔNG hợp lý
**User pain**: Chủ nhà giữ 敷金, không biết được giữ bao nhiêu là hợp lý.
**Visual structure**:
- Top: title "Trả nhà — 3 lý do chủ KHÔNG được giữ 敷金"
- Mid: 3 rows (1. 自然損耗 (wear-and-tear) = chủ chịu, 2. Sơn lại không cần thiết, 3. Phí cleaning vượt 見積もり)
- Bottom: "国土交通省 原状回復ガイドライン"
**Share motivation**: Empower-tenant; high share among renters about to move out.
**Where it spreads best**: Tenant + moving-out groups.
**Source**: `moving-out-checklist`. Anchor: "国土交通省 原状回復をめぐるトラブルとガイドライン."

---

### Card 17 — Gửi tiền về VN: 100万円 = phải khai
**User pain**: Không biết ngưỡng khai thuế, sợ bị 税務調査.
**Visual structure**:
- Top: title "Gửi tiền về VN — ngưỡng khai báo"
- Mid: 3 facts (1. 100万円/lần qua bank → ngân hàng tự gửi 国外送金等調書, 2. Tổng năm có thể bị税務調査, 3. Gửi cho gia đình không là quà = OK)
- Bottom: "国税庁 国外送金等調書 制度"
**Share motivation**: Universal among remittance-sending population.
**Where it spreads best**: Worker groups, savings advice groups.
**Source**: `tax-on-remittance-to-vietnam`. Anchor: "国税庁 国外送金等調書."

---

### Card 18 — 10 năm 永住: 3 đường rút ngắn
**User pain**: Nghe nói 10 năm là cứng, không biết có ngoại lệ.
**Visual structure**:
- Top: title "永住 không phải lúc nào cũng 10 năm"
- Mid: 3 paths (1. 高度専門職 1-3 năm, 2. 日本人/永住者 配偶者, 3. HSP 70/80 điểm)
- Bottom: "出入国在留管理庁 永住許可ガイドライン"
**Share motivation**: Hopeful but realistic. High share among long-term workers.
**Where it spreads best**: HSP applicants, long-term resident chats.
**Source**: `permanent-residency-eijuu`, `highly-skilled-professional`. Anchor: "出入国在留管理庁 永住許可に関するガイドライン."

---

### Card 19 — DV / Bạo lực gia đình: 3 đường thoát giấu kín
**User pain**: Vợ/chồng bị bạo hành, sợ ảnh hưởng visa (dependent visa).
**Visual structure**:
- Top: title "Bạo lực gia đình — 3 đường thoát an toàn"
- Mid: 3 paths (1. 配偶者暴力相談支援センター 24/7, 2. Shelter tạm thời, 3. 保護命令 từ tòa)
- Bottom: hotline 0570-0-55210 (DV相談ナビ — multilingual)
**Share motivation**: Quiet share — sent privately. Less viral, more impactful.
**Where it spreads best**: Direct message; women's groups; church/community private chats.
**Source**: `domestic-violence-dv-support`. Anchor: "DV防止法 + 内閣府男女共同参画局."
**Special care**: This card MUST NOT include language that pressures the user to leave; it lists options only.

---

### Card 20 — Tết về VN: 3 việc trước khi lên máy bay
**User pain**: Sắp về Tết, sợ visa hết hạn / mất tư cách / không vào lại được.
**Visual structure**:
- Top: title "Về VN Tết — 3 việc trước khi đi"
- Mid: 3 steps (1. みなし再入国 ≤ 1 năm = check ED card, 2. 在留期限 còn ≥ 6 tháng?, 3. 住民票 còn không (rời ≥ 1 năm = thường mất))
- Bottom: "出入国管理及び難民認定法 §26"
**Share motivation**: Annual seasonal share (Dec-Feb).
**Where it spreads best**: All Vietnamese-in-Japan channels. **Highest seasonal share of all 20.**
**Source**: `re-entry`, `return-to-vietnam-checklist`. Anchor: "出入国管理及び難民認定法 §26."

---

## Distribution priority ranking (when designer time is limited)

If only 5 cards get rendered first, ship these in order:

1. **Card 03 — Hotlines** (evergreen, universal, lowest production complexity)
2. **Card 13 — Embassy scam warning** (highest predicted share-rate, protects elders)
3. **Card 20 — Tết re-entry** (seasonal, time-bound)
4. **Card 08 — Traffic accident 4 steps** (universal life-skill)
5. **Card 02 — 5 reasons to filing 確定申告** (high annual save-rate)

The other 15 ship as bandwidth allows; no card is "wrong" to ship later.

---

## Anti-patterns the designer must avoid

| ❌ | Why |
| --- | --- |
| Adding logos of government agencies | Compliance refusal — we are not endorsed |
| Using real people's faces | Privacy + likeness risk |
| Pricing in big bold (e.g. "50,000円") | Numbers vary by case; misleading |
| Year on the card (e.g. "2026 rules") | Cards rot — leave year out so the card stays usable |
| Watermark too small to read at thumbnail | App attribution must survive crop |
| QR code on every card | Only on cards 03, 13, 20 (highest share intent) |
| Aggressive red / siren visuals | Conflicts with anti-fear brand |
| Generic stock photos of "Japan" | Mt. Fuji / Shibuya = tourist-app energy. We are not a tourist app. |
| Emoji headlines | Looks low-trust |
| Translating a card and posting both | Pick one language per card |

---

## After rendering: file convention

Designer outputs to `assets/share-cards/<card-id>-<short-slug>.png` and `.svg`. NO commit of binary assets in THIS PR (asset commit is a separate, gated PR).

Filenames: `card-01-mat-the-cu-tru.png`, `card-02-kakutei-shinkoku.png`, etc.

Two formats per card:
- Vertical 1080x1920 (Instagram / TikTok / Zalo story)
- Square 1080x1080 (Facebook / Twitter / generic)

Both formats use the same content; only layout adapts.

---

## Tracking (post-render, post-distribution)

When cards ship, attribution is tracked ONLY via:
- App Store / Play Store referrer source (when card includes URL)
- QR scan (for the 3 priority cards with QR)
- Friend-mentioning-app organic install (un-measurable, accepted)

**No in-app analytics for share-card attribution.** This is consistent with observation-season freeze + privacy posture.

---

## Related docs

- [`docs/growth/short-video-hooks.md`](short-video-hooks.md) — video equivalents of these cards
- [`docs/growth/content-opportunity-map.md`](content-opportunity-map.md) — content opportunities the cards target
- [`docs/growth/aso-v1.md`](aso-v1.md) — store-side copy
- [`docs/content-governance.md`](../content-governance.md) — compliance rules
