# Native / Legal Review Pending Items — A1 to A9

**Date:** 2026-05-10 (updated A6 + A7 + A8 + A9 batches + QA pass A4–A9 + QA Round 2 prioritized review)
**Scope:** Tổng hợp các điểm cần review human từ 26 guide đã thêm trong batch A1–A9.
**Source backlog:** `docs/full-content-backlog-45-guides.md`
**Branches:** A1–A3 đã ship trong v1.3.2 (main + Apple Review). A4–A9 trên `feature/post-v1.3.2-content` (CHƯA ship).

---

## Purpose

Năm batch đầu tiên đã thêm tổng cộng **16 guide** mới vào ADMIN_GUIDES (80 → 96):

| Batch | Guides | Topics |
|---|---|---|
| **A1** (3) | clinic-hospital-visit-guide, emergency-calls-japan, dentist-visit-japan | Y tế cơ bản: khám bệnh, gọi 119/110, nha khoa |
| **A2** (3) | earthquake-preparedness-japan, typhoon-evacuation-alerts, hazard-map-flood-tsunami-volcano | Thiên tai: động đất, bão, hazard map |
| **A3** (4) | electricity-gas-water-contracts, home-internet-wifi-contracts, nhk-contract-guide, post-office-mail-forwarding | Tiện ích hằng ngày: utility, internet, NHK, bưu điện |
| **A4** (3) | japanese-school-system-children, japanese-language-support-children, child-allowance-jidou-teate | Giáo dục + trợ cấp con: school system, 日本語指導, 児童手当 |
| **A5** (3) | police-questioning-rights-japan, embassy-consulate-vietnam-japan, foreign-resident-support-centers | Pháp lý + hỗ trợ: police rights, Đại sứ quán, 多文化共生 |

Tổng **121 counterPhrases mới** (Japanese + romaji + Vietnamese + note) và nhiều tuyên bố pháp lý / nguồn cần verify.

**Lưu ý A1–A3** đã ship trong v1.3.2 (tag `v1.3.2`, đang chờ Apple Review).
**Lưu ý A4 + A5** chưa ship — sẽ vào release tiếp theo (v1.3.3 hoặc v1.4.0).

Document này gom lại tất cả các điểm CHƯA verify để gửi cho:

1. **Native Japanese reviewer** — confirm câu Nhật natural + đúng ngữ cảnh.
2. **Vietnamese content reviewer** sống ở Nhật — confirm tiếng Việt tự nhiên, không Hán-Việt cứng, không máy dịch.
3. **Legal / consumer consultation reviewer** — verify các claim pháp lý (NHK cooling-off, 不退去罪, 訪問販売, 労働安全衛生法 quyền từ chối work, customs).

Sau khi review, các điểm đã verify sẽ được đánh dấu xong (✓) trong report của batch tương ứng. Các điểm cần sửa sẽ trigger pass review tiếp theo.

---

## Summary table

Danh sách 26 điểm cần review chính (chi tiết trong các section dưới):

| # | Area | Guide | Item | Review type | Priority | Why |
|---|---|---|---|---|---|---|
| 1 | Counter phrase | clinic | `予約していませんが、診てもらえますか` | Native Japanese | Medium | Tone trong phòng khám đông |
| 2 | Counter phrase | emergency | `救急車をお願いします` + VN "Tôi cần xe cấp cứu" | Native Japanese + VN naturalness | High | Câu cấp cứu cốt lõi |
| 3 | Counter phrase | emergency | `意識がありません` | Native Japanese | High | Nên có biến thể `意識を失っています`? |
| 4 | Counter phrase | emergency | `日本語があまり話せません` | Native Japanese | Medium | Phổ biến nhưng có natural enough? |
| 5 | Counter phrase | dentist | `今日、治療できますか` | Native Japanese | Low | Có nên formal `処置できますか`? |
| 6 | Counter phrase | earthquake/typhoon | `助けてください！` + VN "Cứu tôi với!" | Native + VN | High | Có natural cho panic state? Hay nên dùng "助けて！"? |
| 7 | Counter phrase | NHK | 8 câu xử lý tại cửa | Native Japanese | High | Tone neutral đủ chưa? Quá soft / quá cứng? |
| 8 | Counter phrase | utility/internet/post | Phone + counter Japanese | Native Japanese | Medium | Confirm natural cho hotline + cửa hàng |
| 9 | Vietnamese | clinic FAQ | "kiểu 健康保険被保険者資格証明書 hoặc 資格確認書" | VN naturalness | Low | Hơi rối — có cách diễn đạt gọn hơn? |
| 10 | Vietnamese | emergency | "Tôi cần xe cấp cứu" vs "Làm ơn cho xe cấp cứu" | VN naturalness | Medium | Đã đổi từ "Làm ơn gọi xe cấp cứu" → confirm natural panic |
| 11 | Vietnamese | NHK | "tư vấn consumer miễn phí" trong Step 4 | VN naturalness | Low | Có dễ hiểu cho user phổ thông? |
| 12 | Vietnamese | hazard-map | "di tản dọc" cho 垂直避難 | VN naturalness | Low | Hay dùng "lên tầng cao trong nhà"? |
| 13 | Legal | NHK | Cooling-off applicability cho 受信契約 | Legal / consumer | **Highest** | Vùng tranh cãi pháp lý — đã hedge mạnh nhưng vẫn cần luật sư |
| 14 | Legal | NHK | 不退去罪 (luật hình sự 130) áp dụng | Legal / consumer | High | Ngưỡng case-specific |
| 15 | Legal | NHK | "không hướng dẫn trốn luật" — đã bỏ keyword "từ chối NHK" | Legal / consumer | High | Confirm tone không khuyến khích evasion |
| 16 | Legal | internet | 訪問販売 cooling-off cho ISP | Legal / consumer | Medium | General OK nhưng mixed-channel cases |
| 17 | Legal | typhoon | Quyền từ chối đi làm cấp 4-5 (労働安全衛生法) | Legal / consumer | High | Hợp đồng cụ thể có thể quy định khác |
| 18 | Legal | post | Không khai sai customs VN | Legal / consumer | Medium | General advice, OK; hedge thuế đã sửa |
| 19 | Source | A1 medical | #7119 / #9110 deep-link | Official source | Medium | Tùy khu vực — verify từng tỉnh |
| 20 | Source | A1 medical | 救急車 fee policy 2024–2026 | Official source | High | Đang đổi — re-verify trước nextReviewAt |
| 21 | Source | A1 medical | 選定療養費, 子ども医療費助成, 休日歯科診療 | Official source | Medium | Tùy 市町村 |
| 22 | Source | A2 disaster | 警戒レベル definition, 緊急地震速報, 171, Safety tips publisher | Official source | Medium | Cần deep-link 内閣府/気象庁/NTT/JNTO |
| 23 | Source | A2 disaster | 被災者生活再建支援金, 罹災証明書, 地震保険, 火山防災, 想定浸水深 | Official source | Medium | Theo 市町村, không bịa số |
| 24 | Source | A3 utilities | Phí utility/internet/EMS ranges 2026 | Official source | Medium | Dùng range hedged — confirm còn realistic |
| 25 | Source | A3 utilities | Đồ cấm về VN customs 2026 | Official source | Medium | Quy định VN thay đổi |
| 26 | Source | A3 utilities | e転居 Japan Post procedure | Official source | Low | Stable nhiều năm, ít thay đổi |

---

## Section 1 — Native Japanese review

Tổng **76 counterPhrases** (10 guide). Native Japanese reviewer confirm:
1. Có natural không (không textbook-stiff)?
2. Có đúng ngữ cảnh (cấp cứu / phòng khám / cửa / quầy) không?
3. Có cần biến thể nào không (mềm / cứng / nhiều panic)?

### A1 — Medical guides

#### `clinic-hospital-visit-guide` (8 phrases)

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | 初めてです。 | Hajimete desu. | Đây là lần đầu tôi đến đây. | Tại quầy 受付 | Standard, confirm OK? |
| 2 | 保険証を持っています。 | Hokenshou o motte imasu. | Tôi có thẻ bảo hiểm. | Khi nhân viên hỏi bảo hiểm | OK? |
| 3 | 予約していませんが、診てもらえますか。 | Yoyaku shite imasen ga, mite moraemasu ka. | Tôi chưa đặt hẹn, nhưng có thể khám được không? | Khi đến chưa đặt hẹn | Có hơi presumptuous với clinic đông không? Nên đổi `飛び込みでも大丈夫ですか?`? |
| 4 | 熱があります。 | Netsu ga arimasu. | Tôi bị sốt. | Triệu chứng cơ bản | OK? |
| 5 | 頭が痛いです。 | Atama ga itai desu. | Tôi bị đau đầu. | Triệu chứng cơ bản | OK? |
| 6 | 薬を飲んでいます。 | Kusuri o nonde imasu. | Tôi đang uống thuốc. | Cảnh báo bác sĩ về thuốc đang dùng | OK? |
| 7 | ベトナム語の通訳はありますか。 | Betonamu-go no tsuuyaku wa arimasu ka. | Có phiên dịch tiếng Việt không? | Hỏi tại quầy | OK? |
| 8 | 費用はどのくらいかかりますか。 | Hiyou wa dono kurai kakarimasu ka. | Chi phí khoảng bao nhiêu? | Hỏi trước khi xét nghiệm sâu | Có dùng `いくらくらいですか` ngắn hơn? |

#### `emergency-calls-japan` (9 phrases) — **HIGH priority panic context**

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | 救急車をお願いします。 | Kyuukyuusha o onegai shimasu. | Tôi cần xe cấp cứu. | Câu đầu khi gọi 119 | Trong panic, người Nhật thực sự nói gì đầu tiên? `救急車を呼んでください`? `救急です`? |
| 2 | 火事です。 | Kaji desu. | Có cháy. | Khi gọi 119 hỏa hoạn | OK? |
| 3 | 事故です。 | Jiko desu. | Có tai nạn. | Tai nạn giao thông | OK? |
| 4 | 住所は〇〇です。 | Juusho wa marumaru desu. | Địa chỉ là ... | Cấu trúc câu | OK? |
| 5 | けが人がいます。 | Keganin ga imasu. | Có người bị thương. | OK? | OK? |
| 6 | 意識がありません。 | Ishiki ga arimasen. | Người đó không còn ý thức. | Rất quan trọng | Nên có biến thể `意識を失っています` (mạnh hơn)? Hay `意識不明です`? |
| 7 | 警察をお願いします。 | Keisatsu o onegai shimasu. | Tôi cần cảnh sát. | Câu đầu khi gọi 110 | OK? |
| 8 | 日本語があまり話せません。 | Nihongo ga amari hanasemasen. | Tôi không nói tiếng Nhật tốt. | Báo trước với tổng đài | Phổ biến — confirm OK |
| 9 | ベトナム語の通訳をお願いします。 | Betonamu-go no tsuuyaku o onegai shimasu. | Cho tôi phiên dịch tiếng Việt. | Yêu cầu thông dịch | OK? Note đã ghi "không phải toàn quốc" |

**Reviewer ưu tiên:** confirm tone panic không quá lễ phép — câu Nhật `お願いします` có natural khi panic không, hay người ta nói gọn hơn?

#### `dentist-visit-japan` (7 phrases)

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | 歯が痛いです。 | Ha ga itai desu. | Tôi bị đau răng. | Câu mở đầu | OK? |
| 2 | 予約したいです。 | Yoyaku shitai desu. | Tôi muốn đặt hẹn. | Gọi điện hoặc quầy | OK? |
| 3 | 保険は使えますか。 | Hoken wa tsukaemasu ka. | Có dùng bảo hiểm được không? | Quan trọng | OK? |
| 4 | 費用はいくらくらいですか。 | Hiyou wa ikura kurai desu ka. | Chi phí khoảng bao nhiêu? | Hỏi trước điều trị | Khác với clinic là `どのくらい` — confirm cả 2 OK? |
| 5 | 今日、治療できますか。 | Kyou, chiryou dekimasu ka. | Hôm nay có điều trị được không? | Khi đau cấp tính | Hay nên formal `処置できますか`? |
| 6 | 痛み止めはもらえますか。 | Itamidome wa moraemasu ka. | Tôi có thể nhận thuốc giảm đau không? | Quan trọng | OK? |
| 7 | 説明をゆっくりお願いします。 | Setsumei o yukkuri onegai shimasu. | Làm ơn giải thích chậm giúp tôi. | Khi không hiểu | OK? |

### A2 — Disaster guides

#### `earthquake-preparedness-japan` (7 phrases) — **HIGH priority panic context**

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | 助けてください！ | Tasukete kudasai! | Cứu tôi với! | Hét lớn nếu mắc kẹt | Có natural panic? Hay người Nhật hét `助けて！` ngắn hơn? Note đã ghi "không cần lễ phép" |
| 2 | けがをしました。 | Kega o shimashita. | Tôi bị thương. | Báo cứu hộ | OK? |
| 3 | 家族と連絡が取れません。 | Kazoku to renraku ga toremasen. | Tôi không liên lạc được với gia đình. | Tại 避難所 | OK? |
| 4 | 避難所はどこですか。 | Hinanjo wa doko desu ka. | 避難所 (nơi tạm lánh) ở đâu? | Hỏi nhân viên | OK? |
| 5 | ベトナム語の通訳はいますか。 | Betonamu-go no tsuuyaku wa imasu ka. | Có phiên dịch tiếng Việt không? | Tại 避難所 | OK? |
| 6 | ガスが漏れています。 | Gasu ga morete imasu. | Có rò gas. | Quan trọng — gọi 119 | OK? Tone đủ mạnh? |
| 7 | 水と食べ物はありますか。 | Mizu to tabemono wa arimasu ka. | Có nước và thức ăn không? | Tại 避難所 | OK? |

#### `typhoon-evacuation-alerts` (7 phrases)

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | 避難指示が出ています。 | Hinan shiji ga dete imasu. | Đã có lệnh di tản. | Báo tình hình | OK? |
| 2 | 避難所に行きます。 | Hinanjo ni ikimasu. | Tôi đang đi đến 避難所. | Báo gia đình / sếp | OK? |
| 3 | 出社できません。避難指示が出ています。 | Shussha dekimasen. Hinan shiji ga dete imasu. | Tôi không đi làm được. Đã có lệnh di tản. | Báo sếp | Tone với sếp natural không? Có đủ formal? |
| 4 | 助けてください！ | Tasukete kudasai! | Cứu tôi với! | Mắc kẹt do nước/gió | Cùng câu earthquake — OK? |
| 5 | 道が冠水しています。 | Michi ga kansui shite imasu. | Đường đang ngập. | Báo cảnh sát | OK? |
| 6 | 停電しています。 | Teiden shite imasu. | Đang mất điện. | Gọi công ty điện | OK? |
| 7 | ベトナム語の通訳はいますか。 | Betonamu-go no tsuuyaku wa imasu ka. | Có phiên dịch tiếng Việt không? | Tại 避難所 | OK? |

#### `hazard-map-flood-tsunami-volcano` (6 phrases)

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | ハザードマップを見たいのですが。 | Hazaado mappu o mitai no desu ga. | Tôi muốn xem 防災マップ. | Tại quầy 市役所 | OK? `〜のですが` natural? |
| 2 | うちの地域のリスクを教えてください。 | Uchi no chiiki no risuku o oshiete kudasai. | Cho tôi biết về nguy cơ ở khu nhà tôi. | OK? | OK? |
| 3 | 避難所はどこですか。 | Hinanjo wa doko desu ka. | 避難所 ở đâu? | OK? | OK? |
| 4 | 英語の資料はありますか。 | Eigo no shiryou wa arimasu ka. | Có tài liệu tiếng Anh không? | OK? | OK? |
| 5 | ベトナム語版はありますか。 | Betonamu-go ban wa arimasu ka. | Có bản tiếng Việt không? | OK? | OK? |
| 6 | 津波の心配はありますか。 | Tsunami no shinpai wa arimasu ka. | Có nguy cơ sóng thần không? | OK? | OK? |

### A3 — Daily utilities

#### `electricity-gas-water-contracts` (8 phrases)

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | 電気を使い始めたいです。 | Denki o tsukai hajimetai desu. | Tôi muốn bắt đầu dùng điện. | Hotline | OK? |
| 2 | ガスの開栓を予約したいです。 | Gasu no kaisen o yoyaku shitai desu. | Tôi muốn đặt hẹn mở gas. | Hotline | OK? |
| 3 | 水道の使用開始をしたいです。 | Suidou no shiyou kaishi o shitai desu. | Tôi muốn bắt đầu dùng nước. | Hotline | OK? |
| 4 | 引っ越しするので、解約したいです。 | Hikkoshi suru node, kaiyaku shitai desu. | Tôi đang chuyển nhà nên muốn hủy hợp đồng. | Hotline | OK? |
| 5 | 支払い方法を変更したいです。 | Shiharai houhou o henkou shitai desu. | Tôi muốn đổi phương thức thanh toán. | Hotline | OK? |
| 6 | いつから使えますか。 | Itsu kara tsukaemasu ka. | Khi nào tôi có thể bắt đầu dùng? | Hotline | OK? |
| 7 | 解約金はかかりますか。 | Kaiyakukin wa kakarimasu ka. | Có phí hủy hợp đồng không? | Trước khi ký | OK? |
| 8 | ガスの臭いがします。 | Gasu no nioi ga shimasu. | Tôi ngửi thấy mùi gas. | Khẩn cấp | OK? Đủ rõ ràng? |

#### `home-internet-wifi-contracts` (8 phrases)

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | インターネットを契約したいです。 | Intaanetto o keiyaku shitai desu. | Tôi muốn đăng ký internet. | Hotline / cửa hàng | OK? |
| 2 | 工事は必要ですか。 | Kouji wa hitsuyou desu ka. | Có cần lắp đặt (công trình) không? | Quan trọng cho 光回線 | OK? |
| 3 | 解約金はいくらですか。 | Kaiyakukin wa ikura desu ka. | Phí hủy hợp đồng là bao nhiêu? | Trước khi ký | OK? |
| 4 | 契約期間は何年ですか。 | Keiyaku kikan wa nan-nen desu ka. | Thời hạn hợp đồng là mấy năm? | Trước khi ký | OK? |
| 5 | 引っ越し先でも使えますか。 | Hikkoshisaki demo tsukaemasu ka. | Ở nhà mới (sau chuyển) cũng dùng được không? | OK? | OK? |
| 6 | いつから使えますか。 | Itsu kara tsukaemasu ka. | Khi nào tôi có thể bắt đầu dùng? | OK? | OK? |
| 7 | 今すぐ契約できません。家で確認してから決めます。 | Ima sugu keiyaku dekimasen. Ie de kakunin shite kara kimemasu. | Tôi không ký ngay được. Tôi sẽ kiểm tra ở nhà rồi quyết định. | Khi 訪問販売 ép | Tone đủ mạnh nhưng lịch sự? |
| 8 | ベトナム語の説明はありますか。 | Betonamu-go no setsumei wa arimasu ka. | Có tài liệu giải thích tiếng Việt không? | OK? | OK? |

#### `nhk-contract-guide` (8 phrases) — **HIGH priority neutral-firm tone**

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | 内容を確認したいです。 | Naiyou o kakunin shitai desu. | Tôi muốn kiểm tra nội dung trước. | "Câu vàng" trước khi ký | OK? Tone neutral đúng chưa? |
| 2 | 今すぐ契約できません。 | Ima sugu keiyaku dekimasen. | Tôi không thể ký ngay bây giờ. | Lịch sự + rõ ràng | OK? |
| 3 | ベトナム語で確認してから判断したいです。 | Betonamu-go de kakunin shite kara handan shitai desu. | Tôi muốn xem bằng tiếng Việt trước khi quyết định. | Lý do hợp lý | OK? |
| 4 | 名刺をいただけますか。 | Meishi o itadakemasu ka. | Cho tôi xin danh thiếp được không? | Yêu cầu xác minh | OK? |
| 5 | 今日は帰ってください。 | Kyou wa kaette kudasai. | Hôm nay xin anh/chị về. | Yêu cầu nhân viên đi | Tone đúng "lịch sự nhưng rõ"? Có quá soft? Có nên có biến thể cứng `お引き取りください`? |
| 6 | 書類を置いてください。 | Shorui o oite kudasai. | Xin để giấy tờ lại cho tôi. | Khi muốn đọc kỹ | OK? |
| 7 | テレビなどの受信機器はありません。 | Terebi nado no jushinkiki wa arimasen. | Tôi không có thiết bị thu sóng như TV. | Chỉ nói nếu thật | Có đúng cách diễn đạt? |
| 8 | 国民生活センターに相談します。 | Kokumin seikatsu sentaa ni soudan shimasu. | Tôi sẽ tham khảo 国民生活センター. | Tín hiệu user biết quyền | Có natural? |

#### `post-office-mail-forwarding` (8 phrases)

| # | jp | romaji | vn | Note | **Reviewer Q** |
|---|---|---|---|---|---|
| 1 | 転送届を出したいです。 | Tensoutodoke o dashitai desu. | Tôi muốn nộp đơn chuyển tiếp thư. | Quầy bưu điện | OK? |
| 2 | 荷物を送りたいです。 | Nimotsu o okuritai desu. | Tôi muốn gửi hàng. | Quầy | OK? |
| 3 | ベトナムに送りたいです。 | Betonamu ni okuritai desu. | Tôi muốn gửi về Việt Nam. | Quầy | OK? |
| 4 | 追跡番号はありますか。 | Tsuiseki bangou wa arimasu ka. | Có số tracking không? | Quan trọng | OK? |
| 5 | 再配達をお願いしたいです。 | Saihaitatsu o onegai shitai desu. | Tôi muốn hẹn giao lại. | Khi mang 不在票 | OK? |
| 6 | この荷物は送れますか。 | Kono nimotsu wa okuremasu ka. | Hàng này có gửi được không? | Trước khi gửi đồ nhạy cảm | OK? |
| 7 | 何日くらいで届きますか。 | Nan-nichi kurai de todokimasu ka. | Khoảng mấy ngày thì đến? | OK? | OK? |
| 8 | 保険を付けたいです。 | Hoken o tsuketai desu. | Tôi muốn thêm bảo hiểm cho hàng. | Hàng giá trị cao | OK? |

---

## Section 2 — Vietnamese naturalness review

Vietnamese reviewer (sống ở Nhật) confirm các điểm sau có dễ hiểu cho user phổ thông, không Hán-Việt cứng, không máy dịch:

### Dictionary-style / Hán-Việt cứng tiềm ẩn

| # | Guide | Wording | Risk | Reviewer Q |
|---|---|---|---|---|
| 1 | clinic FAQ | "kiểu 健康保険被保険者資格証明書 hoặc 資格確認書" | Quá kỹ thuật cho user mới sang | Có cách diễn đạt gọn hơn? Vd "giấy xác nhận tư cách bảo hiểm tạm thời do 市役所 cấp"? |
| 2 | dentist fees | "Bọc răng kim loại bạc 銀歯 thường có bảo hiểm" | "Kim loại bạc" hơi văn cứng | "Răng bọc bạc" tự nhiên hơn? |
| 3 | typhoon Step 4 | "<30cm: vẫn đi được nhưng cẩn thận hố ga" | Số rời ngữ cảnh | OK với user phổ thông? Hay nên minh họa "ngập đến mắt cá chân"? |
| 4 | hazard-map FAQ | "想定浸水深 3m" + "người trên đường có thể chết đuối" | Tone graphic | Có cần soften "có thể nguy hiểm tính mạng" thay vì "chết đuối"? Hay graphic mới đủ tác động? |
| 5 | NHK Step 4 | "tư vấn consumer miễn phí" | "Consumer" Anh-Việt | Có dễ hiểu cho user mới sang Nhật? Hay "tư vấn người tiêu dùng miễn phí"? |
| 6 | hazard-map Step 3 tip | "có thể chọn 垂直避難 (di tản dọc) lên tầng cao" | "Di tản dọc" lạ tai | Có nên dùng "ở lại tầng cao trong nhà" tự nhiên hơn? |
| 7 | post-office Step 4 | "Mức thuế nhập khẩu / VAT của VN tùy loại hàng + giá trị + hải quan đánh giá — không có công thức chung" | "Công thức chung" hơi technical | OK? |
| 8 | internet Step 5 | "Lựa chọn 1: 引っ越し手続き (chuyển địa chỉ) — giữ hợp đồng" | OK | OK? |
| 9 | NHK FAQ "đã ký rồi" | "việc áp dụng cụ thể cho 受信契約 NHK là vùng tranh cãi pháp lý" | "Vùng tranh cãi pháp lý" hơi văn báo | Dễ hiểu? Hay "luật chưa rõ ràng"? |
| 10 | emergency description | "tổng đài 119/110 có thể kết nối thông dịch ở nhiều khu vực — không phải toàn quốc" | OK | Confirm "không phải toàn quốc" rõ với user? |

### Direct-translate red flags (đã sửa nhưng confirm)

| # | Guide | Original (đã sửa) | Sửa thành | Reviewer Q |
|---|---|---|---|---|
| 11 | emergency phrase 1 | "Làm ơn gọi xe cấp cứu" | "Tôi cần xe cấp cứu" | Confirm direct + natural panic? |
| 12 | emergency phrase 7 | "Làm ơn gọi cảnh sát" | "Tôi cần cảnh sát" | Confirm? |
| 13 | emergency phrase 9 | "Làm ơn cho tôi phiên dịch tiếng Việt" | "Cho tôi phiên dịch tiếng Việt" | Confirm? |
| 14 | earthquake phrase 1 + typhoon | "Làm ơn cứu tôi!" | "Cứu tôi với!" | Confirm panic-natural? |

---

## Section 3 — Legal / consumer review

**HIGH priority** — luật sư consumer hoặc consultant chuyên về NHK/訪問販売 nên đọc trước khi user dựa vào.

### 3.1 NHK cooling-off applicability — **HIGHEST priority**

- **Guide:** `nhk-contract-guide`
- **Current wording (sau QA pass A3):** "特定商取引法 có cơ chế cooling-off 8 ngày cho 訪問販売, nhưng việc áp dụng cụ thể cho 受信契約 NHK là vùng tranh cãi pháp lý ở Nhật — KHÔNG phải mọi trường hợp đều rõ ràng. Trước khi tự gửi 解約通知書, hỏi 国民生活センター 188."
- **Risk:** Án lệ Nhật cho NHK varies. Đã hedge mạnh ở 5 chỗ (quickAction.ifLate, whenToDo, fees, 2 FAQ, 2 Step). Tuy nhiên user có thể vẫn dựa vào → tranh chấp.
- **Reviewer Q:**
  1. Hedge hiện tại đủ chưa? Có cần hedge mạnh hơn (vd "KHÔNG dựa vào cooling-off cho NHK trừ khi 国民生活センター xác nhận")?
  2. Có nên thêm "Tham khảo case law gần đây — phán quyết tòa varies"?
  3. Có nên hoàn toàn xóa hướng dẫn cooling-off cụ thể (giữ chỉ "hỏi 国民生活センター")?
- **Status:** NEEDS_LEGAL_OR_CONSUMER_REVIEW

### 3.2 NHK 不退去罪 (luật hình sự 130) áp dụng

- **Guide:** `nhk-contract-guide` Step 3 + FAQ
- **Current wording:** "có thể đối chiếu 不退去罪 (luật hình sự về việc không rời sau khi được yêu cầu, ngưỡng áp dụng tùy hoàn cảnh — cảnh sát đánh giá khi đến). Gọi cảnh sát phi khẩn cấp #9110 nếu cần tư vấn / hỗ trợ."
- **Risk:** Ngưỡng 不退去罪 với case NHK cần xét cụ thể (đã yêu cầu rõ ràng và lặp lại, nhân viên thực sự không đi). User gọi 110 chưa đủ điều kiện → cảnh sát chỉ cảnh báo, không bắt.
- **Reviewer Q:**
  1. Hedge "ngưỡng áp dụng tùy hoàn cảnh — cảnh sát đánh giá" đủ chưa?
  2. Có nên thêm "thực tế ít khi cảnh sát can thiệp" để user khỏi kỳ vọng quá cao?
- **Status:** NEEDS_LEGAL_OR_CONSUMER_REVIEW

### 3.3 NHK tone — không khuyến khích trốn luật

- **Guide:** `nhk-contract-guide` toàn bộ
- **Current state:**
  - `searchKeywords`: bỏ "từ chối NHK", "không ký NHK" → thêm "xem xét NHK", "không ký vội", "188", "NHK ép ký"
  - `description`: "Theo 放送法 điều 64, hộ gia đình có thiết bị có thể thu sóng NHK thường có nghĩa vụ ký 受信契約"
  - Step 1 tip: "Đọc bài này KHÔNG có nghĩa 'tránh NHK' — chỉ là biết quyền để không bị ép. Nếu sau khi xem xét bạn quyết định ký, đó là chọn của bạn."
- **Reviewer Q:**
  1. Tone trung lập đủ chưa? Có chỗ nào còn nghe như khuyến khích trốn?
  2. Có cần thêm disclaimer mạnh hơn ở đầu guide?
- **Status:** NEEDS_LEGAL_OR_CONSUMER_REVIEW

### 3.4 Internet 訪問販売 cooling-off

- **Guide:** `home-internet-wifi-contracts` FAQ + Step 5
- **Current wording:** "Theo 特定商取引法, hợp đồng 訪問販売 (bán tận nhà) thường có quyền cooling-off — hủy không lý do trong 8 ngày kể từ khi nhận giấy hợp đồng."
- **Risk:** Internet 訪問販売 case rõ ràng hơn NHK case, nhưng vẫn có exceptions (online + cửa hàng + mixed channel).
- **Reviewer Q:**
  1. Wording chính xác chưa cho ISP cụ thể?
  2. Có cần phân biệt rõ ISP 訪問販売 vs ISP qua online vs ISP qua cửa hàng (mỗi loại có quy định khác)?
- **Status:** NEEDS_LEGAL_OR_CONSUMER_REVIEW

### 3.5 Quyền từ chối đi làm khi 警戒レベル 4-5 (労働安全衛生法)

- **Guide:** `typhoon-evacuation-alerts` commonMistakes + FAQ
- **Current wording (sau QA pass A2):** "trong tình huống có 避難指示 trong khu của bạn, có lý do chính đáng để từ chối đi làm theo 労働安全衛生法 (nghĩa vụ bảo vệ an toàn của người sử dụng lao động). Báo sếp trước, ghi lại bằng chứng."
- **Risk:** Hợp đồng cụ thể có thể quy định khác. "Có lý do chính đáng" không đồng nghĩa "không vi phạm hợp đồng tuyệt đối". Tranh chấp lao động có thể phức tạp.
- **Reviewer Q:**
  1. Hedge "có lý do chính đáng theo 労働安全衛生法" đủ chưa?
  2. Có nên thêm "Hợp đồng cá nhân có thể quy định cụ thể — kiểm tra trước"?
  3. Trường hợp 雇用契約 có 出勤義務 đặc biệt (vd y tế, công an, hạ tầng) — có nên loại trừ?
- **Status:** NEEDS_LEGAL_OR_CONSUMER_REVIEW

### 3.6 Post-office: customs VN

- **Guide:** `post-office-mail-forwarding` Step 4 + FAQ
- **Current wording (sau QA pass A3):** "KHAI BÁO TRUNG THỰC. KHÔNG khai sai / khai dưới giá trị thật để né thuế — có thể bị hải quan giữ + người nhận VN bị phạt. Mức thuế nhập khẩu / VAT của VN tùy loại hàng + giá trị + hải quan đánh giá — không có công thức chung."
- **Risk:** Quy định VN thay đổi. Đồ cấm list trong FAQ dựa trên hiểu biết chung.
- **Reviewer Q:**
  1. Đồ cấm list có thiếu / sai gì không (theo quy định VN 2026)?
  2. Có nên thêm link đến trang hải quan VN chính thức (customs.gov.vn)?
- **Status:** NEEDS_LEGAL_OR_CONSUMER_REVIEW

### 3.7 救急車 fee policy 2024–2026

- **Guide:** `emergency-calls-japan` fees + FAQ
- **Current wording:** "救急車 hiện đang miễn phí toàn quốc theo chính sách của 総務省消防庁. Một số tỉnh đã thí điểm thu phí cho trường hợp gọi 救急車 không thực sự cấp cứu — kiểm tra với tỉnh / thành phố nơi mình sống."
- **Risk:** Policy đang đổi (Mie 三重県 đã thu phí 7,700円 cho non-emergency case từ 2024). Tokyo + nhiều tỉnh chưa.
- **Reviewer Q:**
  1. Có cần liệt kê các tỉnh đã thu phí (Mie, etc.) cụ thể, hay giữ chung "kiểm tra với tỉnh mình"?
  2. Re-verify trước `nextReviewAt: 2026-12-01` — có thay đổi gì không?
- **Status:** NEEDS_LEGAL_OR_CONSUMER_REVIEW + Official source check

### 3.8 Utility/internet cancellation fees + contract terms

- **Guide:** `electricity-gas-water-contracts`, `home-internet-wifi-contracts`
- **Current wording:** Range hedged ("thường khoảng 1,000–10,000円", "tùy công ty + tùy gói")
- **Risk:** Quá general có thể không hữu ích; quá specific dễ sai.
- **Reviewer Q:**
  1. Range "5,000–15,000円" cho 工事費 光回線 còn realistic 2026?
  2. Có nên thêm bảng cụ thể (vd top 5 ISP với giá tham khảo)?
- **Status:** NEEDS_LEGAL_OR_CONSUMER_REVIEW

---

## Section 4 — Official source check

Tổng **22 mục** `NEEDS_OFFICIAL_SOURCE_CHECK` qua 3 batch. Content lead verify deep-link + verify số liệu trước khi nâng `officialLinks` lên trang con cụ thể.

### A1 — Medical guides

| # | Item | Related guide | Current source | Needed source type | Suggested official domain |
|---|---|---|---|---|---|
| 1 | #7119 (tư vấn y tế ngoài giờ) — coverage list theo tỉnh | clinic, dentist | Mention "tùy khu vực" | Deep-link FDMA hoặc 都道府県 | fdma.go.jp + 都道府県 health bureau |
| 2 | #9110 (cảnh sát tư vấn không khẩn cấp) | emergency, NHK | Mention "tùy khu vực" | Deep-link NPA | npa.go.jp |
| 3 | 救急車 fee policy 2024–2026 (Mie + các tỉnh thí điểm) | emergency | Hedge "một số tỉnh đã thí điểm" | Deep-link FDMA + 都道府県 | fdma.go.jp |
| 4 | 選定療養費 (phụ phí 病院 lớn không có 紹介状) | clinic | Mention chung | Deep-link MHLW + bệnh viện | mhlw.go.jp |
| 5 | 子ども医療費助成 (theo 市町村) | dentist FAQ | Hedge "tùy 市区町村" | List vài 市区町村 lớn (Tokyo, Osaka, Aichi, Fukuoka) | trang 市役所 cụ thể |
| 6 | 休日歯科診療所 | dentist | Mention "歯科医師会 có lịch ở 1 số khu" | Deep-link 歯科医師会 mỗi 都道府県 | jda.or.jp + prefecture branches |
| 7 | 健康保険被保険者資格証明書 vs 資格確認書 | clinic FAQ | Mention chung | Deep-link MHLW | mhlw.go.jp |

### A2 — Disaster guides

| # | Item | Related guide | Current source | Needed source type | Suggested official domain |
|---|---|---|---|---|---|
| 8 | 警戒レベル 1–5 official definition (内閣府 2019, sửa 2021) | typhoon | Mention chung | Deep-link 内閣府 | bousai.go.jp |
| 9 | 緊急地震速報 lead time + cách hoạt động | earthquake | Hedge "vài giây – vài chục giây tùy khoảng cách" | Deep-link 気象庁 | jma.go.jp |
| 10 | 災害用伝言ダイヤル 171 (NTT) — cách dùng + ngày test | earthquake, hazard | Mention chung | Deep-link NTT East/West | ntt-east.co.jp / ntt-west.co.jp (private but official) |
| 11 | Safety tips app publisher | hazard | Mention "do JNTO + 観光庁 phát hành" | Verify publisher chính xác | App Store / JNTO |
| 12 | 被災者生活再建支援金 (mức tiền + điều kiện) | earthquake Step 6 | Mention "tùy mức độ" | Deep-link 内閣府 | bousai.go.jp |
| 13 | 罹災証明書 procedure | earthquake, typhoon | Mention "xin tại 市役所" | Deep-link 内閣府 + 市町村 | bousai.go.jp + 市役所 |
| 14 | 地震保険 vs 火災保険 風水害 specifics | earthquake, typhoon | Hedge "thường KHÔNG bao động đất / bão" | Deep-link 損害保険 association | sonpo.or.jp |
| 15 | 火山防災 cụ thể từng núi (Phú Sĩ / Aso / Sakurajima) | hazard FAQ | Hedge "tùy 火山防災協議会 địa phương" | Deep-link 気象庁 + 火山防災協議会 | jma.go.jp |
| 16 | 想定浸水深 spec (vd 3m mean what) | hazard FAQ | Hedge "kiểm tra 市役所 cụ thể" | Deep-link 国土交通省 | mlit.go.jp |
| 17 | 労働安全衛生法 quyền từ chối đi làm khi disaster | typhoon | Hedge "có lý do chính đáng" | Deep-link MHLW | mhlw.go.jp |

### A3 — Daily utilities

| # | Item | Related guide | Current source | Needed source type | Suggested official domain |
|---|---|---|---|---|---|
| 18 | NHK cooling-off applicability + case law | NHK | Hedge "vùng tranh cãi" | **Legal review HIGHEST** | 国民生活センター + luật sư |
| 19 | Internet 訪問販売 cooling-off cho ISP cụ thể | internet FAQ | Mention chung | Deep-link 消費者庁 + METI | caa.go.jp + meti.go.jp |
| 20 | Phí utility 月額 + 工事費 + 解約金 ranges 2026 | electricity, internet | Range hedged | Verify với top 5 công ty | meti.go.jp + công ty cụ thể |
| 21 | EMS / 航空便 / 船便 phí ranges + tracking | post | Range hedged | Deep-link Japan Post | post.japanpost.jp |
| 22 | Đồ cấm về VN customs 2026 | post FAQ | Mention chung | Deep-link hải quan VN | customs.gov.vn |

**Lưu ý:** KHÔNG bịa URL. Suggested domain ở trên dựa trên domain chính của các cơ quan — content lead phải verify deep-link còn sống trước khi update `officialLinks`.

---

## Section 5 — Device QA carryover

Device QA trong 3 report đã liệt kê chi tiết. Summary:

### A1 — Medical guides (`docs/content-roadmap-a1-medical-guides.md`)
- 3 guide × per-guide checklist (8/9/7 counterPhrases, hero render, scroll, format số 119/110)
- Cross-cut search QA: đau răng / cấp cứu / 119 / 保険証 / 歯医者 / クリニック
- iOS-specific: long-press copy, Dynamic Type
- Android-specific: back button, copy

### A2 — Disaster guides (`docs/content-roadmap-a2-disaster-guides.md`)
- 3 guide × per-guide checklist (7/7/6 counterPhrases, layout)
- Cross-cut search QA: 動đất → động đất, 防災バッグ, 171, ハザードマップ, núi lửa, 罹災証明書 (10 queries)
- Disaster-specific: 警戒レベル wording render, 不在票 / 再配達 / 171 không bị format lỗi

### A3 — Daily utilities (`docs/content-roadmap-a3-daily-utilities-guides.md`)
- 4 guide × per-guide checklist (8/8/8/8 counterPhrases)
- Cross-cut search QA: điện / gas / mất điện / wifi / NHK / 受信料 / bưu điện / 不在票 / chuyển nhà / 解約金 (12 queries)
- NHK-specific: Step 5 title "tư vấn 国民生活センター trước", hedge "vùng tranh cãi pháp lý" trong 4 chỗ
- Long Japanese text render: 4 step description dài (utility Step 5 移転, internet Step 5 更新月, NHK Step 5 cooling-off, post Step 4 EMS)
- iOS Dynamic Type, Android back/copy

### Tổng cộng cần test

| Loại | Count | Notes |
|---|---|---|
| Per-guide layout | 10 guide | Hero / scroll / counterPhrases count |
| Counter phrase copy | 76 phrases | Tap copy → clipboard có jp |
| Search query | ~25 query | VN + JP + panic terms |
| Long JP render | ~10 step description | Không cắt giữa chừng |
| iOS Dynamic Type | All 10 guide | Cỡ XXL không cắt chữ |
| Android back button | All 10 guide | Quay lại đúng AdminScreen |

**Estimate thời gian:** 30–45 phút cho tester có kinh nghiệm (mỗi platform).

---

## Section 6 — Recommended next action

Theo thứ tự ưu tiên:

### Bước 1: Device QA A1–A3 (2 platforms × 30–45 phút)

- iOS: chạy 3 checklist trong A1/A2/A3 reports.
- Android: chạy 3 checklist.
- Phát hiện bug → fix trong batch QA pass riêng (không phải trong A4).

**Lý do ưu tiên:** không thêm content nếu rendering có vấn đề — bug nhân lên qua batch sau.

### Bước 2: Native + legal review (parallel, không block A4)

- **Native Japanese reviewer:** confirm 76 counterPhrases (Section 1 trên). Estimate: 1–2 giờ.
- **Vietnamese content reviewer:** confirm 14 wording điểm (Section 2 trên). Estimate: 30 phút.
- **Legal / consumer reviewer:** confirm 8 sensitive items (Section 3 trên). Đặc biệt NHK cooling-off — HIGHEST. Estimate: 2–4 giờ tùy độ chuyên sâu.

Phản hồi review → trigger pass review tiếp cho từng batch (không phải mới batch).

### Bước 3: Batch A4 — Education / children (sau khi Device QA pass)

Theo `docs/full-content-backlog-45-guides.md` Batch A4 = 3 guide:
1. `japanese-school-system-children` — Hệ thống trường học Nhật Bản
2. `japanese-language-support-children` — Hỗ trợ tiếng Nhật cho con / 日本語指導
3. `child-allowance-jidou-teate` — Trợ cấp trẻ em / 児童手当 (chú ý: policy 2026 update)

**KHÔNG implement A4 trong task này.**

### Bước 4: Tag intermediate release nếu muốn

Sau khi A1–A3 (90 guide) đã device QA + native review pass — có thể cut bản app store mới (1.3.2 hoặc 1.4.0). Hoặc gom thêm A4 trước khi tag.

---

## Document maintenance

- Khi 1 item được review xong + sửa, mark ✓ trong Summary table.
- Khi mở batch mới (A4+), thêm pending items vào document này (single source of truth).
- Re-verify quarterly cho items có `nextReviewAt: 2026-12-01`.

---

# UPDATE — A4 + A5 added (2026-05-09)

Bổ sung pending items cho 6 guide mới.

## A4 — Education / children pending

### Native Japanese (22 phrases mới)

#### `japanese-school-system-children` (7 phrases)

| jp | romaji | vn | Reviewer Q |
|---|---|---|---|
| 子どもの学校手続きをしたいです | Kodomo no gakkou tetsuzuki o shitai desu | Tôi muốn làm thủ tục trường học cho con | Standard tại 市役所 — confirm OK |
| 転入学の手続きをお願いします | Tennyuugaku no tetsuzuki o onegai shimasu | Xin giúp tôi làm thủ tục chuyển trường | OK? |
| 日本語指導はありますか | Nihongo shidou wa arimasu ka | Có hỗ trợ tiếng Nhật cho con không? | OK? |
| 学区はどこですか | Gakku wa doko desu ka | Khu trường (trường gần nhà) là trường nào? | OK? |
| 給食費はいくらですか | Kyuushokuhi wa ikura desu ka | Phí cơm trưa là bao nhiêu? | OK? |
| 入学に必要なものを教えてください | Nyuugaku ni hitsuyou na mono o oshiete kudasai | Cho tôi biết những thứ cần thiết khi nhập học | OK? |
| ベトナム語の説明はありますか | Betonamu-go no setsumei wa arimasu ka | Có tài liệu giải thích tiếng Việt không? | OK? |

#### `japanese-language-support-children` (7 phrases)

| jp | romaji | vn | Reviewer Q |
|---|---|---|---|
| 日本語指導はありますか | Nihongo shidou wa arimasu ka | Có hỗ trợ tiếng Nhật cho con không? | (cùng câu) — confirm context khác (担任 vs 教育委員会) |
| 取り出し授業をお願いしたいです | Toridashi jugyou o onegai shitai desu | Tôi muốn xin lớp riêng cho con | Tone formal có quá soft? |
| 子どもが授業についていけません | Kodomo ga jugyou ni tsuite ikemasen | Con tôi không theo kịp bài | Báo trực tiếp 担任 — confirm tone |
| 巡回指導を頼めますか | Junkai shidou o tanomemasu ka | Có thể xin giáo viên đi thăm không? | Wording natural? |
| 日本語教室を紹介してください | Nihongo kyoushitsu o shoukai shite kudasai | Xin giới thiệu lớp tiếng Nhật cho tôi | OK? |
| ベトナム語の支援はありますか | Betonamu-go no shien wa arimasu ka | Có hỗ trợ tiếng Việt không? | OK? |
| 子どもが学校に行きたがりません | Kodomo ga gakkou ni ikitagarimasen | Con tôi không muốn đi học | Tín hiệu cần báo gấp — natural? |

#### `child-allowance-jidou-teate` (8 phrases)

| jp | romaji | vn | Reviewer Q |
|---|---|---|---|
| 児童手当の申請をしたいです | Jidou teate no shinsei o shitai desu | Tôi muốn đăng ký trợ cấp trẻ em | OK? |
| 認定請求書をください | Nintei seikyuusho o kudasai | Cho tôi đơn xin trợ cấp | OK? |
| 必要な書類を教えてください | Hitsuyou na shorui o oshiete kudasai | Cho tôi biết giấy tờ cần thiết | OK? |
| いつから振り込まれますか | Itsu kara furikomaremasu ka | Khi nào tiền được chuyển vào tài khoản? | OK? |
| 引っ越しの手続きをお願いします | Hikkoshi no tetsuzuki o onegai shimasu | Xin giúp tôi làm thủ tục chuyển nhà | OK? |
| 子どもが生まれたので、申請したいです | Kodomo ga umareta node, shinsei shitai desu | Tôi vừa sinh con nên muốn đăng ký | OK? |
| 振り込み口座を変更したいです | Furikomi kouza o henkou shitai desu | Tôi muốn đổi tài khoản nhận tiền | OK? |
| ベトナム語の説明はありますか | Betonamu-go no setsumei wa arimasu ka | Có tài liệu giải thích tiếng Việt không? | OK? |

### Vietnamese naturalness — A4

| Guide | Wording | Question |
|---|---|---|
| `japanese-school-system-children` FAQ | "Hệ thống Nhật tính theo năm sinh: 4/1 năm trước đến 3/31 năm sau là cùng 学年" | Có dễ hiểu? Hay nên dùng "năm học" rõ hơn? |
| `japanese-language-support-children` Step 5 | "trẻ em có khả năng song ngữ vô cùng" | Tone đúng? |
| `child-allowance-jidou-teate` description | "kéo dài đến hết tuổi 18 (cuối năm tài chính)" | "Cuối năm tài chính" có cần giải thích thêm? |

### Legal / consumer — A4

11 mục `NEEDS_OFFICIAL_SOURCE_CHECK` (đã liệt kê trong `docs/content-roadmap-a4-education-children-guides.md`):

1. **児童手当 cải cách 10/2024** — cần verify deep-link こども家庭庁 cho mức tiền chính xác.
2. **Mức tiền cụ thể (yen/tháng)** — KHÔNG đưa số chi tiết. Hedge mạnh.
3. **現況届 yêu cầu** — tùy 市. Hedge.
4. **15 ngày deadline backdate** — quy định MEXT/こども家庭庁 chuẩn quốc gia, ổn định.
5. **高校無償化** — có ngưỡng thu nhập, tùy 都道府県.
6. **就学援助** — tùy 市町村.
7. **Phí đầu vào 小学校** — range tham khảo.
8. **Quy trình 入試 高校** — tùy 都道府県.
9. **Coverage 日本語指導 cụ thể** — chưa list từng 市.
10. **Hotline いじめ相談 0120-0-78310** — số chính thức MEXT.
11. **「かすたねっと」 URL** — verify trang chính xác.

---

## A5 — Legal / support pending — **HIGHEST PRIORITY LEGAL REVIEW**

### Native Japanese (23 phrases mới)

#### `police-questioning-rights-japan` (8 phrases) — **HIGH priority**

| jp | romaji | vn | Reviewer Q |
|---|---|---|---|
| 通訳をお願いします | Tsuuyaku o onegai shimasu | Xin cho tôi thông dịch viên | Standard request — OK? |
| 弁護士に連絡したいです | Bengoshi ni renraku shitai desu | Tôi muốn liên hệ luật sư | OK? |
| 領事館に連絡したいです | Ryoujikan ni renraku shitai desu | Tôi muốn liên hệ lãnh sự quán | OK? |
| 任意ですか、逮捕ですか | Nin'i desu ka, taiho desu ka | Là tự nguyện hay bị bắt? | Realistic trong panic state? |
| 私は何の容疑ですか | Watashi wa nan no yougi desu ka | Tôi bị nghi gì? | Tone formal đủ? |
| 黙秘権を行使します | Mokuhiken o koushi shimasu | Tôi thực hiện quyền giữ im lặng | Formal đủ? Có nên `答えたくありません`? |
| 署名はできません。弁護士に確認してから決めます | Shomei wa dekimasen. Bengoshi ni kakunin shite kara kimemasu | Tôi không ký được. Tôi quyết định sau khi hỏi luật sư | Câu cứu mạng — confirm tone đúng |
| 今日は都合が悪いので、後日にしたいです | Kyou wa tsugou ga warui node, gojitsu ni shitai desu | Hôm nay tôi bận, xin lùi lại ngày khác | Từ chối 任意聴取 — tone đủ rõ? |

#### `embassy-consulate-vietnam-japan` (7 phrases)

| jp | romaji | vn | Reviewer Q |
|---|---|---|---|
| パスポートをなくしました | Pasupooto o nakushimashita | Tôi đã làm mất hộ chiếu | OK? |
| 紛失届受理証明書をください | Funshitsu todoke juri shoumeisho o kudasai | Cho tôi giấy chứng nhận đã khai báo mất | OK? |
| パスポートの有効期限が切れています | Pasupooto no yuukou kigen ga kirete imasu | Hộ chiếu của tôi đã hết hạn | OK? |
| ベトナム大使館に連絡したいです | Betonamu taishikan ni renraku shitai desu | Tôi muốn liên hệ Đại sứ quán Việt Nam | OK? |
| 緊急ですか、通常ですか | Kinkyuu desu ka, tsuujou desu ka | Là khẩn cấp hay thường? | OK? |
| 受付時間を教えてください | Uketsuke jikan o oshiete kudasai | Cho tôi biết giờ tiếp nhận hồ sơ | OK? |
| 予約は必要ですか | Yoyaku wa hitsuyou desu ka | Có cần đặt hẹn trước không? | OK? |

#### `foreign-resident-support-centers` (8 phrases)

| jp | romaji | vn | Reviewer Q |
|---|---|---|---|
| 相談したいことがあります | Soudan shitai koto ga arimasu | Tôi có việc muốn được tư vấn | OK? |
| ベトナム語の通訳はありますか | Betonamu-go no tsuuyaku wa arimasu ka | Có thông dịch tiếng Việt không? | OK? |
| 無料で相談できますか | Muryou de soudan dekimasu ka | Có thể tư vấn miễn phí không? | OK? |
| 日本語教室を紹介してください | Nihongo kyoushitsu o shoukai shite kudasai | Xin giới thiệu lớp tiếng Nhật cho tôi | OK? |
| 弁護士を紹介してください | Bengoshi o shoukai shite kudasai | Xin giới thiệu luật sư cho tôi | OK? |
| 通訳に来てもらえますか | Tsuuyaku ni kite moraemasu ka | Có thể cử thông dịch đi cùng tôi không? | OK? |
| いつ開いていますか | Itsu aite imasu ka | Khi nào trung tâm mở cửa? | OK? |
| 緊急のときはどこに連絡すればいいですか | Kinkyuu no toki wa doko ni renraku sureba ii desu ka | Khi khẩn cấp thì tôi nên liên hệ ở đâu? | OK? |

### Legal / consumer — A5 — **HIGHEST PRIORITY**

⚠️ **`police-questioning-rights-japan` cần luật sư hình sự + consumer review TRƯỚC khi user dựa vào:**

1. **黙秘権 quy định 刑事訴訟法 + Hiến pháp 38条** — diễn đạt đúng?
2. **Timeline 48h / 72h / 23 ngày** — diễn đạt đúng theo 刑事訴訟法?
3. **当番弁護士 hệ thống** — luật sư xác nhận về quy trình + giới hạn của hệ thống.
4. **法テラス số 0570-078374** — verify với 法テラス trang chính.
5. **Vienna Convention 1963 quyền lãnh sự** — tone đúng + KHÔNG overclaim?
6. **公務執行妨害** — diễn đạt đúng?
7. **Tone "biết quyền" vs "đối kháng cảnh sát"** — review balance.
8. **Câu `任意ですか、逮捕ですか?`** — realistic trong panic? Native confirm.

⚠️ **`embassy-consulate-vietnam-japan`:**

9. **Phân vùng Tokyo/Osaka/Fukuoka** — chính xác cấp cao, nhưng phân vùng cụ thể từng 都道府県 thay đổi.
10. **Phí cấp hộ chiếu** — đã KHÔNG đưa con số yen cụ thể.
11. **60 ngày khai sinh** — quy định Việt Nam (Luật Quốc tịch + Luật Hộ tịch). Verify với tài liệu chính thức.
12. **Hotline bảo hộ công dân 24/7** — KHÔNG đưa số cụ thể (đã direct user đến trang chính thức).

⚠️ **`foreign-resident-support-centers`:**

13. **DV相談+ 0120-279-889** — verify với trang 内閣府.
14. **いのちの電話 0570-783-556** — verify với 一般社団法人 日本いのちの電話連盟.
15. **Yorisoi Hotline 0120-279-338** — verify với Social Inclusion Support Center.
16. **国民生活センター 188** — chính thức.

### Vietnamese naturalness — A5

| Guide | Wording | Question |
|---|---|---|
| `police-questioning-rights-japan` description | "Đây là tài liệu tham khảo — KHÔNG phải tư vấn pháp lý cá nhân" | Disclaimer này có cần lặp ở đầu mỗi step? |
| `police-questioning-rights-japan` FAQ | "có thể bị thêm tội 公務執行妨害" | Hedge "có thể" đủ? |
| `embassy-consulate-vietnam-japan` Step 5 | "trong vòng 14 ngày — quy định 入管法" | "Quy định 入管法" có cần dẫn điều luật cụ thể? |
| `foreign-resident-support-centers` Step 5 | "いのちの電話" hotline | Có cần thêm "tự tử" trong description hay sensitive? |

---

## Priority order cho reviewer

### HIGHEST priority — luật sư + native review BẮT BUỘC trước scale
1. `police-questioning-rights-japan` — toàn bộ guide (luật sư hình sự + native)
2. NHK cooling-off applicability (đã có trong A3 — chưa review xong)
3. `child-allowance-jidou-teate` mức tiền — verify với こども家庭庁

### HIGH priority
4. `embassy-consulate-vietnam-japan` phân vùng — verify với trang chính thức Đại sứ quán
5. `foreign-resident-support-centers` hotlines — verify với 内閣府 + 国民生活センター
6. A5 23 counterPhrases — native confirm tone

### MEDIUM priority
7. A4 22 counterPhrases — native confirm
8. A4 trường học wording (年級, 学区, 給食費) — native + cha mẹ thực tế confirm
9. Phí range A4 / A5 — confirm 2026

### Total pending sau update A5

| Loại | Count |
|---|---|
| Native Japanese phrases | 76 (A1–A3) + 22 (A4) + 23 (A5) = **121** |
| Vietnamese naturalness | 14 (A1–A3) + 3 (A4) + 4 (A5) = **21** |
| Legal / consumer | 8 (A1–A3) + 0 (A4 light) + 8 (A5 — most HIGHEST) = **16** |
| Official source | 22 (A1–A3) + 11 (A4) + 16 (A5) = **49** |
| Device QA | 10 guide → **16 guide** |

---

# UPDATE — A6 + A7 + A8 + A9 added + QA pass A4–A9 (2026-05-10)

Thêm 10 guide mới + 1 QA pass commit. Tổng feature branch: **26 guide bổ sung sau v1.3.2**.

## A6 — Tax / finance pending (HIGH risk)

| Guide | Counter phrases | Risk |
|---|---|---|
| `furusato-nozei-guide` | 7 | low |
| `ideco-personal-pension` | 8 | **high** — đầu tư + retirement |
| `tax-on-remittance-to-vietnam` | 8 | **high** — cross-border |

**Legal/consumer review HIGH priority**:
1. `tax-on-remittance-to-vietnam` — cross-border tax phức tạp + đã FIX 国外送金等調書 (đúng tên 法定調書 sau QA pass).
2. `ideco-personal-pension` — không tư vấn đầu tư cá nhân + 限度額 cải cách 2024–2026.
3. 出国税 (exit tax) áp dụng — disclaimer rõ.

## A7 — Health expansion pending

| Guide | Counter phrases | Risk |
|---|---|---|
| `mental-health-stress-support` | 8 | **high** — tâm thần + tự sát |
| `medical-interpretation-multilingual-hospitals` | 7 | low |
| `holiday-night-medical-care` | 7 | medium |
| `pharmacy-prescription-guide` | 8 | low |

**Legal/consumer review HIGH**:
1. `mental-health-stress-support` — disclaimer mạnh sau QA pass ("phổ biến + có thể điều trị" + "bạn không một mình"). Hotlines verify (いのちの電話, よりそい).
2. AMDA Tokyo/Osaka số phone — verify với trang AMDA.
3. #7119/#8000 coverage tùy 都道府県 — đã hedge.
4. 救急車 fee policy 2024–2026 — re-verify trước nextReviewAt.

## A8 — Career pending

| Guide | Counter phrases | Risk |
|---|---|---|
| `japanese-resume-rirekisho` | 6 | low |
| `job-interview-japan` | 8 | low |
| `paternity-parental-leave-fathers` | 8 | medium — labor law |

**Legal/consumer review MEDIUM**:
1. `paternity-parental-leave-fathers` — 育児・介護休業法 + 雇用保険 + 出生後休業支援給付金 (cải cách 2025). Mức tiền + điều kiện cụ thể KIỂM TRA với ハローワーク.
2. パタハラ (paternity harassment) hedge — đã rõ.
3. 育休 visa impact — đã hedge "đa số trường hợp KHÔNG ảnh hưởng".

## A9 — Community pending

| Guide | Counter phrases | Risk |
|---|---|---|
| `vietnamese-community-japan` | 6 | medium — scam warning |
| `free-japanese-classes-local` | 7 | low |
| `local-volunteering-chonaikai` | 8 | low |

**Legal/consumer review MEDIUM**:
1. `vietnamese-community-japan` scam list — comprehensive nhưng cần update khi có scam mới (vd crypto trends).
2. 町内会 không bắt buộc theo luật — đã hedge "tenant contract có thể yêu cầu".

---

## QA pass A4–A9 commit (2026-05-10, `a93729a`)

3 fixes critical:

1. **`tax-on-remittance-to-vietnam`**: factual fix — `国際送金等支払調書` → `国外送金等調書` (9 chỗ replaced — đúng theo 国税庁 + 法律 2008).
2. **`police-questioning-rights-japan`**: hedge 黙秘権 claim absolute → "thường KHÔNG được dùng làm bằng chứng buộc tội trực tiếp" + reference 不利益推認禁止.
3. **`mental-health-stress-support`**: strengthen hope-giving — "phổ biến + có thể điều trị" + "bạn không một mình".

13 guide khác đã review qua grep — pattern matches còn lại đều đúng usage hoặc trong scam-warning context. Không cần fix thêm.

---

## Tổng pending sau A6–A9

| Loại | Count |
|---|---|
| Native Japanese phrases | 121 (A1–A5) + 23 (A6) + 30 (A7) + 22 (A8) + 21 (A9) = **217** phrases |
| Vietnamese naturalness | 21 (A1–A5) + ~5 (A6–A9) = **~26** điểm |
| Legal / consumer | 16 (A1–A5) + 3 (A6 — tax/iDeCo HIGHEST) + 1 (A7 — mental-health HIGH) + 1 (A8 — paternity-leave) + 1 (A9 — scam list) = **22** items |
| Official source | 49 (A1–A5) + 19 (A6) + 12 (A7) + 8 (A8) + 5 (A9) = **~93** items |
| Device QA | 16 → **26 guide** |

## Priority order cho reviewer (sau A9)

### HIGHEST (ship blocker khi đến v1.3.3 / v1.4.0)
1. `police-questioning-rights-japan` (A5) — luật sư hình sự + native (đã hedge sau QA pass nhưng vẫn high)
2. `tax-on-remittance-to-vietnam` (A6) — 税理士 cross-border (đã fix 国外送金等調書 sau QA pass)
3. NHK cooling-off (A3) — chưa review xong từ trước
4. `mental-health-stress-support` (A7) — bác sĩ tâm thần verify hotline + tone (đã strengthen sau QA pass)

### HIGH
5. `ideco-personal-pension` (A6) — 金融アドバイザー verify 限度額 + 出国 logic
6. `child-allowance-jidou-teate` (A4) — verify 児童手当 cải cách 10/2024 với こども家庭庁
7. `paternity-parental-leave-fathers` (A8) — 社会保険労務士 verify 出生後休業支援給付金 cải cách 2025
8. `embassy-consulate-vietnam-japan` (A5) phân vùng — verify với trang Đại sứ quán

### MEDIUM
9. A7/A8 hotlines + AMDA + ハローワーク numbers
10. A9 scam list update theo trend mới
11. Counter phrases tone cho A6–A9 — native confirm

### LOW
12. Phí ranges A4–A9 — confirm 2026
13. Các 都道府県/市町村 specifics
14. Search keywords improvements cho panic-search

---

## UPDATE — QA Round 2 prioritized review (2026-05-10)

**Trigger**: User request "Ưu tiên thực hiện review đi" sau khi commit Batch A8.
**Scope**: Spot-check HIGHEST + HIGH priority items đã liệt kê + verify hotlines/numbers + factual claims độ phơi nhiễm cao.

### Findings + fixes

| # | Guide | Issue | Action |
|---|---|---|---|
| 1 | `paternity-parental-leave-fathers.ts` | 出生後休業支援給付金 (cải cách 2025) +13% — chưa nói rõ chỉ áp dụng window 8 tuần / 28 ngày sau sinh, dễ hiểu nhầm thành toàn 1 năm 育休 | Sửa fee line: thêm "**chỉ áp dụng cho window cụ thể trong 8 tuần đầu sau sinh** (đa số trường hợp ~28 ngày)" + "**KHÔNG phải áp dụng cho toàn thời gian 育休**" |
| 2 | `tax-on-remittance-to-vietnam.ts` | Claim "Hiệp định Nhật–Việt 1995, **sửa 2014**" — không xác minh được nghị định thư 2014 chính thức | Sửa thành "ký 1995-10, **có thể có nghị định thư sửa đổi sau đó — kiểm tra ngày hiệu lực bản hiện hành với 国税庁 hoặc 税理士**" |

### Items verified — không cần đụng

| Guide | Verified | Note |
|---|---|---|
| `nhk-contract-guide.ts` | Cooling-off applicability | ≥6 chỗ đã hedge "vùng tranh cãi pháp lý — hỏi 国民生活センター 188". Tone đủ phòng thủ. |
| `embassy-consulate-vietnam-japan.ts` | Phân vùng Tokyo/Osaka/Fukuoka | Đã hedge "kiểm tra trên trang chính thức" + Aichi (Nagoya) hedged "thường thuộc Tokyo, có thể thuộc Osaka". |
| `mental-health-stress-support.ts` | Hotline numbers | いのちの電話 0570-783-556 ✓ / よりそい 0120-279-338 ✓ / AMDA Tokyo 03-6233-9266 ✓ / AMDA Osaka 06-4395-0555 ✓ — tất cả khớp số chính thức. |
| `police-questioning-rights-japan.ts` | 黙秘権 + 不利益推認禁止 claims | QA pass `a93729a` đã hedge thành "thường KHÔNG được dùng làm bằng chứng buộc tội trực tiếp. Trường hợp cụ thể tùy đánh giá tòa — cần luật sư." Tone phù hợp. |
| `tax-on-remittance-to-vietnam.ts` | 国外送金等調書 (đã fix QA pass `a93729a`) | Tất cả 6 chỗ đã đúng (không còn 国際送金等支払調書 sai). |
| `ideco-personal-pension.ts` | 限度額 specifics | Đã hedge "Mức cụ thể đang đổi 2024–2026 — kiểm tra trang chính thức" + "Cải cách 2024–2026 đang tăng giới hạn cho một số nhóm". |
| `child-allowance-jidou-teate.ts` | 10/2024 cải cách specifics | Đã hedge "kiểm tra với 市役所" + "policy thay đổi". |

### Pending review status sau QA Round 2

- HIGHEST: 4/4 đã được tự review (police, tax-remit, NHK, mental-health) → **không còn HIGHEST tự xử lý được**.
- HIGH (paternity 2025 reform window) → **fixed Round 2**.
- Còn lại: items thực sự cần native + legal external review (luật sư, 税理士, 社労士) — không thể tự fix.

### Verification

- `npm run verify`: ✅ 0 issues, 0 lines fixed
- `npm run test:ci`: ✅ 251/251 pass

### Recommendations cho external review

Reviewer ưu tiên kiểm tra:

1. **Tài chính / thuế** (cần 税理士 quốc tế):
   - `tax-on-remittance-to-vietnam.ts` — hiệp định Nhật–Việt nghị định thư hiện hành
   - `ideco-personal-pension.ts` — 限度額 cải cách 2024–2026 chính xác
   - `furusato-nozei-guide.ts` — tax mechanics cho người nước ngoài
2. **Lao động** (cần 社労士):
   - `paternity-parental-leave-fathers.ts` — 出生後休業支援給付金 window + điều kiện
   - `unemployment-benefits.ts` / `employment-crisis-visa-job-loss-layoff.ts`
   - `labor-rights-dispute.ts` / `workplace-accident-rousai.ts`
3. **Tiêu dùng / hợp đồng** (cần 国民生活センター hoặc luật sư consumer):
   - `nhk-contract-guide.ts` — cooling-off applicability cho 受信契約
   - `electricity-gas-water-contracts.ts` / `home-internet-wifi-contracts.ts` — quy trình giải quyết tranh chấp
4. **Hình sự** (cần luật sư hình sự):
   - `police-questioning-rights-japan.ts` — 黙秘権 nuance + Vietnamese specifics
